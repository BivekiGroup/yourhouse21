'use client';

import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const materials = [
  { label: 'Кирпич/керамический блок', value: 'brick', img: '/images/keramic.jpg' },
  { label: 'Газобетон', value: 'aerated', img: '/images/gazobet.png' },
  { label: 'Керамзитобетон', value: 'claydite', img: '/images/keramiz.jpg' },
];

const areas = [
  '80-100 кв.м.',
  '100-150 кв.м.',
  '150-200 кв.м.',
  'более 200 кв.м.',
];

const finishes = [
  'Без отделки',
  'Черновая отделка (стяжка, штукатурка и тд)',
  'Чистовая отделка (обои, ламинат и тд)',
];

const finances = [
  'Наличные',
  'Сельская ипотека',
  'Ипотека, кредит',
  'Свой вариант',
];

interface HouseCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userPhone?: string;
}

const HouseCalculatorModal = ({ isOpen, onClose, userName = '', userPhone = '' }: HouseCalculatorModalProps) => {
  const [step, setStep] = useState(1);
  const [material, setMaterial] = useState('');
  const [area, setArea] = useState('');
  const [finish, setFinish] = useState('');
  const [finance, setFinance] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    setError('');
    if (step === 1 && !material) return setError('Выберите материал');
    if (step === 2 && !area) return setError('Выберите площадь');
    if (step === 3 && !finish) return setError('Выберите вариант отделки');
    if (step === 4 && !finance) {
      setError('Выберите источник финансирования');
      return;
    }
    if (step === 4) {
      // После 4-го шага отправляем данные в Telegram и переходим к 5-му шагу
      handleSubmitCalculator();
      return;
    }
    setStep((s) => s + 1);
  };

  const handlePrev = () => {
    setError('');
    setStep((s) => s - 1);
  };

  const handleSubmitCalculator = async () => {
    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          material, 
          area, 
          finish, 
          finance,
          name: userName || 'Из калькулятора',
          phone: userPhone || 'Не указан'
        }),
      });
      
      if (res.ok) {
        setStep(5); // Переходим к 5-му шагу
      } else {
        setError('Ошибка отправки. Попробуйте позже.');
      }
    } catch {
      setError('Ошибка отправки. Попробуйте позже.');
    }
  };

  const closeModal = () => {
    setStep(1);
    setMaterial('');
    setArea('');
    setFinish('');
    setFinance('');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
          aria-label="Закрыть калькулятор"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <span className="text-gray-300 text-xs sm:text-sm">
              {step < 5 ? 'Для расчета стоимости выберите один из вариантов' : 'Спасибо за заявку!'}
            </span>
            <span className="text-gray-300 text-xs sm:text-sm">{step}/5</span>
          </div>
          
          <div className="w-full h-2 bg-white/10 rounded-full mb-6 sm:mb-8">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${(step-1)*25}%` }} />
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Из какого материала хотите построить дом?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {materials.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMaterial(m.value)}
                    className={`group relative p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-[1.02] ${
                      material === m.value 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/25' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    {/* Фон при активном состоянии */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-opacity duration-300 ${
                      material === m.value ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4 rounded-xl overflow-hidden">
                        <Image 
                          src={m.img} 
                          alt={m.label} 
                          fill 
                          className="object-cover"
                          sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 96px"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-medium text-white text-center group-hover:text-blue-300 transition-colors duration-300">
                        {m.label}
                      </span>
                      {material === m.value && (
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 absolute top-2 right-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Какая площадь дома?
              </h2>
              <div className="flex flex-col gap-3 sm:gap-4">
                {areas.map((a) => (
                  <label key={a} className="group relative cursor-pointer p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-[1.01] transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center">
                      <input
                        type="radio"
                        name="area"
                        value={a}
                        checked={area === a}
                        onChange={() => setArea(a)}
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-3 accent-blue-500"
                      />
                      <span className="text-base sm:text-lg text-white group-hover:text-blue-300 transition-colors duration-300">{a}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Вариант отделки
              </h2>
              <div className="flex flex-col gap-3 sm:gap-4">
                {finishes.map((f) => (
                  <label key={f} className="group relative cursor-pointer p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-[1.01] transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center">
                      <input
                        type="radio"
                        name="finish"
                        value={f}
                        checked={finish === f}
                        onChange={() => setFinish(f)}
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-3 accent-blue-500"
                      />
                      <span className="text-base sm:text-lg text-white group-hover:text-blue-300 transition-colors duration-300">{f}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Источник финансирования
              </h2>
              <div className="flex flex-col gap-3 sm:gap-4">
                {finances.map((f) => (
                  <label key={f} className="group relative cursor-pointer p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-[1.01] transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center">
                      <input
                        type="radio"
                        name="finance"
                        value={f}
                        checked={finance === f}
                        onChange={() => setFinance(f)}
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-3 accent-blue-500"
                      />
                      <span className="text-base sm:text-lg text-white group-hover:text-blue-300 transition-colors duration-300">{f}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 animate-fadeIn">
              <div className="bg-green-500/20 border border-green-500/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 flex items-center shadow-lg w-full max-w-xl mx-auto">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mr-3 sm:mr-4 flex-shrink-0" />
                <span className="text-green-300 text-base sm:text-lg md:text-xl font-semibold leading-snug text-left">
                  Благодарим за обращение в нашу компанию!<br className='hidden md:block' /> В течение 15 минут мы свяжемся с вами!
                </span>
              </div>
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 sm:px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg hover:scale-105"
              >
                Закрыть
              </button>
            </div>
          )}

          {success && (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 animate-fadeIn">
              <div className="bg-green-500/20 border border-green-500/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 flex items-center shadow-lg w-full max-w-xl mx-auto">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mr-3 sm:mr-4 flex-shrink-0" />
                <span className="text-green-300 text-base sm:text-lg md:text-xl font-semibold leading-snug text-left">
                  Благодарим за обращение в нашу компанию!<br className='hidden md:block' /> В течение 15 минут мы свяжемся с вами!
                </span>
              </div>
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 sm:px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg hover:scale-105"
              >
                Закрыть
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 sm:mt-6 bg-red-500/20 border border-red-500/30 text-red-300 text-center py-2 sm:py-3 px-3 sm:px-4 rounded-xl flex items-center justify-center min-h-[40px] sm:min-h-[48px] text-sm sm:text-base backdrop-blur-sm">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
              <span className="block w-full break-words">{error}</span>
            </div>
          )}

          {!success && step < 5 && (
            <div className="flex justify-between mt-6 sm:mt-8">
              {step > 1 && (
                <button
                  onClick={handlePrev}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-300 text-sm sm:text-base font-medium"
                >
                  ← Назад
                </button>
              )}
              {step < 4 && (
                <button
                  onClick={handleNext}
                  className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 sm:px-8 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 text-sm sm:text-base font-medium shadow-lg"
                >
                  Далее →
                </button>
              )}
              {step === 4 && (
                <button
                  onClick={handleNext}
                  className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 sm:px-8 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 text-sm sm:text-base font-medium shadow-lg"
                >
                  Рассчитать стоимость
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseCalculatorModal; 