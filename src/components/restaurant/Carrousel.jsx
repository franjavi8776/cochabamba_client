import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropTypes from "prop-types";

const CarouselImages = ({ images }) => {
  return (
    <div className="custom-swiper w-[270px] h-[200px] md:w-[400px] md:h-[270px] mb-7 border border-primary shadow-primary shadow-md rounded-md overflow-hidden">
      {images.length === 1 ? (
        <img
          src={images[0]}
          alt="Single Image"
          className="w-[270px] h-[200px] md:w-[400px] md:h-[270px] object-cover"
        />
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation
          loop={true}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Image${index}`}
                className="w-[270px] h-[200px] md:w-[400px] md:h-[270px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

CarouselImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CarouselImages;
