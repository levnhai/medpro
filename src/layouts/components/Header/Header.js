import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { LogoIcon, SupportIcon } from '~/components/Icon';
import { FaTiktok, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { IoPersonSharp } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';

import style from './Header.module.scss';
import Button from '~/components/Button';
import { logoutUser } from '~/redux/user/authSlide';

import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Header() {
  const modalRef = useRef(null);
  const btnLoginRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [shortName, setShortName] = useState('');

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  // bắt sự kiện click show modal
  const handleShowModalProfile = () => {
    if (isLoggedIn) {
      setShowModal(!showModal);
    }
  };

  // rút gọn name
  const handleshortName = () => {
    let fullName = isLoggedIn && user && `${user.userData.fullName}`;
    if (isLoggedIn && fullName) {
      let nameParts = fullName.split(' ');
      let shortName = '';
      if (nameParts.length > 1) {
        shortName = nameParts[nameParts.length - 2] + ' ' + nameParts[nameParts.length - 1];
      } else {
        shortName = nameParts[0];
      }
      setShortName(shortName);
    }
  };

  // bắt sự kiện click ra ngoài modal profile
  const handleClickOusideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !btnLoginRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    //
    handleshortName();

    document.addEventListener('click', handleClickOusideModal);
    return () => {
      document.removeEventListener('click', handleClickOusideModal);
    };
  }, []);

  return (
    <div className={cx('header')}>
      <div className={cx('header-wapper')}>
        <div className={cx('logo')}>
          <a href="/">
            <LogoIcon className={cx('icon')} />
          </a>
        </div>
        <div className={cx('body')}>
          <div className={cx('topNavbar')}>
            <div className={cx('social')}>
              <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@medprovn/" className={cx('item')}>
                <FaTiktok style={{ width: '1.6rem', height: '1.6rem' }} />
                Tiktok
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/@medpro-atlichkhambenh1543"
                className={cx('item')}
              >
                <FaYoutube style={{ width: '1.6rem', height: '1.6rem' }} />
                Youtube
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/www.medpro.vn" className={cx('item')}>
                <FaFacebookF style={{ width: '1.6rem', height: '1.6rem' }} />
                Facebook
              </a>
            </div>
            <div className={cx('groupBtn')}>
              <div>
                <Button
                  href="/#downloadBtn"
                  rounded
                  leftIcon={<MdOutlinePhoneAndroid style={{ width: '1.7rem', height: '1.7rem' }} />}
                  className={cx('donwloadBtn')}
                >
                  Tải ứng dụng
                </Button>
              </div>
              <div ref={btnLoginRef}>
                <Button
                  to={isLoggedIn ? '#' : '/check-phone'}
                  rounded
                  leftIcon={<IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />}
                  className={cx('accountBtn')}
                  onClick={handleShowModalProfile}
                >
                  {isLoggedIn && user.userData && `${user.userData.fullName}` ? shortName : 'Tài khoản'}
                </Button>
              </div>
            </div>
            {showModal && (
              <div ref={modalRef} className={cx('modal')}>
                <div className={cx('modal-profile')}>
                  <div className={cx('profile-header')}>
                    <div className={cx('profile-avata')}></div>
                    <div className={cx('profile-info')}>
                      <span> Xin chào </span>
                      <h5> {`${user.userData.fullName}`}</h5>
                    </div>
                  </div>
                  <ul className={cx('information-list')}>
                    <li className={cx('information-item')}>
                      <div>
                        <span className={cx('icon')}>
                          <IoPersonSharp style={{ width: '1.7rem', height: '1.7rem' }} />
                        </span>
                        <span className={cx('title')}>Hồ sơ bệnh nhân</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div>
                        <span className={cx('icon')}>
                          <i className="fa-regular fa-note-sticky"></i>
                        </span>
                        <span className={cx('title')}>Phiếu khám bệnh</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div>
                        <span className={cx('icon')}>
                          <i className="fa-regular fa-bell"></i>
                        </span>
                        <span className={cx('title')}>Thông báo</span>
                      </div>
                    </li>
                    <li className={cx('information-item')}>
                      <div
                        onClick={() => {
                          dispatch(logoutUser());
                          setShowModal(false);
                          toast.success('Đăng xuất thành công');
                        }}
                      >
                        <span className={cx('icon')}>
                          <i className="fa-solid fa-right-from-bracket"></i>
                        </span>
                        <span className={cx('title')}>Đăng xuất</span>
                      </div>
                    </li>
                    <li className={cx('information-item')} disabled>
                      <div>
                        <span>Câp nhật mới nhất: 29/12/2023</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className={cx('header_menu')}>
            <a href="tel:0915948664">
              <div className={cx('support')}>
                <div className={cx('suportIcon')}>
                  <SupportIcon />
                </div>
                <div className={cx('suportTitle')}>
                  Hổ trợ đặt khám
                  <div>1900 1211</div>
                </div>
              </div>
            </a>
            <div className={cx('navbar')}>
              <ul className={cx('navbarList')}>
                <li className={cx('navbarItem')}>
                  <Link className={cx('navbarLink')} to="/co-so-y-te">
                    Cở sở ý tế
                  </Link>
                  <span>
                    <IoMdArrowDropdown style={{ width: '1.5rem', height: '1.5rem' }} />
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
                <li className={cx('navbarItem')}>
                  <Link className={cx('navbarLink')} to="/">
                    Dịch vụ y tế
                  </Link>
                  <span>
                    <IoMdArrowDropdown style={{ width: '1.5rem', height: '1.5rem' }} />
                  </span>
                  <div className={cx('menu')}>
                    <ul>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/dich-vu-y-te/dat-kham-tai-co-so">
                          Đặt khám tại cơ sở
                        </Link>
                      </li>
                      <li className={cx('menuItem')}>
                        <Link className={cx('menuLink')} to="/dich-vu-y-te/dat-kham-theo-bac-sy">
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
                <li className={cx('navbarItem')}>
                  <Link className={cx('navbarLink')} to="/about">
                    Gói khám
                  </Link>
                </li>
                <li className={cx('navbarItem')}>
                  <Link className={cx('navbarLink')} to="/huong-dan/cai-dat-ung-dung">
                    Hướng dẫn
                  </Link>
                  <span>
                    <IoMdArrowDropdown style={{ width: '1.5rem', height: '1.5rem' }} />
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
                <li className={cx('navbarItem')}>
                  <Link className={cx('navbarLink')} to="/">
                    Tin tức
                  </Link>
                  <span>
                    <IoMdArrowDropdown style={{ width: '1.5 rem', height: '1.5rem' }} />
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
                <li className={cx('navbarItem')}>
                  <Link className={cx('navbarLink')} to="/about">
                    Về chúng tôi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('newMobileHeader')}>
        <div className={cx('mobile-HeaderBar')}>
          <div className={cx('logo')}>
            <Link to="/">
              <LogoIcon className={cx('logoIcon')} />
            </Link>
          </div>
          <div className={cx('btn_mobileHeader')}>
            <Button rounded>
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
            <Button rounded>
              <i className="fa-solid fa-bars"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
