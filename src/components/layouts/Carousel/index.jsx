"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

const Carousel = () => {
  return (
    <div className="bg-color-secondary">
      <div>
        <ul className="font-semibold  pt-20  text-center text-color-primary">
          <button className="px-8">
            {" "}
            <a href="#carousel"></a> HOME
          </button>
          <button className="px-8">
            {" "}
            <a href="#featured"></a>BEST SELLER
          </button>
          <button className="px-8">
            {" "}
            <a href=""></a>KATEGORI
          </button>
          <button className="px-8">
            {" "}
            <a href="#footer"></a> CONTACT US
          </button>
        </ul>
      </div>
      <div className="text-center ">
        <h1 className="py-8 text-6xl font-bold  text-color-primary">
          Our Signature
        </h1>
      </div>
      <div className=" container mx-auto h-80 ">
        <Swiper
          spaceBetween={30}
          speed={2000}
          loop={true}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          fadeEffect={{ crossFade: true }}
          navigation={true}
          modules={[Navigation, Autoplay, EffectFade]}
          className="mySwiper rounded-lg"
        >
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://plus.unsplash.com/premium_photo-1675183691244-1fc0359fa1f6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img src="https://images.unsplash.com/photo-1612544408897-36d451f03d71?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1587116215900-bb2bba7c7cff?q=80&w=2654&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1505043203398-7e4c111acbfa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://images.unsplash.com/photo-1508009219918-7d528f269841?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
