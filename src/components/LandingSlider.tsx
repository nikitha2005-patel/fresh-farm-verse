
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

interface LandingSliderProps {
  className?: string;
}

const sliderImages = [
  {
    src: 'src/components/dp1.jpg',
    alt: 'Indian farmer harvesting crops'
  },
  {
    src: 'src/components/dp2.jpg',
    alt: 'Organic vegetables from Indian farms'
  },
  {
    src: 'src/components/dp3.jpg',
    alt: 'Agricultural fields in rural India'
  },
  {
    src: 'src/components/dp4.jpg',
    alt: 'Fresh produce at an Indian farm market'
  }
];

const LandingSlider: React.FC<LandingSliderProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-[60vh] overflow-hidden ${className}`}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex justify-center items-center">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingSlider;
