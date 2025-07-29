
import dotenv from 'dotenv';
 dotenv.config();

import express, { Request, Response } from 'express';

import pool from './config/db'; 
import session from 'express-session';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRouter';
import './config/passport'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';


 // Importera produktens router

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

app.use(cookieParser());
app.use(compression());
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Test av databasanslutning
(async () => {
    try {
       
        await pool.query('SELECT 1'); 
        console.log('Database connected successfully');
       
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Om anslutningen misslyckas, stäng av servern
    }
})();

// API-rutter - kolla av databasanslutningen
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to WildSoul backend!');
});


app.use('/auth', authRoutes);


// Starta servern
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
