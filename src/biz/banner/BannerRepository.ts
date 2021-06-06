import { model, Schema, Document } from 'mongoose';
import { BannerEntity } from './BannerEntity';

const BannerSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
});

const BannerRepository = model<BannerEntity & Document>('Banner', BannerSchema);

export default BannerRepository;
