import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SubMenu = ({ submenuItems }) => {
  return (
    <div className={cx('submenu')}>
      {submenuItems &&
        submenuItems.length > 0 &&
        submenuItems.map((item) => (
          <Link className={cx('submenu-item')} to={item.path}>
            {item.title}
          </Link>
        ))}
    </div>
  );
};

export default SubMenu;
