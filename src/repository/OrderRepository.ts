import { OrderEntity } from '@/entity/OrderEntity';
import { model, Schema, Document } from 'mongoose';

// 몽고디비 스키마 정의 : OrderEntity 인터페이스와 변수명이 같아야 한다.
const OrderSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  productId: {
    type: String,
  },
  startDateTime: {
    type: String,
  },
  endDateTime: {
    type: String, // tall grande, venti
  },
  orderDate: {
    type: String,
  },
});

const OrderRepository = model<OrderEntity & Document>('Order', OrderSchema);

// const me = new OrderRepository({
//   userId: 'testman',
//   productId: 'PRD1234',
//   startDateTime: '20201201',
//   endDateTime: '20201202',
//   orderDate: '20201203',
// });
// me.save();

export default OrderRepository;
