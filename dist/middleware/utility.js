"use strict";
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
exports.resizeImage = exports.getImageSize = void 0;
const sharp_1 = __importDefault(require("sharp"));
const getImageSize = (image) => __awaiter(void 0, void 0, void 0, function* () {
    let tempImage = 'tempImage.png';
    const response = yield sharp_1.default(image).resize().toFile(tempImage)
        .then((res) => {
        return res;
    }).catch((err) => {
        return err;
    });
    return {
        width: response.width,
        height: response.height
    };
});
exports.getImageSize = getImageSize;
const resizeImage = (image, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    let tempImage = 'tempImage.png';
    const response = yield sharp_1.default(image).resize(width, height, {
        fit: 'fill'
    }).toFile(tempImage)
        .then((res) => {
        return res;
    }).catch((err) => {
        return err;
    });
    return response;
});
exports.resizeImage = resizeImage;
//# sourceMappingURL=utility.js.map