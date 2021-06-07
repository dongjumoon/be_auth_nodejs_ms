import { CouponEntity } from './CouponEntity';
import { model, Schema, Document } from 'mongoose';

const Coupon: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  couponScore: {
    type: Number,
  },
  useDate: {
    type: String,
  },
  regDate: {
    type: String,
  },
  use_yn: {
    type: String,
  },
});

const CouponRepository = model<CouponEntity & Document>('Coupon', Coupon);

export default CouponRepository;
