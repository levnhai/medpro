import React, { useEffect, useState } from 'react';

import Button from '~/components/Button';
import { userServices } from '~/services';
import CreateUser from './Modal/CreateUser';
import DeleteUser from './Modal/DeleteUser';
import EditUser from './Modal/EditUser';

import classNames from 'classnames/bind';
import styles from './Users.module.scss';
const cx = classNames.bind(styles);

function User() {
  const [userData, setUserData] = useState();
  const [deleteUserId, setDeleteUserId] = useState();
  const [editUser, setEditUser] = useState({});
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  // lấy tất cả user có trong database
  const handleGetAllUser = async () => {
    const getAllUsers = await userServices.getAllData('R3');
    if (getAllUsers) {
      setUserData(getAllUsers.data);
    }
  };

  // xóa user theo id
  const handleBtnDeleteUser = async (data) => {
    setShowModalDelete(true);
    setDeleteUserId(data._id);
  };

  // EditUser theo id
  const handleBtnEditUser = async (data) => {
    setShowModalEdit(true);
    setEditUser(data);
  };

  useEffect(() => {
    handleGetAllUser();
  }, []);

  return (
    <div className={cx('wapper')}>
      <div>
        <div className={cx('manage-user')}>
          <h1 className={cx('header-title')}>MANAGE USER</h1>
          <Button
            rouder
            onClick={(e) => {
              setShowModalCreate(true);
            }}
            className={cx('addUserBtn')}
          >
            Add User
          </Button>
          <table className={cx('table')}>
            <thead>
              <tr>
                <th>Stt</th>
                <th>fullName</th>
                <th>Phone Number</th>
                <th>createdAt</th>
                <th></th>
              </tr>
            </thead>
            {userData &&
              userData.data.map((user, index) => {
                return (
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{user.fullName}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.createdAt}</td>
                      <td>
                        <button
                          className={cx('btn-icon')}
                          onClick={() => {
                            handleBtnEditUser(user);
                          }}
                        >
                          <i className="icon-btn-edit fa-solid fa-pencil"></i>
                        </button>
                        <button
                          onClick={() => {
                            handleBtnDeleteUser(user);
                          }}
                          className={cx('btn-icon')}
                        >
                          <i className="icon-btn-delete fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>

      <div>
        {showModalDelete && (
          <DeleteUser
            setShowModalDelete={setShowModalDelete}
            getAllUser={handleGetAllUser}
            deleteUserID={deleteUserId}
          />
        )}
        {showModalCreate && <CreateUser setShowModalCreate={setShowModalCreate} getAllUser={handleGetAllUser} />}
        {showModalEdit && (
          <EditUser setShowModalEdit={setShowModalEdit} getAllUser={handleGetAllUser} user={editUser} />
        )}
      </div>
    </div>
  );
}

export default User;
