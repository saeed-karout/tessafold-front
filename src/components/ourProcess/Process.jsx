import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import processData from "../../data/locales/process-translations.json";
import "./Process.css";

function ProcessComponent() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en'; // Normalize language code (e.g., 'en-US' -> 'en')
  const [activeStep, setActiveStep] = useState(1);
  const [isChanging, setIsChanging] = useState(false);
  const [openItems, setOpenItems] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Log processData to debug JSON loading
  useEffect(() => {
    console.log('processData:', processData);
    if (!processData?.process?.phases) {
      console.error('Invalid processData structure:', processData);
    }
  }, []);

  const { phases } = processData.process || { phases: { phase1: { steps: [], title: {} }, phase2: { steps: [], title: {} } } };

  // Detect mobile or tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Preload images to avoid flickering
  useEffect(() => {
    const allSteps = [...(phases.phase1?.steps || []), ...(phases.phase2?.steps || [])];
    allSteps.forEach(step => {
      const img = new Image();
      img.src = step.icon;
    });
    const arrowImg = new Image();
    arrowImg.src = '/arrow-left.svg';
  }, [phases]);

  // Handle step change with animation (desktop)
  const handleStepChange = (stepId) => {
    if (stepId === activeStep || isChanging) return;

    setIsChanging(true);
    setTimeout(() => {
      setActiveStep(stepId);
      setIsChanging(false);
    }, 300);
  };

  // Toggle item open/close (mobile)
  const toggleItem = (stepId) => {
    setOpenItems((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  // Get active step data (desktop)
  const getActiveStepData = () => {
    const allSteps = [...(phases.phase1?.steps || []), ...(phases.phase2?.steps || [])];
    return allSteps.find((step) => step.id === activeStep) || allSteps[0] || {};
  };

  // Combine all steps from both phases (mobile)
  const allSteps = [
    ...(phases.phase1?.steps || []).map((step) => ({ ...step, phase: phases.phase1.title?.[currentLang] || 'Phase 1' })),
    ...(phases.phase2?.steps || []).map((step) => ({ ...step, phase: phases.phase2.title?.[currentLang] || 'Phase 2' })),
  ];

  const activeStepData = getActiveStepData();

  return (
    <div className="page-process-main" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      {/* Desktop Layout */}
      {!isMobile && (
        <>
          <div className="page-process-frame-left">
            <div className="page-process-groups">
              {/* Phase 1 */}
              <div className="page-process-group">
                <div className="page-process-topic">{phases.phase1.title?.[currentLang] || 'Phase 1'}</div>
                <div className="page-process-content-group">
                  {(phases.phase1?.steps || []).map((step) => (
                    <div
                      key={step.id}
                      className={`page-process-item ${activeStep === step.id ? 'page-process-item-active' : ''}`}
                      onClick={() => handleStepChange(step.id)}
                    >
                      <div className="page-process-logo">
                        <img src={step.icon} alt={`${step.title?.[currentLang] || 'Step'} icon`} />
                      </div>
                      <div className={`page-process-title ${activeStep === step.id ? 'page-process-title-active' : ''}`}>
                        {step.title?.[currentLang] || 'Untitled Step'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 2 */}
              <div className="page-process-group">
                <div className="page-process-topic">{phases.phase2.title?.[currentLang] || 'Phase 2'}</div>
                <div className="page-process-content-group">
                  {(phases.phase2?.steps || []).map((step) => (
                    <div
                      key={step.id}
                      className={`page-process-item ${activeStep === step.id ? 'page-process-item-active' : ''}`}
                      onClick={() => handleStepChange(step.id)}
                    >
                      <div className="page-process-logo">
                        <img src={step.icon} alt={`${step.title?.[currentLang] || 'Step'} icon`} />
                      </div>
                      <div className={`page-process-title ${activeStep === step.id ? 'page-process-title-active' : ''}`}>
                        {step.title?.[currentLang] || 'Untitled Step'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="page-process-frame-right">
            <div className={`page-process-content-container ${isChanging ? 'page-process-changing' : ''}`}>
              <div className="page-process-content-title">{activeStepData.title?.[currentLang] || 'Untitled Step'}</div>
              <div className="page-process-content-subtitle">
                {currentLang === 'ar'
                  ? 'نهج شامل لعملية تطوير المواقع والتطبيقات'
                  : currentLang === 'de'
                  ? 'Umfassender Ansatz für Website- und App-Entwicklungsprozess'
                  : 'Comprehensive Approach to Website and App Development Process'}
              </div>
              <div className="page-process-description">
                {(activeStepData.description?.[currentLang] || '')
                  .split('\n')
                  .map((paragraph, index) => (
                    <p key={index} className="page-process-description-paragraph">
                      {paragraph || 'No description available'}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile & Tablet Layout - Dropdown */}
      {isMobile && (
        <div className="page-process-mobile-container">
          <div className="page-process-header">
            <div className="page-process-main-title">
              {currentLang === 'ar'
                ? 'عملية التطوير'
                : currentLang === 'de'
                ? 'Entwicklungsprozess'
                : 'Development Process'}
            </div>
            <div className="page-process-subtitle">
              {currentLang === 'ar'
                ? 'نهج شامل لعملية تطوير المواقع والتطبيقات'
                : currentLang === 'de'
                ? 'Umfassender Ansatz für Website- und App-Entwicklungsprozess'
                : 'Comprehensive Approach to Website and App Development Process'}
            </div>
          </div>

          <div className="page-process-faq-container">
            {allSteps.map((step, index) => (
              <div
                key={step.id}
                className={`page-process-faq-item ${openItems[step.id] ? 'active' : ''}`}
              >
                <div className="page-process-faq-question" onClick={() => toggleItem(step.id)}>
                  <div className="page-process-faq-question-content">
                    <div className="page-process-faq-icon">
                      <img src={step.icon} alt={`${step.title?.[currentLang] || 'Step'} icon`} />
                    </div>
                    <div className="page-process-faq-text">
                      <div className="page-process-faq-title">
                        {step.title?.[currentLang] || 'Untitled Step'}
                      </div>
                      <div className="page-process-faq-phase">{step.phase || 'Unknown Phase'}</div>
                    </div>
                  </div>
                  <div className="page-process-faq-arrow">
                    <span className={`page-process-arrow-icon ${openItems[step.id] ? 'open' : ''}`}>
                      <img src="/arrow-left.svg" style={{ rotate: '0deg' }} alt="Toggle arrow" />
                    </span>
                  </div>
                </div>

                <div className={`page-process-faq-answer ${openItems[step.id] ? 'open' : ''}`}>
                  <div className="page-process-faq-answer-content">
                    {(step.description?.[currentLang] || '')
                      .split('\n')
                      .map((paragraph, idx) => (
                        <p key={idx} className="page-process-faq-paragraph">
                          {paragraph || 'No description available'}
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