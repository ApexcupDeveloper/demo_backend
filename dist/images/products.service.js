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
exports.create = void 0;
const products_model_1 = __importDefault(require("./products.model"));
/**
 * Service Methods
 */
// export const findAll = async (): Promise<Product[]> => Object.values(products);
// export const find = async (id: number): Promise<Product> => products[id];
const create = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.default.create(Object.assign({}, newItem));
    return product;
});
exports.create = create;
// export const remove = async (id: number): Promise<null | void> => {
//     const item = await find(id);
//     if (!item) {
//         return null;
//     }
//     delete products[id];
// };
//# sourceMappingURL=products.service.js.map