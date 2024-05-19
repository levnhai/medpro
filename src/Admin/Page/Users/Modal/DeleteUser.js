import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { userServices } from '~/services';

import className from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = className.bind(styles);

function DeleteUser({ setShowModalDelete, deleteUserID, getAllUser }) {
  // xóa user theo id

  const handleBtnDeleteUser = async (deleteUserID) => {
    const user = await userServices.deleteUser(deleteUserID);
    if (user) {
      setShowModalDelete(false);
      getAllUser();
      toast.success('Xóa thành công');
    } else {
      toast.success('Xóa không thành công');
    }
  };
  return (
    <>
      <div className={cx('darkBG')} onClick={() => setShowModalDelete(false)} />
      <div className={cx('centered')}>
        <div className={cx('modal')}>
          <div className={cx('modalHeader')}>
            <h5 className={cx('heading')}>Delete User</h5>
          </div>
          <button className={cx('closeBtn')} onClick={() => setShowModalDelete(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={cx('modalContent')}>
            <h3>Bạn thực sự muốn xóa nó không</h3>
          </div>
          <div className={cx('modalActions')}>
            <div className={cx('actionsContainer')}>
              <button
                className={cx('deleteBtn')}
                onClick={() => {
                  handleBtnDeleteUser(deleteUserID);
                }}
              >
                Delete User
              </button>
              <button className={cx('cancelBtn')} onClick={() => setShowModalDelete(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteUser;
