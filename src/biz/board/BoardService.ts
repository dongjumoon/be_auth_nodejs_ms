import BoardRepository from '@/biz/board/BoardRepository';
import SeqRepository from '@/biz/board/BoardSeqRepository';
import { logger } from '@/common/utils/logger';
import { BoardCreateDTO } from '@/biz/board/dto/BoardCreateDTO';
import { board } from '@/common/utils/util';
import { BoardSearchDTO } from '@/biz/board/dto/BoardSearchDTO';
import mongoose, { startSession } from 'mongoose';

class BoardService {
  // 의존성 주입
  private boardRepository = BoardRepository;
  private seqRepository = SeqRepository;

  public getBoardList = async () => {
    let result;
    try {
      result = await this.boardRepository.find().limit(board.MAX_QUERY);
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
      result = await this.boardRepository.findOne({ bno });
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
    const session = await startSession();

    let createResult = new BoardCreateDTO();
    try {
      session.startTransaction();
      // 시퀀스 생성.
      let boardSeq = await this.seqRepository.findOneAndUpdate(
        {type: "board"},
        {$inc: {val: 1}},
        {new: true}
      )

      let boardId = 'BD'
      // 4자리 만들기.
      if (boardSeq.val > 999) {
        boardId = boardId + boardSeq.val
      } else if (boardSeq.val > 99) {
        boardId = boardId + '0' + boardSeq.val
      } else if (boardSeq.val > 9) {
        boardId = boardId + '00' + boardSeq.val
      } else {
        boardId = boardId + '000' + boardSeq.val
      }

      boardCreateDTO.bno = boardId
      boardCreateDTO = board.createBoard(boardCreateDTO);
      createResult = await this.boardRepository.create(boardCreateDTO);

      session.endSession();
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
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
    const session = await startSession();
    let updateResult;
    try {
      session.startTransaction();

      boardCreateDTO = board.updateBoard(boardCreateDTO);
      updateResult = await this.boardRepository.updateOne({ bno: boardCreateDTO.bno }, boardCreateDTO);

      session.endSession();
      // 존재하지 않는 게시글(bno)을 수정 요청할 시
      if (updateResult.nModified === 0) return null;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
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
    const session = await startSession();
    let deleteResult;
    try {
      session.startTransaction();

      deleteResult = await this.boardRepository.remove({ bno });

      session.endSession();
      // 존재하지 않는 게시글(bno) 삭제할 시
      if (deleteResult.deletedCount === 0) return null;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
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
