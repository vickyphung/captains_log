const express = require("express")
const log = require("../models/logs")

const seedLogs = [
    {
        "_id": "62789c413e394749f4455096",
        "title": "Two",
        "entry": "Day Two. Stranded on island. Found pineapple. Thirsty.",
        "shipIsBroken": true,
        "__v": 0
    },
    {
        "_id": "62789c4f3e394749f4455098",
        "title": "Three",
        "entry": "Day Three. I fear all is lost.",
        "shipIsBroken": true,
        "__v": 0
    },
    {
        "_id": "62789c5f3e394749f445509a",
        "title": "Four",
        "entry": "HELP ME!!!!!!",
        "shipIsBroken": true,
        "__v": 0
    },
    {
        "_id": "62789c123e394749f4455094",
        "title": "One",
        "entry": "Day One. Got lost in storm last night. Looking for land. Hungry. I have a ball as a friend.",
        "shipIsBroken": false,
        "__v": 0
    }
]

const router = express.Router()

router.get("/", (req, res)=>{
    log.insertMany(seedLogs, (err, allLogs)=>{
        if(err){
            res.status(400).json({message: err.message})
        }else{
            res.status(201).json(allLogs)
        }
    })
})


module.exports = router