import { BoardDTO } from './dto/BoardDTO';
import BoardRepository from '@/biz/board/BoardRepository';
import { logger } from '@/common/utils/logger';
import { BoardCreateDTO } from '@/biz/board/dto/BoardCreateDTO';
import { ErrorDTO, ResponseDTO } from '@/common/dto/ResponseDTO';
import getSeqAutoincrement from '@/common/helper/getSeqAutoincrement';
import { ErrorMsgConst, BOARD_ERROR_IDX } from '@/common/const/BoardErrorMsgConst';

class BoardService {
  // 의존성 주입
  private boardRepository = BoardRepository;

  public getBoardList = async () => {
    return await this.boardRepository.find();
  };

  public createBoard = async (boardCreateDTO: BoardCreateDTO) => {
    try {
      logger.info(
        `boardService::createBoard in => ${JSON.stringify(boardCreateDTO)}`,
      );
      const createResult = await this.boardRepository.create(boardCreateDTO);
      logger.info(
        `boardService::createBoard out => ${JSON.stringify(createResult)}`,
      );
      return createResult;
    } catch (e) {
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();

      // 응답코드
      response.code = "500";
      response.msg = ErrorMsgConst.BOARD_ERROR[BOARD_ERROR_IDX.C].MSG;

      const active = process.env.NODE_ENV;
      if (active !== "product") {
        // 에러코드 정의
        errorDTO.code = ErrorMsgConst.BOARD_ERROR[BOARD_ERROR_IDX.C].CODE;
        errorDTO.msg = JSON.stringify(e); // 프로젝트에서 정한 에러메세지
        response.error = errorDTO;
      } else {
        // 에러코드 정의
        errorDTO.code = ErrorMsgConst.BOARD_ERROR[BOARD_ERROR_IDX.C].MSG; // 프로젝트에서 정한 에러코드
        errorDTO.msg = ErrorMsgConst.BOARD_ERROR[BOARD_ERROR_IDX.C].MSG;
        response.error = errorDTO;
      }

      // 추적하는 유니크 아이디 = ObjectId
      response.transId = getSeqAutoincrement("createBoard");
      throw new Error(JSON.stringify(response));
    }
  };

  public updateBoard = async (boardCreateDTO: BoardCreateDTO) => {
    logger.info(
      `boardService::updateBoard in => ${JSON.stringify(boardCreateDTO)}`,
    );
    const updateResult = await this.boardRepository.updateOne(boardCreateDTO);
    logger.info(
      `boardService::updateBoard out => ${JSON.stringify(updateResult)}`,
    );
    return updateResult;
  };

  public deleteBoard = async (bno) => {
    logger.info(
      `boardService::deleteBoard in => ${bno}`,
    );
    const updateResult = await this.boardRepository.remove(bno);
    logger.info(
      `boardService::deleteBoard out => ${JSON.stringify(updateResult)}`,
    );
    return updateResult;
  };
}

export default BoardService;
