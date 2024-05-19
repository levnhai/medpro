import classNames from 'classnames/bind';
import style from './appointmentDoctor.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/header/header';
import Search from '~/components/Search';
import Button from '~/components/Button';
import { useEffect, useState, useMemo } from 'react';
import { Buffer } from 'buffer';
import Pagination from '~/components/Pagination/pagination';
import { fetchALlDataHospital } from '~/redux/hospital/hospitalSlider';

const cx = classNames.bind(style);
let PageSize = 4;

function AppointmentDoctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hospitalData = useSelector((state) => state.hospital.hospitalData);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return hospitalData && hospitalData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, hospitalData]);

  const handleDetailAppointmentDoctor = (item) => {
    navigate(`/chon-lich-kham/${item._id}`);
  };

  useEffect(() => {
    dispatch(fetchALlDataHospital());
  }, [dispatch]);

  return (
    <div className={cx('main')}>
      <Header
        bannerImage="https://cdn-pkh.longvan.net/prod-partner/5723a272-a318-4b67-ba8d-af9d1d3d69b4-young-asian-female-dentist-white-coat-posing-clinic-equipment_1.png"
        title="Đặt khám theo bác sỹ"
        contentSpan="Chủ động chọn bác sỹ mà bạn tin tưởng nhất"
      />
      <div className={cx('body')}>
        <Search />
        <ul className={cx('tag')}>
          <li>
            <Button className={cx('tag-Btn', { active: activeTab === 0 })} rounded onClick={() => setActiveTab(0)}>
              Tất cả
            </Button>
          </li>
          <li>
            <Button className={cx('tag-Btn', { active: activeTab === 1 })} rounded onClick={() => setActiveTab(1)}>
              Bệnh viện
            </Button>
          </li>
          <li>
            <Button className={cx('tag-Btn', { active: activeTab === 2 })} rounded onClick={() => setActiveTab(2)}>
              Phòng khám/Phòng mạch/Xét nghiệm/khác
            </Button>
          </li>
        </ul>
        <div className={cx('container')}>
          {currentTableData &&
            currentTableData.map((item, index) => {
              let image = '';
              if (item.image) {
                image = Buffer.from(item.image.data, 'base64').toString('binary');
              }
              return (
                <div key={index} className={cx('content')} onClick={() => handleDetailAppointmentDoctor(item)}>
                  <div className={cx('content-title')}>
                    <div className={cx('content-image')} style={{ backgroundImage: `url(${image})` }}></div>
                    <div className={cx('content-title-ini')}>
                      <div className={cx('content-name')}>{item.fullName}</div>
                      <div className={cx('content-address')}>{item.address}</div>
                      <div className={cx('content-groupBtn')}>
                        <Button className={cx('content-btn')}>Đặt khám ngay</Button>
                        <Button className={cx('content-btn')}>Xem chi tiết</Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={hospitalData && hospitalData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default AppointmentDoctor;
