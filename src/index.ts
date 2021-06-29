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
import { config } from './config';

dotenv.config();

/**
 * App Variables
 */

const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
	.connect(config.DB, dbConfig)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log(err))

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use("/api/v1/products", productRouter);
/**
 * Server Activation
 */
app.use((req, res) => {
	res.status(404).send({ err: 'We can not find what you are looking for' })
})

app.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port ${process.env.PORT || 5000}`);
});