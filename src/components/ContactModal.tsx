'use client';

import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    phone: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    phone: '',
    name: ''
  });

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[78]\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const validateName = (name: string) => {
    const nameRegex = /^[а-яёА-ЯЁa-zA-Z\s]{2,}$/;
    return nameRegex.test(name.trim());
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибки при вводе
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    if (value.length > 0 && !value.startsWith('7') && !value.startsWith('8')) {
      value = '7' + value;
    }
    
    let formattedValue = value;
    if (value.length > 1) {
      formattedValue = `+${value.slice(0, 1)} (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
    }
    
    handleInputChange('phone', formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      phone: '',
      name: ''
    };

    const cleanPhone = formData.phone.replace(/\D/g, '');
    
    if (!validatePhone(cleanPhone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    
    if (!validateName(formData.name)) {
      newErrors.name = 'Имя должно содержать только буквы (минимум 2 символа)';
    }

    if (newErrors.phone || newErrors.name) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        setFormData({ phone: '', name: '' });
        onClose();
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md">
        {/* Фоновые декоративные элементы */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
        
        {/* Основной контейнер */}
        <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white"
          >
            ✕
          </button>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2">
              Укажите свои данные
            </h2>
            <p className="text-gray-300 text-sm">
              И наш менеджер свяжется с Вами в ближайшее время
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Поле телефона */}
            <div>
              <input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+7 (999) 999-99-99"
                className="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-2 ml-1">{errors.phone}</p>
              )}
            </div>

            {/* Поле имени */}
            <div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Имя"
                className="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-2 ml-1">{errors.name}</p>
              )}
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Отправка...</span>
                </div>
              ) : (
                'Заказать звонок'
              )}
            </button>
          </form>

          {/* Декоративные элементы */}
          <div className="absolute top-2 right-12 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50"></div>
          <div className="absolute bottom-2 left-8 w-1 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal; 