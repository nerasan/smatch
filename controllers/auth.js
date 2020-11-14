const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')

router.get('/signup', (req, res)=>{
    res.render('auth/signup')
})

router.post('/signup', (req, res)=>{
    console.log('sign up form user input:', req.body)

    // creating a new user or already have an existing account
    // if it does, throw an error message
    // otherwise create a new user and store them in the db

    // to do with 2 criteria, do a find and THEN do findOrCreate
    // can also mark field as unique 
    // set a column so that all values in column are unique
    // use the sequelize api 

    db.user.findOrCreate({
        where: { email: req.body.email }, // cannot handle two 
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }) // create new user if email was not found
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log(`just created the following user:`, createdUser)
            // log the new user in automatically after creating
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'welcome to smatch.gg! your account has been created!' // FLASH
            })(req, res) // IIFE = immediately invoked function
        } else {
            req.flash('error', 'email already exists, try logging in')
            res.redirect('/auth/login')
            // console.log('an account associated with that email address already exists! try logging in.')
        }
    })
    .catch(error=>{
        req.flash('error', error.message)
        req.redirect('/auth/signup') // redirect to signup page so they can try again
    })
})

router.get('/login', (req, res)=>{
    res.render('auth/login')
})

// POST - login user
// passport.authenticate is the function used to authenticate username and passport, it automatically receives it from body of the form
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'invalid email or password', // FLASH
    successFlash: 'you are now logged in' // FLASH
}))

// GET - logout route  - passport will log us out
router.get('/logout', (req, res)=>{
    req.logout()
    console.log('logged out')
    req.flash('success', 'see you on the arena!') // FLASH
    res.redirect('/')
})

module.exports = router