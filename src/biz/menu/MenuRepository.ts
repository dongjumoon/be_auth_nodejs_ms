import { model, Schema, Document } from 'mongoose';
import { MenuEntity } from './MenuEntity';

const menuSchema: Schema = new Schema({
  menuId: {
    type: String,
    required: true,
    unique: true,
  },
  menuName: {
    type: String,
  },
  useYn: {
    type: String,
  },
  menuCheck: {
    type: String,
  },
});

const MenuRepository = model<MenuEntity & Document>('Menu', menuSchema);

export default MenuRepository;
