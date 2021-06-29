"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductSchema = new Schema({
    url: {
        type: String,
        require: true
    },
    created: {
        type: Number,
        require: true
    }
});
const ProductModel = mongoose_1.default.model('products', ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=products.model.js.map