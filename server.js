const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const seedRoute = require("./routes/seed")
const logRoute = require("./routes/logRoute")
const log = require("./models/logs")

const mongoConfig = require("./config")

require("dotenv").config()

const PORT = process.env.PORT || 3000;
const server = express()

server.use(morgan("dev"))
server.use(express.json())
server.use(bodyParser.json())

server.use("/log", logRoute)
server.use("/seed", seedRoute)

// server.get("/", (req, res)=>{
//     res.status(200).json({message: "This is the Captain's Log"})
// });

//Index route responds with full list of Captain Logs
server.get("/", (req, res)=>{
    log.find((err, allLogs)=>{
        if(err){
            res.status(404).json({message: err.message})
        } else {
            res.status(200).json({message: "THIS IS CAPTAIN VICKY'S SHIP LOG! /:title pulls up the log under that title. /clear deletes all, /delete/:id deletes by id. Head over to /log/ to post or update a log.", logs: allLogs})
        }
    })
})

//Route to pull up a log by it's title using route parameters.
server.get("/:title", (req, res)=>{
    const title = req.params.title
    log.findOne({title: title,}, (err, log)=>{
        if(err){
            res.status(404).json({message: err.message})
        } else {
            res.status(200).json(log)
        }
    })
})


//Deletes all Logs
server.delete("/clear", (req, res)=>{
    log.deleteMany((err)=>{
        if(err){
            res.status(404).json({message: err.message})
        }else{
            res.status(204).json({message: "All Logs have been cleared."})
        }
    })
})

//Deletes log with specified ID
server.delete("/delete/:id",(req, res)=>{
    const id = req.params.id
    log.findByIdAndDelete(id, (err)=>{
        if(err){
            res.status(404).json({message: err.message})
        }else{
            res.status(204).json({message: "Log deleted."})
        }
    })
})

server.listen(PORT, ()=>{
    mongoConfig()
    console.log(`Server is listening: ${PORT}`)
})