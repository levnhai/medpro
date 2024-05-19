import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { FormProvider, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { ADMIN_LOGIN_SUCCESS } from '~/redux/admin/adminSlice';
import Button from '~/components/Button';
import { Input } from '~/components/Input/Input';
import { password_validation, phone_validation } from '~/utils/inputValidations';
import userServise from '~/services/userServices';

import style from './login.module.scss';
import Auth from '~/containers/auth/Auth';

const cx = classNames.bind(style);

function AdminLogin() {
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
      let userData = await userServise.handleLogin(data.phoneNumber, data.password);
      if (userData.errCode === 0 && userData.status === true) {
        navigator('/system');
        dispatch(ADMIN_LOGIN_SUCCESS(userData));
      } else {
        toast.error('Thông tin đăng nhập không chính xác');
      }
    } catch (error) {
      toast.error('lỗi r bạn ơi ');
    }
  });

  useEffect(() => {
    setFocus('phoneNumber');
  }, [setFocus]);

  return (
    <>
      <Auth>
        <div className={cx('login-wrapper')}>
          <p className={cx('text-center')}>Vui lòng đăng nhập để tiếp tục</p>
          <div className={cx('wrapper-input')}>
            <FormProvider {...methods}>
              <div className={cx('tel-input')}>
                <Input label="" {...phone_validation} />
              </div>
              <div className={cx('tel-input')}>
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
              </div>
            </FormProvider>
            {/* </div> */}
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

export default AdminLogin;
