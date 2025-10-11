import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import servicesData from '../data/services-contact.json'; 
import '../styles/Contact.scss';
import { useNavigate } from 'react-router-dom';

function ContactPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en'; // Normalize language code
  const navigate = useNavigate();

  // Initialize formData with safe parsing of localStorage
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    message: '',
    services: (() => {
      try {
        const stored = localStorage.getItem('selectedServices');
        return stored && JSON.parse(stored) ? JSON.parse(stored) : [];
      } catch (e) {
        console.warn('Failed to parse selectedServices from localStorage:', e);
        return [];
      }
    })(),
  });
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Log servicesData and currentLang to debug
  useEffect(() => {
    console.log('servicesData:', servicesData);
    console.log('currentLang:', currentLang);
    if (!servicesData || !Array.isArray(servicesData)) {
      console.error('servicesData is not an array or undefined:', servicesData);
    } else {
      // Log services missing titles for currentLang
      servicesData.forEach((service, index) => {
        if (!service?.title?.[currentLang]) {
          console.warn(`Service at index ${index} (id: ${service?.id}) missing title for language: ${currentLang}`);
        }
      });
    }
  }, [currentLang]);

  // Preload images to avoid flickering
  useEffect(() => {
    const images = ['/images/contact/icon-form.svg', '/images/contact/Vector.svg'];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
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
      Array.isArray(formData.services) &&
      formData.services.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      console.warn('Form is invalid:', formData);
      return;
    }

    setIsSubmitting(true);
    try {
      if (!Array.isArray(servicesData)) {
        throw new Error('servicesData is not an array');
      }
      if (!Array.isArray(formData.services)) {
        throw new Error('formData.services is not an array');
      }

      const serviceTitles = formData.services
        .map((id) => {
          const service = servicesData.find((s) => s.id.toString() === id);
          return service?.title?.[currentLang] ?? t('contact.unknownService', { id }) ?? 'Unknown Service';
        })
        .filter(Boolean);

      console.log('Submitting form with data:', {
        email: formData.email,
        companyName: formData.companyName,
        message: formData.message,
        services: serviceTitles,
      });

      const servicesString = Array.isArray(serviceTitles) ? serviceTitles.join(', ') : String(serviceTitles ?? '');

      const response = await axios.post('https://formspree.io/f/meorowdq', {
        email: formData.email,
        companyName: formData.companyName,
        message: formData.message,
        services: servicesString,
      });

      if (response.status === 200) {
        setFormStatus('success');
        setFormData({ email: '', companyName: '', message: '', services: [] });
        localStorage.removeItem('selectedServices');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
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
              {t('contact.title') || 'Get in Touch'} <span>{t('contact.titleHighlight') || 'Now'}</span>
            </div>
            <div className="subtitles">{t('contact.subtitle') || 'Let’s Collaborate'}</div>
            <p>{t('contact.description') || 'Reach out to discuss your project.'}</p>
          </div>
          <div className="frame-form">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="item">
                  <div className="title">
                    {t('contact.emailLabel') || 'Email'} <span>*</span>
                  </div>
                  <div className="input-field">
                    <input
                      type="email"
                      name="email"
                      placeholder={t('contact.emailPlaceholder') || 'Enter your email'}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="item">
                  <div className="title">
                    {t('contact.companyLabel') || 'Company Name'} <span>*</span>
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      name="companyName"
                      placeholder={t('contact.companyPlaceholder') || 'Enter your company name'}
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="item">
                  <div className="title">
                    {t('contact.messageLabel') || 'Message'} <span>*</span>
                  </div>
                  <div className="input-field">
                    <textarea
                      name="message"
                      rows={5}
                      placeholder={t('contact.messagePlaceholder') || 'Your message'}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="item">
                  <div className="title">
                    {t('contact.servicesLabel') || 'Services'} <span>*</span>
                  </div>
                  <div className="list">
                    {(Array.isArray(servicesData) ? servicesData : []).map((service) => (
                      <div
                        key={service.id || Math.random()}
                        className={`check-item ${formData.services.includes(service.id?.toString()) ? 'active' : ''}`}
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
                          checked={formData.services.includes(service.id?.toString())}
                          onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                        <span>{service.title?.[currentLang] ?? t('contact.unknownService', { id: service.id }) ?? 'Unknown Service'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`submit ${isFormValid() ? 'active' : ''}`}>
                  <button type="submit" disabled={!isFormValid() || isSubmitting}>
                    <span>{isSubmitting ? t('contact.submitting') || 'Submitting...' : t('contact.submit') || 'Submit'}</span>
                  </button>
                </div>

                {formStatus === 'success' && (
                  <p className="success-message">{t('contact.success') || 'Form submitted successfully!'}</p>
                )}
                {formStatus === 'error' && (
                  <p className="error-message">{t('contact.error') || 'Error submitting form.'}</p>
                )}
              </form>
            </div>
            <img
              src="/images/contact/icon-form.svg"
              className="bg-icon"
              alt={t('contact.iconAlt') || 'Form Icon'}
            />
          </div>
        </div>
      </div>
      <div className="frame2">
        <img src="/images/contact/Vector.svg" className="vector" alt="" />
        <div className="text">
          <div className="topic">
            {t('contact.section2.title') || 'Ready to Start'} <span>{t('contact.section2.span') || 'Now'}</span>
          </div>
          <p>{t('contact.section2.subtitle') || 'Let’s build something great together.'}</p>
        </div>
        <div className="btn-home" onClick={() => navigate('/')}>
          <span>{t('contact.section2.btn') || 'Back to Home'}</span>
        </div>
        <img src="/images/contact/Vector.svg" className="vector2" alt="" />
      </div>
    </>
  );
}

export default ContactPage;