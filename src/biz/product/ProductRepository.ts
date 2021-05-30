import { ProductEntity } from '@/biz/product/ProductEntity';
import { model, Schema, Document } from 'mongoose';

const Product: Schema = new Schema({
  prodId: {
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
    type: String, // tall grande, venti
  },
  sort: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  useYn: {
    type: String, // Y, N
  },
  hotIceGb: {
    type: String,
  },
  whippingYn: {
    type: String, // Y, N
  },
  shotYn: {
    type: String, // Y, N
  },
  category: {
    type: String,
  },
});

const ProducRepository = model<ProductEntity & Document>('Product', Product);

export default ProducRepository;
