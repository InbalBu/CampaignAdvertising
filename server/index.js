import express from 'express';
import mysql from "mysql";
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json()); //allows to send JSON file
app.use(cors());

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


app.listen(8800, () => {
    console.log("Connected to server");
});

app.get("/", (req, res) => {
    res.json("hello from backend")
});

// get all campaigns from db
app.get("/campaigns", (req, res) => {
    const q = "SELECT * FROM campaigns"
    db.query(q,(error,data) => {
        if(error) return res.json(error)
        return res.json(data)
    })
});

// create campaigns from server to db
app.post("/campaigns", (req,res) => {
    const q = "INSERT INTO campaigns (`name`, `platform`, `image`, `landingpage`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.platform,
        req.body.image,
        req.body.landingpage
    ]
    db.query(q,[values], (error,data) => {
        if(error) return res.send(error)
        return res.json(data)
    })
})

// edit campaign
app.put("/campaigns/:id", (req, res) => {
    const campaignId = req.params.id;
    const q = "UPDATE campaigns SET `name` = ?, `platform` = ?, `image` = ?, `landingpage` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.platform,
        req.body.image,
        req.body.landingpage
    ]

    db.query(q, [...values, campaignId], (error, data) => {
        if(error) return res.send(error);
        return res.json(data);
    })
})

// get item by id
app.get("/campaigns/:id", (req,res) => {
    const campaignId = req.params.id;
    const q = "SELECT * FROM campaigns WHERE id = ?";

    db.query(q, [campaignId], (error, data) => {
        if(error) return res.send(error);
        return res.json(data);
    })
})


