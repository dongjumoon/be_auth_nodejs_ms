import App from "@/app";
import ProductRoute from "@/biz/product/ProductRoute";
import mongoose from "mongoose";
import request from "supertest";
import { ProductDTO } from "./../biz/product/ProductDTO";

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe("Testing Product", () => {
  describe("[GET] /api/product", () => {
    it("response findByProdAll product", async () => {
      const prodcutRoute = new ProductRoute();
      const product =
        prodcutRoute.ProductController.productService.productRepository;

      product.find = jest.fn().mockReturnValue([
        {
          "tranId": "01",
          "code": 200,
          "msg": "상품 조회 성공",
          "body": {
            "prodAll": [
              {
                "_id": "60b2b8b3b1d90828143ad49b",
                "prodId": "PD0001",
                "name": "아이스 아메리카노",
                "price": 1000,
                "volume": 100,
                "size": "L",
                "sort": "-",
                "imgUrl": "http://www.naver.com/coffe/iceam",
                "useYn": "Y",
                "hotIceGb": "I",
                "whippingYn": "Y",
                "shotYn": "Y",
                "category": "커피",
                "__v": 0,
              },
            ],
          },
          "error": {
            "code": 0,
            "msg": "",
          },
        },
      ])(mongoose as any).connect = jest.fn();
      const app = new App([prodcutRoute]);
      return request(app.getServer()).get(`${prodcutRoute.path}`).expect(200);
    });
  });

  describe("[GET] /api/product/:prodId", () => {
    it("response findByProdId product", async () => {
      const prodId = "qpwoeiruty";

      const prodcutRoute = new ProductRoute();
      const product =
        prodcutRoute.ProductController.productService.productRepository;
      product.find = jest.fn().mockReturnValue([
        {
          "tranId": "01",
          "code": 200,
          "msg": "상품 상세 조회 성공 ",
          "body": {
            "prod": {},
          },
          "error": {
            "code": 0,
            "msg": "",
          },
        },
      ])(mongoose as any).connect = jest.fn();
      const app = new App([prodcutRoute]);
      return request(app.getServer()).get(`${prodcutRoute.path}/${prodId}`)
        .expect(200);
    });
  });

  describe("[POST] /api/product", () => {
    it("response createProduct", async () => {
      const productData: ProductDTO = {
        "prodId": "PD0001",
        "name": "아이스 아메리카노",
        "price": 1000,
        "volume": 100,
        "size": "L",
        "sort": 1,
        "imgUrl": "http://www.naver.com/coffe/iceam",
        "useYn": "Y",
        "hotIceGb": "I",
        "whippingYn": "Y",
        "shotYn": "Y",
        "category": "커피",
      };

      const prodcutRoute = new ProductRoute();
      const product =
        prodcutRoute.ProductController.productService.productRepository;

      product.findOne = jest.fn().mockReturnValue(null);
      product.create = jest.fn().mockReturnValue({
        _id: "60706478aad6c9ad19a31c84",
        "prodId": productData.prodId,
        "name": productData.name,
        "price": productData.price,
        "volume": productData.volume,
        "size": productData.size,
        "sort": productData.sort,
        "imgUrl": productData.imgUrl,
        "useYn": productData.useYn,
        "hotIceGb": productData.hotIceGb,
        "whippingYn": productData.whippingYn,
        "shotYn": productData.shotYn,
        "category": productData.category,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([prodcutRoute]);
      return request(app.getServer()).post(`${prodcutRoute.path}`).send(
        productData,
      )
        .expect(200);
    });
  });
});
