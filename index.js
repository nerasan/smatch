require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js') // requiring the ppconfig file where we have required passport and will make modifications to
const flash = require('connect-flash') // to have flash messages appear when the password/username is invalid
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')

// middleware - set up ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// middleware - needed to have req.body to work, parses data so the input would work
app.use(express.urlencoded({ extended: false }))

// session middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.SESSION_SECRET, // typically in env
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware - has to be put AFTER session middleware
app.use(flash())

// CUSTOM MIDDLEWARE  -- next used when you set up a bunch of middleware functions
// without this, we would have to set up the data on every page
app.use((req, res, next)=>{
    // before every route, attach the flash messages and current user to res.locals
    // this will give us access to these values in all our ejs pages
    res.locals.alerts = req.flash() // add all flash messages to alert section - so it can be available to all our ejs files
    res.locals.currentUser = req.user 
    next() // move on to the next piece of middleware
})

// use controllers
app.use('/auth', require('./controllers/auth.js'))
app.use('/characters', require('./controllers/characters.js'))
app.use('/matches', require('./controllers/matches.js'))

app.get('/', (req, res)=>{
    res.render('home')
})

// isLoggedIn only applies to middleware that needs specific routes
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('reporting live from port 3000')
})