/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ProductService from "./products.service";
import { Product } from "./product.interface";
import mergeImages from 'merge-images';
import { Canvas, Image } from "canvas";
import fs from 'fs';
import upload from "../middleware/multer";
import { resizeImage, getImageSize } from "../middleware/utility";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
const singleUpload = upload.single('image')

/**
 * Router Definition
 */
export const productRouter = express.Router();
/**
 * Controller Definitions
 */

// GET items

// productRouter.get("/", async (req: Request, res: Response) => {
//     try {
//         const items: Product[] = await ProductService.findAll();

//         res.status(200).send(items);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

// GET items/:id

// productRouter.get("/:id", async (req: Request, res: Response) => {
//     const id: number = parseInt(req.params.id, 10);

//     try {
//         const item: Product = await ProductService.find(id);

//         if (item) {
//             return res.status(200).send(item);
//         }

//         res.status(404).send("item not found");
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

// POST items

// productRouter.post("/", async (req: Request, res: Response) => {
//     try {
//         const item: BaseProduct = req.body;

//         const newItem = await ProductService.create(item);

//         res.status(201).json(newItem);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

// DELETE items/:id

// productRouter.delete("/:id", async (req: Request, res: Response) => {
//     try {
//         const id: number = parseInt(req.params.id, 10);
//         await ProductService.remove(id);

//         res.sendStatus(204);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

// UPLOAD image
productRouter.post("/upload", async (req: Request, res: Response) => {
    try {
        singleUpload(req, res, async function (err) {
            if (err) {
                res.status(500).send(err.message)
            }
            const frameImage: string = path.join(__dirname, './gold-frame.png')
            const bodyImage: string = req.file?.path || '';
            const size = await getImageSize(bodyImage)
            await resizeImage(frameImage, size.width, size.height)
            const resizedFrame: string = path.join(__dirname, '../../tempImage.png')

            mergeImages([
                { src: bodyImage },
                { src: resizedFrame },
            ], {
                Canvas: Canvas,
                Image: Image
            })
                .then(b64 => {
                    let base64Image = b64.split(';base64,').pop() || '';
                    let uuid = uuidv4()
                    fs.writeFile(path.join(__dirname, `../uploads/${uuid}.png`), base64Image, { encoding: 'base64' }, async function (err) {
                        if (err) {
                            res.status(500).send(err.message)
                        }
                        console.log(`Image saved - ${uuid}.png`);
                        const newItem = await ProductService.create({
                            url: `${uuid}.png`,
                            created: new Date().getTime()
                        });
                        res.status(200).json(newItem);
                    });
                }).catch(error => {
                    res.status(500).send(error.message)
                });
        })

    } catch (e) {
        res.status(500).send(e.message);
    }
})