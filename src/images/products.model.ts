import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    url: {
        type: String,
        require: true
    },
    created: {
        type: Number,
        require: true
    }
})

const ProductModel =  mongoose.model('products', ProductSchema);
export default ProductModel;