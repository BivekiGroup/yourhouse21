'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
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
              <Link href="#reviews" className="text-white hover:text-blue-400 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10">
                Отзывы
              </Link>
              <Link href="#contacts" className="text-white hover:text-blue-400 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10">
                Контакты
              </Link>
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
              <div className="text-right">
                <a 
                  href="tel:+78352329226" 
                  className="flex items-center text-white hover:text-blue-400 transition-colors group text-lg font-semibold whitespace-nowrap"
                >
                  +7 8352 32 92 26
                </a>
                <div className="text-xs text-gray-300 mt-1">Пн - Вс с 8:00 до 20:00</div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-gray-900 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors hover:shadow-lg text-sm font-semibold flex-shrink-0"
              >
                Оставить заявку
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