import classNames from 'classnames/bind';
import Slider from 'react-slick';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import '../../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.css';

import Button from '~/components/Button';

import style from './OutStandingDocter.module.scss';
const cx = classNames.bind(style);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  let iconStyles = { width: '2rem', height: '2rem', color: '#003553' };
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        background: '#fff',
        width: 35,
        height: 35,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '-10px',
      }}
      onClick={onClick}
    >
      <MdKeyboardArrowRight style={iconStyles} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  let iconStyles = { width: '2rem', height: '2rem', color: '#003553' };
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        background: '#fff',
        width: 35,
        height: 35,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '-10px',
      }}
      onClick={onClick}
    >
      <MdKeyboardArrowLeft style={iconStyles} />
    </div>
  );
}

function OutStandingDocter() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={cx('wapper')}>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <div className={cx('header-title')}>Bác sỹ nổi bật trong tuần qua</div>
          <div className={cx('header-seeMoreBtn')}>
            <Button>Xem thêm</Button>
          </div>
        </div>

        <div>
          <div>
            <Slider {...settings}>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
              <div className={cx('profile')}>
                <div>
                  <img
                    className={cx('avata')}
                    src="https://cdn.bookingcare.vn/fo/w384/2023/02/23/141704-lenhatvinh400x400.jpg"
                    alt=""
                  />
                </div>
                <div className={cx('position')}>
                  <div>
                    Bác sỹ chuyên khoa <br />| Lê Văn Hải
                  </div>
                  <span>tai mũi họng</span>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutStandingDocter;
