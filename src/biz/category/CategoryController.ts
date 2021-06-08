import { ResponseDTO } from "@/common/dto/ResponseDTO";
import { NextFunction, Request, Response } from "express";
import { CategoryDTO } from "./CategoryDTO";
import CategoryRepository from "./CategoryRepository";
import CategoryService from "./CategoryService";

export default class CategoryController {
  public categoryService: CategoryService;
  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }
  /**
   * 카테고리 타입별 조회 
   * @param req 
   * @param res 
   * @param next 
   */
  public listByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const type = req.params.type;
      const result = this.categoryService.listByType(type);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }
  /**
   * 카테고리 상세조회 
   * @param req 
   * @param res 
   * @param next 
   */
  public detailByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = req.params.code;
      const result = this.categoryService.detailByCode(code);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }
  /**
   * 카테고리 등록 
   * @param req 
   * @param res 
   * @param next 
   */
  public regCate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryDTO = req.body as unknown as CategoryDTO;
      const result = await this.categoryService.reg(categoryDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }
  /**
   * 카테고리 수정
   * @param req 
   * @param res 
   * @param next 
   */
  public editCate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryDTO = req.body as unknown as CategoryDTO;
      const result = await this.categoryService.edit(categoryDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }
  /**
   * 카테고리 논리삭제 
   * @param req 
   * @param res 
   * @param next 
   */
  public removeCate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryDTO = req.body as unknown as CategoryDTO;
      const result = await this.categoryService.remove(categoryDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }
  /**
   * 카테고리 물리삭제 
   * @param req 
   * @param res 
   * @param next 
   */
  public deleteCate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryDTO = req.body as unknown as CategoryDTO;
      const result = await this.categoryService.delete(categoryDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }
}