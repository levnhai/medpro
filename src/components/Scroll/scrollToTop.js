import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('Pathname changed:', pathname); // Log để kiểm tra
    window.scrollTo(0, 0);
    console.log('Scroll to top called'); // Log để kiểm tra
  }, [pathname]);

  return null; // Phải trả về JSX, ở đây là null
};

export default ScrollToTop;
