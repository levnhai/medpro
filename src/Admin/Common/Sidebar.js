import React from 'react';
import { AdminData, Docterdata } from './SidebarData';
import SubMenu from './Submenu';
import { IconContext } from 'react-icons/lib';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '~/utils/constant';
import { useDispatch } from 'react-redux';
import { PROCESS_LOGOUT } from '~/redux/admin/adminSlice';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
  const adminInfo = useSelector((state) => state.admin.adminInfo);
  const roleid = adminInfo.userData.roleId;
  const dispatch = useDispatch();

  let sidebarItems = [];

  if (roleid === USER_ROLE.ADMIN) {
    sidebarItems = AdminData;
  } else if (roleid === USER_ROLE.DOCTER) {
    sidebarItems = Docterdata;
  } else {
    dispatch(PROCESS_LOGOUT());
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={cx('sidebar-nar')}>
          <div className={cx('sidebarWrap')}>
            {sidebarItems &&
              sidebarItems.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
