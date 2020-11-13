const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const passport = require('../config/ppConfig.js')

// GET /matches - index (read) - lists all matches
router.get('/', (req, res)=>{
    db.match.findAll({
        order: [ ['id', 'ASC'] ],
        include: [db.character],
    })
    .then((foundMatches)=>{
        console.log("all matches found:", foundMatches)
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

// // GET /matches - index (read) - lists all matches ----- ??? what was this for?
// router.get('/', (req, res)=>{
//     db.character.findAll()
//     .then((characters)=>{
//         // let characterData = characters
//         // console.log(characterData)
//         res.render('matches/index', { matches: foundMatches })
//     })
//     .catch((error)=>{
//         console.log("the error is:", error)
//     })
// })

// GET /matches/edit/:id - edit (read) - shows a form for editing a specific match (i.e. /matches/edit/1)
// can i do a findAll within this findAll to get all characters and store in object?

router.get('/edit/:id', (req, res)=>{
    db.character.findAll()
    .then(characters=>{
        let characterData = characters 
        console.log("characterData:", characterData)

        console.log("req.params.id:", req.params.id)
        db.match.findOne({
            where: { id: req.params.id },
            include: [db.character]
        }).then(foundMatch=>{
            let matchIndex = req.params.id
            console.log("foundMatch:", foundMatch)
            console.log("foundMatch specific to the current index:", matchIndex, "match data is:", foundMatch)
            res.render('matches/edit', { allCharacters: characterData, match: foundMatch, character: foundMatch.character.dataValues, matchIndex: matchIndex})
        })
    })
})

// PUT /matches/:id - update (update) - updates the data for a specific match (i.e. /matches/1)
// returning: true tells sequelize to return the object, plain: true returns the object itself without additional data
router.put('/:id', (req, res)=>{
    db.match.update({
        characterId: req.body.characterId,
        result: req.body.result
    }, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
    }).then(result=>{
        console.log(result)
        res.redirect('/matches')
    }).catch(err=>{
        console.log("error for updating match is:", err)
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