'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
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
    <section id="contacts" className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
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
            Наши контакты
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <FadeInSection 
            as="div" 
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500"
            delay={0.2}
          >
            {/* Фон */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-start group/item">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover/item:text-blue-300 transition-colors duration-300">
                    Телефон
                  </h3>
                  <span className="text-gray-300 text-lg">
                    будет другой
                  </span>
                </div>
              </div>

              <div className="flex items-start group/item">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover/item:text-blue-300 transition-colors duration-300">
                    Email
                  </h3>
                  <span className="text-gray-300 text-lg">
                    Будет
                  </span>
                </div>
              </div>

              <div className="flex items-start group/item">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 mr-4 group-hover/item:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover/item:text-blue-300 transition-colors duration-300">
                    Адрес
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    г. Чебоксары, ул. Калинина, 107
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">
                  Реквизиты
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  ИП Степанов Денис Сергеевич<br />
                  ИНН 212306083987
                </p>
              </div>
            </div>

            {/* Декоративный элемент */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          </FadeInSection>

          {/* Форма обратной связи */}
          <FadeInSection 
            as="div" 
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500"
            delay={0.4}
          >
            {/* Фон */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors duration-300">
                Отправить сообщение
              </h3>
              {!success ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Ваш телефон"
                      value={phone}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                        setPhone(val);
                      }}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Ваше сообщение"
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                    />
                  </div>
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-center py-3 px-4 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                      <span className="block w-full break-words">{error}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold disabled:opacity-60 hover:scale-105 hover:shadow-lg"
                  >
                    {loading ? 'Отправка...' : 'Отправить'}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 mb-6 flex items-center backdrop-blur-sm w-full">
                    <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                    <span className="text-green-300 text-lg font-semibold leading-snug text-left">
                      Спасибо! Ваше сообщение успешно отправлено.
                    </span>
                  </div>
                </div>
              )}
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