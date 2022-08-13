const express = require("express");
const { ObjectId, MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const nm = require("nodemailer")
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

        //Read for all routes
        noIdRoute.get(async (req, res) => res.json(await col.find().toArray()))
        idRoute.get(async (req, res) => res.json(await col.findOne({"_id": ObjectId(req.params.id)})))

        if (colName !== "Users") {
            //C, U and D will not be applied for users
            //user C, U and D will be below
            noIdRoute.post(async (req, res) => res.json(await col.insertOne(req.body)))
            idRoute.put(async (req, res) => res.json(await col.findOneAndUpdate({"_id": ObjectId(req.params.id)}, {"$set": req.body})))
                .delete(async (req, res) => res.json(await col.deleteOne({"_id": ObjectId(req.params.id)})))
        }
    }
    
    //custom routes
    router.get("/transactionsByUserId/:userId", async (req, res) => res.json(await collections["Transactions"].find({"userId": req.params.userId}).toArray()))
    router.get("/commentsByFeedback/:feedbackId", async (req, res) => res.json(await collections["Comments"].find({"feedbackId": req.params.feedbackId}).toArray()))

    //user routes
    router.post("/login", async (req, res) => {
        try {
            const getUserByUsername = await collections.Users.findOne({"username": req.body.username})
            if (getUserByUsername !== null && bcrypt.compareSync(req.body.password, getUserByUsername.password)) {
                getUserByUsername.token = jwt.sign(getUserByUsername, process.env.JWTSECRET)
                res.json(getUserByUsername)
            }
            else {
                res.json({error: "incorrect credentials"})
            }
            
        } catch (error) {
            console.log(error)
            res.json(null)
        }
    })
    router.post("/resetpassword", async (req, res) => {
        const token = jwt.sign(await collections.Users.findOne({ "email": req.body.email }), process.env.JWTSECRET, { expiresIn: 600 }),
        transporter = nm.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: "moneymattersfweb@outlook.com",
                pass: "M0n3yM@ttersfweb",
            },
        }),
        result = await transporter.sendMail({
            from: 'moneymattersfweb@outlook.com', 
            to: req.body.email,
            subject: "Reset Money Matters password",
            text: `You will be given 10min to reset your password here: http://localhost:3000/forgetpassword/${token}`,
            html: `<b>You will be given 10min to reset your password <a href='http://localhost:3000/forgetpassword/${token}'>here</a></b>`,
        });
        console.log(result)
        res.json("sent")
    })
    router.post("/parseJWT", (req, res) => res.json(jwt.verify(req.body.token, process.env.JWTSECRET)))

    //bcrpyt C, U and D user credentials
    router.post(`/users`, async (req, res) => {
        req.body.password = bcrypt.hashSync(req.body.password, bcryptSaltRounds);
        const userId = await collections.Users.insertOne(req.body)
        userId.token = jwt.sign(req.body, process.env.JWTSECRET)
        res.json(userId)
    })
    router.route(`/users/:id`).put(async (req, res) => {
        const updates = req.body
        if (updates.password) {
            updates.password = bcrypt.hashSync(updates.password, bcryptSaltRounds);
        }
        const updateRes = await collections.Users.findOneAndUpdate({"_id": ObjectId(req.params.id)}, {"$set": updates})
        updateRes.token = jwt.sign(updateRes.value, process.env.JWTSECRET)
        res.json(updateRes)
    })
    .delete(async (req, res) => {
        try {
            const deleteOptions = { userId: req.params.id }
            await collections.Transactions.deleteMany(deleteOptions)
            await collections.Feedback.deleteMany(deleteOptions)
            await collections.Users.deleteOne({ _id: ObjectId(req.params.id) })
            res.json("Success")
        }
        catch (err) {
            console.log(err)
            res.json("Failed")
        }
    })
})

module.exports = router