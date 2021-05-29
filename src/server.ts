process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import ApiRoute from '@routes/api.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import OrderRoute from './routes/OrderRoute';
import ProductRoute from './routes/ProductRoute';
import CouponRoute from './routes/CouponRoute';
import PointRoute from './routes/PointRoute';

validateEnv();
const Routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ApiRoute(),

  // 상품, 주문, 포인트, 쿠폰
  new OrderRoute(),
  new ProductRoute(),
  new PointRoute(),
  new CouponRoute(),
];

const app = new App(Routes);

app.listen();
