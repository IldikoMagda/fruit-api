// const http = require("http"); //built in 

// //Creates the server 
// const server = http.createServer((req, res) => {
//     console.log(req.url)
//     console.log(req.method)
//     res.setHeader("Content-Type", "text/html")
//     res.end("<img src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'>")
// }) //request and response

// server.listen(3000, () => {
//     console.log("Server Ready")
// })

//create server with built in express
//saving you the hassle
// const express = require("express")
// const app = express()
// const port = 3000

// app.get('/', (req,res) => {
//     res.send("Hello World")
// })
// app.get('/chicken', (req,res) =>{
//     res.send("Hello ChickChick")
// })
// app.get('/chicken/:name', (req, res) =>{
//     res.send(req.params)  //you can change it to req.query 
// }) //adding a parameter
// app.get('/example', (req, res) =>{
//     res.status = 204
//     res.send()
// })
// app.listen(port, () => {
//     console.log(`Server is now listening on port ${port}`)
// })

//fruit API
require('dotenv').config
const fruits = require("./fruits.json")
const express = require("express")
const app = express()
const port = process.env.PORT
const cors = require('cors')
app.use(express.json())
app.use(cors())

// app.use((req,res, next) => {
//     console.log("I'm a piece of middleware")
//     //without next, it will be running forever
//     next()
// })
// app.use((req,res, next) => {
//     console.log("I'm also piece of middleware")
//     //without next, it will be running forever
//     next()
// })
app.get("/", (req, res) => {
    res.send("Hello fruit API")

})

app.get("/fruits", (req, res) => {
    res.send(fruits)
})

app.post("/fruits", (req, res) => {
    const fi = getFruitIndex(req.body.name.toLowerCase()) // fruit index
    const fruit = req.body //check what body is
    console.log(fruit) 
    res.send("New Fruit Created")
    //api testing tool -- thunder client vs code extension -- PRESS CTRL +SHIFT +R
    if(fi > -1){
        res.status(409).send("the fruit already exist")
    }else{
        //create array with all ids 
        const ids = fruit.map((fruit) => fruit.id)
        // let allIDs = []
        // for(let i in fruit.id){
        //     allIDs.push(i)
        // }
        let maxId = math.max(...ids)
        maxId++
        req.body.id = maxId
        //get max is 

        //increment that by one 

        //adjust id to new maxID
        fruits.push(req.body)
        res.status(201).send(req.body)
    }
})

const getFruitIndex = name => {
    // take in a lowercase fruit name and returns the index of the fruit or -1 
    return fruits.findIndex((fruit) => fruit.name.toLowerCase() == name)
}

app.delete("/fruit/:name", (req,res) =>{
    const fi = getFruitIndex(req.params.name.toLowerCase);
    if(fi ==-1){
        // fruit cannot be found so no deletion needed
        res.status(404).send("Fruit Cannot be Found!")
    }else{
        fruits.splice(f1, 1)
        res.sendStatus(200)
    }

})
app.get("/fruits/:name", (req, res) => {
    //res.send(`Return a fruit with ${req.params.name} name`)
    const name = req.params.name.toLowerCase()
    //search fruits.json to return fruit if the name match
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)
    if (fruit == undefined) {
        //no fruit like that
        res.status(404).send("The fruit doesn't exist")
    }else{
        // if there is a fruit
        res.send(fruit)
    }
})

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`)
})
