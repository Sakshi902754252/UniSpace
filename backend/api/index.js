const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const app = express();
const puppeteer = require('puppeteer-core')
const ejs = require('ejs')
const fs = require('fs')
const chromium = require('chrome-aws-lambda')

const PORT = 3000;

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],

    allowedHeaders: '*'
};

app.use(cors(corsOpts));

app.use(express.json());

// Connection URI and Database Name
const uri = 'mongodb+srv://sakshishinde:59F3UEtiM1ehHmML@cluster0.jhtqsyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'SPPU';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
console.log('Connecting to MongoDB...');


///////////////////////////////////////////////////////////////// Filter apis ////////////////////////////////////////////////////////////


app.get('/api/books', async (req, res) => {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('MongoDB connected successfully.');


        // Access the specific database
        const db = client.db(dbName); // Replace 'your_database_name' with your actual database name

        // Access the specific collection (assuming the collection is named 'books')
        const collection = db.collection('books');

        // Get the branch and year from the query parameters
        const { branch, year } = req.query;

        // Define the filter based on branch and year
        let filter = {};
        if (branch && year) {
            filter = { branch: branch, [`year.${year}`]: { $exists: true } };
        } else if (branch) {
            filter = { branch: branch };
        } else if (year) {
            filter = { [`year.${year}`]: { $exists: true } };
        }

        // Fetch books from the collection based on the filter
        const books = await collection.find(filter).toArray();

        // Return the filtered books as JSON
        res.json(books);

    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        // Ensure the client is closed when you finish using it
        await client.close();
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

