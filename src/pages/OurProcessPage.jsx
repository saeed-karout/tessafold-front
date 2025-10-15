import React from 'react';
import '../styles/OurProcessPage.css';
import ProcessComponent from '../components/ourProcess/Process'; 
import LastSection from '../components/LastSection';
import { useTranslation } from 'react-i18next';

function OurProcessPage() {
  const { t } = useTranslation();
  
  return (
    <div className='main-process-page'>
      <div className="frame1-process">
        <div className="top-process">
          <div className="topic-process">
            {t('our_process_page.title')} <span>{t('our_process_page.span_title')}</span>
          </div>
          <div className="p">
            {t('our_process_page.description')}
          </div>
        </div>
      </div>
      <ProcessComponent />

      <LastSection />
    </div>
  );
}

export default OurProcessPage;