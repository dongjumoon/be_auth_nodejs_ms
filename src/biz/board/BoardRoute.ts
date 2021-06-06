import { Router } from 'express';
import Route from '@/common/entity/routes.interface';
import BoardController from '@/biz/board/BoardController';
import BoardService from '@/biz/board/BoardService';

class BoardRoute implements Route {
  public path = '/api/board';
  public router = Router();
  public BoardController = new BoardController(new BoardService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.BoardController.getBoardList); // 게시글 목록
    this.router.get(`${this.path}/paging`, this.BoardController.getBoardSearchList); // 게시글 페이징 목록
    this.router.get(`${this.path}/detail`, this.BoardController.getBoardDetail); // 게시글 상세목록
    this.router.post(`${this.path}`, this.BoardController.createBoard); // 게시글 작성
    this.router.put(`${this.path}`, this.BoardController.updateBoard); // 게시글 수정
    this.router.delete(`${this.path}/:bno`, this.BoardController.deleteBoard); // 게시글 수정
  }
}

export default BoardRoute;
