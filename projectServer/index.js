// load .env file
require('dotenv').config()

// import express 
const express=require('express')

const cors=require('cors')

const routes=require('./Routes/routes')

require('./db/connection')

// Create server using express
const projectServer=express()
projectServer.use(cors())

// convert all incoming json data to js data
projectServer.use(express.json())

projectServer.use(routes)

// exports uploads folder to client
projectServer.use('/uploads',express.static('./uploads'))


const PORT=4003 || process.env.PORT
projectServer.listen(PORT,()=>{
    console.log(`_____Project Server Started At Port Number ${PORT}_____`);
})


// resolve API requests

projectServer.get('/',(req,res)=>{
    res.send(`<h1>Project Server started...</h1>`)
})


// projectServer.post('/',(req,res)=>{
//     res.send(`POST METHOD...`)
// })

// projectServer.put('/',(req,res)=>{
//     res.send(`PUT METHOD...`)
// })


