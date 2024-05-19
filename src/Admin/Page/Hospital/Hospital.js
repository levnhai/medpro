import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormProvider, useForm } from 'react-hook-form';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';

import { ConvertBase64 } from '~/utils/common';
import { Input } from '~/components/Input/Input';
import Button from '~/components/Button';
import { adminServices } from '~/services';
import { name_validation } from '~/utils/inputValidations';

import styles from './Hospital.module.scss';
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

  const resetInput = () => {
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

  const handleOnChangeImage = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    let file = e.target.files[0];
    const urlBase64 = await ConvertBase64(file);
    setFormData({ ...formData, image: urlBase64 });
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
        resetInput();
        toast.success(res.messageError);
      } else {
        toast.error(res.messageError);
      }
    } catch (error) {
      toast.error(error);
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
                <input
                  className={cx('customInput')}
                  id="upload-image"
                  accept="image/*"
                  onChange={handleOnChangeImage}
                  type="file"
                  // value={formData.image}
                  name="image"
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
