const express = require("express");
const { ObjectId, MongoClient } = require("mongodb");
require("dotenv").config()

const router = express.Router();
var collections = {}
router.get("/", () => ({result: "Oi"}))

function getRoutes() {
    ["Transactions", "Users", "Feedback", "Comments"].forEach((value) => {
        const dbCollection = collections[value]
        router.route(`/${value.toLowerCase()}`)
            .get(async (req, res) => res.json(await dbCollection.find().toArray()))
            .post(async (req, res) => res.json(await dbCollection.insertOne(req.body)))
    
        router.route(`/${value.toLowerCase()}/:id`)
            .get(async (req, res) => res.json(await dbCollection.findOne({"_id": ObjectId(req.params.id)})))
            .put(async (req, res) => res.json(await dbCollection.findOneAndUpdate({"_id": ObjectId(req.params.id)}, req.body)))
            .delete(async (req, res) => res.json(await dbCollection.deleteOne({"_id": ObjectId(req.params.id)})))
    })
}

MongoClient.connect(process.env.MONGODB_URI, async (err, client) => {
    if (err) console.log(err)
    const cols = await client.db("MoneyMattersDB").collections()
    cols.forEach(async (collection) => {
        collections[collection.collectionName] = collection
    })
    getRoutes()
    
    //custom routes
    router.get("/transactionsByUserId/:userId", async (req, res) => res.send(await collections["Transactions"].find({"userId": ObjectId(req.params.userId)}).toArray()))
    router.get("/userByUsername/:username", async (req, res) => res.send(await collections["Users"].findOne({"username": req.params.username})))
    router.get("/commentsByFeedback/:feedbackId", async (req, res) => res.send(await collections["Comments"].find({"feedbackId": ObjectId(req.params.feedbackId)})))
})

module.exports = router