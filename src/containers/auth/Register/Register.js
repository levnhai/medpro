import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '~/redux/user/authSlide';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '~/components/Button';
import userServise from '~/services/userServices';

import styles from './Register.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const phoneNumber = location.state.phoneNumber;

  const isPhoneNumber = useSelector((state) => state.auth.phoneNumber);

  const [formData, setFormData] = useState({
    phone: isPhoneNumber,
    fullName: '',
    password: '',
    reEnterPassword: '',
    referralCode: '',
  });
  const [messagesError, setMessageError] = useState({
    fullName: '',
    password: '',
    reEnterPassword: '',
  });
  const [showHidePassword, setShowHidePassword] = useState(false);
  const [showHideReEnterPassword, setshowHideReEnterPassword] = useState(false);

  const handleShowHidePassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleShowHideReEnterPassword = () => {
    setshowHideReEnterPassword(!showHideReEnterPassword);
  };

  const handleOnchange = (e) => {
    setMessageError({});
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // validate fullName
    if (formData.fullName.trim() === '') {
      // validationError.fullName = 'Vui lòng nhập họ tên';
      setMessageError({ ...messagesError, fullName: 'Vui lòng nhập họ tên' });
      return false;
    }
    console.log(messagesError);
    if (formData.password.trim() === '') {
      setMessageError({ ...messagesError, password: 'Vui lòng nhập mật khẩu' });
      return false;
    }
    if (formData.password.trim().length < 8) {
      setMessageError({ ...messagesError, password: 'Vui lòng nhập mật khẩu 8 kí tự' });
      return false;
    }
    if (formData.reEnterPassword.trim() === '') {
      setMessageError({ ...messagesError, reEnterPassword: 'Vui lòng nhập lại mật khẩu' });

      return false;
    }

    if (!/\d/.test(formData.password)) {
      setMessageError({ ...messagesError, password: 'mật khẩu có 1 ít nhất 1 chữ số' });
      return false;
    }
    return true;
  };
  const handleSubmitCreateUser = async (e) => {
    e.preventDefault();
    try {
      let validationError = validateForm();
      console.log(messagesError.fullName);
      if (validationError === true) {
        console.log('thành công');
        let data = await userServise.handleCreateUser(formData);
        if (data.errCode === 0 && data.userData) {
          navigate('/');
          dispatch(loginUser(data));
        } else {
          toast.error('Tạo tài khoản không thành công');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx('register')}>
      <div className={cx('register--wrapper')}>
        <div className={cx('register--content')}>
          <div className={cx('register--content__header')}>
            <div className={cx('header--iconBack')}>
              <Link to="">
                <i class="fa-solid fa-arrow-left"></i>
              </Link>
            </div>
            <div className={cx('header--logo')}>
              <Link to="/" className="header--logo__link">
                <img src="https://i.imgur.com/31qCsaA.png" alt="logo" />
              </Link>
            </div>
          </div>
          <div className={cx('register--body')}>
            <div className={cx('register--form__content')}>
              <div className={cx('content--title__section')}>Vui lòng nhập đầy đủ thông tin</div>
              <div className={cx('wrapper--input')}>
                <div className={cx('react--tel__input')}>
                  <input type="text" className={cx('customInput')} value={isPhoneNumber} disabled />
                </div>
                <div className={cx('input--item')}>
                  <input
                    type="text"
                    placeholder="Nhập họ tên"
                    name="fullName"
                    className={cx('customInput')}
                    onChange={handleOnchange}
                  />
                  <small className={cx('text--danger')}>{messagesError.fullName}</small>
                </div>
                <div className={cx('input--item')}>
                  <div>
                    <input
                      type={showHidePassword ? 'text' : 'password'}
                      placeholder="Nhập mật khẩu"
                      className={cx('customInput')}
                      name="password"
                      onChange={handleOnchange}
                    />
                    <span className={cx('showHideIcon')}>
                      <i
                        onClick={() => {
                          handleShowHidePassword();
                        }}
                        className={
                          showHidePassword ? 'fa-regular fa-eye eyeIconBtn' : 'fa-regular fa-eye-slash eyeIconBtn'
                        }
                      />
                    </span>
                  </div>
                  <small className={cx('text--danger')}>{messagesError.password}</small>
                </div>
                <div className={cx('input--item')}>
                  <div>
                    <input
                      type={showHideReEnterPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu"
                      className={cx('customInput')}
                      name="reEnterPassword"
                      onChange={handleOnchange}
                    />
                    <span className={cx('showHideIcon')}>
                      <i
                        onClick={() => {
                          handleShowHideReEnterPassword();
                        }}
                        className={
                          showHideReEnterPassword
                            ? 'fa-regular fa-eye eyeIconBtn'
                            : 'fa-regular fa-eye-slash eyeIconBtn'
                        }
                      />
                    </span>
                  </div>
                  <small className={cx('text--danger')}>{messagesError.reEnterPassword}</small>
                </div>
                <div className={cx('input--item')}>
                  <input
                    type="text"
                    placeholder="Nhập mã giới thiệu (Nếu có)"
                    className={cx('customInput')}
                    name="referralCode"
                    onChange={handleOnchange}
                  />
                </div>
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
        </div>
        <div className={cx('register--bg')}>
          <div className={cx('register--bg__img')}>
            <div className={cx('img-shape')}></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;