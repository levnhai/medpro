import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

import Lightbox from 'react-image-lightbox';

import userServise from '~/services/userServices';
import { adminServices } from '~/services';
import { ConvertBase64 } from '~/utils/common';
import { toast } from 'react-toastify';

import styles from './Modal.module.scss';
import className from 'classnames/bind';
import 'react-image-lightbox/style.css';

const cx = className.bind(styles);

function CreateDocter({ setShowModalCreate, getAllUser }) {
  const [previewImageURL, setpreViewImageURL] = useState();
  const [isOpenImage, setIsOpenImage] = useState();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    password: '',
    reEnterPassword: '',
    phoneNumber: '',
    gender: 'Nam',
    roleId: 'Bác sỹ',
    positionId: 'Bác sỹ',
    image: '',
  });

  const [messagesError, setMessageError] = useState({
    email: '',
    fullName: '',
    address: '',
    password: '',
    reEnterPassword: '',
    phoneNumber: '',
    gender: '',
    roleId: '',
    positionId: '',
  });

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
    //check for blank input
    for (const key in formData) {
      if (!formData[key]) {
        console.log('thành công');
        messagesError[key] = `Please enter your ${key}`;
      }
    }
    setMessageError(messagesError);
    if (!regexPhoneNumber(formData.phoneNumber)) {
      setMessageError({ ...messagesError, phoneNumber: 'Vui lòng nhập đúng định dạng' });
      return false;
    }

    if (formData.password.trim().length < 8) {
      setMessageError({ ...messagesError, password: 'Vui lòng nhập mật khẩu 8 kí tự' });
      return false;
    }

    if (!/\d/.test(formData.password)) {
      setMessageError({ ...messagesError, password: 'mật khẩu có 1 ít nhất 1 chữ số' });
      return false;
    }
    return true;
  };

  // handle onClick submit btn Create User
  const handleSubmitCreateDocter = async (e) => {
    e.preventDefault();
    try {
      let validationError = validateForm();
      if (validationError === true) {
        let isExistPhoneNumber = await userServise.handleCheckPhone(formData.phone);
        if (!isExistPhoneNumber.status) {
          let data = await adminServices.createDocter(formData);
          console.log('data rea', data);
          if (data.errCode === 0 && data.userData) {
            getAllUser();
            setShowModalCreate(false);
            toast.success(`${data.messageError}`);
          } else {
            toast.error(`${data.messageError}`);
          }
        } else {
          toast.error('Số điện thoại đã tồn tại');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeImage = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    let file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setpreViewImageURL(objectURL);
    }

    const urlBase64 = await ConvertBase64(file);
    setFormData({ ...formData, image: urlBase64 });
  };

  const handleOpenImage = () => {
    if (!previewImageURL) return;
    setIsOpenImage(true);
  };

  return (
    <>
      <div className={cx('darkBG')} onClick={() => setShowModalCreate(false)} />
      <div className={cx('centered')}>
        <div className={cx('modal')}>
          <div className={cx('modalHeader')}>
            <h5 className={cx('heading')}>Create New Docter</h5>
          </div>
          <button className={cx('closeBtn')} onClick={() => setShowModalCreate(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={cx('modalContent')}>
            <div className={cx('wrapper--input')}>
              <div className={cx('input--item')}>
                <div>
                  <input
                    type="text"
                    placeholder="Nhập họ tên"
                    name="fullName"
                    className={cx('customInput')}
                    onChange={handleOnchange}
                  />
                  <small className={cx('text--danger')}>{messagesError.fullName}</small>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Nhập email"
                    name="email"
                    className={cx('customInput')}
                    onChange={handleOnchange}
                  />
                  <small className={cx('text--danger')}>{messagesError.email}</small>
                </div>
              </div>
              <div className={cx('input--item')}>
                <div>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ"
                    className={cx('customInput')}
                    name="address"
                    onChange={handleOnchange}
                  />
                  <small className={cx('text--danger')}>{messagesError.address}</small>
                </div>
              </div>
              <div className={cx('input--item')}>
                <div>
                  <input
                    placeholder="Nhập mật khẩu"
                    className={cx('customInput')}
                    name="password"
                    onChange={handleOnchange}
                  />
                  <small className={cx('text--danger')}>{messagesError.password}</small>
                </div>
                <div>
                  <input
                    placeholder="Nhập lại mật khẩu"
                    className={cx('customInput')}
                    name="reEnterPassword"
                    onChange={handleOnchange}
                  />
                  <small className={cx('text--danger')}>{messagesError.reEnterPassword}</small>
                </div>
              </div>
              <div className={cx('input--item')}>
                <div>
                  <input
                    type="number"
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    className={cx('customInput')}
                    onChange={handleOnchange}
                  />
                  <small className={cx('text--danger')}>{messagesError.phoneNumber}</small>
                </div>
                <div>
                  <select onChange={handleOnchange} value={formData.gender} name="gender" className={cx('customInput')}>
                    <option name="gender" value="">
                      Giới tính
                    </option>
                    <option name="gender" value="Nữ">
                      Nữ
                    </option>
                    <option name="gender" value="khác">
                      Khác
                    </option>
                    <option name="gender" value="Nam">
                      Nam
                    </option>
                  </select>
                  <small className={cx('text--danger')}>{messagesError.gender}</small>
                </div>
              </div>
              <div className={cx('input--item')}>
                <div>
                  <select
                    onChange={handleOnchange}
                    value={formData.positionId}
                    className={cx('customInput')}
                    name="positionId"
                  >
                    <option name="positionId" value="">
                      Trình đô
                    </option>
                    <option name="positionId" value="Bác sỹ">
                      Bác sỹ
                    </option>
                    <option name="positionId" value="Thạc sỹ">
                      Thạc sỹ
                    </option>
                    <option name="positionId" value="Tiến sỹ">
                      Tiến sỹ
                    </option>
                    <option name="positionId" value="Phó giáo sư">
                      Phó giáo sư
                    </option>
                    <option name="positionId" value="Giáo sư">
                      Giáo sư
                    </option>
                  </select>
                  <small className={cx('text--danger')}>{messagesError.positionId}</small>
                </div>
                <div>
                  <select onChange={handleOnchange} value={formData.roleId} className={cx('customInput')} name="roleId">
                    <option name="roleId" value="">
                      --- Role id ---
                    </option>
                    <option name="roleId" value="Bác sỹ">
                      Bác sỹ
                    </option>
                    <option name="roleId" value="Quản trị viên">
                      Quản trị viên
                    </option>
                    <option name="roleId" value="Người dùng">
                      Người dùng
                    </option>
                  </select>
                  <small className={cx('text--danger')}>{messagesError.roleId}</small>
                </div>
              </div>
              <div className={cx('input--item')}>
                <div>
                  <label className={cx('label-uploadImage')} htmlFor="upload-image">
                    Upload image
                  </label>
                  <input
                    className={cx('customInput')}
                    id="upload-image"
                    accept="image/*"
                    onChange={handleOnChangeImage}
                    type="file"
                    name="image"
                    hidden
                  ></input>
                  {previewImageURL ? (
                    <div
                      className={cx('upload-image')}
                      onClick={handleOpenImage}
                      style={{ backgroundImage: `url(${previewImageURL})` }}
                    ></div>
                  ) : (
                    ''
                  )}
                  {isOpenImage && <Lightbox mainSrc={previewImageURL} onCloseRequest={() => setIsOpenImage(false)} />}
                </div>
              </div>
            </div>
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

          <div className={cx('modalActions')}>
            <div className={cx('actionsContainer')}>
              <button className={cx('deleteBtn')} onClick={handleSubmitCreateDocter}>
                Create Docter
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

export default CreateDocter;
