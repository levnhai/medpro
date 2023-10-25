import React from 'react';

import Button from '~/components/Button';

import './Header.scss';

function Header() {
  return (
    <div className="guide_header">
      <div className="guide_content">
        <h2 className="guide_title">Medpro có thể giúp gì cho bạn ?</h2>
        <p className="guide_des">
          Giải đáp các câu hỏi nhanh giúp quý khách hiểu rõ hơn về sản phẩm, dịch vụ của chúng tôi
        </p>
      </div>
      <div className="guide_btnGroup">
        <Button className="giude_btn" rounded to="/huong-dan/cai-dat-ung-dung">
          Cài đặt ứng dụng
        </Button>
        <Button className="giude_btn" rounded to="/huong-dan/dat-lich-kham">
          Đặt lịch khám
        </Button>
        <Button className="giude_btn" rounded to="/huong-dan/quy-trinh-hoan-phi">
          Quy trình hoàn phí
        </Button>
        <Button className="giude_btn" rounded to="/huong-dan/cau-hoi-thuong-gap">
          Câu hỏi thường gặp
        </Button>
      </div>
    </div>
  );
}

export default Header;
