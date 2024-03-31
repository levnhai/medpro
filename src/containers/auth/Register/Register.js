import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { loginUser } from '~/redux/user/authSlide';
import Button from '~/components/Button';
import userServise from '~/services/userServices';
import Auth from '../Auth/Auth';
import { Input } from '~/components/Input/Input';
import { password_validation, name_validation } from '~/utils/inputValidations';

import styles from './Register.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isPhoneNumber = useSelector((state) => state.auth.phoneNumber);
  const [showHidePassword, setShowHidePassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);

  const handleShowHidePassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleShowHideReEnterPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  const methods = useForm();

  const handleSubmitCreateUser = methods.handleSubmit(async (data) => {
    const formData = { ...data, phoneNumber: isPhoneNumber };
    try {
      let data = await userServise.handleCreateUser(formData);
      console.log('data', data);
      if (data.errCode === 0 && data.userData) {
        navigate('/');
        toast.success(data.messageError);
        dispatch(loginUser(data));
      } else {
        toast.error('Tạo tài khoản không thành công');
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Auth>
        <div className={cx('register--body')}>
          <div className={cx('register--form__content')}>
            <div className={cx('content--title__section')}>Vui lòng nhập đầy đủ thông tin</div>
            <div className={cx('wrapper--input')}>
              <FormProvider {...methods}>
                <form onSubmit={(e) => e.preventDefault()} noValidate className="container">
                  <div
                    style={{
                      display: 'flex',
                      textAlign: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <div className={cx('react--tel__input')}>
                      <input type="text" className={cx('customInput')} value={isPhoneNumber} disabled />
                    </div>

                    <div style={{ display: 'flex', gap: '30px' }}>
                      <Input {...name_validation} />
                    </div>
                    <div style={{ display: 'flex', gap: '30px', position: 'relative' }}>
                      <Input type={showHidePassword ? 'password' : ' text'} {...password_validation} />
                      <span
                        onClick={handleShowHidePassword}
                        style={{ position: 'absolute', right: '14px', top: '53%', fontSize: '20px', cursor: 'pointer' }}
                      >
                        {showHidePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '30px', position: 'relative' }}>
                      <Input
                        validation={{
                          required: {
                            value: true,
                            message: 'required',
                          },
                        }}
                        label=""
                        type={confirmPassword ? 'password' : ' text'}
                        id="reEnterPassword"
                        placeholder="Please enter your reEnterPassword..."
                        name="reEnterPassword"
                      />
                      <span
                        onClick={handleShowHideReEnterPassword}
                        style={{ position: 'absolute', right: '14px', top: '53%', fontSize: '20px', cursor: 'pointer' }}
                      >
                        {confirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '30px' }}>
                      <Input
                        label=""
                        type="text"
                        id="referralCode"
                        placeholder="Please enter your referralCode..."
                        name="referralCode"
                      />
                    </div>
                  </div>
                </form>
              </FormProvider>
              <p className={cx('customFont')}>
                Bằng việc đăng ký, bạn đã đồng ý với Medpro về
                <br />
                <a href="https://medpro.vn/quy-dinh-su-dung" target="_blank" rel="noreferrer">
                  Quy định sử dụng
                </a>
                &nbsp; và &nbsp;
                <a href="https://medpro.vn/chinh-sach-bao-mat" target="_blank" rel="noreferrer">
                  chính sách bảo mật
                </a>
              </p>
              <div>
                <Button type="submit" onClick={handleSubmitCreateUser} className={cx('register-btn')}>
                  Hoàn tất đăng kí
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Auth>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Register;
