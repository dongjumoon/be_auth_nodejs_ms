import { ProductEntity } from '@/entity/ProductEntity';
import { model, Schema, Document } from 'mongoose';

const Product: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  volume: {
    type: Number,
  },
  size: {
    type: Number, // tall grande, venti
  },
  sort: {
    type: String,
  },
  img_url: {
    type: String,
  },
  use_yn: {
    type: Boolean,
  },
  hot_ice_gb: {
    type: String,
  },
  whipping_yn: {
    type: Boolean,
  },
  shot_yn: {
    type: Boolean,
  },
  category: {
    type: String,
  },
});

const ProducRepository = model<ProductEntity & Document>('Product', Product);

export default ProducRepository;
