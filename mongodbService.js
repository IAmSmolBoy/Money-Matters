const express = require("express");
const { ObjectId, MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
require("dotenv").config()

const router = express.Router();
var collections = {}

const bcryptSaltRounds = 10

MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    if (err) console.log(err)
    const mongodbCollections = await client.db("MoneyMattersDB").collections()
    mongodbCollections.forEach((collection) => {
        collections[collection.collectionName] = collection
    })

    //CRUD routes
    for (const [ colName, col ] of Object.entries(collections)) {
        //different routes
        const noIdRoute = router.route(`/${colName.toLowerCase()}`),
        idRoute = router.route(`/${colName.toLowerCase()}/:id`)

        //R and D
        noIdRoute.get(async (req, res) => res.json(await col.find().toArray()))
        idRoute.get(async (req, res) => res.json(await col.findOne({"_id": ObjectId(req.params.id)})))
            .delete(async (req, res) => res.json(await col.deleteOne({"_id": ObjectId(req.params.id)})))

        if (colName !== "Users") {
            //C and U will not be applied for users
            //user C and U will be below
            noIdRoute.post(async (req, res) => res.json(await col.insertOne(req.body)))
            idRoute.put(async (req, res) => res.json(await col.findOneAndUpdate({"_id": ObjectId(req.params.id)}, {"$set": req.body})))
        }
    }
    
    //custom routes
    router.get("/transactionsByUserId/:userId", async (req, res) => res.json(await collections["Transactions"].find({"userId": req.params.userId}).toArray()))
    router.get("/commentsByFeedback/:feedbackId", async (req, res) => res.json(await collections["Comments"].find({"feedbackId": req.params.feedbackId})))

    //user routes
    router.post("/login", async (req, res) => {
        try {
            const getUserByUsername = await collections.Users.findOne({"username": req.body.username})
            getUserByUsername.token = jwt.sign(getUserByUsername, process.env.JWTSECRET)
            res.json(
                bcrypt.compareSync(req.body.password, getUserByUsername.password) ?
                getUserByUsername :
                "incorrect credentials"
            )
        } catch (error) {
            console.log(error)
            res.json(null)
        }
    })
    router.post("/parseJWT", (req, res) => res.json(jwt.verify(req.body.token, process.env.JWTSECRET)))

    //bcrpyt add and edit user credentials
    router.route(`/users`).post(async (req, res) => {
        req.body.password = bcrypt.hashSync(req.body.password, bcryptSaltRounds);
        req.body.token = jwt.sign(getUserByUsername, process.env.JWTSECRET)
        res.json(await collections.Users.insertOne(req.body))
    })
    router.route(`/users/:id`).put(async (req, res) => {
        const updates = req.body
        if (updates.password !== null) {
            updates.password = bcrypt.hashSync(updates.password, bcryptSaltRounds);
        }
        res.json(await collections.Users.findOneAndUpdate({"_id": ObjectId(req.params.id)}, {"$set": updates}))
    })
})

module.exports = router