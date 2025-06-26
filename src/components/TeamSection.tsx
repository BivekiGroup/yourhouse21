'use client';

import Image from 'next/image';
import FadeInSection from './FadeInSection';

const team = [
  {
    id: 1,
    name: 'Степанов Денис',
    position: 'Основатель и владелец компании',
    image: '/images/Stepan.jpg',
  },
  {
    id: 2,
    name: 'Романов Даниил',
    position: 'Генеральный директор',
    image: '/images/Roman.jpg',
  },
  {
    id: 3,
    name: 'Степанова Оксана',
    position: 'Финансовый директор',
    image: '/images/Oksana.jpg',
  },
  {
    id: 4,
    name: 'Семенов Максим',
    position: 'Производитель работ',
    image: '/images/Maksim.jpg',
  },
];

const TeamSection = () => {
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
            Наша команда
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        <FadeInSection as="p" className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto" delay={0.2}>
          Каждый день работает над тем, чтобы предоставить лучший сервис и сделать наших клиентов счастливыми
        </FadeInSection>

        {/* Карточки команды */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <FadeInSection 
              key={member.id} 
              as="div" 
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              delay={0.3 + (index * 0.1)}
            >
              {/* Фон */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Декоративная рамка */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-all duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {member.position}
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

export default TeamSection; 