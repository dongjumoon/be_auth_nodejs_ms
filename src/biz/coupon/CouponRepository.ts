import { CouponEntity } from './CouponEntity';
import { model, Schema, Document } from 'mongoose';

const Coupon: Schema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },

  coupon_score: {
    type: Number,
  },
  use_date: {
    type: String,
  },
  use_yn: {
    type: Boolean,
  },
});

const CouponRepository = model<CouponEntity & Document>('Coupon', Coupon);

export default CouponRepository;
