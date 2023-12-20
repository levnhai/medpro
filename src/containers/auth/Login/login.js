import Button from '~/components/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '~/redux/user/authSlide';

import './login.scss';
import '../auth.scss';

function CheckPhone() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigator = useNavigate();
  const userData = location.state.userData;
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState('');
  const [passwordShowHide, setPasswordShowHide] = useState(false);

  console.log(userData);

  // handle action
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
    setMessageError('');
  };

  const handleLogin = async () => {
    // e.preventDefault();
    try {
      if (!password) {
        setMessageError('Vui lòng nhập mật khẩu đăng nhập');
      }
      if (userData.password === password) {
        navigator('/');
        dispatch(loginUser(userData));
      } else {
        setMessageError('Thông tin đăng nhập k chính xác');
      }
    } catch (error) {
      console.log('lỗi r bạn ơi ');
    }
  };

  const handleShowHidePassword = () => {
    setPasswordShowHide(!passwordShowHide);
  };

  return (
    <div className="authenticate">
      <div className="authenticate--container">
        <div className="authenticate--content">
          <div className="authenticate--wrapper__header">
            <div className="wrapper--header__iconBack">
              <Link to="/">
                <i class="fa-solid fa-arrow-left"></i>
              </Link>
            </div>
            <div className="wrapper--header__logo">
              <Link to="/" className="header--logo__link">
                <img src="https://i.imgur.com/31qCsaA.png" alt="logo" />
              </Link>
            </div>
          </div>
          <div className="checkPhone--wrapper__body">
            <p className="text-center">Vui lòng đăng nhập để tiếp tục</p>
            <div className="tel-input">
              <input className="form-control disable-form" value={userData.phoneNumber} disabled />
              <div className="selected-flag">
                <img
                  src="https://cdn.icon-icons.com/icons2/4023/PNG/512/vietnam_vn_vnm_vietnamese_flag_icon_255804.png"
                  alt="vietnamese"
                />
              </div>
            </div>
            <p className="login-errorMessage"></p>
            <div className="tel-input">
              <input
                className="form-control"
                value={password}
                type={passwordShowHide ? 'text' : 'password'}
                placeholder="Vui lòng nhập mật khẩu"
                onChange={(e) => {
                  handleOnChangePassword(e);
                }}
              />
              <i
                onClick={() => {
                  handleShowHidePassword();
                }}
                className={passwordShowHide ? 'fa-regular fa-eye eyeIconBtn' : 'fa-regular fa-eye-slash eyeIconBtn'}
              />
            </div>
            <p className="login-errorMessage">{messageError}</p>
            <Button
              className="LoginBtn"
              onClick={() => {
                handleLogin();
              }}
              navigatio
            >
              Tiếp tục
            </Button>

            <div className="text-right">
              <p className="forgot-password">Quên mật khẩu ?</p>
            </div>
          </div>
        </div>
        <div className="authenticate--bg ">
          <div className="authenticate--bg__img">
            <div className="img-shape"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckPhone;
