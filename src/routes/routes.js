import Home from '~/pages/Home';
import About from '~/pages/About';
import DownApp from '~/pages/Guide/DownApp';
import Refunds from '~/pages/Guide/Refunds';
import Question from '~/pages/Guide/Questions';
import Appointment from '~/pages/Guide/Appointment';
import Facilitie from '~/pages/Facilitie';

import config from '~/config';

const publicRoutes = [
  { path: config.routers.home, component: Home },
  { path: config.routers.about, component: About },
  { path: config.routers.downApp, component: DownApp },
  { path: config.routers.refunds, component: Refunds },
  { path: config.routers.question, component: Question },
  { path: config.routers.appointment, component: Appointment },
  { path: config.routers.facilitie, component: Facilitie },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
