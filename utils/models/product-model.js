
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: { type: String },
    count: { type: String },
    price: { type: Number, },
    cratedAt: { type: Date, default: Date.now() }
});


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;