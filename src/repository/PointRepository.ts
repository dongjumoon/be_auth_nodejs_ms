import { PointEntity } from '@/entity/PointEntity';
import { model, Schema, Document } from 'mongoose';

const Point: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  score: {
    type: Number,
  },
  reg_date: {
    type: String,
  },
  user_id: {
    type: String,
  },
});

const PointRepository = model<PointEntity & Document>('Point', Point);

export default PointRepository;
