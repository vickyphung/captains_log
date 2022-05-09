const express = require("express")
const { model } = require("mongoose")
const log = require("../models/logs")



const router = express.Router()

router.get("/", (req, res)=>{
    res.status(200).json({message: "Captain's Log, post a log entry or update one at /log/update/:id"})
});

//Route to post and create a log to MongoDB
router.post('/', (req, res) => {
  const newLog = req.body
  log.create(newLog, (error, log) => {
    if (error) {
      console.error(error);
      res.status(400).json({
        error: 'an error has occurred'
      })
    } else {
      console.log('created Log successfully');
      res.status(201).json({
        message: 'Log Created Successfully',
        log: log
      })
    }
  })
})

//Update a log by it's id
  router.put("/update/:id", (req, res)=>{
    const id = req.params.id
    const updatedLog = req.body

    log.findByIdAndUpdate(id, updatedLog, {new: true},(err, updatedLog)=>{
        if(err){
            res.status(404).json({message: err.message})
        } else {
            res.status(202).json(updatedLog)
        }
    })
})

module.exports = router