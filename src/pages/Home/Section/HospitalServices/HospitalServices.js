import Slider from 'react-slick';

import Button from '~/components/Button';
import { HospitalData } from './HospitalData';
import '../../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.css';

import './HospitalServices.scss';

function HospitalServices() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  return (
    <div className="home_listHospital">
      <Slider {...settings}>
        {HospitalData.map((hopital) => {
          return (
            <div className="hopital_sliderItem">
              <a href={hopital.link} rel="noreferrer" target="_blank">
                <div className="hopital_card">
                  <div className="hopital_cardImage">
                    <img src={hopital.image} alt="" className="sliderItem_img" />
                  </div>
                  <Button className="sliderItem_btn" rounded>
                    {hopital.name}
                  </Button>
                  <p className="sliderItem_des">{hopital.des}</p>
                </div>
              </a>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default HospitalServices;
