"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Toggle } from "./ui/toggle";

const ToggleFilterGroup = () => {
  const toggleLabels = [
    { label: "Javacript", value: "javascript" },
    { label: "ИИ", value: "ai" },
    { label: "Сайты", value: "websites" },
    { label: "Базы данных", value: "databases" },
    { label: "Машинное обучение", value: "machine_learning" },
    { label: "Сетевые технологии", value: "network_technologies" },
    { label: "Безопасность", value: "security" },
    { label: "Облачные технологии", value: "cloud_technologies" },
    { label: "Мобильная разработка", value: "mobile_development" },
    { label: "Графический дизайн", value: "graphic_design" },
    { label: "Облачные технологии", value: "cloud_technologies" },
    { label: "Мобильная разработка", value: "mobile_development" },
    { label: "Графический дизайн", value: "graphic_design" },
    { label: "Облачные технологии", value: "cloud_technologies" },
    { label: "Мобильная разработка", value: "mobile_development" },
    { label: "Графический дизайн", value: "graphic_design" },
    { label: "Облачные технологии", value: "cloud_technologies" },
    { label: "Мобильная разработка", value: "mobile_development" },
    { label: "Графический дизайн", value: "graphic_design" },
  ];
  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={"auto"}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {toggleLabels.map(({ label, value }) => (
        <SwiperSlide key={value}>
          <Toggle variant={"outline"} key={value}>
            <span className="text-xs">{label}</span>
          </Toggle>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ToggleFilterGroup;
