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
  ];

  static readonly USER_ERROR = {
    RL_1: { CODE: '001', MSG: '모든 회원 조회가 실패했습니다.' },
    C0_2: { CODE: '002', MSG: '회원 등록에 실패했습니다.' },
    U0_3: { CODE: '003', MSG: '회원 수정에 실패했습니다.' },
    RD_4: { CODE: '004', MSG: '회원 조회에 실패했습니다.' },
    D0_5: { CODE: '005', MSG: '회원 삭제에 실패했습니다.' }
  };

  static readonly AUTH_ERROR = {
    RD_1: { CODE: '001', MSG: '회원 로그인에 실패했습니다.' },
    RD_2: { CODE: '002', MSG: '회원 로그아웃에 실패했습니다.' },
  }

  // 주문관리 객체방식: key, value 
  static readonly ORDER_ERROR_DEFINE = {
    C0_1 : { CODE: '001', MSG: '주문 등록이 실패 했습니다.' },
    RL_2 : { CODE: '002', MSG: '주문 목록조회가 실패 했습니다.' },
    RD_3 : { CODE: '003', MSG: '주문 상세조회가 실패 했습니다.' },
    D0_4 : { CODE: '004', MSG: '주문 삭제가 실패 했습니다.' },
    U0_5 : { CODE: '005', MSG: '주문 업데이트가 실패 했습니다.' },
    R0_6 : { CODE: '006', MSG: '주문 단건 조회가 실패 했습니다.' },
    C1_7 : { CODE: '007', MSG: '주문 결제가 실패 했습니다.' },
  }
  // 상품관리 객체방식: key, value
  static readonly PRODUCT_ERROR_DEFINE = {
    C0_1 : { CODE: '001', MSG: '상품 등록이 실패 했습니다.' },
    RL_2 : { CODE: '002', MSG: '상품 목록조회가 실패 했습니다.' },
    RD_3 : { CODE: '003', MSG: '상품 상세조회가 실패 했습니다.' },
    D0_4 : { CODE: '004', MSG: '상품 삭제가 실패 했습니다.' },
    U0_5 : { CODE: '005', MSG: '상품 업데이트가 실패 했습니다.' },
    R0_6 : { CODE: '006', MSG: '상품 단건 조회가 실패 했습니다.' },
  }
  // 포인트관리 객체방식: key, value
  static readonly POINT_ERROR_DEFINE = {
    C0_1 : { CODE: '001', MSG: '포인트 등록이 실패 했습니다.' },
    RL_2 : { CODE: '002', MSG: '포인트 목록조회가 실패 했습니다.' },
    RD_3 : { CODE: '003', MSG: '포인트 상세조회가 실패 했습니다.' },
    D0_4 : { CODE: '004', MSG: '포인트 삭제가 실패 했습니다.' },
    U0_5 : { CODE: '005', MSG: '포인트 업데이트가 실패 했습니다.' },
    R0_6 : { CODE: '006', MSG: '포인트 단건 조회가 실패 했습니다.' },
  }

  static readonly BOARD_001_MSG = '데이터 조회가 실패했습니다.';
  static readonly BOARD_001_CODE = 'BOARD_ERROR_001';
  static readonly BOARD_ERROR = [
    {CODE: "BOARD_ERROR_001", MSG: '게시글 추가 에러'},
    {CODE: "BOARD_ERROR_002", MSG: '게시글목록 조회 에러'},
    {CODE: "BOARD_ERROR_003", MSG: '게시글 상세 조회 에러'},
    {CODE: "BOARD_ERROR_004", MSG: '게시글 삭제 에러'},
    {CODE: "BOARD_ERROR_005", MSG: '게시글 수정 에러'}
  ]

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