import classNames from 'classnames/bind';
import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import { fetchALlDataProvince } from '~/redux/province/provinceSlice';
import { fetchALlDataHospital } from '~/redux/hospital/hospitalSlider';
import { builDataInputSelect } from '~/utils/common';
// import Select from '../../../../utils/select';
import Select from '~/components/Select/Select';

import {
  fetchAllDoctors,
  fetchALlDataPrice,
  fetchALlDataPayment,
  fetchSaveDocterInfor,
} from '~/redux/docter/docterSlice';

import styles from './docterInfor.module.scss';
const cx = classNames.bind(styles);

function DocterInfor() {
  const dispatch = useDispatch();
  const allDoctors = useSelector((state) => state.docter.docterData);
  const priceData = useSelector((state) => state.docter.priceData);
  const paymentData = useSelector((state) => state.docter.paymentData);
  const provinceData = useSelector((state) => state.province.provinceData);
  const hospitalData = useSelector((state) => state.hospital.hospitalData);

  const [listDocters, setListDocters] = useState();
  const [listPrices, setListPrices] = useState();
  const [listPayments, setListPayments] = useState();
  const [listProvinces, setlistProvinces] = useState();
  const [listHospital, setListHospital] = useState();

  const [form, setForm] = useState({
    docters: null,
    prices: null,
    payments: null,
    provinces: null,
    hospitals: null,
    note: null,
    introduceDocter: null,
  });

  const onValidate = (value, name) => {
    setError((prev) => ({
      ...prev,
      [name]: { ...prev[name], errorMsg: value },
    }));
  };

  const [error, setError] = useState({
    docters: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate,
    },
    prices: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate,
    },
    payments: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate,
    },
    provinces: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate,
    },
    hospitals: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate,
    },
  });

  const onHandleChange = useCallback((value, name) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validateForm = () => {
    let isInvalid = false;
    Object.keys(error).forEach((x) => {
      const errObj = error[x];
      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && !form[x]) {
        isInvalid = true;
        onValidate(true, x);
      }
    });
    return !isInvalid;
  };

  const handleSaveDocterinfo = async () => {
    const isValid = validateForm();
    if (!isValid) {
      console.error('Invalid Form!');
      return false;
    }
    const docterInfor = await dispatch(fetchSaveDocterInfor(form));

    if (docterInfor.payload.errCode === 0) {
      toast.success(`${docterInfor.payload.errMessage}`);
    }
  };

  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchALlDataPrice());
    dispatch(fetchALlDataPayment());
    dispatch(fetchALlDataProvince());
    dispatch(fetchALlDataHospital());
  }, [dispatch]);

  useEffect(() => {
    setListDocters(builDataInputSelect(allDoctors, 'USERS'));
  }, [allDoctors]);

  useEffect(() => {
    setListPrices(builDataInputSelect(priceData, 'ALLCODES'));
  }, [priceData]);

  useEffect(() => {
    setListPayments(builDataInputSelect(paymentData, 'ALLCODES'));
  }, [paymentData]);

  useEffect(() => {
    setlistProvinces(builDataInputSelect(provinceData, 'PROVINCE'));
  }, [provinceData]);

  useEffect(() => {
    setListHospital(builDataInputSelect(hospitalData, 'USERS'));
  }, [hospitalData]);

  return (
    <div className={cx('wapper')}>
      <div className={cx('header')}>
        <h1 className={cx('header-title')}>Thêm Thông Tin Bác Sỹ </h1>
      </div>
      <div>
        <div className={cx('wrapper-input')}>
          <div>
            <div className={cx('input-item')}>
              <Select
                title="Chọn bác sỹ"
                name="docters"
                id="docters"
                options={listDocters}
                value={form.docters}
                onChangeFunc={onHandleChange}
                {...error.docters}
              />
            </div>
            <div className={cx('input-item')}>
              <label className={cx('input-lable')}>Thông tin giới thiệu</label>
              <textarea
                className={cx('input-lable')}
                onChange={(e) => onHandleChange(e.target.value, 'introduceDocter')}
                placeholder="Giới thiệu bác sỹ ..."
              />
            </div>
          </div>
          <div>
            <div className={cx('input-item')}>
              <Select
                title="Giá khám bệnh"
                name="prices"
                value={form.prices}
                options={listPrices}
                placeholder="Giá khám bệnh ...."
                onChangeFunc={onHandleChange}
                {...error.prices}
              />
            </div>
            <div className={cx('input-item')}>
              <Select
                title="Phương thức thanh toán"
                name="payments"
                options={listPayments}
                value={form.payments}
                placeholder="Phương thức thanh toán"
                onChangeFunc={onHandleChange}
                {...error.payments}
              />
            </div>
            <div className={cx('input-item')}>
              <Select
                title="Tỉnh/thành"
                name="provinces"
                options={listProvinces}
                placeholder="Tỉnh thành ..."
                value={form.provinces}
                onChangeFunc={onHandleChange}
                {...error.provinces}
              />
            </div>
          </div>
          <div>
            <div className={cx('input-item')}>
              <Select
                title="Chọn phòng khám bệnh"
                name="hospitals"
                value={form.hospitals}
                options={listHospital}
                placeholder="chọn phòng khám bệnh viện..."
                onChangeFunc={onHandleChange}
                {...error.hospitals}
              />
            </div>
            <div className={cx('input-item')}>
              <label className={cx('input-lable')}>note</label>
              <textarea
                className={cx('input-lable')}
                onChange={(e) => onHandleChange(e.target.value, 'note')}
                placeholder="Note ..."
              />
            </div>
          </div>
        </div>

        <div className={cx('actionBtn')}>
          <Button outline onClick={handleSaveDocterinfo}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DocterInfor;
