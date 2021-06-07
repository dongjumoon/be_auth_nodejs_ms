import { ResponseDTO } from "@/common/dto/ResponseDTO";
import { NextFunction, Request, Response } from "express";
import { BannerDTO } from "./BannerDTO";
import BannerService from "./BannerService";

export default class BannerController {
  public bannerService: BannerService;
  constructor(bannerService: BannerService) {
    this.bannerService = bannerService;
  }

  /**
   * 배너 목록보기
   * @param req 
   * @param res 
   * @param next 
   */
  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startDate = req.params.startDate;
      const bannerDTO = new BannerDTO();
      bannerDTO.startDate = startDate;
      const list = this.bannerService.list(bannerDTO);
      const response = ResponseDTO.successProc(list);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }; 
  /**
   * 배너 상세보기
   * @param req 
   * @param res 
   * @param next 
   */
  public detail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bannerId = req.params.bannerId;
      const bannerDTO = new BannerDTO();
      bannerDTO.bannerId = bannerId;
      const result = this.bannerService.detail(new BannerDTO());
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }; 
  /**
   * 배너 등록하기
   * @param req 
   * @param res 
   * @param next 
   */
  public reg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bannerDTO = req.body as unknown as BannerDTO;
      const result = this.bannerService.reg(bannerDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }; 
  /**
   * 배너 수정하기 
   * @param req 
   * @param res 
   * @param next 
   */
  public edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bannerDTO = req.body as unknown as BannerDTO;
      const result = this.bannerService.edit(bannerDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }; 
  /**
   * 배너 삭제하기
   * @param req 
   * @param res 
   * @param next 
   */
  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bannerDTO = req.body as unknown as BannerDTO;
      const result = this.bannerService.remove(bannerDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }; 
  /**
   * 배너 배포하기 
   * @param req 
   * @param res 
   * @param next 
   */
  public deploy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bannerDTO = req.body as unknown as BannerDTO;
      const result = this.bannerService.deploy(bannerDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  };
  /**
   * 배너 배포취소하기
   * @param req 
   * @param res 
   * @param next 
   */ 
  public cancelDeploy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bannerDTO = req.body as unknown as BannerDTO;
      const result = this.bannerService.cancelDeploy(bannerDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }; 
}
