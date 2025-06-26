'use client';

import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from './FadeInSection';
import CallbackModal from './CallbackModal';

const workExamples = [
  {
    id: 1,
    title: 'Дом из газобетона',
    description: 'Современный двухэтажный дом площадью 120 кв.м. с чистовой отделкой',
    image: '/images/1q.jpeg',
    area: '120 кв.м',
    material: 'Газобетон',
  },
  {
    id: 2,
    title: 'Каркасный дом',
    description: 'Уютный одноэтажный дом с террасой, построен за 45 дней',
    image: '/images/2q.jpeg',
    area: '85 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 3,
    title: 'Дом из керамических блоков',
    description: 'Энергоэффективный дом с современными инженерными системами',
    image: '/images/3q.jpeg',
    area: '160 кв.м',
    material: 'Керамические блоки',
  },
  {
    id: 4,
    title: 'Дом из керамзитобетона',
    description: 'Надежный и теплый дом для большой семьи',
    image: '/images/4q.jpeg',
    area: '140 кв.м',
    material: 'Керамзитобетон',
  },
  {
    id: 5,
    title: 'Компактный дом',
    description: 'Идеальное решение для молодой семьи с оптимальной планировкой',
    image: '/images/5q.jpeg',
    area: '95 кв.м',
    material: 'Газобетон',
  },
  {
    id: 6,
    title: 'Загородный дом',
    description: 'Просторный дом с панорамными окнами и современным дизайном',
    image: '/images/6q.jpeg',
    area: '180 кв.м',
    material: 'Кирпич',
  },
];

const WorkExamplesSection = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Статичный фон */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <FadeInSection as="div" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-4">
            Примеры наших работ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        <FadeInSection as="p" className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto" delay={0.2}>
          Реальные проекты, которые мы успешно реализовали для наших клиентов
        </FadeInSection>

        {/* Карточки примеров работ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workExamples.map((example, index) => (
            <FadeInSection 
              key={example.id} 
              as="div" 
              className="group relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden"
              delay={0.3 + (index * 0.1)}
            >
              {/* Фон */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Изображение */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={example.image}
                    alt={example.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Градиент поверх изображения */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                  
                  {/* Бейдж с материалом */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {example.material}
                  </div>
                </div>
                
                {/* Контент */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-all duration-300">
                    {example.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {example.description}
                  </p>
                  
                  {/* Характеристики */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-400 text-sm">Площадь:</span>
                      <span className="text-white text-sm font-medium">{example.area}</span>
                    </div>
                    <div className="px-3 py-1 bg-white/10 rounded-full text-green-400 text-xs font-medium">
                      Завершен
                    </div>
                  </div>
                </div>
              </div>

              {/* Декоративный элемент */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FadeInSection>
          ))}
        </div>

        {/* Призыв к действию */}
        <FadeInSection as="div" delay={0.8} className="text-center mt-16">
          <button
            onClick={() => setIsCallbackModalOpen(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer hover:from-blue-500/30 hover:to-purple-500/30"
          >
            <span className="text-white font-medium">Хотите увидеть свой дом в этой галерее?</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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

export default WorkExamplesSection; 