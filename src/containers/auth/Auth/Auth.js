import { Link } from 'react-router-dom';

import className from 'classnames/bind';
import style from './auth.module.scss';

const cx = className.bind(style);

function Auth({ children }) {
  return (
    <div className={cx('authenticate')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('header')}>
            <div className={cx('icon-back')}>
              <Link to="/">
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
            </div>
            <div className={cx('logo')}>
              <Link to="/" className={cx('logo-link')}>
                <img src="https://i.imgur.com/31qCsaA.png" alt="logo" />
              </Link>
            </div>
          </div>
          <div className={cx('body')}>{children}</div>
        </div>
        <div className={cx('authenticate--bg')}>
          <div className={cx('authenticate--bg__img')}>
            <div className={cx('img-shape')}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
