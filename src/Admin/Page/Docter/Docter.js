import React, { useEffect, useState } from 'react';

import Button from '~/components/Button';
import { adminServices } from '~/services';
import CreateDocter from './Modal/CreateDocter';
import DeleteDocter from './Modal/DeleteDocter';
import EditDocter from './Modal/EditDocter';

import classNames from 'classnames/bind';
import styles from './Docter.module.scss';
const cx = classNames.bind(styles);

function Docter() {
  const [userData, setUserData] = useState(null);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState();
  const [deleteDocterId, setDeleteDocterId] = useState();

  const [editDocter, setEditDocter] = useState({});

  // lấy tất cả user có trong database
  const handleGetAllDocter = async () => {
    const getAllDocters = await adminServices.getAllDocters('all');
    console.log(getAllDocters);
    if (getAllDocters) {
      setUserData(getAllDocters.data);
    }
  };

  // xóa docter theo id
  const handleBtnDeleteDocter = async (docterId) => {
    console.log('docterId', docterId);
    setShowModalDelete(true);
    setDeleteDocterId(docterId);
  };

  // sửa bác sỹ theo id theo id
  const handleBtnEditDocter = async (data) => {
    setShowModalEdit(true);
    setEditDocter(data);
  };

  useEffect(() => {
    handleGetAllDocter();
  }, []);

  return (
    <div className={cx('wapper')}>
      <div>
        <div className={cx('manage-user')}>
          <h1 className={cx('header-title')}>MANAGE Docter</h1>
          <Button
            rouder
            onClick={(e) => {
              setShowModalCreate(true);
            }}
            className={cx('addUserBtn')}
          >
            Add Docter
          </Button>
          <table className={cx('table')}>
            <thead>
              <tr>
                <th>Stt</th>
                <th>fullName</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Chức vụ</th>
                <th>Quản trị</th>
                <th>Ngày tạo</th>
                <th></th>
              </tr>
            </thead>
            {userData &&
              userData.map((user, index) => {
                return (
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{user.fullName}</td>
                      <td>0{user.phoneNumber}</td>
                      <td>{user.email}</td>
                      <td>{user.gender}</td>
                      <td>{user.positionId}</td>
                      <td>{user.roleId}</td>
                      <td>{user.createdAt}</td>
                      <td>
                        <button
                          className={cx('btn-icon')}
                          onClick={() => {
                            handleBtnEditDocter(user);
                          }}
                        >
                          <i className="icon-btn-edit fa-solid fa-pencil"></i>
                        </button>
                        <button
                          onClick={() => {
                            handleBtnDeleteDocter(user._id);
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
          <DeleteDocter
            setShowModalDelete={setShowModalDelete}
            handleGetAllDocter={handleGetAllDocter}
            deleteDocterId={deleteDocterId}
          />
        )}
        {showModalCreate && <CreateDocter setShowModalCreate={setShowModalCreate} getAllUser={handleGetAllDocter} />}
        {showModalEdit && (
          <EditDocter setShowModalEdit={setShowModalEdit} getAllDocter={handleGetAllDocter} docterData={editDocter} />
        )}
      </div>
    </div>
  );
}

export default Docter;