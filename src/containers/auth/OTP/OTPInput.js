import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

import Auth from '../Auth';
import Button from '~/components/Button';
import './OTPInput.scss';

function OtpInput() {
  const location = useLocation();
  const navigate = useNavigate();

  const randomOtp = location.state.randomOtp;
  const isphoneNumber = useSelector((state) => state.auth.phoneNumber);

  // use state
  const [otpInput, setOtpInput] = useState('');
  const [showAccordion, setShowAccordion] = useState(false);

  // show modal resend code
  useEffect(() => {
    const collapseModal = document.querySelector('.collapse');
    const resendCode = document.querySelector('.resendCode');
    const card = document.querySelector('.card');

    function showModal() {
      // collapseModal.classList.toggle('showModal');
      setShowAccordion(!showAccordion);
    }

    function hideModal() {
      collapseModal.classList.remove('showModal');
    }

    resendCode.addEventListener('click', showModal);
    window.addEventListener('click', hideModal);
    card.addEventListener('click', (e) => {
      // ngăn hành vi nổi bọt của thẻ của thẻ cha
      e.stopPropagation();
    });
  }, [showAccordion]);

  // otpInput send code
  useEffect(() => {
    const inputSendCode = document.querySelectorAll('.otpInput');
    const btnOTP = document.querySelector('.otpBtn');

    alert(`Mã otp của bạn là: ${randomOtp}`);

    function focusNext(currentInput) {
      const maxLength = parseInt(currentInput.maxLength, 10);
      const currentInputIndex = Array.from(inputSendCode).indexOf(currentInput);

      if (currentInput.value.length === maxLength) {
        // Move focus to the next input field
        const nextInput = inputSendCode[currentInputIndex + 1];
        if (nextInput) {
          nextInput.removeAttribute('disabled');
          nextInput.focus();
        } else {
          btnOTP.classList.remove('disabled');
          // Submit the form or trigger another action when all inputs are filled
          setOtpInput(getOTP());
        }
      }
    }

    function focusPrevious(currentInput) {
      const currentInputIndex = Array.from(inputSendCode).indexOf(currentInput);

      if (currentInput.value.length === 0) {
        const previousInput = inputSendCode[currentInputIndex - 1];
        if (previousInput) {
          previousInput.focus();
        }
      }
    }

    function getOTP() {
      // Concatenate values of all input fields to get the complete OTP
      return Array.from(inputSendCode)
        .map((input) => input.value)
        .join('');
    }

    // Add event listeners for input and keydown events
    inputSendCode.forEach((input) => {
      input.addEventListener('input', function () {
        focusNext(input);
      });

      input.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' || event.key === 'delete') {
          focusPrevious(input);
        }
      });
    });

    //focus phần tử đầu tiên khi reload trang
    window.addEventListener('load', () => {
      inputSendCode[0].focus();
    });
  }, []);

  const handleverifyOtp = () => {
    if (otpInput === randomOtp) {
      console.log('thành công');
      navigate('/register-account');
    } else {
      toast.error('Nhập otp không chính xác');
    }
  };

  return (
    <Auth>
      <div className="wrapper--child">
        <div className="wrapper--inner__content">
          <h4 className="tag--header">XIN CHÀO!</h4>
          <p className="customFotnSize">Vui lòng nhập mã 6 số đã gửi cho bạn qua số điện thoại.</p>
          <div className="tel-input">
            <input className="form-control disable-form" value={isphoneNumber} disabled />
            <div className="selected-flag">
              <img
                src="https://cdn.icon-icons.com/icons2/4023/PNG/512/vietnam_vn_vnm_vietnamese_flag_icon_255804.png"
                alt="vietnamese"
              />
            </div>
          </div>
          <p className="errorMessage"></p>
          <form className="otpInputWapper">
            <input className="otpInput" type="tel" maxLength={1} />

            <input className="otpInput" type="tel" maxLength={1} disabled />

            <input className="otpInput" type="tel" maxLength={1} disabled />

            <input className="otpInput" type="tel" maxLength={1} disabled />

            <input className="otpInput" type="tel" maxLength={1} disabled />

            <input className="otpInput" type="tel" maxLength={1} disabled />
          </form>
          <p className="errorMessage"></p>
          <Button
            className="otpBtn disabled"
            onClick={() => {
              handleverifyOtp();
            }}
          >
            Xác thực
          </Button>

          <div className="card">
            <div className="resendCode">
              {showAccordion ? <FaAngleDown /> : <FaAngleRight />}
              <span>Bạn không nhận được mã xác nhận?</span>
            </div>
            {showAccordion && (
              <div className="collapse">
                <div className="wrapper--collapse__content">
                  <p className="collapse--title">Nếu bạn không nhận được mã: </p>
                  <p className="collapse--des">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                    Xác minh số điện thoại của bạn: <strong>{isphoneNumber}</strong>
                  </p>
                  <p className="collapse--des">
                    <i className="fa-solid fa-comment-sms"></i>
                    Kiểm tra hộp thư SMS của bạn
                  </p>
                  <div>
                    <Button className="collapseBtn">Gửi lại mã xác nhận</Button>
                    <Button
                      onClick={() => {
                        console.log('thanh cong');
                      }}
                      className="collapseBtn"
                    >
                      Đây không phải là số điện thoại của tôi
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Auth>
  );
}

export default OtpInput;
