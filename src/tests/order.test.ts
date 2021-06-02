import App from "@/app";
import { OrderDTO } from "@/biz/order/OrderDTO";
import OrderRoute from "@/biz/order/OrderRoute";
import mongoose from "mongoose";
import request from "supertest";

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe("Testing Order", () => {
  describe("[GET] /api/order/:userId", () => {
    it("response findByUserId order", async () => {
      const userId = "qpwoeiruty";

      const orderRoute = new OrderRoute();
      const order = orderRoute.OrderController.orderService.orderRepository;

      order.find = jest.fn().mockReturnValue([
        {
          "_id": "60b366d757953a99f6b5b07d",
          "userId": "박진우9@gmail.com",
          "productId": "OR_5278bc4ba1300524dd3fa8db8fd0a9d9",
          "startDateTime": "2021-05-30 04:47",
          "endDateTime": "-",
          "orderState": "주문입력",
          "__v": 0,
        },
      ])(mongoose as any).connect = jest.fn();
      const app = new App([orderRoute]);
      return request(app.getServer()).get(`${orderRoute.path}/${userId}`).expect(200);
    });
  });

  describe("[GET] /api/order/pay/:userId", () => {
    it("response findOne User", async () => {
      const userId = "qpwoeiruty";

      const orderRoute = new OrderRoute();
      const order = orderRoute.OrderController.orderService.orderRepository;

      order.find = jest.fn().mockReturnValue([
        {
          "_id": "60b366d757953a99f6b5b07d",
          "userId": "박진우9@gmail.com",
          "productId": "OR_5278bc4ba1300524dd3fa8db8fd0a9d9",
          "startDateTime": "2021-05-30 04:47",
          "endDateTime": "-",
          "orderState": "주문입력",
          "__v": 0,
        },
      ])(mongoose as any).connect = jest.fn();
      const app = new App([orderRoute]);
      return request(app.getServer()).get(`${orderRoute.path}/pay/${userId}`).expect(200);
    });
  });

  describe("[POST] /api/order", () => {
    it("response createOrderId", async () => {
      const orderData: OrderDTO = {
        "userId": "박진우9@gmail.com",
        "productId": "OR_5278bc4ba1300524dd3fa8db8fd0a9d9",
        "startDateTime": "2021-05-30 04:47",
        "endDateTime": "-",
        "orderState": "주문입력"
      };

      const orderRoute = new OrderRoute();
      const order = orderRoute.OrderController.orderService.orderRepository;

      order.findOne = jest.fn().mockReturnValue(null);
      order.create = jest.fn().mockReturnValue({
        _id: "60706478aad6c9ad19a31c84",
        "userId": orderData.userId,
        "productId": orderData.productId,
        "startDateTime": orderData.startDateTime,
        "endDateTime": orderData.endDateTime,
        "orderState": orderData.orderState
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([orderRoute]);
      return request(app.getServer()).post(`${orderRoute.path}`).send(orderData)
        .expect(200);
    });
  });

  
});
