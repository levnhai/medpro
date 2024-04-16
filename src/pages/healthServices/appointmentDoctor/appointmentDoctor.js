import classNames from 'classnames/bind';
import style from './appointmentDoctor.module.scss';
import { useNavigate } from 'react-router-dom';

import Header from '../components/header/header';
import Search from '~/components/Search';
import Button from '~/components/Button';
import { useEffect, useState, useMemo } from 'react';
import { Buffer } from 'buffer';
import { adminServices } from '~/services';
import Pagination from '~/components/Pagination/pagination';

const cx = classNames.bind(style);

let PageSize = 4;
function AppointmentDoctor() {
  const [hospitalData, setHospitalData] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return hospitalData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, hospitalData]);

  const handleDetailAppointmentDoctor = (item) => {
    navigate(`/chon-lich-kham/${item._id}`);
  };

  useEffect(() => {
    const callApi = async () => {
      let res = await adminServices.getAllHospital();
      setHospitalData(res.hospital.data);
    };
    callApi();
  }, []);

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
            <Button className={cx('tag-Btn')} rounded>
              Tất cả
            </Button>
          </li>
          <li>
            <Button className={cx('tag-Btn')} rounded>
              Bệnh viện
            </Button>
          </li>
          <li>
            <Button className={cx('tag-Btn')} rounded>
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
                      <div className={cx('content-name')}>{item.name}</div>
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
        totalCount={hospitalData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default AppointmentDoctor;
