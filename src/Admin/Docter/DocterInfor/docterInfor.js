import classNames from 'classnames/bind';
import 'react-markdown-editor-lite/lib/index.css';
import Select, { createFilter } from 'react-select';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Input } from '~/components/Input/Input';
import Button from '~/components/Button';

import styles from './docterInfor.module.scss';
const cx = classNames.bind(styles);
function DocterInfor() {
  const [valueSelectedOption, setValueSelectedOption] = useState(null);
  const [listDocters, setListDocters] = useState();
  const topDoctors = useSelector((state) => state.auth.topDoctors);
  const MIN_INPUT_LENGTH = 3;

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

  const noOptionsMessage = (input) => (input.length >= MIN_INPUT_LENGTH ? 'No options' : 'No data docter');
  useEffect(() => {
    setListDocters(builDataInputSelect(topDoctors));
  }, []);

  return (
    <div className={cx('wapper')}>
      <div className={cx('header')}>
        <h1 className={cx('header-title')}>Thêm Thông Tin Bác Sỹ </h1>
      </div>
      <div>
        <div className={cx('wrapper-input')}>
          <div className={cx('input-item')}>
            <div>
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
            <div>
              <label>Thông tin giới thiệu</label>

              <input placeholder="Giới thiệu bác sỹ ..." />
            </div>
          </div>
          <div className={cx('input-item')}>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className={cx('actionBtn')}>
          <Button outline>Lưu</Button>
        </div>
      </div>
    </div>
  );
}

export default DocterInfor;
