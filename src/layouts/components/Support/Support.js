import classNames from 'classnames/bind';

import style from './Support.module.scss';
import { Qr_zaloIcon, PhoneIcon } from '~/components/Icon';

const cx = classNames.bind(style);

function Support() {
  return (
    <div className={cx('support')}>
      <div className={cx('support_image')}></div>
      <div className={cx('support_method')}>
        <div></div>
        <div className={cx('support_info')}>
          <div className={cx('info_phoneIcon')}>
            <PhoneIcon />
          </div>
          <div>
            <div className={cx('support_infoTitle')}>CÁC HÌNH THỨC HỖ TRỢ</div>
            <div className={cx('support_infoPhone')}>1900-2115</div>
          </div>
        </div>
        <div className={cx('support_qrCard')}>
          <div className={cx('support_qr')}>
            <Qr_zaloIcon />
            Zalo
          </div>
          <div className={cx('support_qr')}>
            <Qr_zaloIcon />
            Facebook
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
