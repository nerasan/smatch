const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const passport = require('../config/ppConfig.js')

// GET /matches - index (read) - lists all matches
router.get('/', (req, res)=>{
    db.match.findAll({
        include: [db.character]
    })
    .then((foundMatches)=>{
        console.log(foundMatches)
        res.render('matches/index', { matches: foundMatches })
    })
    .catch((error)=>{
        console.log("the error is:", error)
    })
})

// GET /matches/new - display form for creating new matches -- USING DB
router.get('/new', (req, res)=>{
    db.character.findAll()
    .then((characters)=>{
        res.render('matches/new', { characters: characters })
    })
    .catch((error)=>{
        console.log("the error is:", error)
    })
})

// POST route /matches/new - create a new match
router.post('/', (req, res)=>{
    db.match.create({
        userId: req.body.userId,
        characterId: req.body.characterId,
        result: req.body.result
    })
    .then((match)=>{
        db.user.findOne({
            where: {
                id: req.body.userId,
            },
            include: [db.character]
        })
        .then(user=>{
            user.addMatch(match)
        })
        res.redirect('/matches')
    })
    .catch((error)=>{
        console.log("the error is:", error)
    })
})

// GET /matches/edit/:id - edit (read) - shows a form for editing a specific match (i.e. /matches/edit/1)
router.get('/edit/:id', (req, res)=>{
    db.match.findAll({
        include: [db.character]
    })
    .then((foundMatches)=>{
        console.log(foundMatches)
        res.render('matches/edit', { matches: foundMatches })
    })
    .catch((error)=>{
        console.log("the error is:", error)
    })
})

// PUT /matches/:id - update (update) - updates the data for a specific match (i.e. /matches/1)
// router.put('/', (req, res)=>{
//     db.match.findOrCreate({
//         where: 
//     })
// })


// DELETE /matches/:id - destroy (delete) - deletes the match with the specified id (i.e. /matches/1)



module.exports = router