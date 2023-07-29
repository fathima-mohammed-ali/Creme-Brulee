import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
export default function Home() {
  return (
    <>
 <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img className='swiper-slide img' src='https://images.pexels.com/photos/2067436/pexels-photo-2067436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img></SwiperSlide>
        <SwiperSlide><img className='swiper-slide img' src='https://images.pexels.com/photos/11543451/pexels-photo-11543451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img></SwiperSlide>
        <SwiperSlide><img className='swiper-slide img' src='https://images.pexels.com/photos/5702943/pexels-photo-5702943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img></SwiperSlide>
        <SwiperSlide><img className='swiper-slide img' src='https://images.pexels.com/photos/2067419/pexels-photo-2067419.jpeg'></img></SwiperSlide>
        <SwiperSlide><img className='swiper-slide img' src='https://images.pexels.com/photos/1028432/pexels-photo-1028432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img></SwiperSlide>
        <SwiperSlide><img className='swiper-slide img' src='https://images.pexels.com/photos/10194405/pexels-photo-10194405.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'></img></SwiperSlide>
        <SwiperSlide><img className='swiper-slide img' src='https://images.pexels.com/photos/7440369/pexels-photo-7440369.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'></img></SwiperSlide>
        <SwiperSlide><img className='swiper-slide img' src='https://images.pexels.com/photos/3923555/pexels-photo-3923555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img></SwiperSlide>
        <SwiperSlide><img className='swiper-slide img' src='https://images.pexels.com/photos/3060255/pexels-photo-3060255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img></SwiperSlide>
      </Swiper> 
  

 
    </>



  )
}
