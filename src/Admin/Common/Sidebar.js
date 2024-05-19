import React, { useState } from 'react';
import { AdminData, Docterdata } from './SidebarData';
import SubMenu from './Submenu';
import { IconContext } from 'react-icons/lib';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '~/utils/constant';
import { useDispatch } from 'react-redux';
import { PROCESS_LOGOUT } from '~/redux/admin/adminSlice';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
  const adminInfo = useSelector((state) => state.admin.adminInfo);
  const roleid = adminInfo.userData.roleId;
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(1);

  let sidebarItems = [];

  if (roleid === USER_ROLE.ADMIN) {
    sidebarItems = AdminData;
  } else if (roleid === USER_ROLE.DOCTER) {
    sidebarItems = Docterdata;
  } else {
    dispatch(PROCESS_LOGOUT());
  }

  const handleMenuClick = (menuId) => {
    if (activeMenu === menuId) {
    } else {
      setActiveMenu(menuId);
    }
  };
  const isMenuActive = (menuId) => activeMenu === menuId;
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={cx('sidebar-nar')}>
          <div className={cx('sidebarWrap')}>
            {sidebarItems &&
              sidebarItems.map((item, index) => {
                return (
                  <div>
                    <Link
                      onClick={() => handleMenuClick(item.id)}
                      className={item.id === activeMenu ? cx('sidebarLink', 'active') : cx('sidebarLink')}
                      to={item.path}
                    >
                      <div>
                        {item.icon}
                        <span className={cx('sidebar-label')}>{item.title}</span>
                      </div>
                      <div>
                        {item.subNav && isMenuActive(item.id) ? item.iconOpened : item.subNav ? item.iconClosed : null}
                      </div>
                    </Link>
                    {isMenuActive(item.id) && <SubMenu submenuItems={item.subNav} />}
                  </div>
                );
              })}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
