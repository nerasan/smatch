const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/signup', (req, res)=>{
    res.render('auth/signup')
})

router.post('/signup', (req, res)=>{
    console.log('sign up form user input:', req.body)

    // creating a new user or already have an existing account
    // if it does, throw an error message
    // otherwise create a new user and store them in the db
    db.user.findOrCreate({
        where: {email: req.body.email },
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }) // create new user if email was not found
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log(`just created the following user:`, createdUser)
        } else {
            console.log('an account associated with that email address already exists! try logging in.')
        }
        // redirect to login page after creating login
        res.redirect('/auth/login')

    })


})

router.get('/login', (req, res)=>{
    res.render('auth/login')
})

router.post('/login', (req, res)=>{
    console.log('log in form user input:', req.body)
    // redirect to home page
    res.redirect('/')
})

module.exports = router