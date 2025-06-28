import exp from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sellerApp from './APIs/sellerApp.js';
import productApp from './APIs/productApp.js';
import cors from 'cors';


dotenv.config();


const app = exp();
const port = process.env.PORT || 3000;
const dbURL = process.env.DB_URL

app.use(exp.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://vendora-6sar.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));



mongoose.connect(dbURL)
.then(() => {
    console.log('Connected to database')
    app.listen(port,()=>console.log(`Server is running on http://localhost:${port}`));
})
.catch(err => console.log('MongoDB connection error:', err.message));

app.use("/seller-api",sellerApp)
app.use("/product-api",productApp)