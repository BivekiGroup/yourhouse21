'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import FadeInSection from './FadeInSection';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({ name, phone, material: 'Контакты', area: '-', finish: '-', finance: '-', message }),
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

  return (
    <section id="contacts" className="relative py-20 bg-gradient-to-r from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Коммуникационный фон */}
      <div className="absolute inset-0 opacity-30">
        {/* Связи и соединения */}
        <div className="absolute top-16 left-1/4 w-12 h-12 border-2 border-dashed border-blue-400 rounded-full opacity-25"></div>
        <div className="absolute bottom-24 right-1/4 w-8 h-8 border-2 border-dashed border-indigo-400 rounded-full opacity-30"></div>
        
        {/* Сигналы */}
        <div className="absolute top-1/3 left-16 w-6 h-1 bg-blue-400 opacity-35"></div>
        <div className="absolute top-1/3 left-24 w-4 h-1 bg-blue-300 opacity-30"></div>
        <div className="absolute top-1/3 left-30 w-2 h-1 bg-blue-200 opacity-25"></div>
        
        <div className="absolute bottom-1/3 right-16 w-6 h-1 bg-indigo-400 opacity-35"></div>
        <div className="absolute bottom-1/3 right-24 w-4 h-1 bg-indigo-300 opacity-30"></div>
        <div className="absolute bottom-1/3 right-30 w-2 h-1 bg-indigo-200 opacity-25"></div>
        
        {/* Углы карты */}
        <div className="absolute top-8 right-8 w-16 h-16 border-2 border-blue-300 opacity-20 transform rotate-12"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 border-2 border-cyan-300 opacity-25 transform -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <FadeInSection as="div" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-clip-text text-transparent mb-4">
            Наши контакты
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <FadeInSection 
            as="div" 
            className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500"
            delay={0.2}
          >
            {/* Фон */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-start group/item">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-200 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover/item:text-blue-600 transition-colors duration-300">
                    Телефон
                  </h3>
                  <a 
                    href="tel:+79530132423" 
                    className="text-gray-600 text-lg hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    7 953 013 24 23
                  </a>
                </div>
              </div>

              <div className="flex items-start group/item">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-200 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover/item:text-blue-600 transition-colors duration-300">
                    Email
                  </h3>
                  <span className="text-gray-600 text-lg">
                    Будет
                  </span>
                </div>
              </div>

              <div className="flex items-start group/item">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-200 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover/item:text-blue-600 transition-colors duration-300">
                    Адрес
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    г. Чебоксары, ул. Калинина, 107
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Реквизиты
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  ИП Фомин Александр Вениаминович<br />
                  ИНН 213012845835
                </p>
              </div>
            </div>

            {/* Декоративный элемент */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          </FadeInSection>

          {/* Форма обратной связи */}
          <FadeInSection 
            as="div" 
            className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500"
            delay={0.4}
          >
            {/* Фон */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 group-hover:text-blue-600 transition-colors duration-300">
                Отправить сообщение
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Ваш телефон"
                    value={phone}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                      setPhone(val);
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Ваше сообщение"
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  {loading ? 'Отправка...' : 'Отправить сообщение'}
                </button>
                
                {success && (
                  <div className="bg-green-100 border border-green-300 text-green-700 text-center py-3 px-4 rounded-xl text-sm">
                    {success}
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-100 border border-red-300 text-red-700 text-center py-3 px-4 rounded-xl text-sm">
                    {error}
                  </div>
                )}
              </form>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Нажимая кнопку &ldquo;Отправить сообщение&rdquo;, вы соглашаетесь с{' '}
                <a href="#" className="underline hover:text-blue-600 transition-colors duration-300">
                  Политикой конфиденциальности
                </a>
              </p>
            </div>

            {/* Декоративный элемент */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 