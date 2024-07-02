import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const planetCollectionName = process.env.MONGO_DB_PLANETS;


const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

// api/planets get 
app.get('/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetCollectionName);
        const planet = await collection.find({}).toArray();

        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("PLANETS NOT FOUND");
    }
});

// api/planets get 
app.get('/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetCollectionName);
        const planet = await collection.find({}).toArray();

        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("PLANETS NOT FOUND");
    }
});

// api/planets get 
app.get('/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetCollectionName);
        const planet = await collection.find({}).toArray();

        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("PLANETS NOT FOUND");
    }
});

// -------- APP LISTENER ---------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});