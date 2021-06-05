// todo: 에러문구 정의 

/**
 * C0: Create
 * RL: Read List
 * RD: Read Detail
 * D0: Delete
 * U0: Update
 */
enum ORDER_ERROR_IDX {
  C0, RL, RD, D0, U0 
}
type CodeType = {
  CODE: string;
  MSG: string;
}
export class ErrorMsgConst {

  // 배열방식: enum + 객체 
  static readonly ORDER_ERROR: Array<CodeType> = [
    {CODE: "001", MSG: '메세지'},
    {CODE: "002", MSG: '메세지'},
    {CODE: "003", MSG: '메세지'},
    {CODE: "004", MSG: '메세지'}
  ]

  // 객체방식: key, value
  static readonly ORDER_ERROR_DEFINE = {
    C0_1 : { CODE: '001', MSG: '등록이 실패 했습니다.' },
    RL_2 : { CODE: '002', MSG: '목록조회가 실패 했습니다.' },
    RD_3 : { CODE: '003', MSG: '상세조회가 실패 했습니다.' },
    D0_4 : { CODE: '004', MSG: '삭제가 실패 했습니다.' },
    U0_5 : { CODE: '005', MSG: '업데이트가 실패 했습니다.' },
    R0_6 : { CODE: '006', MSG: '단건 조회가 실패 했습니다.' },
  }

  /**
   * 사용방법 
   */
  constructor() {
    ErrorMsgConst.ORDER_ERROR_DEFINE['CODE_C0_1']['CODE']

    ErrorMsgConst.ORDER_ERROR[ORDER_ERROR_IDX.RD]['CODE']
    ErrorMsgConst.ORDER_ERROR[ORDER_ERROR_IDX.RD]['MSG']

    ErrorMsgConst.ORDER_ERROR[ORDER_ERROR_IDX.C0]['CODE']
    ErrorMsgConst.ORDER_ERROR[ORDER_ERROR_IDX.C0]['MSG']
    
    ErrorMsgConst.ORDER_ERROR[ORDER_ERROR_IDX.U0]['CODE']
    ErrorMsgConst.ORDER_ERROR[ORDER_ERROR_IDX.U0]['MSG']
  }

}