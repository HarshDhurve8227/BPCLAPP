import express from 'express';
import { dbCon } from './utils/db.js'; // Import only dbCon
import dotenv from 'dotenv';
import cors from 'cors';
import routers from './routes/routes.js';
import authrouter from './routes/Authroutes.js';
import path from 'path';

dotenv.config();
const app = express();

// Initialize the database
const initializeDatabases = async () => {
    try {
        await dbCon(); // Only initialize the primary database
    } catch (error) {
        console.error('Error initializing the database:', error.message);
        process.exit(1); // Exit process if db connection fails
    }
};

initializeDatabases();

app.use(express.json());
app.use(cors());
app.use('/api', routers);
app.use('/api/auth', authrouter);

const PORT = process.env.PORT || 4000;

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('client', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve('client', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
