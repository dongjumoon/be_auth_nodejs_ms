// todo: 에러문구 정의 
export class ErrorMsgConst {
  static readonly ORDER_001_MSG = '데이터 조회가 실패했습니다.';
  static readonly ORDER_001_CODE = 'ORDER_ERROR_001';

  static readonly ORDER_ERROR = [
    {CODE: 1, MSG: '메세지'},
    {CODE: 2, MSG: '메세지'},
    {CODE: 3, MSG: '메세지'},
    {CODE: 4, MSG: '메세지'}
  ]

  constructor() {
    ErrorMsgConst.ORDER_ERROR[0]['CODE']
    ErrorMsgConst.ORDER_ERROR[0]['MSG']

    ErrorMsgConst.ORDER_ERROR[1]['CODE']
    ErrorMsgConst.ORDER_ERROR[1]['MSG']
    
    ErrorMsgConst.ORDER_ERROR[2]['CODE']
    ErrorMsgConst.ORDER_ERROR[2]['MSG']
  }


  static readonly PRODUCT_001 = '상품에러';
  
  static readonly POINT_001 = '포인트에러';
  
  static readonly COUPON_001 = '쿠폰에러';
}