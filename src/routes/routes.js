// layout
import { HeaderOnly } from '~/layouts';
import AdminLayout from '~/Admin/Layout/AdminLayout/AdminLayout';

// user
import Home from '~/pages/Home';
import About from '~/pages/About';
import DownApp from '~/pages/Guide/DownApp';
import Refunds from '~/pages/Guide/Refunds';
import Question from '~/pages/Guide/Questions';
import Appointment from '~/pages/Guide/Appointment';
import Facilitie from '~/pages/Facilitie';
import CheckPhone from '~/containers/auth/checkphone';
import OtpInput from '~/containers/auth/OTP';
import Login from '~/containers/auth/Login';
import Register from '~/containers/auth/Register';
import config from '~/config';

// admin
import Docter from '~/Admin/Page/Docter';
import Dashboard from '~/Admin/Page/Dashboard';
import Clinic from '~/Admin/Page/Clinic';
import User from '~/Admin/Page/Users';

// notFound
import NotFound from '~/pages/NotFound';

const publicRoutes = [
  { path: config.routers.home, component: Home },
  { path: config.routers.about, component: About },
  { path: config.routers.downApp, component: DownApp },
  { path: config.routers.refunds, component: Refunds },
  { path: config.routers.question, component: Question },
  { path: config.routers.appointment, component: Appointment },
  { path: config.routers.facilitie, component: Facilitie },
  { path: config.routers.checkPhone, component: CheckPhone, layout: HeaderOnly },
  { path: config.routers.otpInput, component: OtpInput, layout: HeaderOnly },
  { path: config.routers.login, component: Login, layout: HeaderOnly },
  { path: config.routers.RegisterAccount, component: Register, layout: HeaderOnly },

  // router Admin
  { path: config.routers.userManage, component: User, layout: AdminLayout },
  { path: config.routers.docterManage, component: Docter, layout: AdminLayout },
  { path: config.routers.dashboard, component: Dashboard, layout: AdminLayout },
  { path: config.routers.clinicManage, component: Clinic, layout: AdminLayout },

  // notFound
  { path: config.routers.notFound, component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
