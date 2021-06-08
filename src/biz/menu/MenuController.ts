import { ResponseDTO } from '@/common/dto/ResponseDTO';
import { NextFunction, Request, Response } from 'express';
import { MenuDTO } from './MenuDTO';
import MenuService from './MenuService';
import { MenuEntity } from './MenuEntity';

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
  public listMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const menulist: {} | MenuEntity[] = await this.menuService.list();
      const response = ResponseDTO.successProc(menulist);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public deleteMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('dsafsdafsda');
      const menuDTO: string = req.params.id;
      console.log('menuDTOmenuDTO',menuDTO);
      const result = await this.menuService.delete(menuDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public regMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const menuDTO = req.body as unknown as MenuDTO;
      const list = await this.menuService.reg(menuDTO);
      const response = ResponseDTO.successProc(list);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public editMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const menuDTO = req.body as unknown as MenuDTO;
      const result = this.menuService.edit(menuDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}
