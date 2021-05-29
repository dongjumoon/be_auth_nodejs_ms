import { Router } from 'express';
import UsersController from '@/biz/user/users.controller';
import { CreateUserDto } from '@/biz/user/users.dto';
import Route from '@/common/entity/routes.interface';
import validationMiddleware from '@/common/middlewares/validation.middleware';

class UsersRoute implements Route {
  public path = '/api/user';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'query'), this.usersController.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'query', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
