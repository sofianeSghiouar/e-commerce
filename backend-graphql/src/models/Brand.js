import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: String,
  description: String,
  categories: [
    {
      name: String,
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        }
      ]
    }
  ]
});

export default mongoose.model('brands', brandSchema);
