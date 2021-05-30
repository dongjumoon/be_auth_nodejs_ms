import { PointEntity } from '@/biz/point/PointEntity';
import { model, Schema, Document } from 'mongoose';

const Point: Schema = new Schema({
  pointId: {
    type: String,
    required: true,
    unique: true,
  },

  score: {
    type: Number,
  },
  regDate: {
    type: String,
  },
  userId: {
    type: String,
  },
});

const PointRepository = model<PointEntity & Document>('Point', Point);

export default PointRepository;
