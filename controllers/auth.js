const express = require('express')
const router = express.Router()

router.get('/signup', (req, res)=>{
    res.render('auth/signup')
})

router.post('/signup', (req, res)=>{
    console.log('posting to /auth/signup')
    // redirect to login page after creating login
    res.redirect('/auth/login')
})

router.get('/login', (req, res)=>{
    res.render('auth/login')
})

router.post('/login', (req, res)=>{
    console.log('posting to /auth/login')
    // redirect to home page
    res.redirect('/')
})

module.exports = router