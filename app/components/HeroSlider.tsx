'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';

// استيراد ستايلات Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const SLIDES = [
  {
    id: 1,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000", // صورة خضروات
    primaryBtn: "Shop Now",
    secondaryBtn: "View Deals",
    href: "/products"
  },
  {
    id: 2,
    title: "Organic Vegetables 100% Natural",
    subtitle: "Fresh from our farm to your table",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0ba003e9?q=80&w=2000",
    primaryBtn: "Browse Now",
    secondaryBtn: "Our Story",
    href: "/products"
  }
];

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination'
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        className="h-full w-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              {/* Background Image */}
              <img 
                src={slide.image} 
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              
              {/* Green Overlay Gradient - ليطابق الصورة تماماً */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 via-green-600/40 to-transparent" />

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
                <div className="max-w-xl text-white space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl font-medium opacity-90">
                    {slide.subtitle}
                  </p>
                  
                  <div className="flex gap-4 pt-4">
                    <Link 
                      href={slide.href}
                      className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-neutral-100 transition-colors"
                    >
                      {slide.primaryBtn}
                    </Link>
                    <Link 
                      href="#"
                      className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all"
                    >
                      {slide.secondaryBtn}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows - الدوائر البيضاء من صورتك */}
        <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Custom Pagination Dots */}
        <div className="custom-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2" />
      </Swiper>

      
      
        
    </section>
  );
}