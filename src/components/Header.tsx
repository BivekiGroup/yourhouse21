'use client';

import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';
import { useState } from 'react';
import CallbackModal from './CallbackModal';
import MobileMenu from './MobileMenu';
import FadeInOnMount from './FadeInOnMount';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <FadeInOnMount as="header" className={`fixed w-full z-50 bg-gray-900/95 backdrop-blur-sm py-4 shadow-lg`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0 py-1">
              <div className="bg-blue-600 p-2 rounded">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 12L12 2L22 12V22H16V16H8V22H2V12Z"/>
                </svg>
              </div>
              <div className="text-white">
                <div className="text-xl font-bold">Ваш Дом</div>
              </div>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="#services" className="text-white hover:text-blue-400 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10">
                Услуги
              </Link>
              <Link href="#about" className="text-white hover:text-blue-400 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10">
                О нас
              </Link>
              <Link href="#projects" className="text-white hover:text-blue-400 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10">
                Каталог домов
              </Link>
              <Link href="#additional-services" className="text-white hover:text-blue-400 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10">
                Доп услуги
              </Link>
              <Link href="#contacts" className="text-white hover:text-blue-400 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10">
                Контакты
              </Link>
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
              <div className="text-right">
                <a 
                  href="tel:+79530132423" 
                  className="flex items-center text-white hover:text-blue-400 transition-colors group text-lg font-semibold whitespace-nowrap"
                >
                  +7 953 013 24 23
                </a>
                <div className="text-xs text-gray-300 mt-1">Пн - Вс с 8:00 до 20:00</div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3.5 rounded-lg font-bold text-base flex-shrink-0 flex items-center space-x-2 group overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse hover:animate-none"
              >
                {/* Светящийся фон */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Анимированная граница */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-75 blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="absolute inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg"></div>
                
                {/* Контент кнопки */}
                <div className="relative z-10 flex items-center space-x-2">
                <Phone className="w-5 h-5 group-hover:animate-bounce" />
                  <span className="relative">
                    Оставить заявку
                    {/* Подчеркивание */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </div>
                
                {/* Блик */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-lg"
              aria-label="Открыть меню"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </FadeInOnMount>

      <CallbackModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header; 