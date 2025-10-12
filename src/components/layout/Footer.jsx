import { useTranslation } from 'react-i18next';
import '../../styles/Footer.scss';

function Footer() {
  const { t } = useTranslation();
 
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-main" >
      <div className="footer-frame-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img
              src="/logo.svg"
              className="footer-logo-icon"
              alt={t('footer.logoAlt')}
              width="152"
              height="32"
            />
            <div className="footer-subtitle">{t('footer.imprint')}</div>
          </div>

          <div className="footer-social-media">
            <a href="https://facebook.com/tessafold" target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/social-media/facebook.svg"
                className="footer-item"
                alt={t('footer.social.facebook')}
              />
            </a>
            <a href="https://instagram.com/tessafold" target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/social-media/instagram.svg"
                className="footer-item"
                alt={t('footer.social.instagram')}
              />
            </a>
            <a href="https://linkedin.com/tessafold" target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/social-media/linkedin.svg"
                className="footer-item"
                alt={t('footer.social.linkedin')}
              />
            </a>
            <a href="https://twitter.com/tessafold" target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/social-media/twitter.svg"
                className="footer-item"
                alt={t('footer.social.twitter')}
              />
            </a>
            <a href="https://wa.me/966581670316" target="_blank" rel="noopener noreferrer">
              <img
                src="/icons/social-media/whatsapp.svg"
                className="footer-item"
                alt={t('footer.social.whatsapp')}
              />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-col1">
            <div className="footer-top">
              <div className="footer-title">{t('footer.locations.berlin.title')}</div>
              <div className="footer-subtitle">{t('footer.locations.berlin.subtitle')}</div>
            </div>
            <div className="footer-top">
              <div className="footer-title">{t('footer.locations.jeddah.title')}</div>
              <div className="footer-subtitle">{t('footer.locations.jeddah.subtitle')}</div>
            </div>
          </div>

          <div className="footer-col2">
            <div className="footer-top">
              <div className="footer-title">{t('footer.locations.california.title')}</div>
              <div className="footer-subtitle">{t('footer.locations.california.subtitle')}</div>
            </div>
            <div className="footer-top">
              <div className="footer-title">{t('footer.locations.dubai.title')}</div>
              <div className="footer-subtitle">{t('footer.locations.dubai.subtitle')}</div>
            </div>
          </div>

          <div className="footer-col3">
            <div className="footer-title">{t('footer.contacts.title')}</div>
            <div className="footer-contacts">
              <div className="footer-row">
                <img src="/icons/footer/sms.svg" className="footer-icon" alt={t('footer.contacts.emailIcon')} />
                <a href="mailto:info@tessafold.com" className="footer-content">
                  {t('footer.contacts.email')}
                </a>
              </div>
              <div className="footer-row">
                <img src="/icons/footer/call.svg" className="footer-icon" alt={t('footer.contacts.phoneIcon')} />
                <a href="tel:+966581670316" className="footer-content">
                  {t('footer.contacts.phone1')}
                </a>
              </div>
              <div className="footer-row">
                <img src="/icons/footer/call.svg" className="footer-icon" alt={t('footer.contacts.phoneIcon')} />
                <a href="tel:+491726775186" className="footer-content">
                  {t('footer.contacts.phone2')}
                </a>
              </div>
              <div className="footer-row">
                <img src="/icons/footer/call.svg" className="footer-icon" alt={t('footer.contacts.phoneIcon')} />
                <a href="tel:+971544707457" className="footer-content">
                  {t('footer.contacts.phone3')}
                </a>
              </div>
              <div className="footer-row">
                <img src="/icons/footer/call.svg" className="footer-icon" alt={t('footer.contacts.phoneIcon')} />
                <a href="tel:+19498646033" className="footer-content">
                  {t('footer.contacts.phone4')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copy-right">
        <div className="footer-line"></div>
        <div className="footer-text">
          {t('footer.copyright', { year: currentYear })}
        </div>
      </div>
    </div>
  );
}

export default Footer;