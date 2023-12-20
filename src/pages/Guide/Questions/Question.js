import { useEffect, useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '~/assets/css/react-tabs.css';

import Header from '../components/Header';
import styles from './Question.module.scss';
import { TabNavQuestion, CollapseExpand } from '~/components/Icon';
import Support from '~/layouts/components/Support';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Question() {
  // show hide modal
  useEffect(() => {
    const collapseElements = document.querySelectorAll(`.${cx('collapse__item')}`);
    console.log(collapseElements.length);
    console.log(collapseElements);
    for (const collapseElement of collapseElements) {
      const collapse = collapseElement.querySelector(`.${cx('collapse__content')}`);
      collapseElement.addEventListener('click', () => {
        console.log('showw');
        collapse.classList.toggle(cx('showHideModal'));
      });
    }
  }, []);

  return (
    <div className={cx('guide_question')}>
      <Header />
      <div className={cx('question__container')}>
        <div className={cx('list__question')}>
          <div className={cx('tabs__wrap')}>
            <Tabs className={cx('tabs__list')} defaultIndex={0}>
              <TabList className={cx('tab__nav')}>
                <h4 className={cx('tab__nav--title')}>Danh sách câu hỏi</h4>
                <Tab className={cx('tab__nav--item')}>
                  <TabNavQuestion />
                  Vấn đề chung
                </Tab>
                <Tab className={cx('tab__nav--item')}>
                  <TabNavQuestion />
                  Vấn đề tài khoản
                </Tab>
                <Tab className={cx('tab__nav--item')}>
                  <TabNavQuestion />
                  Vấn đề về quy trình đặt khám
                </Tab>
                <Tab className={cx('tab__nav--item')}>
                  <TabNavQuestion />
                  Vấn đề về thanh toán
                </Tab>
              </TabList>
              <TabPanel>
                <div className="tab__panel--collapse">
                  <div className={cx('collapse__item')}>
                    <div className={cx('collapse__header')}>
                      <div className={cx('collapse__header--title')}>
                        Lợi ích khi sử dụng phần mềm đăng ký khám bệnh trực tuyến này là gì?
                      </div>
                      <div className={cx('collapse__header--icon')}>
                        <CollapseExpand />
                      </div>
                    </div>
                    <div className={cx('collapse__content')}>
                      <div className={cx('collapse__content--box')}>
                        <div>
                          <p className={cx('collapse__content--title')}>
                            Đặt lịch khám bệnh theo hẹn, mọi lúc mọi nơi, mà không cần đến bệnh viện
                          </p>
                          <ul>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Giảm thời gian chờ khám tại bệnh viện.</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx('collapse__item')}>
                    <div className={cx('collapse__header')}>
                      <div className={cx('collapse__header--title')}>
                        Làm sao để sử dụng được phần mềm đăng kí khám bệnh trực tuyến ?
                      </div>
                      <div className={cx('collapse__header--icon')}>
                        <CollapseExpand />
                      </div>
                    </div>
                    <div className={cx('collapse__content')}>
                      <div className={cx('collapse__content--box')}>
                        <div>
                          <ul>
                            <li>
                              Có thể truy cập và sử dụng phần mềm trên tất cả thiết bị có thể truy cập mạng internet. (
                              3G,4G,5G,Wifi, dây mạng…..)
                            </li>
                            <li>Máy tính bàn, laptop: truy cập website</li>
                            <li>
                              Hầu hết điện thoại thông minh: tải ứng dụng phần mềm tại kho tải Gplay hoặc AppStore
                            </li>
                            <li>Máy tính bảng và các thiết bị khác ……</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="tab__panel--collapse">
                  <div className={cx('collapse__item')}>
                    <div className={cx('collapse__header')}>
                      <div className={cx('collapse__header--title')}>
                        Lợi ích khi sử dụng phần mềm đăng ký khám bệnh trực tuyến này là gì?
                      </div>
                      <div className={cx('collapse__header--icon')}>
                        <CollapseExpand />
                      </div>
                    </div>
                    <div className={cx('collapse__content')}>
                      <div className={cx('collapse__content--box')}>
                        <div>
                          <p className={cx('collapse__content--title')}>
                            Đặt lịch khám bệnh theo hẹn, mọi lúc mọi nơi, mà không cần đến bệnh viện
                          </p>
                          <ul>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Giảm thời gian chờ khám tại bệnh viện.</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                            <li>Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx('collapse__item')}>
                    <div className={cx('collapse__header')}>
                      <div className={cx('collapse__header--title')}>
                        Làm sao để sử dụng được phần mềm đăng kí khám bệnh trực tuyến ?
                      </div>
                      <div className={cx('collapse__header--icon')}>
                        <CollapseExpand />
                      </div>
                    </div>
                    <div className={cx('collapse__content')}>
                      <div className={cx('collapse__content--box')}>
                        <div>
                          <ul>
                            <li>
                              Có thể truy cập và sử dụng phần mềm trên tất cả thiết bị có thể truy cập mạng internet. (
                              3G,4G,5G,Wifi, dây mạng…..)
                            </li>
                            <li>Máy tính bàn, laptop: truy cập website</li>
                            <li>
                              Hầu hết điện thoại thông minh: tải ứng dụng phần mềm tại kho tải Gplay hoặc AppStore
                            </li>
                            <li>Máy tính bảng và các thiết bị khác ……</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>Vấn đề về quy trình đặt khám</TabPanel>
              <TabPanel>Vấn đề thanh toán</TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      <Support />
    </div>
  );
}

export default Question;
