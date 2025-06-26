'use client';

import { Shield, FileText, Clock, Users } from 'lucide-react';
import FadeInSection from './FadeInSection';

const features = [
  {
    icon: Shield,
    title: 'Аккредитованный застройщик',
    description: 'Ведущими банками для оформления безопасной и выгодной сделки',
  },
  {
    icon: FileText,
    title: 'Открытые и честные сметы',
    description: 'Договор с фиксацией цены, стоимость не изменится на протяжении всего строительства',
  },
  {
    icon: Clock,
    title: 'Гарантия 5 лет',
    description: 'Гарантия качества дома',
  },
  {
    icon: Users,
    title: 'Профессиональная команда',
    description: 'Опытные специалисты с многолетним стажем в строительстве',
  },
];

const WhyChooseUsSection = () => {
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
            Почему выбирают нас?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        {/* Карточки преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FadeInSection 
              key={index} 
              as="div" 
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              delay={0.2 * index}
            >
              {/* Фон */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300" />
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Декоративный элемент */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection; 