const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const passport = require('../config/ppConfig.js')

// GET /matches - index (read) - lists all matches
router.get('/', (req, res)=>{
    db.match.findAll()
    .then((matches)=>{
        console.log(matches)
        res.render('matches/index', { matches })
    })
    .catch((error)=>{
        console.log("the error is:", error)
    })
})

// GET /matches/new - display form for creating new matches
router.get('/new', (req, res)=>{
    axios.get(`https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters?name=`)
    .then(response=>{
        // console.log(response.data)
        res.render('matches/new', {characters: response.data})
    })
    .catch(error=>{
        console.log("the error is:", error)
    })
})

// POST route /matches/new - create a new match
router.post('/new', (req, res)=>{
    db.match.create({
        userId: req.body.userId,
        characterId: req.body.characterId,
        result: req.body.result
    })
    .then((match)=>{
        console.log(match)
        res.redirect('/matches')
    })
    .catch((error)=>{
        console.log("the error is:", error)
    })
})


// POST /matches - create (create) - creates a match with the POST payload (form) data


// GET /matches/:id - show (read) - list information about a specific match (i.e. /matches/1)


// GET /matches/edit/:id - edit (read) - shows a form for editing a specific match (i.e. /matches/edit/1)


// PUT /matches/:id - update (update) - updates the data for a specific match (i.e. /matches/1)


// DELETE /matches/:id - destroy (delete) - deletes the match with the specified id (i.e. /matches/1)



module.exports = router