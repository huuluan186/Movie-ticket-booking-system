import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderBanner = ({ slides }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true, 
    };

    return (
        <div className="w-full relative">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="w-full h-[500px] md:h-[530px] relative">
                        <img
                            src={slide.image}
                            alt={`slide-${index}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Slider>

            {/* Custom slider */}
            <style jsx>
                {`
                .slick-dots {
                    bottom: 20px; /* Adjust position of dots */
                }
                .slick-dots li button:before {
                    color: white; /* Change dot color */
                    font-size: 16px; /* Increase dot size */
                }
                .slick-dots li.slick-active button:before {
                    color: orange; /* Highlight active dot */
                }
                .slick-prev,
                .slick-next {
                    z-index: 1;
                    width: 40px;
                    height: 40px;
                    opacity: 0.8;
                }

                .slick-prev:hover,
                .slick-next:hover {
                    opacity: 1;
                }

                .slick-prev:before,
                .slick-next:before {
                    font-family: 'slick';
                    font-size: 40px;
                    line-height: 1;
                    color: white;
                    -webkit-font-smoothing: antialiased;
                }

                .slick-prev {
                    left: 25px;
                }

                .slick-next {
                    right: 25px;
                }

                /* Đảm bảo mũi tên không bị che khi banner full width */
                .slick-slider {
                    overflow: visible;
                }

                /* Xóa outline khi focus */
                .slick-slide:focus,
                .slick-slide div:focus,
                .slick-slide img:focus {
                    outline: none !important;
                    box-shadow: none !important;
                }

                /* Xóa hiệu ứng tap trên mobile */
                .slick-slide {
                    -webkit-tap-highlight-color: transparent;
                }

                /* Xóa border khi hover/active */
                .slick-slide img {
                    user-select: none; /* Ngăn chọn text/ảnh */
                    transition: all 0.3s;
                    border: none !important;
                }
                `}
            </style>
        </div>
    );
};

export default SliderBanner;