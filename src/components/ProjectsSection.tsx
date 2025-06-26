'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import FadeInSection from './FadeInSection';

type ProjectsSectionProps = {
  onCatalogClick?: () => void;
};

const projects = [
  {
    id: 1,
    title: 'Гармония',
    description: 'Дом 11х9м, общая площадь 101,4 кв.м., 3 спальни, 1 санузел',
    images: [
      { type: 'facade', src: '/images/garmony.png', alt: 'Фасад дома Гармония' },
      { type: 'plan', src: '/projects/garmony-plan1.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/projects/garmony-plan2.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/garmony.pdf',
  },
  {
    id: 2,
    title: 'Горизонт',
    description: 'Дом 14х13 м, общая площадь 142,8 кв.м, 3 спальни, 2 санузла',
    images: [
      { type: 'facade', src: '/images/gorizont.png', alt: 'Фасад дома Горизонт' },
      { type: 'plan', src: '/projects/gorizont-plan1.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/projects/gorizont-plan2.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/gorizont.pdf',
  },
  {
    id: 3,
    title: 'Филимонов',
    description: 'Дом 14,2х10,5 м, общая площадь 131,4 кв.м., 3 спальни, 2 санузла',
    images: [
      { type: 'facade', src: '/images/filimonov.png', alt: 'Фасад дома Филимонов' },
      { type: 'plan', src: '/projects/filimonov-plan1.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/projects/filimonov-plan2.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/filimonov.pdf',
  },
  {
    id: 4,
    title: 'Моронцов',
    description: 'Дом 12х8м, общая площадь 89,6 кв.м., 2 спальни, 1 санузел',
    images: [
      { type: 'facade', src: '/images/moronchov.png', alt: 'Фасад дома Моронцов' },
      { type: 'plan', src: '/projects/moronchov-plan1.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/projects/moronchov-plan2.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/moronchov.pdf',
  },
  {
    id: 5,
    title: 'Ранчо',
    description: 'Дом 15х12м, общая площадь 156,8 кв.м., 4 спальни, 2 санузла',
    images: [
      { type: 'facade', src: '/images/rancho.png', alt: 'Фасад дома Ранчо' },
      { type: 'plan', src: '/projects/rancho-plan1.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/projects/rancho-plan2.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/rancho.pdf',
  },
  {
    id: 6,
    title: 'Тихие Зори',
    description: 'Дом 13х9м, общая площадь 118,2 кв.м., 3 спальни, 1 санузел',
    images: [
      { type: 'facade', src: '/images/zori.png', alt: 'Фасад дома Тихие Зори' },
      { type: 'plan', src: '/projects/zori-plan1.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/projects/zori-plan2.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/zori.pdf',
  },
  {
    id: 7,
    title: 'Уютное гнездышко',
    description: 'Дом 16х10м, общая площадь 168,4 кв.м., 4 спальни, 3 санузла',
    images: [
      { type: 'facade', src: '/images/gnezdo.png', alt: 'Фасад дома Уютное гнездышко' },
      { type: 'plan', src: '/projects/gnezdo-plan1.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/projects/gnezdo-plan2.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/gnezdo.pdf',
  },
  {
    id: 8,
    title: 'Аура',
    description: 'Дом 10х8м, общая площадь 78,6 кв.м., 2 спальни, 1 санузел',
    images: [
      { type: 'facade', src: '/images/aura.png', alt: 'Фасад дома Аура' },
      { type: 'plan', src: '/projects/aura-plan1.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/projects/aura-plan2.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/aura.pdf',
  },
  {
    id: 9,
    title: 'Надежда',
    description: 'Дом 18х12м, общая площадь 198,4 кв.м., 5 спален, 3 санузла',
    images: [
      { type: 'facade', src: '/images/nade.png', alt: 'Фасад дома Надежда' },
      { type: 'plan', src: '/projects/nade-plan1.jpg', alt: 'Планировка 1 этажа' },
      { type: 'plan', src: '/projects/nade-plan2.jpg', alt: 'Планировка 2 этажа' }
    ],
    file: '/projects/nade.pdf',
  },
];

// Компонент внутреннего слайдера для каждого проекта
const ProjectImageSlider = ({ project }: { project: typeof projects[0] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative h-80 rounded-xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10"></div>
      
      {/* Текущее изображение */}
      <Image
        src={project.images[currentImageIndex].src}
        alt={project.images[currentImageIndex].alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Навигация по изображениям */}
      {project.images.length > 1 && (
        <>
          <button
            onClick={handlePreviousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-300"
            aria-label="Предыдущее изображение"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-300"
            aria-label="Следующее изображение"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Индикаторы изображений */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Изображение ${index + 1}`}
              />
            ))}
          </div>

          {/* Тип изображения */}
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              {project.images[currentImageIndex].type === 'facade' ? '🏠 Фасад' : '📐 Планировка'}
            </span>
          </div>
        </>
      )}

      {/* Декоративные элементы */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
    </div>
  );
};

const ProjectsSection = ({ onCatalogClick }: ProjectsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Количество проектов для показа на разных экранах
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg и больше
      if (window.innerWidth >= 768) return 2;  // md
      return 1; // sm
    }
    return 3; // по умолчанию
  };

  const [itemsPerView, setItemsPerView] = useState(3);

  // Обновляем количество элементов при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentIndex(0); // Сбрасываем индекс при изменении размера
    };

    // Устанавливаем начальное значение
    setItemsPerView(getItemsPerView());
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Общее количество слайдов (групп проектов)
  const totalSlides = Math.ceil(projects.length / itemsPerView);
  
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(totalSlides - 1, prev + 1));
  };

  // Получаем проекты для текущего слайда
  const startIndex = currentIndex * itemsPerView;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerView);

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
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
            Каталог проектов
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>
        
        {/* Карусель */}
        <div className="relative">
          {/* Стрелка влево */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Предыдущий проект"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Стрелка вправо */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= totalSlides - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Следующий проект"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Контейнер проектов */}
          <div className="overflow-hidden">
            <div 
              className="grid transition-transform duration-300 ease-in-out gap-8"
              style={{
                gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
              }}
            >
              {visibleProjects.map((project, index) => (
                <FadeInSection 
                  key={`${project.id}-${currentIndex}`} 
                  as="div" 
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  delay={0.1 * index}
                >
                  {/* Фон */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Слайдер изображений */}
                    <ProjectImageSlider project={project} />
                    
                    {/* Информация о проекте */}
                    <div className="mt-6">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      
                      {/* Дополнительная информация */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Доступен для строительства</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>📐</span>
                          <span>{project.images.length - 1} планировки</span>
                        </span>
                      </div>
                    </div>

                    {/* Декоративный элемент */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>

        {/* Индикаторы */}
        <div className="flex justify-center mt-12 space-x-3">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>

        {/* Призыв к действию */}
        <FadeInSection as="div" delay={0.6} className="text-center mt-16">
          <button
            onClick={onCatalogClick}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer group"
          >
            <span className="text-white font-medium text-lg">Получить полный каталог проектов</span>
            <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
          </button>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ProjectsSection; 