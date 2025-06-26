'use client';

import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallbackModal = ({ isOpen, onClose }: CallbackModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return false;
    if (!(digits.startsWith('7') || digits.startsWith('8'))) return false;
    if (/^(7|8)0{10}$/.test(digits)) return false;
    return true;
  };

  const validateName = (value: string) => {
    return /^[А-Яа-яA-Za-zЁё\-]{2,}$/.test(value.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateName(name)) return setError('Пожалуйста, укажите корректное имя (только буквы, не менее 2 символов)');
    if (!validatePhone(phone)) return setError('Пожалуйста, укажите корректный российский номер телефона');
    setLoading(true);
    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message, material: 'Звонок' }),
      });
      if (res.ok) {
        setSuccess(true);
        setName('');
        setPhone('');
        setMessage('');
      } else {
        setError('Ошибка отправки. Попробуйте позже.');
      }
    } catch {
      setError('Ошибка отправки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setName('');
    setPhone('');
    setMessage('');
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        {/* Декоративные фоновые элементы */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl opacity-70"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-2xl opacity-70"></div>
        
        {/* Основной контейнер модального окна */}
        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Кнопка закрытия */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-full p-2 group"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2">
              Заказать звонок
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {!success ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Поле имени */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/20 transition-all duration-300 group-hover:border-white/30"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Поле телефона */}
              <div className="relative group">
                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  value={phone}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                    setPhone(val);
                  }}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/20 transition-all duration-300 group-hover:border-white/30"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Поле сообщения */}
              <div className="relative group">
                <textarea
                  placeholder="Ваше сообщение (необязательно)"
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/20 transition-all duration-300 group-hover:border-white/30 resize-none"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Сообщение об ошибке */}
              {error && (
                <div className="relative p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 backdrop-blur-sm">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3 shrink-0" />
                    <span className="text-red-200 text-sm leading-relaxed">{error}</span>
                  </div>
                </div>
              )}

              {/* Кнопка отправки */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative block py-3 px-6 text-white font-semibold">
                  {loading ? 'Отправка...' : 'Отправить'}
                </span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6">
              {/* Иконка успеха */}
              <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm flex items-center justify-center group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CheckCircle className="w-10 h-10 text-green-400 relative z-10" />
              </div>

              {/* Сообщение об успехе */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">
                  Спасибо за заявку!
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Ваши данные успешно отправлены. Мы свяжемся с вами в ближайшее время.
                </p>
              </div>

              {/* Кнопка закрытия */}
              <button
                onClick={closeModal}
                className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 px-8 py-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-white font-medium">Закрыть</span>
              </button>
            </div>
          )}

          {/* Декоративный элемент */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CallbackModal;