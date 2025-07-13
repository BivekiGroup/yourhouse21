'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const materials = [
  { label: 'Кирпич/керамический блок', value: 'Кирпич/керамический блок', img: '/images/keramic.jpg' },
  { label: 'Газобетон', value: 'Газобетон', img: '/images/gazobet.png' },
  { label: 'Керамзитобетон', value: 'Керамзитобетон', img: '/images/keramiz.jpg' },
];

const areas = [
  '80-100 кв.м.',
  '100-150 кв.м.',
  '150-200 кв.м.',
  'более 200 кв.м.',
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !material) return;
    if (step === 2 && !area) return;
    if (step === 3 && !finish) return;
    if (step === 4 && !finance) return;
    
    if (step === 4) {
      handleSubmitCalculator();
      return;
    }
    setStep((s) => s + 1);
  };

  const handlePrev = () => {
    setStep((s) => s - 1);
  };

  const handleSubmitCalculator = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
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
        setStep(5);
      }
    } catch {
      // Обработка ошибки
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setStep(1);
    setMaterial('');
    setArea('');
    setFinish('');
    setFinance('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4">
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-64 lg:w-80 h-56 sm:h-64 lg:h-80 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 sm:w-56 lg:w-64 h-48 sm:h-56 lg:h-64 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-2xl mx-auto animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-white p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors z-10"
          aria-label="Закрыть калькулятор"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        </button>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Калькулятор стоимости дома
            </h1>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Выберите материал
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {materials.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMaterial(m.value)}
                    className={`group relative p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-[1.02] ${
                      material === m.value 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/25' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-opacity duration-300 ${
                      material === m.value ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    <div className="relative z-10 text-center">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-300 transition-colors duration-300">
                        {m.label}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Какая площадь дома?
              </h2>
              <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                {areas.map((a) => (
                  <label key={a} className="group relative cursor-pointer p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-[1.01] transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center">
                      <input
                        type="radio"
                        name="area"
                        value={a}
                        checked={area === a}
                        onChange={() => setArea(a)}
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 accent-blue-500"
                      />
                      <span className="text-sm sm:text-base lg:text-lg text-white group-hover:text-blue-300 transition-colors duration-300">{a}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Выберите тип отделки
              </h2>
              <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                {['Без отделки', 'Черновая отделка', 'Чистовая отделка'].map((f) => (
                  <label key={f} className="group relative cursor-pointer p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-[1.01] transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center">
                      <input
                        type="radio"
                        name="finish"
                        value={f}
                        checked={finish === f}
                        onChange={() => setFinish(f)}
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 accent-blue-500"
                      />
                      <span className="text-sm sm:text-base lg:text-lg text-white group-hover:text-blue-300 transition-colors duration-300">{f}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Источник финансирования
              </h2>
              <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                {['Наличные', 'Сельская ипотека', 'Ипотека, кредит', 'Свой вариант'].map((f) => (
                  <label key={f} className="group relative cursor-pointer p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-[1.01] transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center">
                      <input
                        type="radio"
                        name="finance"
                        value={f}
                        checked={finance === f}
                        onChange={() => setFinance(f)}
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 accent-blue-500"
                      />
                      <span className="text-sm sm:text-base lg:text-lg text-white group-hover:text-blue-300 transition-colors duration-300">{f}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="text-center">
              <div className="mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-4">✅</div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Спасибо за заявку!
                </h2>
                <p className="text-sm sm:text-base text-gray-300">
                  Мы свяжемся с вами в ближайшее время
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-6 sm:mt-8">
            {step > 1 && step < 5 && (
              <button
                onClick={handlePrev}
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Назад</span>
              </button>
            )}
            
            {step < 4 && (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !material) ||
                  (step === 2 && !area) ||
                  (step === 3 && !finish)
                }
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 ml-auto text-sm sm:text-base"
              >
                <span>Далее</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            
            {step === 4 && (
              <button
                onClick={handleNext}
                disabled={!finance || isSubmitting}
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 ml-auto text-sm sm:text-base"
              >
                <span>{isSubmitting ? 'Отправка...' : 'Отправить'}</span>
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            
            {step === 5 && (
              <button
                onClick={closeModal}
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 mx-auto text-sm sm:text-base"
              >
                <span>Закрыть</span>
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCalculatorModal; 