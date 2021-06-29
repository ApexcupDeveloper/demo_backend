"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
/**
 * Required External Modules and Interfaces
 */
const express_1 = __importDefault(require("express"));
const ProductService = __importStar(require("./products.service"));
const merge_images_1 = __importDefault(require("merge-images"));
const canvas_1 = require("canvas");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("../middleware/multer"));
const utility_1 = require("../middleware/utility");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const singleUpload = multer_1.default.single('image');
/**
 * Router Definition
 */
exports.productRouter = express_1.default.Router();
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
exports.productRouter.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        singleUpload(req, res, function (err) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(500).send(err.message);
                }
                const frameImage = path_1.default.join(__dirname, './gold-frame.png');
                const bodyImage = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || '';
                const size = yield utility_1.getImageSize(bodyImage);
                yield utility_1.resizeImage(frameImage, size.width, size.height);
                const resizedFrame = path_1.default.join(__dirname, '../../tempImage.png');
                merge_images_1.default([
                    { src: bodyImage },
                    { src: resizedFrame },
                ], {
                    Canvas: canvas_1.Canvas,
                    Image: canvas_1.Image
                })
                    .then(b64 => {
                    let base64Image = b64.split(';base64,').pop() || '';
                    let uuid = uuid_1.v4();
                    fs_1.default.writeFile(path_1.default.join(__dirname, `../uploads/${uuid}.png`), base64Image, { encoding: 'base64' }, function (err) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                res.status(500).send(err.message);
                            }
                            console.log(`Image saved - ${uuid}.png`);
                            const newItem = yield ProductService.create({
                                url: `${uuid}.png`,
                                created: new Date().getTime()
                            });
                            res.status(200).json(newItem);
                        });
                    });
                }).catch(error => {
                    res.status(500).send(error.message);
                });
            });
        });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//# sourceMappingURL=products.router.js.map