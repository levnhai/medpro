import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  const handleScoll = () => {};

  return (
    <div className={cx('wrapper')}>
      <div className="">
        <Header />
      </div>
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
}
export default DefaultLayout;
