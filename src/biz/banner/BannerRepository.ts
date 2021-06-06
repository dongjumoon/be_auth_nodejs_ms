import { model, Schema, Document } from 'mongoose';
import { BannerEntity } from './BannerEntity';

const BannerSchema: Schema = new Schema({
  bannerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  location: { // top, mid, bot
    type: String,
  },
  useYn: { // Y, N
    type: String,
  },
  startDate: { // 20210607010000
    type: String,
  },
  endDate: { // 20210607010000
    type: String,
  },
  title: { 
    type: String,
  },
  description: { 
    type: String,
  },
  sort: { 
    type: Number,
  },
  deployYn: { 
    type: String,
  },
});

const BannerRepository = model<BannerEntity & Document>('Banner', BannerSchema);

export default BannerRepository;
