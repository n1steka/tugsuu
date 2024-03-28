
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: { type: String },
    count: { type: String },
    price: { type: Number, },
});


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;