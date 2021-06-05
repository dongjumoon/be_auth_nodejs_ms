// todo: 에러문구 정의 

export class ErrorMsgConst {
  
  static readonly ORDER_001_MSG = '데이터 조회가 실패했습니다.';
  static readonly ORDER_001_CODE = 'ORDER_ERROR_001';

  static readonly PRODUCT_001 = '상품에러';

  static readonly POINT_001 = '포인트에러';

  static readonly COUPON_001 = '쿠폰에러';

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
}