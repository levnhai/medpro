import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import Button from '~/components/Button';
import './OTPInput.scss';
import '../auth.scss';

function OtpInput() {
  const [otpInput, setOtpInput] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const randomOtp = location.state.randomOtp;
  const isphoneNumber = useSelector((state) => state.auth.phoneNumber);

  // show modal resend code
  useEffect(() => {
    const collapseModal = document.querySelector('.collapse');
    const resendCode = document.querySelector('.resendCode');
    const card = document.querySelector('.card');

    function showModal() {
      collapseModal.classList.add('showModal');
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
  }, []);

  // otpInput send code
  useEffect(() => {
    const inputSendCode = document.querySelectorAll('.otpInput');
    const btnOTP = document.querySelector('.otpBtn');

    alert(` mã otp của bạn là: ${randomOtp}`);

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
    // }, []);
  });

  const handleverifyOtp = () => {
    if (otpInput === randomOtp) {
      console.log('thành công');
      navigate('/register-account');
    } else {
      toast.error('Nhập otp không chính xác');
    }
  };

  return (
    <div className="authenticate">
      <div className="authenticate--container">
        <div className="authenticate--content">
          <div className="authenticate--wrapper__header">
            <div className="wrapper--header__iconBack">
              <Link to="/check-phone">
                <i class="fa-solid fa-arrow-left"></i>
              </Link>
            </div>
            <div className="wrapper--header__logo">
              <Link to="/" className="header--logo__link">
                <img src="https://i.imgur.com/31qCsaA.png" alt="logo" />
              </Link>
            </div>
          </div>
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
                  <i data-test="fa" class="fa fa-angle-right style_customFont__1deyS pr-1"></i>Bạn không nhận được mã
                  xác nhận?
                </div>
                <div className="collapse">
                  <div className="wrapper--collapse__content">
                    <p className="collapse--title">Nếu bạn không nhận được mã: </p>
                    <p className="collapse--des">
                      <i class="fa-solid fa-mobile-screen-button"></i>
                      Xác minh số điện thoại của bạn: <strong>{isphoneNumber}</strong>
                    </p>
                    <p className="collapse--des">
                      <i class="fa-solid fa-comment-sms"></i>
                      Kiểm tra hộp thư SMS của bạn
                    </p>
                    <div>
                      <Button className="collapseBtn">Gửi lại mã xác nhận</Button>
                      <Button className="collapseBtn">Đây không phải là số điện thoại của tôi</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="authenticate--bg ">
          <div className="authenticate--bg__img">
            <div className="img-shape"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpInput;
