import { NextFunction, Request, Response } from 'express';
import userService from './UserService';
import { User } from './UserEntity';
import { CreateUserDto } from './UserDTO';
import bcrypt from 'bcrypt';


class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  
  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createUserData: User = await this.userService.createUser(req.body);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  
  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const userId: string = req.body.user_id; 
       const userData: CreateUserDto = {
         password: String(req.body.password),
       };
      const hashedPassword = await bcrypt.hash(req.body.password,10);
      req.body.password = hashedPassword;  
      const updateUserData: User = await this.userService.updateUser(userId, req.body);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
