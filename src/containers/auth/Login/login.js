import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FormProvider, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { loginUser } from '~/redux/user/authSlide';
import Button from '~/components/Button';
import { Input } from '~/components/Input/Input';
import { password_validation } from '~/utils/inputValidations';
import userServise from '~/services/userServices';

import style from './login.module.scss';
import Auth from '../Auth';

const cx = classNames.bind(style);

function Login() {
  const isphone = useSelector((state) => state.auth.phoneNumber);
  const methods = useForm();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { setFocus } = methods;

  // use state
  const [passwordShowHide, setPasswordShowHide] = useState(true);

  // handle action onChange show hide password
  const handleShowHidePassword = () => {
    setPasswordShowHide(!passwordShowHide);
  };

  // handle Login
  const handleLogin = methods.handleSubmit(async (data) => {
    try {
      let userData = await userServise.handleLogin(isphone, data.password);
      if (userData.errCode === 0 && userData.status === true) {
        navigator('/');
        dispatch(loginUser(userData));
      } else {
        toast.error('Thông tin đăng nhập không chính xác');
      }
    } catch (error) {
      console.log('lỗi r bạn ơi ');
    }
  });

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  return (
    <>
      <Auth>
        <div className={cx('login-wrapper')}>
          <p className={cx('text-center')}>Vui lòng đăng nhập để tiếp tục</p>
          <div className={cx('wrapper-input')}>
            <div className={cx('tel-input')}>
              <input className={cx('form-control')} value={isphone} disabled />
              <div className={cx('selected-flag')}>
                <img
                  src="https://cdn.icon-icons.com/icons2/4023/PNG/512/vietnam_vn_vnm_vietnamese_flag_icon_255804.png"
                  alt="vietnamese"
                />
              </div>
            </div>
            <div className={cx('tel-input')}>
              <FormProvider {...methods}>
                <Input type={passwordShowHide ? 'password' : ' text'} {...password_validation} />
                <span
                  onClick={handleShowHidePassword}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '45%',
                    padding: '4px',
                    fontSize: '20px',
                    cursor: 'pointer',
                  }}
                >
                  {passwordShowHide ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </FormProvider>
            </div>
          </div>
          <Button
            className={cx('loginBtn')}
            onClick={() => {
              handleLogin();
            }}
          >
            Tiếp tục
          </Button>
          <div className={cx('text-right')}>
            <p className={cx('forgot-password')}>Quên mật khẩu ?</p>
          </div>
        </div>
      </Auth>
    </>
  );
}

export default Login;
