// todo: 에러문구 정의 
export class ResponseMsgConst {

    // httpCode: 400, 500, 200 
    // 200: 정상처리 되었습니다.
    // 401: 입력이 잘못 되었습니다.
    // 500: 서버 오류 입니다. 
    static readonly RESP_2XX = {CODE: '200', MSG: '정상 처리 되었습니다.'};
    static readonly RESP_4XX = {CODE: '400', MSG: '입력값이 잘못 되었습니다.'};
    static readonly RESP_5XX = {CODE: '500', MSG: '서버 처리시 오류가 발생 되었습니다.'};

  
  }