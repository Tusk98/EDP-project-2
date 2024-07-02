import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const planetCollectionName = process.env.MONGO_DB_PLANETS;
const filmsCollectionName = process.env.MONGO_DB_FILMS;
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
        const collection = db.collection(filmsCollectionName); 
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

// api/characters/id
app.get('/characters/:id', async (req, res) => {
    try {
        const character_id = parseInt(req.params.id);
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollectionName);
        const chars = await collection.find({id: character_id}).toArray();
       

        res.json(chars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("CHARACTERS/ID/GET NOT FOUND");
    }
});

// api/films/id
app.get('/films/:id', async (req, res) => {
    try {
        const film_id = parseInt(req.params.id);
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollectioName);
        const chars = await collection.find({id: film_id}).toArray();
       

        res.json(chars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("FILMS/ID/GET NOT FOUND");
    }
});

// api/planet/id
app.get('/planets/:id', async (req, res) => {
    try {
        const planet_id = parseInt(req.params.id);
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetCollectionName);
        const chars = await collection.find({id: planet_id}).toArray();
       

        res.json(chars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("PLANETS/ID/GET NOT FOUND");
    }
});

// films/:id/characters
app.get('/films/:id/characters', async (req, res) => {
    try {
        const filmId = parseInt(req.params.id); 
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollectionName);

        // Check if the film ID exists 
        const film = await collection.find({id: filmId}).toArray();
        if (!film) { 
            return res.status(404).send('FILM NOT FOUND - films/:id/characters');
        }

        const charactersIds = await db.collection('films_characters').find({film_id : filmId}).toArray(); // Query 'film_characters' collection for array of IDs 
        const idSearch = charactersIds.map(item => item.character_id);          // Turn JSON into just array of character IDs 
        const characters = await db.collection(charactersCollectionName).find({id: {$in: idSearch}}).toArray();  // Query into 'characters' collection with array of IDs

        const result = characters; 
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("FILMS/:ID/CHARACTERS NOT FOUND");
    }
});

// films/:id/planets
app.get('/films/:id/planets', async (req, res) => {
    try {
        const filmId = parseInt(req.params.id); 
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollectionName);

        // Check if the film ID exists 
        const film = await collection.find({id: filmId}).toArray();
        if (!film) { 
            return res.status(404).send('FILM NOT FOUND - films/:id/planets');
        }

        const planetIds = await db.collection('films_planets').find({film_id : filmId}).toArray(); // Query 'film_characters' collection for array of IDs 
        const idSearch = planetIds.map(item => item.planet_id);          // Turn JSON into just array of character IDs 
        const planets = await db.collection(planetCollectionName).find({id: {$in: idSearch}}).toArray();  // Query into 'characters' collection with array of IDs

        const result = planets; 
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("FILMS/:ID/PLANETS NOT FOUND");
    }
});

// -------- APP LISTENER ---------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});