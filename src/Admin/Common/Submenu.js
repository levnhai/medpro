import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const SubMenu = ({ item, index }) => {
  const [subnav, setSubnav] = useState(false);
  const handleSidebar = () => {
    setSubnav(!subnav);
  };

  return (
    <>
      <Link className={cx('sidebarLink')} to={item.path} onClick={handleSidebar}>
        <div>
          {item.icon}
          <span className={cx('sidebar-label')}>{item.title}</span>
        </div>
        <div>{item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}</div>
      </Link>
      {subnav &&
        item.subNav &&
        item.subNav.map((item, index) => {
          return (
            <Link className={cx('dropdown-link')} to={item.path} key={index}>
              {item.icon}
              <span className={cx('sidebar-label')}>{item.title}</span>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
