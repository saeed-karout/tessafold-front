import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Header.scss';

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentHash, setCurrentHash] = useState('');
  const [lang, setLang] = useState(i18n.language || 'en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLang(i18n.language || 'en');
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [i18n.language, location]);

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const handleNavigation = (target) => {
    if (target === '/contact') {
      navigate('/contact');
      setIsMobileMenuOpen(false);
    } else if (target === '/our-process') {
      navigate('/our-process');
      setIsMobileMenuOpen(false);
    } else if (target === '/') {
      navigate('/');
      setIsMobileMenuOpen(false);
    } else {
      // Smooth scroll for sections like home, services, career
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      } else if (location.pathname !== '/') {
        // If not on home page, navigate to home and scroll to section
        navigate(`/#${target}`);
        setIsMobileMenuOpen(false);
      }
    }
  };

  const isActive = (target) => {
    if (target === '/contact') {
      return location.pathname === '/contact';
    } else if (target === '/our-process') {
      return location.pathname === '/our-process';
    } else if (target === '/') {
      return location.pathname === '/';
    } else {
      return currentHash === `#${target}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`navbar`}>
      {/* الشعار */}
      <div className="logo" onClick={() => handleNavigation('/')}>
        <img 
          src="/logo.svg" 
          width="152" 
          height="32" 
          alt={t('header.logoAlt', { defaultValue: 'Company Logo' })}
          style={{ verticalAlign: 'middle', cursor: 'pointer' }}
        />
      </div>

      {/* قائمة التنقل للشاشات الكبيرة */}
      <div className="pages-rout desktop-nav">
        <div
          className={`nav-item ${isActive('/') ? 'active' : ''}`}
          onClick={() => handleNavigation('/')}
        >
          <span>{t('header.home', { defaultValue: 'Home' })}</span>
        </div>
        <div
          className={`nav-item ${isActive('services') ? 'active' : ''}`}
          onClick={() => handleNavigation('services')}
        >
          <span>{t('header.services', { defaultValue: 'Services' })}</span>
        </div>
        <div
          className={`nav-item ${isActive('career') ? 'active' : ''}`}
          onClick={() => handleNavigation('career')}
        >
          <span>{t('header.career', { defaultValue: 'Career' })}</span>
        </div>
        <div
          className={`nav-item ${isActive('/our-process') ? 'active' : ''}`}
          onClick={() => handleNavigation('/our-process')}
        >
          <span>{t('header.ourProcess', { defaultValue: 'Our Process' })}</span>
        </div>
      </div>

      {/* زر القائمة للشاشات الصغيرة */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* القائمة الجانبية للشاشات الصغيرة */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <div className="logo" onClick={() => handleNavigation('/')}>
              <img 
                src="/logo.svg" 
                width="120" 
                height="25" 
                alt={t('header.logoAlt', { defaultValue: 'Company Logo' })}
              />
            </div>
            <div className="mobile-close-btn" onClick={toggleMobileMenu}>
              ×
            </div>
          </div>

          <div className="mobile-nav-items">
            <div
              className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}
              onClick={() => handleNavigation('/')}
            >
              <span>{t('header.home', { defaultValue: 'Home' })}</span>
            </div>
            <div
              className={`mobile-nav-item ${isActive('services') ? 'active' : ''}`}
              onClick={() => handleNavigation('services')}
            >
              <span>{t('header.services', { defaultValue: 'Services' })}</span>
            </div>
            <div
              className={`mobile-nav-item ${isActive('career') ? 'active' : ''}`}
              onClick={() => handleNavigation('career')}
            >
              <span>{t('header.career', { defaultValue: 'Career' })}</span>
            </div>
            <div
              className={`mobile-nav-item ${isActive('/our-process') ? 'active' : ''}`}
              onClick={() => handleNavigation('/our-process')}
            >
              <span>{t('header.ourProcess', { defaultValue: 'Our Process' })}</span>
            </div>
          </div>

          <div className="mobile-menu-footer">
            <div
              className={`mobile-contact-btn ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => handleNavigation('/contact')}
            >
              <span>{t('header.partnerWithUs', { defaultValue: 'Partner With Us' })}</span>
            </div>

            <div className="mobile-language">
              <button
                className={`mobile-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <button
                className={`mobile-lang-btn ${lang === 'de' ? 'active' : ''}`}
                onClick={() => changeLanguage('de')}
              >
                DE
              </button>
              <button
                className={`mobile-lang-btn ${lang === 'ar' ? 'active' : ''}`}
                onClick={() => changeLanguage('ar')}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* الجزء الأيمن للشاشات الكبيرة */}
      <div className="frame-contact desktop-contact">
        <div
          className={`button-contact ${isActive('/contact') ? 'active' : ''}`}
          onClick={() => handleNavigation('/contact')}
        >
          <span>{t('header.partnerWithUs', { defaultValue: 'Partner With Us' })}</span>
        </div>

        <div className="language">
          <button
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
          <button
            className={`lang-btn ${lang === 'de' ? 'active' : ''}`}
            onClick={() => changeLanguage('de')}
          >
            DE
          </button>
          <button
            className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
            onClick={() => changeLanguage('ar')}
          >
            AR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;