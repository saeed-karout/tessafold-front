import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import faqData from '../data/faq.json';
import "../styles/faq.css";

function FAQ() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const [expanded, setExpanded] = useState(null);

  // Log faqData for debugging
  useEffect(() => {
    console.log('faqData:', faqData);
    if (!faqData || !Array.isArray(faqData)) {
      console.error('Invalid faqData:', faqData);
    }
  }, []);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = '/icons/faq/add.svg';
  }, []);

  const toggleFAQ = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section className='faq-main' style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className='title-faq'>{t('faq') || 'Frequently Asked Questions'}</div>
      <div className='questions'>
        {(faqData || []).map((faq) => (
          <div
            className={`question ${expanded === faq.id ? 'expanded' : ''}`}
            key={faq.id || Math.random()}
          >
            <div className='question-header' onClick={() => toggleFAQ(faq.id)}>
              <img
                src="/icons/faq/add.svg"
                className={`question-icon ${expanded === faq.id ? 'rotated' : ''}`}
                alt={expanded === faq.id ? "Collapse" : "Expand"}
              />
              <div className='question-text'>
                <span>{faq.question?.[currentLang] || 'Question'}</span>
              </div>
            </div>
            <div className={`answer-container ${expanded === faq.id ? 'visible' : ''}`}>
              <div className='answer-content'>
                <p>{faq.answer?.[currentLang] || 'No answer available'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;