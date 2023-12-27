import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  TiktokIcon,
  YoutubeIcon,
  FacebookIcon,
  LogoIcon,
  DropdownIcon,
  SupportIcon,
  DownIcon,
  AccountIcon,
} from '~/components/Icon';

import style from './Header.module.scss';
import Button from '~/components/Button';

import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const handleShowModalProfile = () => {};

  return (
    <div className={cx('header')}>
      <div className={cx('header_wrapper')}>
        <div className={cx('header_logo')}>
          <Link to="/">
            <LogoIcon className={cx('logoIcon')} />
          </Link>
        </div>
        <div className={cx('header_body')}>
          <div className={cx('header_topNavbar')}>
            <div className={cx('header_social')}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.tiktok.com/@medprovn/"
                className={cx('header_social_item')}
              >
                <TiktokIcon />
                Tiktok
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/@medpro-atlichkhambenh1543"
                className={cx('header_social_item')}
              >
                <YoutubeIcon />
                Youtube
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/www.medpro.vn"
                className={cx('header_social_item')}
              >
                <FacebookIcon />
                Facebook
              </a>
            </div>
            <div className={cx('header_btn')}>
              <div>
                <Button href="/#downloadBtn" rounded leftIcon={<DownIcon />} className={cx('header_donwloadBtn')}>
                  Tải ứng dụng
                </Button>
              </div>
              <div>
                <Button
                  to={isLoggedIn ? '' : '/check-phone'}
                  rounded
                  leftIcon={<AccountIcon />}
                  className={cx('header_accountBtn')}
                  onClick={handleShowModalProfile}
                >
                  {isLoggedIn ? `${user.userData.fullName}` : 'Tài khoản'}
                </Button>
              </div>
            </div>
          </div>
          <div className={cx('header_menu')}>
            <a href="tel:0915948664">
              <div className={cx('header_support')}>
                <div className={cx('header_suportIcon')}>
                  <SupportIcon />
                </div>
                <div className={cx('header_suportTitle')}>
                  Hổ trợ đặt khám
                  <div>1900 1211</div>
                </div>
              </div>
            </a>
            <div className={cx('header_navbar')}>
              <ul className={cx('header_navbarList')}>
                <li className={cx('header_navbarItem')}>
                  <Link className={cx('header_navbarLink')} to="/co-so-y-te">
                    Cở sở ý tế
                  </Link>
                  <span>
                    <DropdownIcon />
                  </span>
                  <div className={cx('menu')}>
                    <ul>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Bệnh viện công
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Bệnh viện tư
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Phòng khám
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Phòng mạch
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={cx('header_navbarItem')}>
                  <Link className={cx('header_navbarLink')} to="/">
                    Dịch vụ y tế
                  </Link>
                  <span>
                    <DropdownIcon />
                  </span>
                  <div className={cx('menu')}>
                    <ul>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Đặt khám tại cơ sở
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Đặt khám theo bác sĩ
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Tư vấn từ xa
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Đặt lịch xét nghiệm
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Y tế tại nhà
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Thanh toán viện phí
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={cx('header_navbarItem')}>
                  <Link className={cx('header_navbarLink')} to="/about">
                    Gói khám
                  </Link>
                </li>
                <li className={cx('header_navbarItem')}>
                  <Link className={cx('header_navbarLink')} to="/huong-dan/cai-dat-ung-dung">
                    Hướng dẫn
                  </Link>
                  <span>
                    <DropdownIcon />
                  </span>
                  <div className={cx('menu')}>
                    <ul>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/huong-dan/cai-dat-ung-dung">
                          Cài đặt ứng dụng
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Đặt lịch khám
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/huong-dan/quy-trinh-hoan-phi">
                          Quy trình hoàn phí
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/huong-dan/cau-hoi-thuong-gap  ">
                          Câu hỏi thường gặp
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={cx('header_navbarItem')}>
                  <Link className={cx('header_navbarLink')} to="/">
                    Tin tức
                  </Link>
                  <span>
                    <DropdownIcon />
                  </span>
                  <div className={cx('menu')}>
                    <ul>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Tin dịch vụ
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} k to="/">
                          Tin y tế
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/">
                          Y học thường thức
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={cx('header_navbarItem')}>
                  <Link className={cx('header_navbarLink')} to="/about">
                    Về chúng tôi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
