import { Link } from 'react-router-dom';
import Button from '~/components/Button';

import className from 'classnames/bind';
import styles from './NotFound.module.scss';
import { useEffect } from 'react';

const cx = className.bind(styles);
function NotFound() {
  // change title document
  useEffect(() => {
    document.title = '404 || Medpro';
  }, []);
  return (
    <div className={cx('not-found')}>
      <h1>404</h1>
      <h5>Page not founf</h5>
      <Button to="/">Back to Home</Button>
    </div>
  );
}

export default NotFound;
