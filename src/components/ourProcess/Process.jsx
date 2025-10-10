import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import processData from "../../data/locales/process-translations.json"
import "./Process.css";

function ProcessComponent() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [activeStep, setActiveStep] = useState(1);
  const [isChanging, setIsChanging] = useState(false);

  const { phases } = processData.process;

  // دالة لتغيير الخطوة النشطة مع أنيميشن
  const handleStepChange = (stepId) => {
    if (stepId === activeStep || isChanging) return;
    
    setIsChanging(true);
    
    // تأخير بسيط قبل تغيير المحتوى
    setTimeout(() => {
      setActiveStep(stepId);
      setIsChanging(false);
    }, 300);
  };

  // البحث عن الخطوة النشطة
  const getActiveStepData = () => {
    const allSteps = [...phases.phase1.steps, ...phases.phase2.steps];
    return allSteps.find(step => step.id === activeStep) || allSteps[0];
  };

  const activeStepData = getActiveStepData();

  return (
    <div className="page-process-main" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="page-process-frame-left">
        <div className="page-process-groups">
          {/* المرحلة الأولى */}
          <div className="page-process-group">
            <div className="page-process-topic">{phases.phase1.title[currentLang]}</div>
            <div className="page-process-content-group">
              {phases.phase1.steps.map((step) => (
                <div
                  key={step.id}
                  className={`page-process-item ${activeStep === step.id ? 'page-process-item-active' : ''}`}
                  onClick={() => handleStepChange(step.id)}
                >
                  <div className="page-process-logo">
                    <img src={step.icon} alt={`${step.title[currentLang]} icon`} />
                  </div>
                  <div className={`page-process-title ${activeStep === step.id ? 'page-process-title-active' : ''}`}>
                    {step.title[currentLang]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* المرحلة الثانية */}
          <div className="page-process-group">
            <div className="page-process-topic">{phases.phase2.title[currentLang]}</div>
            <div className="page-process-content-group">
              {phases.phase2.steps.map((step) => (
                <div
                  key={step.id}
                  className={`page-process-item ${activeStep === step.id ? 'page-process-item-active' : ''}`}
                  onClick={() => handleStepChange(step.id)}
                >
                  <div className="page-process-logo">
                    <img src={step.icon} alt={`${step.title[currentLang]} icon`} />
                  </div>
                  <div className={`page-process-title ${activeStep === step.id ? 'page-process-title-active' : ''}`}>
                    {step.title[currentLang]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page-process-frame-right">
        <div className={`page-process-content-container ${isChanging ? 'page-process-changing' : ''}`}>
          <div className="page-process-content-title">{activeStepData.title[currentLang]}</div>
          <div className="page-process-content-subtitle">
            {currentLang === 'ar' ? 'نهج شامل لعملية تطوير المواقع والتطبيقات' : 
             currentLang === 'de' ? 'Umfassender Ansatz für Website- und App-Entwicklungsprozess' : 
             'Comprehensive Approach to Website and App Development Process'}
          </div>
          <div className="page-process-description">
            {activeStepData.description[currentLang].split('\n').map((paragraph, index) => (
              <p key={index} className="page-process-description-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessComponent;