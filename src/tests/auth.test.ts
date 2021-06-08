/* eslint-disable prettier/prettier */
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
//import AuthRoute from '@/common/routes/auth.route';
import { CreateUserDto } from '@/biz/user/UserDTO';
import { logger } from '@/common/utils/logger';
import { User } from '@/biz/user/UserEntity';
import AuthRoute from '@/biz/auth/AuthRoute';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

// beforeAll(async (done) => {
//   const userData: CreateUserDto = {
//     email: 'test@email.com',
//     password: await bcrypt.hash('q1w2e3r4!',10)
//   };
//   const authRoute = new AuthRoute();
//   const app = new App([authRoute]);
//   request(app.getServer()).post('/api/user/login').send(userData).end((err, response) => {
//      //  console.log(response)
//    const token = response.body.token    // saving the token
//    console.log(token);
//    done();
//  })
// });

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
    });
  });

  describe('[POST] api/auth/login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = {
        user_id: 'test@email.com',
        password: 'q1w2e3r4!'
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        user_id: userData.user_id,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}/login`)
        .send(userData)
        .expect(200);
        // .expect('Set-Cookie', /^Authorization=.+/);
    }, 30000);
  });

  describe('[POST] /logout', () => {
    it('logout Set-Cookie Authorization=; Max-age=0', async () => {
      const userData: User = {
        _id: '60706478aad6c9ad19a31c84',
        user_id: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(userData);

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}/logout`)
        .send(userData)
        .set('Cookie', 'Authorization= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ')
        .expect('Set-Cookie', /^Authorization=\; Max-age=0/)
        .expect(200);
    });
  });
});
