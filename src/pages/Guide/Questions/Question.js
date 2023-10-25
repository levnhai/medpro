import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '~/assets/css/react-tabs.css';

import Header from '../components/Header';
import styles from './Question.module.scss';
import { TabNavQuestion, CollapseExpand } from '~/components/Icon';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Question() {
  const [state, setState] = useState(null);
  const allWithClass = Array.from(document.querySelectorAll('.collapse__item'));
  allWithClass.map((item, index) => {
    console.log(index);
    item.addEventListener('click', (e) => {
      // setState(e.target);
      // console.log(e.currentTarget);
      // const clickedElement = e.currentTarget.querySelector('.collapse__content');
      // console.log(e.target.classList.contains('collapse__item'));
      // clickedElement.addcla;
      // clickedElement.classList.toggle('collapse__content--active');
      // e.target.classList.add('bg-salmon');
    });
  });

  // let showContentTabs = state ? 'collapse__content--active' : 'collapse__content';

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
                  <div className="collapse__item">
                    <div className={cx('collapse__header')}>
                      <div className={cx('collapse__header--title')}>
                        Lợi ích khi sử dụng phần mềm đăng ký khám bệnh trực tuyến này là gì?
                      </div>
                      <div className={cx('collapse__header--icon')}>
                        <CollapseExpand />
                      </div>
                    </div>
                    <div className="collapse__content">
                      <div className={cx('collapse__content--box')}>
                        <div>
                          <p>Đặt lịch khám bệnh theo hẹn, mọi lúc mọi nơi, mà không cần đến bệnh viện</p>
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
                  <div className="collapse__item">
                    <div className={cx('collapse__header')}>
                      <div className={cx('collapse__header--title')}>hai kake</div>
                      <div className={cx('collapse__header--icon')}>
                        <CollapseExpand />
                      </div>
                    </div>
                    {/* <div className="collapse__content">
                      <div className={cx('collapse__content--box')}>
                        <div>
                          <p>hai ke kê</p>
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
                    </div> */}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>Vấn đề tài khoản</TabPanel>
              <TabPanel>Vấn đề về quy trình đặt khám</TabPanel>
              <TabPanel>Vấn đề thanh toán</TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
