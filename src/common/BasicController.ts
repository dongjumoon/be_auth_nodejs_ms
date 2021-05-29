import { NextFunction, Request, Response } from 'express';

class BasicController {
  private auth = () => {
    // todo: 접근권한
    throw Error('auth Error');
  };
  private checkEscapeUrl = () => {
    // todo: url escapeeCheck 체크
    throw Error('check Escape Error');
  };
}

export default BasicController;
