import App from "@/app";
import { PointDTO } from "@/biz/point/PointDTO";
import PointRoute from "@/biz/point/PointRoute";
import { logger } from "@/common/utils/logger";
import mongoose from "mongoose";
import request from "supertest";

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe("Testing Point", () => {
  describe("[GET] /api/point", () => {
    it("response findByUserIdPoint point", async () => {
      const userId = "jinu@gmail.com";
      const pointRoute = new PointRoute();
      const point = pointRoute.PointController.pointService.pointRepository;

      point.find = jest.fn().mockReturnValue([
        {
            "tranId": "01",
            "code": 200,
            "msg": "포인트 조회 정상 처리 되었습니다.",
            "body": {},
            "error": {
              "code": 0,
              "msg": ""
            }
        },
      ])(mongoose as any).connect = jest.fn();
      const app = new App([pointRoute]);
      logger.info(`path: ${pointRoute.path}`);
      return request(app.getServer()).get(`${pointRoute.path}/${userId}`).expect(
        200,
      );
    });
  });

  describe("[PUT] /api/point/add", () => {
    it("response addUserIdPoint", async () => {
      const pointData: PointDTO = {
        "userId": "박진우@gmail.com",
        "pointId": "PT0001",
        "score": 30,
        "regDate": "2021-05-30 04:47"
      };

      const pointRoute = new PointRoute();
      const point = pointRoute.PointController.pointService.pointRepository;

      point.findOne = jest.fn().mockReturnValue(null);
      point.create = jest.fn().mockReturnValue({
        _id: "60706478aad6c9ad19a31c84",
        "userId": pointData.userId,
        "pointId": pointData.pointId,
        "score": pointData.score,
        "regDate": pointData.regDate
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([pointRoute]);
      return request(app.getServer()).put(`${pointRoute.path}/add`).send(
        pointData,
      )
        .expect(200);
    });
  });

  describe("[PUT] /api/point/use", () => {
    it("response useUserIdPoint", async () => {
      const pointData: PointDTO = {
        "userId": "박진우@gmail.com",
        "pointId": "PT0001",
        "score": 30,
        "regDate": "2021-05-30 04:47"
      };

      const pointRoute = new PointRoute();
      const point = pointRoute.PointController.pointService.pointRepository;

      point.findOne = jest.fn().mockReturnValue(null);
      point.create = jest.fn().mockReturnValue({
        _id: "60706478aad6c9ad19a31c84",
        "userId": pointData.userId,
        "pointId": pointData.pointId,
        "score": pointData.score,
        "regDate": pointData.regDate
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([pointRoute]);
      return request(app.getServer()).put(`${pointRoute.path}/use`).send(
        pointData,
      )
        .expect(200);
    });
  });


});
