import classNames from 'classnames/bind';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';

import style from './Facilitie.module.scss';
const cx = classNames.bind(style);

function Facilitie() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    document.title = 'Cơ sở y tế || Medpro';
  }, []);

  return (
    <div className={cx('facilitie')}>
      <div className={cx('breadcrumb')}>
        <div className={cx('breadcrumb__container')}>
          <ul>
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <MdKeyboardArrowRight style={{ width: '1.8rem', height: '1.8rem', color: '#999' }} />
              <span>Cở sở y tế</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className={cx('facilitie__content')}>
          <div className={cx('facilitie__header')}>
            <div className={cx('facilitie__header--title')}>Cơ sở y tế</div>
            <div className={cx('facilitie__header--des')}>
              Với những cơ sở y tế hàng đầu sẽ giúp trảo nghiệm khám, chữa bệnh của bạn tốt hơn
            </div>
          </div>
          <div className={cx('facilitie__body')}>
            <div className={cx('facilitie__formcontent')}>
              <div className={cx('facilitie__formcontent--item')}>
                <div className={cx('facilitie__formcontent--icon')}>
                  <CiSearch style={{ width: '2rem', height: '2rem' }} />
                </div>
                <div className={cx('facilitie__formcontent--input')}>
                  <input placeholder="Tìm kiếm cơ sở y tế ..." />
                </div>
              </div>
              <div className={cx('facilitie__formcontent--item')}>
                <div className={cx('facilitie__formcontent--icon')}>
                  <CiLocationOn style={{ width: '2rem', height: '2rem' }} />
                </div>
                <div className={cx('facilitie__formcontent--input')}>
                  <input placeholder="Chọn tỉnh thành ..." />
                </div>
              </div>
            </div>
          </div>
          <div className={cx('facilitie__tag')}>
            <Button
              rounded
              className={cx('facilitie__tag--btn', { active: activeTab === 0 })}
              onClick={() => setActiveTab(0)}
            >
              Bệnh viện công
            </Button>
            <Button
              rounded
              className={cx('facilitie__tag--btn', { active: activeTab === 1 })}
              onClick={() => setActiveTab(1)}
            >
              Bệnh viện tư
            </Button>
            <Button
              rounded
              className={cx('facilitie__tag--btn', { active: activeTab === 2 })}
              onClick={() => setActiveTab(2)}
            >
              Phòng khám
            </Button>
            <Button
              rounded
              className={cx('facilitie__tag--btn', { active: activeTab === 3 })}
              onClick={() => setActiveTab(3)}
            >
              Phòng mạch
            </Button>
          </div>
        </div>
        <div className={cx('facilitie__container')}>
          <h1> đợi render dữ liệu</h1>
        </div>
        <div className={cx('facilitie__contact')}>
          <div className={cx('facilitie__contact--card')}>
            <div className={cx('facilitie__contact--header')}>
              <div className={cx('facilitie__contact--title')}>Liên hệ hợp tác</div>
            </div>
            <div className={cx('facilitie__contact--fromContact')}>
              <form className={cx('facilitie__contact--from')}>
                <div className={cx('facilitie__contact--fromInputItem')}>
                  <input placeholder="Tên đơn vị/ Người liên hệ" />
                </div>
                <div className={cx('facilitie__contact--fromInputItem')}>
                  <input placeholder="Email" />
                </div>
                <div className={cx('facilitie__contact--fromInputItem')}>
                  <input placeholder="Số điện thoại" />
                </div>
                <div className={cx('facilitie__contact--fromInputItem')}>
                  <textarea placeholder="ghi chú" />
                </div>
                <Button rounded className={cx('facilitie__contact--btn')}>
                  Gửi
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facilitie;
