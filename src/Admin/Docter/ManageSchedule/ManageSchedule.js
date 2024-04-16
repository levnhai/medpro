import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select, { createFilter } from 'react-select';
import { adminServices } from '~/services';
import { formattedDate } from '~/utils/common';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '~/assets/css/react-datepicker.css';

import Button from '~/components/Button';

import classNames from 'classnames/bind';
import style from './ManageSchedule.module.scss';

const cx = classNames.bind(style);

function ManageSchedule() {
  const MIN_INPUT_LENGTH = 3;
  const [listDocters, setListDocters] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [rangeTime, setRangeTime] = useState([]);
  const [valueSelectedOption, setValueSelectedOption] = useState(null);

  const topDoctors = useSelector((state) => state.auth.topDoctors);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 14,
      color: '#666',
      cursor: 'pointer',
      zIndex: 100,
      backgroundColor: state.isSelected ? 'lightblue' : state.isFocused ? '#61bdbf' : 'white', // Change background color for selected options
    }),
  };

  const filterOption = (candidate, listDocters) => {
    return listDocters.length >= 0 && createFilter({})(candidate, listDocters);
  };

  const noOptionsMessage = (input) => (input.length >= MIN_INPUT_LENGTH ? 'No options' : 'No data docter');

  const builDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.data.length > 0) {
      inputData.data.map((item) => {
        let object = {};
        object.value = item._id;
        object.label = item.fullName;
        return result.push(object);
      });
    }
    return result;
  };

  const handleClickBtnTime = (time) => {
    if (rangeTime && rangeTime.length > 0) {
      const updatedRangeTime = rangeTime.map((item) => {
        if (item._id === time._id) {
          return { ...item, isSelected: !item.isSelected };
        }
        return item;
      });
      setRangeTime(updatedRangeTime);
    }
  };

  const handleGetALlDataRangeTime = async () => {
    let typeInput = 'TIME';
    let res = await adminServices.getAllCodeData(typeInput);
    if (res.allCodeData && res.allCodeData.data.length > 0) {
      res = res.allCodeData.data.map((item) => ({ ...item, isSelected: false }));
    }

    setRangeTime(res);
  };

  const handleSaveSchedule = async () => {
    let date = formattedDate(startDate);
    let result = [];
    if (!valueSelectedOption) {
      toast.error('invalid selected docter ...');
      return;
    }
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.docterId = valueSelectedOption.value;
          object.date = date;
          object.timeType = item.keyMap;
          return result.push(object);
        });
      }
    }

    let res = await adminServices.saveBulkScheduleDocter({
      schedule: result,
      docterId: valueSelectedOption.value,
      formattedDate: date,
    });

    if (res.schedule.errCode === 0) {
      toast.success(res.schedule.errMessage);
    }
  };

  useEffect(() => {
    setListDocters(builDataInputSelect(topDoctors));
    handleGetALlDataRangeTime();
  }, []);

  return (
    <div className={cx('ManageSchedule')}>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <h3>Quản lý đặt lịch khám bệnh</h3>
        </div>
        <div className={cx('body')}>
          <div className={cx('wrapper--input')}>
            <div className={cx('input--item')}>
              <label>Chọn bác sỹ</label>
              <Select
                filterOption={filterOption}
                noOptionsMessage={noOptionsMessage}
                options={listDocters}
                styles={customStyles}
                defaultValue={valueSelectedOption}
                onChange={setValueSelectedOption}
              />
            </div>
            <div className={cx('input--item')}>
              <label>Chọn ngày</label>
              <DatePicker
                className={cx('customInput')}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
            </div>
          </div>
          <div className={cx('pick-hour')}>
            <div className={cx('wapper')}>
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <Button
                      onClick={() => handleClickBtnTime(item)}
                      className={cx('timebtn', { active: item.isSelected })}
                      outline
                      key={index}
                    >
                      {item.valueVi}
                    </Button>
                  );
                })}
            </div>
          </div>
          <div className={cx('btn-action')}>
            <Button onClick={handleSaveSchedule} primary>
              Lưu thông tin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageSchedule;
