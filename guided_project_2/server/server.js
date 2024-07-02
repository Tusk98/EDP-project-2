import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const planetCollectionName = process.env.MONG_DB_PLANETS;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

// Endpoint to read and send JSON file content
app.get('/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetCollectionName);
        //const socks = await collection.find({}).toArray();
        const planet = {id: "test object", name: "generic planet"}

        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("PLANETS NO FOUND");
    }
});

// -------- APP LISTENER ---------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});