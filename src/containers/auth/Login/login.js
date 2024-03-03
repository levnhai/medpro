import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '~/redux/user/authSlide';

import Button from '~/components/Button';
import userServise from '~/services/userServices';

import Auth from '../Auth/Auth';

import './login.scss';

function Login() {
  const isphone = useSelector((state) => state.auth.phoneNumber);

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const InputRef = useRef(null);

  // use state
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState('');
  const [passwordShowHide, setPasswordShowHide] = useState(false);

  // handle action onChange password
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
    setMessageError('');
  };

  // handle action onChange show hide password
  const handleShowHidePassword = () => {
    setPasswordShowHide(!passwordShowHide);
  };

  // submit key press
  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  const handleLogin = async () => {
    // e.preventDefault();
    try {
      if (!password) {
        return setMessageError('Vui lòng nhập mật khẩu đăng nhập');
      }

      let userData = await userServise.handleLogin(isphone, password);
      console.log('user data', userData);
      if (userData.errCode === 0 && userData.status === true) {
        navigator('/');
        dispatch(loginUser(userData));
      } else {
        toast.error('Thông tin đăng nhập không chính xác');
      }
    } catch (error) {
      console.log('lỗi r bạn ơi ');
    }
  };

  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.focus();
    }
  }, []);

  return (
    <Auth>
      <div className="checkPhone--wrapper__body">
        <p className="text-center">Vui lòng đăng nhập để tiếp tục</p>
        <div className="tel-input">
          <input className="form-control disable-form" value={isphone} disabled />
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
            onKeyDown={handleKeypress}
            ref={InputRef}
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
        >
          Tiếp tục
        </Button>

        <div className="text-right">
          <p className="forgot-password">Quên mật khẩu ?</p>
        </div>
      </div>
    </Auth>
  );
}

export default Login;
