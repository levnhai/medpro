import classNames from 'classnames/bind';
import Header from '../components/Header';

import { CheckIcon } from '~/components/Icon';
import Support from '~/layouts/components/Support';
import styles from './Refunds.module.scss';

const cx = classNames.bind(styles);
function Question() {
  return (
    <div className={cx('guide_refunds')}>
      <Header />
      <div className={cx('refunds_wapper')}>
        <div className={cx('refunds_container')}>
          <div className={cx('refunds_header')}>
            <h1 className={cx('header_title')}>Quy trình hoàn phí</h1>
            <div className={cx('header_tag')}>
              Để hỗ trợ quý khách hàng thuận tiện trong vấn đề chi phí,<br></br>
              <b>Medpro</b> xin hướng dẫn quy trình hoàn phí như sau :
            </div>
          </div>
          <div className={cx('refunds_card')}>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>ĐIỀU KIỆN ĐỂ ĐƯỢC HOÀN TIỀN</h3>
                </div>
                <ul>
                  <li>
                    <CheckIcon />
                    &nbsp; Bạn chỉ được hoàn tiền khi thực hiện thành công yêu cầu hủy phiếu khám bệnh trên phần mềm
                    theo yêu cầu quy định
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>CÁC BƯỚC HOÀN TIỀN</h3>
                </div>
                <ul>
                  <li>
                    <CheckIcon />
                    &nbsp; Khi bạn thực hiện việc thanh toán bằng phương thức nào, thì phần mềm hoàn tiền cho bạn bằng
                    đúng phương thức và đúng số tiền đã thanh toán trước đó.
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('content_item')}>
              <div className={cx('content_Icon')}></div>
              <div className={cx('content_detail')}>
                <div className={cx('content_title')}>
                  <h3>THỜI GIAN HOÀN TIỀN</h3>
                </div>
                <ul>
                  <li>
                    <CheckIcon />
                    &nbsp; Thẻ khám bệnh: 1 - 30 ngày làm việc.
                  </li>
                  <li>
                    <CheckIcon />
                    &nbsp; Thẻ ATM nội địa: 1 - 30 ngày làm việc.
                  </li>
                  <li>
                    <CheckIcon />
                    &nbsp; Thẻ tín dụng VISA, MasterCard: 1 - 45 ngày làm việc.
                  </li>
                  <li>
                    <CheckIcon />
                    &nbsp; Tính từ thời điểm bạn thực hiện hủy phiếu khám bệnh thành công, nếu quá thời gian công trên
                    bạn vẫn chưa nhận được tiền hoàn, vui lòng liên hệ tổng đài 1900 2115 chúng tôi sẽ hổ trợ bạn.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('refunds_support')}>
        <Support />
      </div>
    </div>
  );
}

export default Question;
