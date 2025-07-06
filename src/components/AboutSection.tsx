'use client';

import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from './FadeInSection';
import ContactModal from './ContactModal';

const AboutSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const stats = [
    { number: "15+", label: "Лет на рынке", icon: "🏗️" },
    { number: "244", label: "Заказчика остались довольны", icon: "😊" },
    { number: "5", label: "Проектов выполнено за последний месяц", icon: "⚡" },
    { number: "100%", label: "Гарантия качества", icon: "✅" }
  ];

  const features = [
    {
      icon: "🎯",
      title: "Индивидуальный подход",
      description: "Каждый проект разрабатывается с учетом пожеланий клиента"
    },
    {
      icon: "🛡️",
      title: "Качественные материалы",
      description: "Используем только проверенные материалы от надежных поставщиков"
    },
    {
      icon: "⏰",
      title: "Соблюдение сроков",
      description: "Строго придерживаемся согласованных временных рамок"
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-gray-5 via-white to-gray-100 overflow-hidden">
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
            О компании Ваш Дом
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        {/* Основной контент */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Изображение */}
          <FadeInSection as="div" className="relative group">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10"></div>
              <Image
                src="/images/stroy.jpg"
                alt="О нашей компании"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Декоративные элементы */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
            </div>
          </FadeInSection>

          {/* Текстовый контент */}
          <FadeInSection as="div" delay={0.2}>
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Строим дома вашей мечты
                </h3>
                <p className="text-gray-600 leading-relaxed text-2xl">
                  Мы - команда профессионалов с более чем 10-летним опытом в строительстве 
                  современных домов. Наша миссия - создавать качественное и комфортное 
                  жилье для наших клиентов, используя передовые технологии и материалы.
                </p>
              </div>

              {/* Особенности */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <FadeInSection key={index} delay={0.3 + index * 0.1}>
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 hover:shadow-lg transition-all duration-300 group">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2 text-xl">{feature.title}</h4>
                        <p className="text-gray-600 text-xl leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Статистика */}
        <FadeInSection as="div" delay={0.4}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                {/* Фон */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-all duration-300 drop-shadow-lg">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-lg font-medium leading-relaxed">
                    {stat.label}
                  </div>
                </div>

                {/* Декоративный элемент */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Призыв к действию */}
        <FadeInSection as="div" delay={0.6} className="text-center mt-16">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="group relative overflow-hidden rounded-2xl hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl"
          >
            {/* Фоновое изображение */}
            <div className="absolute inset-0">
              <Image
                src="/images/4.1.png"
                alt="Строительство дома"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Анимированный блик */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Контент кнопки */}
            <div className="relative z-10 px-8 py-6 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-4">
                {/* Иконка дома */}
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                  </svg>
                </div>
                
                {/* Текст */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-200 transition-colors duration-300 drop-shadow-lg">
                    Готовы начать строительство?
                  </h3>
                  <p className="text-white/90 text-sm group-hover:text-white transition-colors duration-300 drop-shadow-md">
                    Получите бесплатную консультацию прямо сейчас
                  </p>
                </div>
                
                {/* Стрелка */}
                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Декоративные элементы */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/60 rounded-full"></div>
            </div>
          </button>
        </FadeInSection>
      </div>

      {/* Модальное окно */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};

export default AboutSection; 