import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import processData from '../../data/our_process.json';
import '../../styles/process.css';

function OurProcess() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';

  // Log processData for debugging
  useEffect(() => {
    console.log('processData:', processData);
    if (!processData?.steps) {
      console.error('Invalid processData:', processData);
    }
  }, []);

  // Preload images
  useEffect(() => {
    (processData.steps || []).forEach((step) => {
      const img = new Image();
      img.src = step.icon;
    });
    const arrowImg = new Image();
    arrowImg.src = '/arrow-left.svg';
  }, []);

  return (
    <section className="main-process-component" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="section-top">
        <div className="frame">
          <div className="left">
            <div className="title">
              {t('our_process.title') || 'Our Process'}
              <span>{t('our_process.title_span') || 'Journey'}</span>
            </div>
            <div className="subtitle">{t('our_process.subtitle') || 'How We Work'}</div>
          </div>
          <div className="right">
            <span>{t('our_process.view_full_process') || 'View Full Process'}</span>
            <img src="/arrow-left.svg" className="arrow-icon" style={{ rotate: currentLang === 'ar' ? '180deg' : '0deg' }} alt={t('our_process.arrow_alt') || 'Arrow'} />
          </div>
        </div>
      </div>

      <div className="process-line">
        <div className="group">
          <div className="line"></div>
          <div className="parent">
            {(processData.steps || []).map((step, index) => (
              <div key={step.id || Math.random()} className="frame-data">
                <div className="icon">
                  <img
                    src={step.icon || '/placeholder.png'}
                    className="step-icon"
                    alt={t('our_process.step_icon_alt', { name: step.name?.[currentLang] || 'Step' })}
                  />
                </div>
                <div className="name">
                  <span className="step-number">{`${index + 1}.`}</span>{' '}
                  {step.name?.[currentLang] || 'Untitled Step'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurProcess;