'use client';

import Link from 'next/link';
import { X, Phone } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 animate-fadeIn">
      <div className="container mx-auto px-4 py-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-3">
                         <div className="bg-blue-600 p-2 rounded">
               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M2 12L12 2L22 12V22H16V16H8V22H2V12Z"/>
               </svg>
             </div>
            <div className="text-white">
              <div className="text-xl font-bold">SD</div>
              <div className="text-sm font-semibold -mt-1">STROY</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Закрыть меню"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col space-y-6">
          <Link 
            href="#services" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            Услуги
          </Link>
          <Link 
            href="#about" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            О нас
          </Link>
          <Link 
            href="#projects" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            Каталог домов
          </Link>
          <Link 
            href="#additional-services" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            Доп услуги
          </Link>
          <Link 
            href="#contacts" 
            className="text-xl text-white hover:text-blue-400 transition-colors py-2"
            onClick={onClose}
          >
            Контакты
          </Link>
        </nav>

        <div className="mt-auto pb-8">
          <a 
            href="tel:+78352329226" 
            className="flex items-center text-white hover:text-blue-400 transition-colors mb-2 group"
          >
            <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-semibold">+7 8352 32 92 26</span>
          </a>
          <div className="text-sm text-gray-300 mb-6">Пн - Вс с 8:00 до 20:00</div>
          <button 
            onClick={onClose}
            className="w-full bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors hover:shadow-lg font-semibold"
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 