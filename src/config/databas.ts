import mongoose from 'mongoose';
import express from 'express';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/webshop';

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

function setupRoutes(app: express.Application) {
    //TODO: Add routes here
}

export {
    connectToMongoDB,
    setupRoutes
};