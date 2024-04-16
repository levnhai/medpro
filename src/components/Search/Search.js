import { useState, useEffect, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { CiSearch } from 'react-icons/ci';
import { GrLocation } from 'react-icons/gr';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { adminServices } from '~/services';
// import { SearchIcon } from '~/components/Icons';
// import AccountItem from '~/components/AccountItem';
// import * as searchServices from '~/services/searchService';

import { useDebounce } from '~/hooks';
import classNames from 'classnames/bind';
import style from './Search.module.scss';

const cx = classNames.bind(style);

function Search() {
  const [searchValueBasic, setsearchValueBasic] = useState('');
  const [searchValueProvince, setSearchValueProvince] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [provinceData, setProvinceData] = useState([]);

  const inputRef = useRef();
  const debouncedValue = useDebounce(searchValueBasic, 500);

  // useEffect(() => {
  //   if (!debouncedValue.trim()) {
  //     setSearchResult([]);
  //     return;
  //   }
  //   const fetchApi = async () => {
  //     // setLoading(true);
  //     // const result = await searchServices.search(debouncedValue);
  //     // setSearchResult(result);
  //     // setLoading(false);
  //   };
  //   fetchApi();
  // }, [debouncedValue]);

  const handleClear = () => {
    setsearchValueBasic('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValueBasic = e.target.value;
    if (!searchValueBasic.startsWith(' ')) {
      setsearchValueBasic(searchValueBasic);
    }
  };

  const handleSearchProvince = async (e) => {
    let res = await adminServices.getAllProvince();
    setProvinceData(res.provinces.data);
  };

  return (
    <div>
      <div className={cx('search')}>
        <div className={cx('search-form')}>
          <div className={cx('form-content')}>
            <HeadlessTippy
              interactive={true}
              visible={false}
              render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                    <h4 className={cx('search-title')}>Accounts 12345t</h4>
                    {/* {provinceData &&
                provinceData.map(
                  (result, index) => <div key={index} data={result}></div>,
                  // console.log(result),
                )} */}
                  </PopperWrapper>
                </div>
              )}
              onClickOutside={handleHideResult}
            >
              <div className={cx('search-item')}>
                <span className={cx('item-icon')}>
                  <CiSearch />
                </span>
                <input
                  type="text"
                  className={cx('input-item')}
                  onChange={handleChange}
                  ref={inputRef}
                  spellCheck={false}
                  value={searchValueBasic}
                  placeholder="Tìm kiếm cơ sở y tế"
                  onFocus={() => {
                    setShowResult(true);
                  }}
                />
                {!!searchValueBasic && !loading && (
                  <button className={cx('clear')}>
                    <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} />
                  </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
              </div>
            </HeadlessTippy>
            <HeadlessTippy
              placement="bottom"
              interactive={true}
              visible={showResult && provinceData.length > 0}
              render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                    <ul className={cx('search-result-list')}>
                      {provinceData &&
                        provinceData.map((result, index) => (
                          <li className={cx('search-result-item')} key={index}>
                            {result.name}
                          </li>
                        ))}
                    </ul>
                  </PopperWrapper>
                </div>
              )}
              onClickOutside={handleHideResult}
            >
              <div className={cx('search-item')}>
                <span className={cx('item-icon')} style={{ color: '#333', fontSize: 20 }}>
                  <GrLocation />
                </span>
                <input
                  className={cx('input-item')}
                  type="text"
                  onChange={(e) => setSearchValueProvince(e.target.value)}
                  ref={inputRef}
                  spellCheck={false}
                  value={searchValueProvince}
                  onFocus={() => {
                    setShowResult(true);
                  }}
                  placeholder="Tất cả địa điểm"
                  onClick={handleSearchProvince}
                />

                {!!searchValueProvince ? (
                  <button
                    onClick={(e) => setSearchValueProvince('')}
                    onFocus={(e) => e.current.focus()}
                    className={cx('clear')}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} />
                  </button>
                ) : (
                  <span className={cx('clear')}>
                    <RiArrowDropDownLine />
                  </span>
                )}
              </div>
            </HeadlessTippy>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
