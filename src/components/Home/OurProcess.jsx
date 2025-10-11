import { useTranslation } from 'react-i18next';
import processData from '../../data/our_process.json';
import '../../styles/process.css';

function OurProcess() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const steps = Array.isArray(processData?.steps) ? processData.steps : [];

  return (
    <section className="main-process" >
      <div className="section-top">
        <div className="frame">
          <div className="left">
            <div className="title">
              {t('our_process.title')}
              <span>{t('our_process.title_span')}</span>
            </div>
            <div className="subtitle">{t('our_process.subtitle')}</div>
          </div>
          <div className="right">
            <span>{t('our_process.view_full_process')}</span>
            <img src="/arrow-left.svg" width={24} alt={t('our_process.arrow_alt')} />
          </div>
        </div>
      </div>

      <div className="process-line">
        <div className="group">
          <div className="line"></div>
          <div className="parent">
            {steps.map((step) => (
              <div key={step.id} className="frame-data">
                <div className="icon">
                  <img
                    src={step.icon}
                    className="step-icon"
                    alt={t('our_process.step_icon_alt', { name: step.name[currentLang] })}
                  />
                </div>
                <div className="name">{step.name[currentLang]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurProcess;