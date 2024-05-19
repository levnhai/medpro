import React, { useEffect, useState } from 'react';

import Button from '~/components/Button';
import CreateDocter from './Modal/CreateDocter';
import DeleteDocter from './Modal/DeleteDocter';
import EditDocter from './Modal/EditDocter';
import classNames from 'classnames/bind';
import styles from './Docter.module.scss';
import { fetchAllDoctors } from '~/redux/docter/docterSlice';
import { useSelector, useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function Docter() {
  const dispatch = useDispatch();
  const docterData = useSelector((state) => state.docter.docterData);

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState();
  const [deleteDocterId, setDeleteDocterId] = useState();
  const [editDocter, setEditDocter] = useState({});

  // xóa docter theo id
  const handleBtnDeleteDocter = async (docterId) => {
    setShowModalDelete(true);
    setDeleteDocterId(docterId);
  };

  // sửa bác sỹ theo id theo id
  const handleBtnEditDocter = async (data) => {
    setShowModalEdit(true);
    setEditDocter(data);
  };

  // lấy tất cả docter có trong database
  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  useEffect(() => {}, [docterData]);

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
            {docterData &&
              docterData.map((user, index) => {
                return (
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{user.fullName}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                      <td>{user.gender === 0 ? 'Giới tính khác' : user.gender === 'M' ? 'Nam' : 'Nữ'}</td>
                      <td>
                        {user.positionId === 'P0'
                          ? 'Bác sỹ'
                          : user.positionId === 'P1'
                          ? 'Thạc sỹ'
                          : user.positionId === 'P2'
                          ? 'Tiến sỹ'
                          : user.positionId === 'P3'
                          ? 'Phó giáo sư'
                          : 'Giáo sư'}
                      </td>
                      <td>{user.roleId === 'R2' ? 'Bác sỹ' : user.roleId === 'R3' ? 'Bệnh Nhân' : 'Quản trị viên'}</td>
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
            handleGetAllDocter={() => dispatch(fetchAllDoctors())}
            deleteDocterId={deleteDocterId}
          />
        )}
        {showModalCreate && (
          <CreateDocter setShowModalCreate={setShowModalCreate} getAllUser={() => dispatch(fetchAllDoctors())} />
        )}
        {showModalEdit && (
          <EditDocter
            setShowModalEdit={setShowModalEdit}
            docterData={editDocter}
            getAllDocter={() => dispatch(fetchAllDoctors())}
          />
        )}
      </div>
    </div>
  );
}

export default Docter;
