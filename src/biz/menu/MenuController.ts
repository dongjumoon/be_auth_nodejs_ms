import { ResponseDTO } from '@/common/dto/ResponseDTO';
import { NextFunction, Request, Response } from 'express';
import { MenuDTO } from './MenuDTO';
import MenuService from './MenuService';

export default class MenuController {
  public menuService: MenuService;
  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  /**
   * 전체 매뉴조회
   * @param req
   * @param res
   * @param next
   */
  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const menulist = this.menuService.list();
      const response = ResponseDTO.successProc(menulist);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public reg = async (req: Request, res: Response, next: NextFunction) => {
    console.log("서비스 진입");
    try {
      const menuDTO = req.body as unknown as MenuDTO;
      const list = this.menuService.reg(menuDTO);
      const response = ResponseDTO.successProc(list);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}
