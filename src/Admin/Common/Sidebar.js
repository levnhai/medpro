import React from 'react';
import { SidebarData } from './SidebarData';
import SubMenu from './Submenu';
import { IconContext } from 'react-icons/lib';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={cx('sidebar-nar')}>
          <div className={cx('sidebarWrap')}>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} index={index} />;
            })}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
