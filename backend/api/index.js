const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const app = express();
const multer = require('multer');
const path = require('path');
const ejs = require('ejs')
const fs = require('fs')
const chromium = require('chrome-aws-lambda')
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');



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
app.use('/uploads', express.static('uploads'));
app.use(express.json());

// Connection URI and Database Name
const uri = 'mongodb+srv://sakshishinde:59F3UEtiM1ehHmML@cluster0.jhtqsyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'SPPU';

const folderId = '1OJbtLnSal-wEwANvB0pJiWSkRhF2-oTC';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
console.log('Connecting to MongoDB...');

//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const filename = file.originalname;
        console.log(`Generated filename: ${filename}`);
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

const credentialsPath = path.join(__dirname, 'credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

// Create the Google Auth client
const authClient = new GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

// Initialize auth client and obtain access token
async function authorize() {
    const client = await authClient.getClient();
    return client;
}

async function uploadFileToDrive(filePath, fileName, folderId) {
    const auth = await authorize();
    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = {
        name: fileName,
        parents: [folderId],  // Set the parent folder ID
    };
    const media = {
        mimeType: 'application/pdf',
        body: fs.createReadStream(filePath),
    };

    try {
        const file = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id,webViewLink',
        });

        return file.data;
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error);
        throw error;
    }
}




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

app.get('/api/paper', async (req, res) => {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('MongoDB connected successfully.');

        // Access the specific database
        const db = client.db(dbName);

        // Access the specific collection (assuming the collection is named 'papers')
        const collection = db.collection('paper'); // Change the collection name if needed

        // Get the branch, year, and subject from the query parameters
        const { branch, year, subject } = req.query;
        console.log('Query Parameters:', branch, year, subject);

        // Define the filter based on branch, year, and subject
        let filter = {};
        if (branch) {
            filter.branch = branch;
        }
        if (year) {
            filter[`year.${year}`] = { $exists: true };
        }
        if (subject && year) {
            filter[`year.${year}.subject.${subject}`] = { $exists: true };
        }
        console.log('Filter:', filter);

        // Fetch papers from the collection based on the filter
        const papers = await collection.find(filter).toArray();
        console.log('Fetched Papers:', papers);

        // Prepare the response
        let response = [];
        papers.forEach(doc => {
            if (year in doc.year && subject in doc.year[year].subject) {
                const subjectPapers = doc.year[year].subject[subject];
                response.push({
                    branch: doc.branch,
                    year: year,
                    subject: subject,
                    papers: subjectPapers
                });
            }
        });
        console.log('Response:', response);

        // Return the filtered papers as JSON
        res.json(response);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    } finally {
        // Ensure the client is closed when you finish using it
        await client.close();
    }
});

app.post('/api/upload', upload.single('Notes'), async (req, res) => {
    try {

        await client.connect();
        console.log('MongoDB connected successfully.');

        // Access the specific database
        const db = client.db(dbName);

        const collection = db.collection('notes');
        const { branch, year, examination, description } = req.body;
        const file = req.file;
        

        if (!file) {
            return res.status(400).json({ message: 'File upload failed.' });
        }

        // Upload file to Google Drive in the specified folder
        const googleDriveFile = await uploadFileToDrive(file.path, file.filename, folderId);
        const fileUrl = googleDriveFile.webViewLink;

        // Store file URL in MongoDB
        const newNote = {
            branch,
            year,
            examination,
            description,
            fileUrl,
            createdAt: new Date(),
        };


        const result = await collection.insertOne(newNote);
        res.status(201).json({ insertedId: result.insertedId, ...newNote });

        // Clean up the local file
        fs.unlinkSync(file.path);
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ message: 'File upload failed.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

