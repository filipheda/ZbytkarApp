import React, { useState, useEffect } from 'react';
import { ChefHat, Clock, ArrowLeft, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';

export const CookingMode = ({ currentRoute, navigate, selectedRecipe }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerTarget, setTimerTarget] = useState(0);

  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => {
          if (timer <= 1) {
            setTimerActive(false);
            alert('Časovač dokončen!');
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  if (!selectedRecipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Recept nenalezen</p>
      </div>
    );
  }

  const steps = selectedRecipe.instructions || [];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const remainingTime = selectedRecipe.time - (currentStep * 5);

  const handlePrevStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Gratulujeme! Recept je dokončen!');
      navigate('/');
    }
  };

  const startTimer = (minutes) => {
    setTimer(minutes * 60);
    setTimerTarget(minutes * 60);
    setTimerActive(true);
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimer(timerTarget);
    setTimerActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stepIngredients = {
    0: ['Těstoviny (500g)', 'Sůl (1 lžička)', 'Voda (2 litry)'],
    1: ['Rajčata (3 ks)', 'Cibule (1 ks)', 'Česnek (2 stroužky)'],
    2: ['Olivový olej (2 lžíce)', 'Sůl', 'Pepř'],
    3: ['Vše z předchozích kroků']
  };

  const stepTips = {
    0: 'Pro lepší chuť můžete do vody přidat trochu olivového oleje, aby se těstoviny neslepily.',
    1: 'Rajčata lze nahradit konzervovanými, pokud nemáte čerstvá.',
    2: 'Česnek přidejte až na konec, aby se nespálil.',
    3: 'Nechte recept chvíli odležet, aby se chutě propojily.'
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header 
        title={selectedRecipe.name} 
        showBack={true} 
        onBack={() => navigate(`/recipe/${selectedRecipe.id}`, selectedRecipe)}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Průběh vaření</h2>
              <span className="text-sm text-gray-500">
                Krok {currentStep + 1} z {steps.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-center text-sm text-gray-500">
              Zbývá přibližně {remainingTime} minut
            </div>
          </div>

          {/* Current Step */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Krok {currentStep + 1}: {
                currentStep === 0 ? 'Příprava těstovin' :
                currentStep === 1 ? 'Příprava zeleniny' :
                currentStep === 2 ? 'Kombinování ingrediencí' :
                'Dokončení'
              }
            </h3>
            
            <div className="bg-blue-50 p-6 rounded-xl mb-6">
              <p className="text-gray-800 leading-relaxed text-lg">
                {steps[currentStep] || "Postupujte podle instrukcí receptu."}
              </p>
            </div>
            
            {/* Step Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Required Ingredients */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <ChefHat className="w-4 h-4" />
                  <span>Potřebné ingredience:</span>
                </h4>
                <ul className="space-y-2">
                  {(stepIngredients[currentStep] || []).map((ingredient, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tip */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-yellow-800">💡 Tip:</h4>
                <p className="text-sm text-yellow-700">
                  {stepTips[currentStep] || 'Postupujte pomalu a pečlivě.'}
                </p>
              </div>
            </div>

            {/* Timer Section */}
            <div className="bg-gray-900 text-white p-6 rounded-xl mb-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">Časovač</h4>
                
                {timer > 0 ? (
                  <div className="space-y-4">
                    <div className="text-4xl font-bold font-mono">
                      {formatTime(timer)}
                    </div>
                    
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={toggleTimer}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{timerActive ? 'Pozastavit' : 'Spustit'}</span>
                      </button>
                      
                      <button
                        onClick={resetTimer}
                        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-300">Nastavte časovač pro tento krok</p>
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => startTimer(5)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                      >
                        5 min
                      </button>
                      <button
                        onClick={() => startTimer(10)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                      >
                        10 min
                      </button>
                      <button
                        onClick={() => startTimer(15)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                      >
                        15 min
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Předchozí</span>
            </button>
            
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Odhadovaný čas dokončení</div>
              <div className="font-semibold text-gray-900">~{remainingTime} min</div>
            </div>
            
            <button
              onClick={handleNextStep}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>{currentStep < steps.length - 1 ? 'Další' : 'Dokončit'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <BottomNav currentRoute={currentRoute} navigate={navigate} />
    </div>
  );
};

export default CookingMode;