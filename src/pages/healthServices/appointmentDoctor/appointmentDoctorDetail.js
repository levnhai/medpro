import classNames from 'classnames/bind';
import style from './appointmentDoctorDetail.module.scss';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { FaCircleXmark } from 'react-icons/fa6';
import { useRef, useState } from 'react';

import Select, { components } from 'react-select';
const cx = classNames.bind(style);

function AppointmentDoctorDetail() {
  const [valueInputSearch, setValueInputSearch] = useState('');
  const inputRef = useRef();

  // const CustomInput = ({ innerProps }) => {
  //   return <div {...innerProps} />;
  // };
  // const customComponents = {
  //   Input: CustomInput,
  // };

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'mango', label: 'Mango' },
    { value: 'mangosteens', label: 'Mangosteens' },
    { value: 'avocado', label: 'Avocado' },
  ];

  const handleClear = () => {
    setValueInputSearch('');
    inputRef.current.focus();
  };

  return (
    <div className={cx('AppointmentDoctorDetail')}>
      <div className={cx('breadcrumb')}>
        <div>
          <ul className={cx('breadcrumb-list')}>
            <li className={cx('breadcrumb-item')}>
              <a href="/">Trang chủ</a>
              <MdKeyboardArrowRight
                style={{
                  color: '#999',
                }}
              />
            </li>
            <li className={cx('breadcrumb-item')}>
              <a href="/">Bệnh viện đại học y dưỡng tp.HCM</a>
              <MdKeyboardArrowRight
                style={{
                  color: '#999',
                }}
              />
            </li>
            <li className={cx('breadcrumb-item')}>
              <a href="/">Chọn Bác sỹ</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx('container')}>
        <div className={cx('panelsHeader')}>
          <div className={cx('booking-title')}>Thông tin cơ sở y tế</div>
          <div className={cx('booking-cardBody')}>
            <div className={cx('info-hospital')}>
              Bệnh viện Đại học Y Dược TP.HCM
              <span className={cx('hospital-address')}>
                Cơ sở 201 Nguyễn Chí Thanh, Phường 12, Quận 5, TP. Hồ Chí Minh
              </span>
            </div>
          </div>
        </div>
        <div className={cx('chooseBookingInfo')}>
          <div className={cx('chooseBooking-title')}>Vui lòng chọn bác sỹ </div>
          <div className={cx('content')}>
            <div className={cx('card-body')}>
              <div>
                <div className={cx('search')}>
                  <div className={cx('search-wrapper')}>
                    <div className={cx('search-input')}>
                      <input
                        ref={inputRef}
                        value={valueInputSearch}
                        onChange={(e) => setValueInputSearch(e.target.value)}
                        placeholder="Tìm nhanh bác sỹ ..."
                      />

                      {valueInputSearch && valueInputSearch.length > 0 && (
                        <button className={cx('clear')}>
                          <FaCircleXmark onClick={handleClear} />
                        </button>
                      )}
                    </div>
                    <div className={cx('search-btn')}>
                      <CiSearch />
                    </div>
                  </div>
                </div>
                <div className={cx('select-filter')}>
                  <div className={cx('filter-item')}>
                    <Select placeholder="Học hàm/học vị" options={options} />
                  </div>
                  <div className={cx('filter-item')}>
                    <Select placeholder="Chuyên khoa" options={options} />
                  </div>
                  <div className={cx('filter-item')}>
                    <Select placeholder="Giới tính" options={options} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDoctorDetail;
