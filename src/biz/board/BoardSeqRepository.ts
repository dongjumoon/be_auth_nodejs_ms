import { SeqEntity } from '@/biz/board/SeqEntity';
import { model, Schema, Document } from 'mongoose';

const SeqSchema: Schema = new Schema({
  type: {
    type: String,
  },
  val: {
    type: Number,
  },
});

const SeqRepository = model<SeqEntity & Document>('Seq', SeqSchema);

export default SeqRepository;
