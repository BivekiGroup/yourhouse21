'use client';

import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from './FadeInSection';
import CallbackModal from './CallbackModal';
import { Drill, Shield, Home, Cable } from 'lucide-react';

const builderServices = [
  {
    id: 1,
    icon: Drill,
    title: 'Бурение технологических отверстий',
    description: 'в стене, фундаменте, перекрытии',
    features: [
      'Создание отверстий для монтажа вентиляционной системы, под клапаны кондиционирования',
      'Просверливание отверстий в фундаменте, чтобы сделать отдушины или подключиться к общественным коммуникациям',
      'Сделаем технологические отверстия под отопление, канализацию, водопровод'
    ],
    image: '/images/drilling.jpg',
    price: 'от 500₽/отверстие'
  },
  {
    id: 2,
    icon: Shield,
    title: 'Гидроизоляция и теплоизоляция',
    description: 'Комплексная защита конструкций',
    features: [
      'Ванные, санузлы, фундаменты, подвалы',
      'Теплоизоляция труб, перекрытий, фасадов',
      'Пароизоляция и звукоизоляция перегородок'
    ],
    image: '/images/insulation.jpg',
    price: 'от 200₽/м²'
  },
  {
    id: 3,
    icon: Home,
    title: 'Умный дом и инженерная автоматика',
    description: 'Современные технологии управления домом',
    features: [
      'Датчики протечки, дым/CO, термостаты, удалённый доступ',
      'Реле, сценарии, интеграция с щитами и котельной',
      'Настройка уведомлений и журналов событий'
    ],
    image: '/images/smart-home.jpg',
    price: 'от 50 000₽'
  },
  {
    id: 4,
    icon: Cable,
    title: 'Слаботочные системы',
    description: 'Современные системы связи и безопасности',
    features: [
      'Видеонаблюдение, домофоны, СКУД, интернет и Wi‑Fi',
      'Слаботочные щиты, слаботочные стояки, структурированные СКС',
      'Аудио/видео‑кабелирование, стойки и коммутация'
    ],
    image: '/images/low-current.jpg',
    price: 'от 25 000₽'
  },
];

const BuilderServicesSection = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-tr from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Технический фон */}
      <div className="absolute inset-0 opacity-25">
        {/* Инструменты стилизованные */}
        <div className="absolute top-16 left-16 w-4 sm:w-6 h-4 sm:h-6 border-2 border-blue-400 transform rotate-45 opacity-30"></div>
        <div className="absolute top-1/3 right-20 w-6 sm:w-8 h-1 sm:h-2 bg-indigo-400 rounded opacity-35"></div>
        <div className="absolute bottom-24 left-1/4 w-1 sm:w-2 h-6 sm:h-8 bg-cyan-400 rounded opacity-40"></div>
        
        {/* Технические элементы */}
        <div className="absolute top-1/4 left-1/4 w-3 sm:w-4 h-3 sm:h-4 border border-blue-500 rounded-full opacity-25"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 sm:w-3 h-2 sm:h-3 bg-indigo-500 rounded-sm opacity-30"></div>
        
        {/* Технические линии */}
        <div className="absolute top-0 left-1/3 w-px h-1/3 bg-gradient-to-b from-blue-300 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-px h-1/4 bg-gradient-to-t from-indigo-300 to-transparent opacity-25"></div>
        <div className="absolute top-2/3 left-0 w-1/4 h-px bg-gradient-to-r from-cyan-300 to-transparent opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Заголовок секции */}
        <FadeInSection as="div" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
            Услуги для строителей
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        <FadeInSection as="p" className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto" delay={0.2}>
          Профессиональные технические услуги для строительных компаний и индивидуальных застройщиков
        </FadeInSection>

        {/* Карточки услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {builderServices.map((service, index) => (
            <FadeInSection 
              key={service.id} 
              as="div" 
              className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden"
              delay={0.3 + (index * 0.1)}
            >
              {/* Фон */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Изображение */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={true}
                  />
                  {/* Градиент поверх изображения */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                  
                  {/* Иконка поверх изображения */}
                  <div className="absolute top-4 left-4 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                  </div>
                  
                  {/* Цена */}
                  <div className="absolute bottom-4 right-4 px-3 sm:px-4 py-2 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-sm sm:text-base font-medium">
                    {service.price}
                  </div>
                </div>
                
                {/* Контент */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Особенности услуги */}
                  <ul className="space-y-3 sm:space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm sm:text-base text-gray-600 leading-relaxed">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Декоративный элемент */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FadeInSection>
          ))}
        </div>

        {/* Призыв к действию */}
        <FadeInSection as="div" delay={0.8} className="text-center">
          <button
            onClick={() => setIsCallbackModalOpen(true)}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg text-lg font-medium"
          >
            <span>Получить консультацию по услугам</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </button>
        </FadeInSection>
      </div>

      {/* Модальное окно */}
      <CallbackModal 
        isOpen={isCallbackModalOpen} 
        onClose={() => setIsCallbackModalOpen(false)} 
      />
    </section>
  );
};

export default BuilderServicesSection;