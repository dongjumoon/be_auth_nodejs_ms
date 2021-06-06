import { OrderEntity } from '@/biz/order/OrderEntity';
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
    // start_date_time
    type: String,
  },
  endDateTime: {
    type: String, // tall grande, venti
  },
  orderState: {
    // 주문입력|결재완료|픽업완료|주문취소
    type: String,
  },
});

const OrderRepository = model<OrderEntity & Document>('Order', OrderSchema);

export default OrderRepository;
