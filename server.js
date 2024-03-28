const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;
require('dotenv').config();

// Import the URL from a configuration file
const { url } = require("./dbConfig");
console.log('url', url)
// Model import
const Location = require('./LocationModel');

// Middleware for parsing JSON bodies
app.use(express.json());
// Enable CORS for all routes and origins
app.use(cors());

// Establish a connection to MongoDB
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server only if the database connection is successful
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Could not connect to MongoDB', err);
    });

// Get all locations
app.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new location
app.post('/locations', async (req, res) => {
    const location = new Location({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });

    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
