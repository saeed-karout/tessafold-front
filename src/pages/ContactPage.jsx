import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import servicesData from '../data/services-contact.json';
import '../styles/Contact.scss';
import { useNavigate } from 'react-router-dom';

function ContactPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  // Initialize formData with services from localStorage if available
const [formData, setFormData] = useState({
  email: '',
  companyName: '',
  message: '',
  services: (() => {
    try {
      const stored = localStorage.getItem('selectedServices');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Invalid localStorage data, resetting services:', e);
      localStorage.removeItem('selectedServices');
      return [];
    }
  })() // IIFE للتهيئة الفورية
});
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load services from localStorage on mount and update on services change
  useEffect(() => {
    localStorage.setItem('selectedServices', JSON.stringify(formData.services));
  }, [formData.services]);

  // Preload images to avoid flickering
  useEffect(() => {
    const img = new Image();
    img.src = '/images/contact/icon-form.svg';
    const vector = new Image();
    vector.src = '/images/contact/Vector.svg';
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const newServices = checked
          ? [...prev.services, value]
          : prev.services.filter((service) => service !== value);
        return { ...prev, services: newServices };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = () => {
    return (
      formData.email.trim() &&
      formData.companyName.trim() &&
      formData.message.trim() &&
      formData.services.length > 0
    );
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isFormValid()) return;

  setIsSubmitting(true);
  try {
    // فحص إضافي للأمان
    if (!servicesData || !Array.isArray(formData.services)) {
      console.error('Invalid services data:', { servicesData, formDataServices: formData.services });
      setFormStatus('error');
      setIsSubmitting(false);
      return;
    }

    const response = await axios.post('https://formspree.io/f/meorowdq', {
      email: formData.email,
      companyName: formData.companyName,
      message: formData.message,
      services: formData.services
        .map((id) => servicesData.find((s) => s.id.toString() === id)?.title?.[currentLang] ?? 'Unknown Service') // استخدم optional chaining
        .filter(Boolean) // إزالة القيم الفارغة
        .join(', ') // الآن آمن لأنها مصفوفة صالحة
    });
    if (response.status === 200) {
      setFormStatus('success');
      setFormData({ email: '', companyName: '', message: '', services: [] });
      localStorage.removeItem('selectedServices');
    }
  } catch (error) {
    setFormStatus('error');
    console.error('Form submission error:', error);
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <>
    
    <div className="content">
      <div className="frame1">
        <div className="top" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
          <div className="titles">
            {t('contact.title')} <span>{t('contact.titleHighlight')}</span>
          </div>
          <div className="subtitles">{t('contact.subtitle')}</div>
          <p>{t('contact.description')}</p>
        </div>
        <div className="frame-form">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="item">
                <div className="title">
                  {t('contact.emailLabel')} <span>*</span>
                </div>
                <div className="input-field">
                  <input
                    type="email"
                    name="email"
                    placeholder={t('contact.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="item">
                <div className="title">
                  {t('contact.companyLabel')} <span>*</span>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    name="companyName"
                    placeholder={t('contact.companyPlaceholder')}
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="item">
                <div className="title">
                  {t('contact.messageLabel')} <span>*</span>
                </div>
                <div className="input-field">
                  <textarea
                    name="message"
                    rows={5}
                    placeholder={t('contact.messagePlaceholder')}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="item">
                <div className="title">
                  {t('contact.servicesLabel')} <span>*</span>
                </div>
                <div className="list">
                  {servicesData.map((service) => (
                    <div
                      key={service.id}
                      className={`check-item ${formData.services.includes(service.id.toString()) ? 'active' : ''}`}
                      onClick={() => {
                        const input = document.getElementById(`service-${service.id}`);
                        if (input) input.click();
                      }}
                    >
                      <input
                        type="checkbox"
                        id={`service-${service.id}`}
                        name="services"
                        value={service.id}
                        checked={formData.services.includes(service.id.toString())}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                      />
                      <span>{service.title[currentLang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`submit ${isFormValid() ? 'active' : ''}`}>
                <button type="submit" disabled={!isFormValid() || isSubmitting}>
                  <span>{isSubmitting ? t('contact.submitting') : t('contact.submit')}</span>
                </button>
              </div>

              {formStatus === 'success' && (
                <p className="success-message">{t('contact.success')}</p>
              )}
              {formStatus === 'error' && (
                <p className="error-message">{t('contact.error')}</p>
              )}
            </form>
          </div>
          <img
            src="/images/contact/icon-form.svg"
            className="bg-icon"
            alt={t('contact.iconAlt')}
          />
        </div>
      </div>
    </div>
      <div className="frame2">
        <img src="/images/contact/Vector.svg" className="vector" alt="" />
        <div className="text">
          <div className="topic">
            {t('contact.section2.title')} <span>{t('contact.section2.span')}</span>
          </div>
          <p>{t('contact.section2.subtitle')}</p>
        </div>
        <div className="btn-home" onClick={() => navigate('/')}>
          <span>{t('contact.section2.btn')}</span>
        </div>
        <img src="/images/contact/Vector.svg" className="vector2" alt="" />
      </div>
    </>
  );
}

export default ContactPage;