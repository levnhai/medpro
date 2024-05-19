import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-content-loader';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { FaCircleXmark } from 'react-icons/fa6';
import { FaHospitalAlt } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { GrSchedules } from 'react-icons/gr';
import { MdOutlinePriceChange } from 'react-icons/md';
import { CiMedicalCross } from 'react-icons/ci';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { RiArrowGoBackLine } from 'react-icons/ri';

import Select from '~/components/Select/Select';
import { fetchDataHospitalById, fetchDataDocterlByHospitalId } from '~/redux/hospital/hospitalSlider';
import style from './appointmentDoctorDetail.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function AppointmentDoctorDetail() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { id } = useParams();
  const [valueInputSearch, setValueInputSearch] = useState('');

  const hospitalDataById = useSelector((state) => state.hospital.hospitalDataById);

  const docterDataByHospitalId = useSelector((state) => state.hospital.docterDataByHospitalId);
  console.log('che hospitalDataById', docterDataByHospitalId);
  const isLoading = useSelector((state) => state.hospital.loading);

  console.log('check loading state', isLoading);

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'mango', label: 'Mango' },
  ];

  const handleClear = () => {
    setValueInputSearch('');
    inputRef.current.focus();
  };

  useEffect(() => {
    dispatch(fetchDataHospitalById(id));
    dispatch(fetchDataDocterlByHospitalId(id));
  }, [dispatch]);

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
              <a href="/">{hospitalDataById && hospitalDataById.fullName}</a>
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
          <div>
            <div className={cx('booking-title')}>Thông tin cơ sở y tế</div>
            <div className={cx('booking-cardBody')}>
              <div className={cx('hospital')}>
                <div className={cx('info-icon')}>
                  <FaHospitalAlt className={cx('hospitalIcon')} />
                </div>
                <div className={cx('info-hospital')}>
                  {hospitalDataById && hospitalDataById.fullName}
                  <span className={cx('hospital-address')}>
                    <br /> {hospitalDataById && hospitalDataById.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('BookingInfo')}>
          <div className={cx('BookingInfo-card')}>
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
                      <Select className={cx('filter-item')} placeholder="Học hàm/học vị" options={options} />
                    </div>
                    <div className={cx('filter-item')}>
                      <Select placeholder="Chuyên khoa" options={options} />
                    </div>
                    <div className={cx('filter-item')}>
                      <Select placeholder="Giới tính" options={options} />
                    </div>
                  </div>
                  <div className={cx('listDocter')}>
                    {isLoading === true ? (
                      <>
                        <List />
                        <List />
                        {/* <h1>Loading ...</h1> */}
                      </>
                    ) : (
                      <>
                        {docterDataByHospitalId &&
                          docterDataByHospitalId.map((item, index) => {
                            console.log(1, item.docterInforData[0]);
                            return (
                              <div key={index} className={cx('docter-infor')}>
                                <div>
                                  <div className={cx('highlight', 'infoLine')}>
                                    <FaUserDoctor />
                                    {item.docterInforData[0] && item.docterInforData[0].fullName}
                                  </div>
                                  <div className={cx('infoLine')}>
                                    <BsGenderAmbiguous />
                                    Giới tính: {item.docterInforData[0] && item.docterInforData[0].gender}
                                  </div>
                                  <div className={cx('infoLine')}>
                                    <CiMedicalCross />
                                    Chuyên khoa: bổ sung sau
                                  </div>
                                  <div className={cx('infoLine')}>
                                    <GrSchedules />
                                    Lịch khám: {item.scheduleData[0] && item.scheduleData[0].date}
                                  </div>
                                  <div className={cx('infoLine')}>
                                    <MdOutlinePriceChange />
                                    Giá khám: {item.priceData[0] && item.priceData[0].valueVn}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('exit')}>
            <Button
              to="/dich-vu-y-te/dat-kham-theo-bac-sy"
              className={cx('btn-exit')}
              text
              rightIcon={<RiArrowGoBackLine />}
            >
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDoctorDetail;
