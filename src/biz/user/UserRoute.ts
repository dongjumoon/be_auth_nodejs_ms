import { Router } from 'express';
import { CreateUserDto } from '@/biz/user/UserDTO';
import Route from '@/common/entity/routes.interface';
import validationMiddleware from '@/common/middlewares/validation.middleware';
import UsersController from './UserController';

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
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);

    // TODO: 친구관리 

    // TODO: 그룹관리 

  }
}

export default UsersRoute;
