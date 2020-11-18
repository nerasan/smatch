const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const passport = require('../config/ppConfig.js')

// GET /matches - index (read) - lists all matches
router.get('/:id', (req, res)=>{
    db.match.findAll({
        order: [ ['id', 'ASC'] ],
        include: [db.character],
        where: {
            userId: req.params.id
        },
    })
    .then((foundMatches)=>{
        // console.log("all matches found:", foundMatches)
        res.render('matches/index', { matches: foundMatches })
    })
    let deletematch = req.query.id
    // console.log("the match to be deleted is at match index:", deletematch)
    db.match.destroy({
        where: {
            id: deletematch
        }
    }).then(()=>{
        let userId = req.params.id
        res.redirect(`/matches/${userId}`)
    })
    .catch((error)=>{
        console.log("the error for matches GET route is:", error)
        // req.flash('error', 'you must be logged in to access that page.')
        // res.redirect('/auth/login')
    })
})

// GET /matches/new - display form for creating new matches -- USING DB
router.get('/new/:id', (req, res)=>{
    db.character.findAll()
    .then((characters)=>{
        res.render('matches/new', { characters: characters })
    })
    .catch((error)=>{
        console.log("the error is:", error)
    })
})

// POST route /matches/new - create a new match
router.post('/:id', (req, res)=>{
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
        let userId = req.body.userId
        res.redirect(`/matches/${userId}`)
    })
    .catch((error)=>{
        console.log("the error is:", error)
        req.flash('error', 'there was an error adding the match. please try again.')
        res.redirect('/')
    })
})

// GET /matches/edit/:id - edit (read) - shows a form for editing a specific match (i.e. /matches/edit/1)
router.get('/edit/:id', (req, res)=>{
    db.character.findAll()
    .then(characters=>{
        let characterData = characters 
        // console.log("characterData:", characterData)
        // console.log("req.params.id:", req.params.id)
        db.match.findOne({
            where: { id: req.params.id },
            include: [db.character]
        }).then(foundMatch=>{
            let matchIndex = req.params.id
            // console.log("foundMatch:", foundMatch.character.dataValues)
            // console.log("foundMatch specific to the current index:", matchIndex, "match data is:", foundMatch)
            res.render('matches/edit', { allCharacters: characterData, match: foundMatch, character: foundMatch.character.dataValues, matchIndex: matchIndex})
        }).catch(err=>{
            console.log("the error in the edit/read route is:", err)
            req.flash('error', 'there was an error editing the match. please try again.')
            res.redirect('/')
        })
    })
})

// PUT /matches/:id - update (update) - updates the data for a specific match (i.e. /matches/1)
// returning: true tells sequelize to return the object, plain: true returns the object itself without additional data
router.put('/:id', (req, res)=>{
    console.log(req.body)
    db.match.update({
        characterId: req.body.characterId,
        result: req.body.result
    }, {
        where: {
            id: req.params.id
        },
        // returning: true,
        // plain: true
    }).then(result=>{
        let userId = req.body.userId
        console.log("the userId and to be used in the url is", userId)
        console.log(result)
        res.redirect(`/matches/${userId}`)
    }).catch(err=>{
        console.log("error for updating match is:", err)
        req.flash('error', 'there was an error editing the match. please try again.')
        res.redirect('/')
    })
})

module.exports = router