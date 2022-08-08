const express = require("express");
const { ObjectId, MongoClient } = require("mongodb");
require("dotenv").config()

const router = express.Router();
var collections = {}

MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    if (err) console.log(err)
    (await client.db("MoneyMattersDB").collections()).forEach((collection) => {
        collections[collection.collectionName] = collection
    })

    //CRUD routes
    for (const [ colName, col ] of Object.entries(collections)) {
        router.route(`/${colName.toLowerCase()}`)
            .get(async (req, res) => res.json(await col.find().toArray()))
            .post(async (req, res) => res.json(await col.insertOne(req.body)))

        router.route(`/${colName.toLowerCase()}/:id`)
            .get(async (req, res) => res.json(await col.findOne({"_id": ObjectId(req.params.id)})))
            .put(async (req, res) => res.json(await col.findOneAndUpdate({"_id": ObjectId(req.params.id)}, req.body)))
            .delete(async (req, res) => res.json(await col.deleteOne({"_id": ObjectId(req.params.id)})))
    }
    
    //custom routes
    router.get("/transactionsByUserId/:userId", async (req, res) => res.send(await collections["Transactions"].find({"userId": ObjectId(req.params.userId)}).toArray()))
    router.post("/login", async (req, res) => res.send(await collections["Users"].findOne(req.body)))
    router.get("/commentsByFeedback/:feedbackId", async (req, res) => res.send(await collections["Comments"].find({"feedbackId": ObjectId(req.params.feedbackId)})))
})

module.exports = router