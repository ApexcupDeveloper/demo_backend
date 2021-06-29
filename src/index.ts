/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { productRouter } from "./images/products.router";
import mongoose from "mongoose";
import path from "path";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT || !process.env.DB) {
    process.exit(1);
}

const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
	.connect(process.env.DB, dbConfig)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log(err))

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use("/api/v1/products", productRouter);
/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});