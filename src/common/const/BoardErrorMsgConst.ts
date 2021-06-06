// todo: 에러문구 정의

export enum BOARD_ERROR_IDX {
  C, RL, RD, D, U
}
export class ErrorMsgConst {
  static readonly BOARD_001_MSG = '데이터 조회가 실패했습니다.';
  static readonly BOARD_001_CODE = 'BOARD_ERROR_001';

  static readonly BOARD_ERROR = [
    {CODE: "BOARD_ERROR_001", MSG: '게시글 추가 에러'},
    {CODE: "BOARD_ERROR_002", MSG: '게시글목록 조회 에러'},
    {CODE: "BOARD_ERROR_003", MSG: '게시글 상세 조회 에러'},
    {CODE: "BOARD_ERROR_004", MSG: '게시글 삭제 에러'},
    {CODE: "BOARD_ERROR_005", MSG: '게시글 수정 에러'}
  ]
    static PRODUCT_ERROR_DEFINE: any;

}
