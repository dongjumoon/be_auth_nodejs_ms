export interface OrderEntity {
  _id?: string;
  userId: string;
  productId?: string;
  startDateTime?: string;
  endDateTime?: string;
  orderState?: string; // 결제취소, 결제완료, 주문처리, 음료픽업
}
