import express from 'express';

import dotenv from 'dotenv';
import { connectDB,disconnectDB } from './config/db.js';
dotenv.config();
connectDB();
import movieRoutes from './routes/movieRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use('/movies', movieRoutes);
app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);   

});

process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close( async() => {
        await disconnectDB();
        process.exit(1);
});
    });

    process.on("uncaughtException", async (err) => {
        console.error(`Uncaught Exception: ${err.message}`);
        await disconnectDB();
        process.exit(1);
    });

    process.on("SIGTERM", async () => {
        console.log("SIGTERM received. Shutting down gracefully");
        await disconnectDB();
        process.exit(0);
    });