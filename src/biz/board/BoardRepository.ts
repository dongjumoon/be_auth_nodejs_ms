import { BoardEntity } from '@/biz/board/BoardEntity';
import { model, Schema, Document } from 'mongoose';

const BoardSchema: Schema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  uploadFileId: {
    type: String,
  },
  noticeYn: {
    type: Boolean,
  },
  type: {
    type: String,
  },
  popupYn: {
    type: Boolean,
  },
  useYn: {
    type: Boolean,
  },
  regDate: {
    type: String,
  },
  regWriter: {
    type: String,
  },
  modifyDate: {
    type: String,
  },
  modifyWriter: {
    type: String,
  },
  delDate: {
    type: String,
  },
  delWriter: {
    type: String,
  },
  likeAction: {
    type: Number,
  },
  dislikeAction: {
    type: Number,
  },
  hideYn: {
    type: Boolean,
  },
  bno: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
});

const BoardRepository = model<BoardEntity & Document>('Board', BoardSchema);

export default BoardRepository;
