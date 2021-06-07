import BoardRoute from '@/biz/board/BoardRoute';

process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@/common/routes/index.route';
import validateEnv from '@/common/utils/validateEnv';
import OrderRoute from './biz/order/OrderRoute';
import ProductRoute from './biz/product/ProductRoute';
import CouponRoute from './biz/coupon/CouponRoute';
import PointRoute from './biz/point/PointRoute';
import UsersRoute from './biz/user/UserRoute';
import AuthRoute from './biz/auth/AuthRoute';
import BannerRoute from './biz/banner/BannerRoute';

validateEnv();
const Routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),

  // 상품, 주문, 포인트, 쿠폰, 게시판
  new OrderRoute(),
  new ProductRoute(),
  new PointRoute(),
  new CouponRoute(),
  new BoardRoute(),
  new BannerRoute(),
  new CouponRoute(),
];
const app = new App(Routes);

app.listen();
