const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const passport = require('../config/ppConfig.js')

// GET /characters -- lists all characters from axios get


router.get('/', (req, res)=>{
    axios.get(`https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters?name=`)
    .then(response=>{
        // console.log(response.data)
        response.data.forEach(character=>{
            // console.log(character.name)
            db.character.findOrCreate({
                where: { name: character.name },
                defaults: {
                    icon: character.images.portrait,
                    series: character.series.name
                }
            })
        })
        res.render('characters/index', {characterData: response.data})
    })
    .catch(err=>{
        console.log("the error is:", err)
    })
})

// GET /characters/:id -- lists information about a specific character
router.get('/:id', (req, res)=>{
    let character = req.params.id
    axios.get(`https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters/${character}`)
    .then(response=>{
        console.log(response.data)
        res.render('characters/show', {characterData: response.data})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router