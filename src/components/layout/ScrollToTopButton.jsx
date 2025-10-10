import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/ScrollToTopButton.scss';

function ScrollToTopButton() {
  const { t } = useTranslation();
 
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
    //   style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}
        onClick={scrollToTop}

    >
      <button
        title={t('scrollToTop.title')}
        aria-label={t('scrollToTop.ariaLabel')}
      >
        <img
          src="/arrow-up.svg"
          alt={t('scrollToTop.alt')}
          className="scroll-icon"
        />
      </button>
    </div>
  );
}

export default ScrollToTopButton;