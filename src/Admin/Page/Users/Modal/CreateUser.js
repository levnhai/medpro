import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import userServise from '~/services/userServices';
import { toast } from 'react-toastify';

import className from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = className.bind(styles);

function CreateUser({ setShowModalCreate, getAllUser }) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    fullName: '',
    password: '',
    reEnterPassword: '',
    referralCode: '',
    email: '',
    address: '',
    gender: '',
    roleId: 'patiend',
    positionId: '',
    image: '',
  });

  const [messagesError, setMessageError] = useState({
    phoneNumber: '',
    fullName: '',
    password: '',
    reEnterPassword: '',
  });

  const [showHidePassword, setShowHidePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const handleOnchange = (e) => {
    setMessageError({});
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // is valis phone number in vietnam
  const regexPhoneNumber = (phone) => {
    const regexPhoneNumber = /(0[3|7|9])+([0-9]{8})\b/g;
    return phone.match(regexPhoneNumber) ? true : false;
  };

  // validate form input
  const validateForm = () => {
    // validate input phone number
    if (formData.phoneNumber.trim() === '') {
      setMessageError({ ...messagesError, phoneNumber: 'Vui lòng số điện thoại' });
      return false;
    }

    if (!regexPhoneNumber(formData.phoneNumber)) {
      setMessageError({ ...messagesError, phoneNumber: 'Vui lòng nhập đúng định dạng' });
      return false;
    }

    // validate input fullName
    if (formData.fullName.trim() === '') {
      setMessageError({ ...messagesError, fullName: 'Vui lòng nhập họ tên' });
      return false;
    }

    // validate input password
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

  const handleShowHidePassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleShowHideReEnterPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  // handle onClick submit btn Create User
  const handleSubmitCreateUser = async (e) => {
    e.preventDefault();
    try {
      let validationError = validateForm();
      if (validationError === true) {
        console.log('thành công');
        console.log('formData', formData);

        let data = await userServise.handleCreateUser(formData);
        console.log('data', data);
        if (data.errCode === 0 && data.userData) {
          getAllUser();
          setShowModalCreate(false);
          toast.success(`${data.messageError}`);
        } else {
          toast.error(data.messageError);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={cx('darkBG')} onClick={() => setShowModalCreate(false)} />
      <div className={cx('centered')}>
        <div className={cx('modal')}>
          <div className={cx('modalHeader')}>
            <h5 className={cx('heading')}>Create New User</h5>
          </div>
          <button className={cx('closeBtn')} onClick={() => setShowModalCreate(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={cx('modalContent')}>
            <div className={cx('wrapper--input')}>
              <div className={cx('input--item')}>
                <input
                  type="text"
                  placeholder="Nhập Số điện thoại"
                  name="phoneNumber"
                  className={cx('customInput')}
                  onChange={handleOnchange}
                />
                <small className={cx('text--danger')}>{messagesError.phoneNumber}</small>
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
                    type={confirmPassword ? 'text' : 'password'}
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
                        confirmPassword ? 'fa-regular fa-eye eyeIconBtn' : 'fa-regular fa-eye-slash eyeIconBtn'
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
            </div>
          </div>
          <div className={cx('modalActions')}>
            <div className={cx('actionsContainer')}>
              <button className={cx('deleteBtn')} onClick={handleSubmitCreateUser}>
                Create User
              </button>
              <button className={cx('cancelBtn')} onClick={() => setShowModalCreate(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
