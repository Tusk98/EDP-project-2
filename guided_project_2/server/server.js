import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const planetCollectionName = process.env.MONGO_DB_PLANETS;
const filmsCollectioName = process.env.MONGO_DB_FILMS;
const charactersCollectionName = process.env.MONGO_DB_CHARACTERS;


const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

// api/characters get 
app.get('/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollectionName);
        //const collection = db.collection('characters');
        const chars = await collection.find({}).toArray();

        res.json(chars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("CHARACTERS/GET NOT FOUND");
    }
});

// api/films get 
app.get('/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollectioName);
        //const collection = db.collection('films');
        const films = await collection.find({}).toArray();

        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("FILMS/GET NOT FOUND");
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
        res.status(500).send("PLANETS/GET NOT FOUND");
    }
});

// -------- APP LISTENER ---------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});