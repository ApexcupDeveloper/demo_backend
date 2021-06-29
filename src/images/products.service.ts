/**
 * Data Model Interfaces
 */
import { Product } from "./product.interface";
import { Products } from "./products.interface";
import ProductModel from "./products.model";

/**
 * Service Methods
 */
// export const findAll = async (): Promise<Product[]> => Object.values(products);

// export const find = async (id: number): Promise<Product> => products[id];

export const create = async (newItem: Product): Promise<Product> => {
    const product = await ProductModel.create({
        ...newItem
    })
    return product;
};

// export const remove = async (id: number): Promise<null | void> => {
//     const item = await find(id);

//     if (!item) {
//         return null;
//     }

//     delete products[id];
// };