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
        // foundMatches.forEach(match=>{
        //     console.log(`${match.result} with the following character:`)
        //     match.characters.forEach(character=>{
        //         console.log(character.name)
        //     })
        // })
        res.render('matches/index', { matches: foundMatches })
    })
    .catch((error)=>{
        console.log("the error is:", error)
    })
})

// GET /matches/new - display form for creating new matches -- USING APO
// router.get('/new', (req, res)=>{
//     axios.get(`https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters?name=`)
//     .then(response=>{
//         // console.log(response.data)
//         res.render('matches/new', {characters: response.data})
//     })
//     .catch(error=>{
//         console.log("the error is:", error)
//     })
// })

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


// POST /matches - create (create) - creates a match with the POST payload (form) data


// GET /matches/:id - show (read) - list information about a specific match (i.e. /matches/1)


// GET /matches/edit/:id - edit (read) - shows a form for editing a specific match (i.e. /matches/edit/1)


// PUT /matches/:id - update (update) - updates the data for a specific match (i.e. /matches/1)


// DELETE /matches/:id - destroy (delete) - deletes the match with the specified id (i.e. /matches/1)



module.exports = router