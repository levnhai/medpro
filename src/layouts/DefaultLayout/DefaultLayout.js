import classNames from 'classnames/bind';
// import { useState, useEffect, useRef } from 'react';

import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

import style from './DefaultLayout.module.scss';

const cx = classNames.bind(style);

// const INITIAL_SCROLL = 0;

function DefaultLayout({ children }) {
  // const [scroll, setScroll] = useState(INITIAL_SCROLL);

  // const styles = document.querySelector('.wrapper');

  // const prevScroll = useRef(INITIAL_SCROLL);

  // useEffect(() => {
  //   const onScroll = () => setScroll(window.pageYOffset);
  //   prevScroll.current = scroll;

  //   // clean up code
  //   window.removeEventListener('scroll', onScroll);
  //   window.addEventListener('scroll', onScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', onScroll);
  // }, [scroll]);

  // const handleOnScroll = () => {
  //   if (scroll > prevScroll.current) {
  //     console.log('len', scroll, prevScroll);
  //   } else {
  //     console.log('xuôgs', scroll, prevScroll);
  //   }
  // };

  // handleOnScroll();
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
