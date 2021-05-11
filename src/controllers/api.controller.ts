import { NextFunction, Request, Response } from 'express';

class ApiController {
  public api = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ data: 'test', message: 'jinu' });
    } catch (error) {
      next(error);
    }
  };
}

export default ApiController;
