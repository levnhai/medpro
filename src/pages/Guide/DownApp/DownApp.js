import classNames from 'classnames/bind';
import Header from '../components/Header';

import { BsCheckLg } from 'react-icons/bs';

import Support from '~/layouts/components/Support';
import styles from './DownApp.module.scss';

const cx = classNames.bind(styles);

function DownApp() {
  return (
    <div className={cx('guide_downApp')}>
      <Header />
      <div className={cx('downApp_container')}>
        <div className={cx('downApp_install')}>
          <div className={cx('install_header')}>
            <div className={cx('install_title')}>Hướng dẫn cài đặt ứng dụng</div>
            <div className={cx('install_dess')}>
              Người dùng tải ứng dụng di động Medpro để trải nghiệm sản phẩm tốt nhất và sử dụng các tính năng dịch vụ
              mới nhất. Vui lòng cài đặt ứng dụng theo hướng dẫn như sau.
            </div>
          </div>
          <div className={cx('install_content')}>
            <ul className={cx('content_list')}>
              <li className={cx('content_item')}>
                <h2>
                  <BsCheckLg style={{ color: '#116bea' }} />
                  Cách 1:
                </h2>
                <h3> Tải ứng dụng:</h3>
              </li>
              <li className={cx('content_item')}>
                <h2>
                  <BsCheckLg style={{ color: '#116bea' }} />
                  Cách 2:
                </h2>
                <h3> Tìm kiếm theo từ khóa "Medpro" trên App Store(IOS) hoặc Google Play(Android)</h3>
              </li>
              <li className={cx('content_item')}>
                <h2>
                  <BsCheckLg style={{ color: '#116bea' }} />
                  Cách 3:
                </h2>
                <div className={cx('content_Qr')}>
                  <h3> Quét mã QR:</h3>
                  <img
                    src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fqr.586d5405.png&w=384&q=75"
                    alt=""
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('downApp_support')}>
        <Support />
      </div>
    </div>
  );
}

export default DownApp;
