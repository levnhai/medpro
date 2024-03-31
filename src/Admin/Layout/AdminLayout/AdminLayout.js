import React from 'react';

import { LogoIcon } from '~/components/Icon';
import Sidebar from '~/Admin/Common/Sidebar';

import classNames from 'classnames/bind';
import styles from './admin.module.scss';
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('header-left')}>
          <div className={cx('logo')}>
            <LogoIcon className={cx('logoIcon')} />
          </div>
        </div>
        <div className={cx('header-right')}>
          <div className={cx('search')}>
            <input className={cx('input')} type="text" placeholder="Tìm kiếm ..." />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className={cx('notification')}>
            <i className="fa-regular fa-bell"></i>
          </div>
          <div className={cx('info')}></div>
        </div>
      </div>
      <div className={cx('container')}>
        <div className={cx('sidebar')}>
          <div className={cx('sidebar-content')}>
            <div className={cx('info')}>
              <div className={cx('avata')}></div>
              <div className={cx('status')}>
                <span>Admin</span>
                <div>hoạt động</div>
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
