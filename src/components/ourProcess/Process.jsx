import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import processData from "../../data/locales/process-translations.json"
import "./Process.css";

function ProcessComponent() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [activeStep, setActiveStep] = useState(1);
  const [isChanging, setIsChanging] = useState(false);
  const [openItems, setOpenItems] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const { phases } = processData.process;

  // كشف إذا كان الجهاز موبايل أو تابلت
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // تابلت وما دون
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // دالة لتغيير الخطوة النشطة مع أنيميشن (للديسكتوب)
  const handleStepChange = (stepId) => {
    if (stepId === activeStep || isChanging) return;
    
    setIsChanging(true);
    
    setTimeout(() => {
      setActiveStep(stepId);
      setIsChanging(false);
    }, 300);
  };

  // تبديل فتح/إغلاق العنصر (للموبايل)
  const toggleItem = (stepId) => {
    setOpenItems(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  // البحث عن الخطوة النشطة (للديسكتوب)
  const getActiveStepData = () => {
    const allSteps = [...phases.phase1.steps, ...phases.phase2.steps];
    return allSteps.find(step => step.id === activeStep) || allSteps[0];
  };

  // جمع كل الخطوات من المرحلتين (للموبايل)
  const allSteps = [
    ...phases.phase1.steps.map(step => ({ ...step, phase: phases.phase1.title[currentLang] })),
    ...phases.phase2.steps.map(step => ({ ...step, phase: phases.phase2.title[currentLang] }))
  ];

  const activeStepData = getActiveStepData();

  return (
    <div className="page-process-main" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      
      {/* Desktop Layout - الشكل القديم */}
      {!isMobile && (
        <>
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
        </>
      )}

      {/* Mobile & Tablet Layout - الشكل الجديد dropdown */}
      {isMobile && (
        <div className="page-process-mobile-container">
          <div className="page-process-header">
            <div className="page-process-main-title">
              {currentLang === 'ar' ? 'عملية التطوير' : 
               currentLang === 'de' ? 'Entwicklungsprozess' : 
               'Development Process'}
            </div>
            <div className="page-process-subtitle">
              {currentLang === 'ar' ? 'نهج شامل لعملية تطوير المواقع والتطبيقات' : 
               currentLang === 'de' ? 'Umfassender Ansatz für Website- und App-Entwicklungsprozess' : 
               'Comprehensive Approach to Website and App Development Process'}
            </div>
          </div>

          <div className="page-process-faq-container">
            {allSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`page-process-faq-item ${openItems[step.id] ? 'active' : ''}`}
              >
                <div 
                  className="page-process-faq-question"
                  onClick={() => toggleItem(step.id)}
                >
                  <div className="page-process-faq-question-content">
                    <div className="page-process-faq-icon">
                      <img src={step.icon} alt={`${step.title[currentLang]} icon`} />
                    </div>
                    <div className="page-process-faq-text">
                      <div className="page-process-faq-title">
                        {step.title[currentLang]}
                      </div>
                      <div className="page-process-faq-phase">
                        {step.phase}
                      </div>
                    </div>
                  </div>
                  <div className="page-process-faq-arrow">
                    <span className={`page-process-arrow-icon ${openItems[step.id] ? 'open' : ''}`}>
                      <img src="/arrow-left.svg" style={{rotate:'90deg'}} alt="" />
                    </span>
                  </div>
                </div>
                
                <div className={`page-process-faq-answer ${openItems[step.id] ? 'open' : ''}`}>
                  <div className="page-process-faq-answer-content">
                    {step.description[currentLang].split('\n').map((paragraph, idx) => (
                      <p key={idx} className="page-process-faq-paragraph">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProcessComponent;