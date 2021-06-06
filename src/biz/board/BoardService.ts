import BoardRepository from '@/biz/board/BoardRepository';
import { logger } from '@/common/utils/logger';
import { BoardCreateDTO } from '@/biz/board/dto/BoardCreateDTO';
import { board } from '@/common/utils/util';
import { BoardSearchDTO } from '@/biz/board/dto/BoardSearchDTO';

class BoardService {
  // 의존성 주입
  private boardRepository = BoardRepository;

  public getBoardList = async () => {
    let result;
    try {
      result = await this.boardRepository.find();
    } catch (e) {
      logger.error('boardService::getBoardList exception => ', e);
      return null;
    }
    logger.info(
      `boardService::getBoardList out => ${JSON.stringify(result)}`,
    );
    return result;
  };

  public getBoardSearchList = async (boardSearchDTO: BoardSearchDTO) => {
    let result;
    try {
      boardSearchDTO = board.getSearchOption(boardSearchDTO);

      result = await this.boardRepository
        .find(boardSearchDTO.keyword)
        .sort(boardSearchDTO.sort)
        .skip(boardSearchDTO.offset)
        .limit(boardSearchDTO.max);
    } catch (e) {
      logger.error('boardService::getBoardSearchList exception => ', e);
      return null;
    }
    logger.info(
      `boardService::getBoardSearchList out => ${JSON.stringify(result)}`,
    );
    return result;
  };

  public getBoardDetail = async (bno) => {
    let result;
    try {
      result = await this.boardRepository.findOne(bno);
    } catch (e) {
      logger.error('boardService::getBoardDetail exception => ', e);
      return null;
    }
    logger.info(
      `boardService::getBoardDetail out => ${JSON.stringify(result)}`,
    );
    return result;
  };

  public createBoard = async (boardCreateDTO: BoardCreateDTO) => {
    logger.info(
      `boardService::createBoard in => ${JSON.stringify(boardCreateDTO)}`,
    );
    let createResult = new BoardCreateDTO();
    try {
      boardCreateDTO = board.createBoard(boardCreateDTO);
      createResult = await this.boardRepository.create(boardCreateDTO);
    } catch (e) {
      logger.error('boardService::createBoard exception => ', e);
      return null;
    }
    logger.info(
      `boardService::createBoard out => ${JSON.stringify(createResult)}`,
    );
    return createResult;
  };

  public updateBoard = async (boardCreateDTO: BoardCreateDTO) => {
    logger.info(
      `boardService::updateBoard in => ${JSON.stringify(boardCreateDTO)}`,
    );
    let updateResult;
    try {
      boardCreateDTO = board.updateBoard(boardCreateDTO);
      updateResult = await this.boardRepository.updateOne({ bno: boardCreateDTO.bno }, boardCreateDTO);
    } catch (e) {
      logger.error('boardService::updateBoard exception => ', e);
      return null;
    }
    logger.info(
      `boardService::updateBoard out => ${JSON.stringify(updateResult)}`,
    );
    return updateResult;
  };

  public deleteBoard = async (bno) => {
    logger.info(
      `boardService::deleteBoard in => ${bno}`,
    );
    let deleteResult;
    try {
      deleteResult = await this.boardRepository.remove({bno: bno});
    } catch (e) {
      logger.error('boardService::deleteBoard exception => ', e);
      return null;
    }
    logger.info(
      `boardService::deleteBoard out => ${JSON.stringify(deleteResult)}`,
    );
    return deleteResult;
  };
}

export default BoardService;
