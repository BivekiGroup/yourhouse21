'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import FadeInSection from './FadeInSection';

const reviews = [
  {
    id: 1,
    name: 'Александр Петров',
    text: 'Очень доволен качеством строительства. Команда профессионалов, все работы выполнены в срок и с соблюдением всех норм.',
    rating: 5,
    image: '/images/Sasha.jpg',
  },
  {
    id: 2,
    name: 'Елена Смирнова',
    text: 'Спасибо за отличную работу! Дом построен качественно, все пожелания были учтены. Рекомендую всем!',
    rating: 5,
    image: '/images/Elena.jpg',
  },
  {
    id: 3,
    name: 'Дмитрий Иванов',
    text: 'Профессиональный подход к делу. Все этапы строительства контролировались, результат превзошел ожидания.',
    rating: 5,
    image: '/images/Dmitry.jpg',
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
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
            Отзывы клиентов
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        {/* Карточки отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <FadeInSection 
              key={review.id} 
              as="div" 
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              delay={0.2 * index}
            >
              {/* Фон */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                    {/* Декоративная рамка */}
                    <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-all duration-300">
                      {review.name}
                    </h3>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {review.text}
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

export default ReviewsSection; 