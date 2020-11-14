require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js') // requiring the ppconfig file where we have required passport and will make modifications to
const flash = require('connect-flash') // to have flash messages appear when the password/username is invalid
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const methodOverride = require('method-override')
const db = require('./models')

// middleware - set up ejs and ejs layouts
app.use(methodOverride('_method')) // will look at '_method' in the url
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// middleware - needed to have req.body to work, parses data so the input would work
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

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

// GET route to view profile
// isLoggedIn only applies to middleware that needs specific routes
app.get('/profile/:id', isLoggedIn, (req, res)=>{
    db.match.findAndCountAll({
        where: {
            userId: req.params.id
        }
    }).then(result=>{
        console.log("the count is:", result.count)
        console.log("the rows are:", result.rows)
        res.render('profile', { matchCount: result.count, matches: result.rows })
    })
})

// GET /profile/edit - edit (read) - shows a form for editing your profile
app.get('/profile/edit/:id', isLoggedIn, (req, res)=>{
    db.user.findOne({
        where: { id: req.params.id }
    }).then((result)=>{
        console.log("logging the result:", result)
        console.log("req params id is:", req.params.id)
        res.render('edit')
    }).catch(err=>{
        console.log("the error when going to edit page is:", err)
    })
})

// PUT /profile - update (update) - updates the data for your profile
// returning: true tells sequelize to return the object, plain: true returns the object itself without additional data

app.post('/profile/:id', isLoggedIn, (req, res)=>{
    db.user.update({
        switchCode: req.body.switchCode,
        about: req.body.about
    }, {
        where: {
            email: req.body.email
        }
    }).then(result=>{
            console.log(result)
            console.log("updated profile for email:", req.body.email)
            console.log("switch code updated to:", req.body.switchCode)
            console.log("about box updated to:", req.body.about)
            res.redirect('/profile/:id')
        }).catch(err=>{
        console.log("error for updating profile is:", err)
    })
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('reporting live from port 3000')
})