'use client';

import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from './FadeInSection';
import CallbackModal from './CallbackModal';
import { Droplets, Zap, Thermometer, Wrench } from 'lucide-react';

const workExamples = [
  {
    id: 1,
    title: 'Деревянный каркасный дом',
    description: 'Г.Чебоксары п. Альгешево, 100 м2',
    image: '/images/koroche.jpg',
    area: '100 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 2,
    title: 'Деревянный каркасный дом',
    description: 'г. Мариинский Посад, 80 м2',
    image: '/images/koroche2.jpg',
    area: '80 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 3,
    title: 'Деревянный каркасный дом',
    description: 'г. Цивильск, 80 м2',
    image: '/images/koroche3.jpg',
    area: '80 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 4,
    title: 'Деревянный каркасный дом',
    description: 'с. Комсомольское, 78 м2',
    image: '/images/koroche4.jpg',
    area: '78 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 5,
    title: 'Деревянный каркасный дом',
    description: 'Сосновка, 92 м2',
    image: '/images/koroche5.jpg',
    area: '92 кв.м',
    material: 'Каркасная технология',
  },
  {
    id: 6,
    title: 'Деревянный каркасный дом',
    description: 'пос. Кугеси 110 м2',
    image: '/images/koroche6.webp',
    area: '110 кв.м',
    material: 'Каркасная технология',
  },
];

const additionalServices = [
  {
    id: 1,
    icon: Droplets,
    title: 'Монтаж водоснабжения',
    description: 'Проектирование и установка систем водоснабжения с использованием качественных материалов',
    features: ['Холодное и горячее водоснабжение', 'Установка счетчиков', 'Гарантия на работы'],
    image: '/images/voda.jpeg'
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Монтаж канализации',
    description: 'Полный комплекс работ по устройству канализационных систем',
    features: ['Внутренняя канализация', 'Наружные сети', 'Септики и очистные сооружения'],
    image: '/images/kanal.jpg'
  },
  {
    id: 3,
    icon: Zap,
    title: 'Монтаж электрики',
    description: 'Электромонтажные работы любой сложности с соблюдением всех норм безопасности',
    features: ['Внутренняя проводка', 'Электрощиты', 'Освещение и розетки'],
    image: '/images/electro.jpg'
  },
  {
    id: 4,
    icon: Thermometer,
    title: 'Монтаж отопления',
    description: 'Установка современных систем отопления для комфортного проживания',
    features: ['Радиаторное отопление', 'Теплые полы', 'Котельное оборудование'],
    image: '/images/otop.jpg'
  },
];

const WorkExamplesSection = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-5 via-white to-gray-100 overflow-hidden">
      {/* Статичный фон */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <FadeInSection as="div" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
            Примеры наших работ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        <FadeInSection as="p" className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto" delay={0.2}>
          Реальные проекты, которые мы успешно реализовали для наших клиентов
        </FadeInSection>

        {/* Карточки примеров работ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {workExamples.map((example, index) => (
            <FadeInSection 
              key={example.id} 
              as="div" 
              className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden"
              delay={0.3 + (index * 0.1)}
            >
              {/* Фон */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
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
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-all duration-300">
                    {example.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {example.description}
                  </p>
                  
                  {/* Характеристики */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-500 text-sm">Площадь:</span>
                      <span className="text-gray-800 text-sm font-medium">{example.area}</span>
                    </div>
                    <div className="px-3 py-1 bg-green-100 rounded-full text-green-600 text-xs font-medium">
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

        {/* Дополнительные услуги */}
        <FadeInSection as="div" className="mb-16" delay={0.8}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
              Дополнительные услуги
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <FadeInSection 
                key={service.id} 
                as="div" 
                className="group relative rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden"
                delay={0.9 + (index * 0.1)}
              >
                {/* Фон */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Изображение */}
                  <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Градиент поверх изображения */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                    
                    {/* Иконка поверх изображения */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Контент */}
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h4>
                    
                    <p className="text-gray-600 text-base mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
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
        </FadeInSection>

        {/* Призыв к действию */}
        <FadeInSection as="div" delay={1.2} className="text-center mt-16">
          <button
            onClick={() => setIsCallbackModalOpen(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-300 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer hover:from-blue-500/30 hover:to-purple-500/30"
          >
            <span className="text-gray-800 font-medium">Помощь в подборе земельного участка, юридическое сопровождение</span>
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