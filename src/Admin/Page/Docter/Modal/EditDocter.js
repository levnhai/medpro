import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import adminServise from '~/services/adminServices';
import { toast } from 'react-toastify';

import className from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = className.bind(styles);

function EditDocter({ setShowModalEdit, getAllDocter, docterData }) {
  const [isvalidateForm, setIsValidateForm] = useState(false);
  const [formData, setFormData] = useState({
    id: `${docterData._id}`,
    phoneNumber: `0${docterData.phoneNumber}`,
    fullName: `${docterData.fullName}`,
    email: `${docterData.email}`,
    address: `${docterData.address}`,
    gender: `${docterData.gender}`,
    roleId: `${docterData.roleId}`,
    positionId: `${docterData.positionId}`,
  });

  const [messagesError, setMessageError] = useState({
    id: '',
    email: '',
    fullName: '',
    address: '',
    password: '',
    reEnterPassword: '',
    phoneNumber: '',
    gender: '',
    roleId: '',
    positionId: '',
    image: '',
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
    if (formData.fullName.trim() === '') {
      setMessageError({ ...messagesError, fullName: 'Vui lòng họ tên' });
      return false;
    }
    if (formData.email.trim() === '') {
      setMessageError({ ...messagesError, email: 'Vui lòng email' });
      return false;
    }
    if (formData.address.trim() === '') {
      setMessageError({ ...messagesError, address: 'Vui lòng số điện thoại' });
      return false;
    }
    if (formData.phoneNumber.trim() === '') {
      setMessageError({ ...messagesError, phoneNumber: 'Vui lòng số điện thoại' });
      return false;
    }

    if (!regexPhoneNumber(formData.phoneNumber)) {
      setMessageError({ ...messagesError, phoneNumber: 'Vui lòng nhập đúng định dạng' });
      return false;
    }

    return true;
  };
  // handle onClick submit btn edit User
  const handleSubmitEditDocter = async (e) => {
    // e.preventDefault();
    try {
      let validationError = validateForm();
      console.log(validationError);
      if (validationError) {
        let data = await adminServise.EditDocter(formData);
        console.log('validationError', data);
        if (data.data.errCode === 3) {
          toast.warning(data.data.errMessage);
        } else if (data.data.errCode === 0) {
          setShowModalEdit(false);
          getAllDocter();
          toast.success(data.data.errMessage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={cx('darkBG')} onClick={() => setShowModalEdit(false)} />
      <div className={cx('centered')}>
        <div className={cx('modal')}>
          <div className={cx('modalHeader')}>
            <h5 className={cx('heading')}>Edit User</h5>
          </div>
          <button className={cx('closeBtn')} onClick={() => setShowModalEdit(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={cx('modalContent')}>
            <div className={cx('wrapper--input')}>
              <div className={cx('input--item')}>
                <div className={cx('input--item')}>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    className={cx('customInput')}
                    onChange={handleOnchange}
                    disabled
                  />
                </div>
              </div>
              <div className={cx('input--item')}>
                <div>
                  <input
                    type="text"
                    placeholder="Nhập họ tên"
                    name="fullName"
                    className={cx('customInput')}
                    value={formData.fullName}
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
                    value={formData.email}
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
                    value={formData.address}
                  />
                  <small className={cx('text--danger')}>{messagesError.address}</small>
                </div>
              </div>

              <div className={cx('input--item')}>
                <div>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    className={cx('customInput')}
                    value={formData.phoneNumber}
                    onChange={handleOnchange}
                  />
                  <small className={cx('text--danger')}>{messagesError.phoneNumber}</small>
                </div>
                <div>
                  <select onChange={handleOnchange} value={formData.gender} name="gender" className={cx('customInput')}>
                    <option name="gender" value="Nữ">
                      Nữ
                    </option>
                    <option name="gender" value="Giới tính khác">
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
                <input className={cx('customInput')} type="file"></input>
              </div>
              <div className={cx('input--item')}>
                <div>
                  <select onChange={handleOnchange} value={formData.roleId} className={cx('customInput')} name="roleId">
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
              <button className={cx('deleteBtn')} onClick={handleSubmitEditDocter}>
                Edit User
              </button>
              <button className={cx('cancelBtn')} onClick={() => setShowModalEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDocter;