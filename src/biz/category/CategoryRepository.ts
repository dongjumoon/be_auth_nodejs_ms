import { model, Schema, Document } from 'mongoose';
import { CategoryEntity } from './CategoryEntity';

const CategorySchema: Schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  codeName: {
    type: String,
  },
  type: {
    type: String,
  },
  useYn: {
    type: String,
  },
});

const CategoryRepository = model<CategoryEntity & Document>('Category', CategorySchema);

export default CategoryRepository;