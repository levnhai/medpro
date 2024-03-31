import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormProvider, useForm } from 'react-hook-form';
import 'react-markdown-editor-lite/lib/index.css';

import { Input } from '~/components/Input/Input';
import Button from '~/components/Button';
import { adminServices } from '~/services';

import styles from './Hospital.module.scss';
import { name_validation } from '~/utils/inputValidations';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function Hospital() {
  const mdParser = new MarkdownIt();
  const [provinceData, setProvinceData] = useState();
  const methods = useForm();
  const { setFocus, reset } = methods;

  const [formData, setFormData] = useState({
    provinceId: '',
    contentHTML: '',
    contentMarkdown: '',
    image: '',
  });

  // onChange
  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetInput = (e) => {
    // e.preventDefault();
    reset({
      name: '',
      address: '',
      phoneNumber: '',
      workingTime: '',
    });
    setFormData({
      provinceId: '',
      contentHTML: '',
      contentMarkdown: '',
      image: '',
    });
  };

  // onClick
  const handleEditorChange = ({ html, text }) => {
    setFormData({ ...formData, contentHTML: html, contentMarkdown: text });
  };

  const handleGetAllProvinceData = async () => {
    let data = await adminServices.getAllProvince();
    setProvinceData(data.provinces);
  };

  const handleCLickBtnSave = methods.handleSubmit(async (data) => {
    try {
      let result = { ...data, ...formData };
      let res = await adminServices.createNewClinic(result);
      if (res.errCode === 0 && res.hospitalData) {
        console.log('thanh cong');
        resetInput();
        toast.success(res.messageError);
      } else {
        toast.error(res.messageError);
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    handleGetAllProvinceData();
    setFocus('name');
  }, []);

  return (
    <div className={cx('wapper')}>
      <div className={cx('header')}>
        <h1 className={cx('header-title')}> Quản lý Bệnh viện </h1>
      </div>
      <div>
        <div className={cx('wrapper-input')}>
          <FormProvider {...methods}>
            <div className={cx('input-item')}>
              <div>
                <Input {...name_validation} label="Bệnh viện" name="name" id="name" />
              </div>
              <div>
                <Input
                  validation={{
                    required: {
                      value: true,
                      message: 'required ',
                    },
                  }}
                  label="Địa chỉ"
                  type="text"
                  id="address"
                  placeholder="Please enter your address..."
                  name="address"
                />
              </div>
              <div style={{ paddingTop: '20px' }}>
                <label className={cx('input-lable')}>Tỉnh/thành phố....</label>
                <select name="provinceId" className={cx('customInput')} onChange={handleOnchange}>
                  {provinceData &&
                    provinceData.data.map((item, index) => {
                      return (
                        <option className={cx('select-option')} key={index} name="gender" value={item.code}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className={cx('input-item')}>
              <div>
                <Input
                  validation={{
                    required: {
                      value: false,
                      message: 'required ',
                    },
                  }}
                  label="Điện thoại"
                  type="text"
                  id="phoneNumber"
                  placeholder="Please enter your phoneNumber..."
                  name="phoneNumber"
                />
              </div>
              <div>
                <Input
                  validation={{
                    required: {
                      value: false,
                      message: 'required ',
                    },
                  }}
                  label="Thời gian làm việc"
                  type="text"
                  id="workingTime"
                  placeholder="Please enter your workingTime..."
                  name="workingTime"
                />
              </div>
              <div style={{ paddingTop: '20px' }}>
                <label className={cx('input-lable')}>image</label>
                {/* <label className={cx('label-uploadImage')} htmlFor="upload-image">
                  Upload image */}
                {/* </label> */}
                <input
                  className={cx('customInput')}
                  id="upload-image"
                  accept="image/*"
                  // onChange={handleOnChangeImage}
                  type="file"
                  name="image"
                  onChange={handleOnchange}
                  value={formData.image}
                  // hidden
                ></input>
              </div>
            </div>
          </FormProvider>
        </div>
        <div className={cx('markdown')}>
          <MdEditor
            style={{ height: '200px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={formData.contentHTML}
          />
        </div>
        <div className={cx('actionBtn')}>
          <Button onClick={handleCLickBtnSave} outline>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hospital;
