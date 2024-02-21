// Imports
import express from "express"
import bodyParser from "body-parser"
import { MongoClient } from "mongodb"
import { connectToDb, getDb } from "./database.js"

const DB_NAME = "project3"
const MONGODB_URI = "mongodb://localhost:37017/project3"
const BAKERY_COLLECTION = "bakeries"
const BAKERS_COLLECTION = "bakers"
const DESSERTS_COLLECTION = "desserts"
let client = new MongoClient(`${MONGODB_URI}`)

// Variables
let bakeryCount = 3
let topDessertsCount = 9
const app = express()
const PORT = 2000
app.use(express.urlencoded({ extended: true }))

// Listening on the PORT
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}.`)
}) 

// Parses the text input from Postman
app.use(bodyParser.json())

// Database Connection
let db = client.db()
connectToDb(()=>{
  if(!err){
    app.listen(PORT, () => {
      console.log(`the server is running on ${PORT}!`)
    })
    db = getDb()
  }
})

// BAKERIES ROUTES
// GET /bakeries - Returns an array of bakeries.
app.get("/bakeries", async (req, res) => {
  client = await MongoClient.connect(MONGODB_URI)
  const database = await client.db(DB_NAME)
  const collection = database.collection(BAKERY_COLLECTION)
  const bakeryArr = await collection.find().toArray()

  console.log(bakeryArr)
  res.send(bakeryArr)
})

// POST /bakery - Accepts a JSON object as the body of the request containing 
// all bakery fields and saves to the database.
app.post("/bakery", async (req, res) => {
    const reqPost = req.body
    console.log(reqPost)

    client = await MongoClient.connect(MONGODB_URI)
    const database = await client.db(DB_NAME) 
    const collection = database.collection(BAKERY_COLLECTION)

    const newBakery = createBakeryObj(reqPost.name, reqPost.location, reqPost.topDesserts, reqPost.topBaker)
    const add = await collection.insertOne(newBakery)

    res.send(newBakery)
})

// Constructs a new bakery object
function createBakeryObj (newName, newLocation, newTopDesserts, newTopBaker) {
  bakeryCount++
  topDessertsCount = topDessertsCount + 3
  const newBakeryId = "b" + bakeryCount.toString()

  const bakeryObj = {
    bakeryId: newBakeryId,
    name: newName,
    location: newLocation,
    topDesserts: newTopDesserts,
    topBaker: newTopBaker
  }
  return bakeryObj
}

// UPDATE /bakery/:bakeryId/topDesserts - Adds a dessert to the end of the topDesserts 
// with the given bakeryId and returns the dessertId.
app.post("/bakery/:bakeryId/topDesserts", async (req, res) => {
    console.log(req.params)
    const bId = String(req.params.bakeryId)
    const reqPost = req.body
    console.log(reqPost)

    client = await MongoClient.connect(MONGODB_URI)
    const database = await client.db(DB_NAME) 
    const collection = database.collection(BAKERY_COLLECTION)
    
    const newTopDessert = createTopDessert(reqPost.name, reqPost.rank)
    const findBakery = await collection.updateOne({ "bakeryId": {$regex: bId, $options: "i"}}, {$push: { "topDesserts": newTopDessert}})

    const dessertId = "d" + topDessertsCount.toString()
    res.send("New Top Dessert: " + dessertId + " added to bakery " + bId)
})
// Constructs a new topDessert object
function createTopDessert (newName, newRank) {
  topDessertsCount++
  const newDessertId = "d" + topDessertsCount.toString()

  const dessertObj = {
    dessertId: newDessertId,
    name: newName,
    rank: newRank,
  }
  return dessertObj
}

// DELETE /bakery/:bakeryID - Deletes the bakery from the database 
// based on the bakeryId field
app.delete("/bakery/:bakeryId", async (req, res) => {
    console.log(req.params)
    const bId = String(req.params.bakeryId)

    client = await MongoClient.connect(MONGODB_URI)
    const database = await client.db(DB_NAME) 
    const collection = database.collection(BAKERY_COLLECTION)

    topDessertsCount = topDessertsCount - 4
    const deleteBakery = collection.deleteOne({ bakeryId: bId})
    res.send("Post Deleted: " + bId)
})

// BAKERS ROUTES
// GET /bakers - Returns an array of bakers.
app.get("/bakers", async (req, res) => {
  client = await MongoClient.connect(MONGODB_URI)
  const database = await client.db(DB_NAME)
  const collection = database.collection(BAKERS_COLLECTION)
  const bakerArr = await collection.find().toArray()

  console.log(bakerArr)
  res.send(bakerArr)
})

// POST /baker - Accepts a JSON object as the body of the request containing all 
// baker fields and saves to the database.
app.post("/baker", async (req, res) => {
    const reqPost = req.body
    console.log(reqPost)

    client = await MongoClient.connect(MONGODB_URI)
    const database = await client.db(DB_NAME) 
    const collection = database.collection(BAKERS_COLLECTION)

    const newBaker = createBakerObj(reqPost.bakerId, reqPost.bakeryId, reqPost.name, reqPost.specialty, reqPost.yearsOfExperience, reqPost.topBaker)
    const add = await collection.insertOne(newBaker)

    res.send(newBaker)
})

// Constructs a new baker object
function createBakerObj (newBakerId, newBakeryId, newName, newSpecialty, newYearsOfExperience, newTopBaker) {

  const bakerObj = {
    bakerId: newBakerId,
    bakeryId: newBakeryId,
    name: newName,
    specialty: newSpecialty,
    yearsOfExperience: newYearsOfExperience,
    topBaker: newTopBaker
  }
  return bakerObj
}

// UPDATE /baker/:bakerId/topBaker - Accepts a JSON object as the body of the 
// request, topBaker (true or false), and updates the topBaker property for the 
// specified baker. 
app.post("/baker/:bakerId/topBaker", async (req, res) => {
    const eId = String(req.params.bakerId)
    const newTopBaker = req.body.topBaker

    client = await MongoClient.connect(MONGODB_URI)
    const database = await client.db(DB_NAME) 
    const collection = database.collection(BAKERS_COLLECTION)
    
    const findBaker = await collection.updateOne({ "bakerId": {$regex: eId, $options: "i"}}, {$set: { "topBaker": newTopBaker}})

    res.send("The topBaker field for " + eId + " was updated to " + newTopBaker)
})

// DELETE /baker/:bakerID - Deletes the baker with the provided id.
app.delete("/baker/:bakerId", async (req, res) => {
    console.log(req.params)
    const eId = String(req.params.bakerId)

    client = await MongoClient.connect(MONGODB_URI)
    const database = await client.db(DB_NAME) 
    const collection = database.collection(BAKERS_COLLECTION)

    const deleteBaker = collection.deleteOne({ bakerId: eId})
    res.send("Baker Deleted: " + eId)
})

// DESSERTS ROUTES
// GET /desserts - Returns an array of desserts.
app.get("/desserts", async (req, res) => {
  client = await MongoClient.connect(MONGODB_URI)
  const database = await client.db(DB_NAME)
  const collection = database.collection(DESSERTS_COLLECTION)
  const dessertArr = await collection.find().toArray()

  console.log(dessertArr)
  res.send(dessertArr)
})

// POST /dessert - Accepts a JSON object as the body of the request containing 
// all dessert fields and saves to the database.
app.post("/dessert", async (req, res) => {
    const reqPost = req.body
    console.log(reqPost)

    client = await MongoClient.connect(MONGODB_URI)
    const database = await client.db(DB_NAME) 
    const collection = database.collection(DESSERTS_COLLECTION)

    const newDessert = createDessertObj(reqPost.bakeryId, reqPost.name, reqPost.type, reqPost.description, reqPost.rank, reqPost.quantityInStore, reqPost.seasonal)
    const add = await collection.insertOne(newDessert)

    res.send(newDessert)
})

// Constructs a new dessert object
function createDessertObj (newBakeryId, newName, newType, newDescription, newRank, newQuantityInStore, newSeasonal) {
  topDessertsCount++
  const newDessertId = "d" + topDessertsCount.toString()

  const dessertObj = {
    dessertId: newDessertId,
    bakeryId: newBakeryId,
    name: newName,
    type: newType,
    description: newDescription,
    rank: newRank,
    quantityInStore: newQuantityInStore,
    seasonal: newSeasonal
  }
  return dessertObj
}

// UPDATE /dessert/:dessertId/quantity - Accepts a JSON object as the body of the 
// request, quantityInStore (number), and updates the quantityInStore property for 
// the specified dessert.  
app.post("/dessert/:dessertId/quantity", async (req, res) => {
    const dId = String(req.params.dessertId)
    const newQuantity = req.body.quantityInStore

    client = await MongoClient.connect(MONGODB_URI)
    const database = await client.db(DB_NAME) 
    const collection = database.collection(DESSERTS_COLLECTION)
    
    const findDessert = await collection.updateOne({ "dessertId": {$regex: dId, $options: "i"}}, {$set: { "quantityInStore": newQuantity}})

    res.send("The dessert " + dId + " has a new quantity in store of " + newQuantity)
})

// DELETE /dessert/:dessertId - Deletes the dessert with the provided id.
app.delete("/dessert/:dessertId", async (req, res) => {
    console.log(req.params)
    const dId = String(req.params.dessertId)

    client = await MongoClient.connect(MONGODB_URI)
    const database = await client.db(DB_NAME) 
    const collection = database.collection(DESSERTS_COLLECTION)

    const deleteDessert = collection.deleteOne({ dessertId: dId})
    res.send("Dessert Deleted: " + dId)
})