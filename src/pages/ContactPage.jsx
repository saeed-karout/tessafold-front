import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import servicesData from '../data/services-contact.json';
import '../styles/Contact.scss';
import { useNavigate } from 'react-router-dom';

function ContactPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
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

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllErrors, setShowAllErrors] = useState(false);

  // Validation rules
  const validationRules = {
    email: (value) => {
      if (!value.trim()) return t('contact.validation.emailRequired') || 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return t('contact.validation.emailInvalid') || 'Please enter a valid email address';
      return null;
    },
    companyName: (value) => {
      if (!value.trim()) return t('contact.validation.companyRequired') || 'Company name is required';
      if (value.trim().length < 2) return t('contact.validation.companyMinLength') || 'Company name must be at least 2 characters';
      if (value.trim().length > 100) return t('contact.validation.companyMaxLength') || 'Company name must be less than 100 characters';
      return null;
    },
    message: (value) => {
      if (!value.trim()) return t('contact.validation.messageRequired') || 'Message is required';
      if (value.trim().length > 1000) return t('contact.validation.messageMaxLength') || 'Message must be less than 1000 characters';
      return null;
    },
    services: (value) => {
      if (!Array.isArray(value) || value.length === 0) {
        return t('contact.validation.servicesRequired') || 'Please select at least one service';
      }
      return null;
    },
  };

  // Validate single field
  const validateField = (name, value) => {
    const validator = validationRules[name];
    return validator ? validator(value) : null;
  };

  // Validate all fields
  const validateForm = (data) => {
    const newErrors = {};
    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  // Update localStorage whenever services change
  useEffect(() => {
    try {
      localStorage.setItem('selectedServices', JSON.stringify(formData.services));
    } catch (e) {
      console.warn('Failed to save selectedServices to localStorage:', e);
    }
  }, [formData.services]);

  // Check if form is valid for submission
  const isFormValid = () => {
    const formErrors = validateForm(formData);
    return Object.keys(formErrors).length === 0;
  };

  // Check if submit button should be enabled
  const shouldEnableSubmit = () => {
    return isFormValid();
  };

  // Log servicesData and currentLang to debug
  useEffect(() => {
    console.log('servicesData:', servicesData);
    console.log('currentLang:', currentLang);
    if (!servicesData || !Array.isArray(servicesData)) {
      console.error('servicesData is not an array or undefined:', servicesData);
    } else {
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

    let newValue = value;
    if (type === 'checkbox') {
      newValue = checked
        ? [...formData.services, value]
        : formData.services.filter((service) => service !== value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear errors if field is no longer empty
    if (errors[name] && newValue.trim() !== '') {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle service checkbox toggle with localStorage update
  const handleServiceToggle = (serviceId) => {
    const serviceIdString = serviceId.toString();
    const isCurrentlySelected = formData.services.includes(serviceIdString);

    let newServices;
    if (isCurrentlySelected) {
      newServices = formData.services.filter((id) => id !== serviceIdString);
    } else {
      newServices = [...formData.services, serviceIdString];
    }

    setFormData((prev) => ({
      ...prev,
      services: newServices,
    }));

    // Clear services error if at least one is selected
    if (errors.services && newServices.length > 0) {
      setErrors((prev) => ({
        ...prev,
        services: null,
      }));
    }

    // Update localStorage
    try {
      localStorage.setItem('selectedServices', JSON.stringify(newServices));
    } catch (e) {
      console.warn('Failed to save selectedServices to localStorage:', e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show all errors on submit
    setShowAllErrors(true);

    // Validate all fields
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    // If there are errors, stop submission and scroll to first error
    if (Object.keys(formErrors).length > 0) {
      console.warn('Form validation failed:', formErrors);
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Proceed with submission
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
        setErrors({});
        setShowAllErrors(false);
        localStorage.removeItem('selectedServices');

        // Reset form status after 5 seconds
        setTimeout(() => {
          setFormStatus(null);
        }, 7000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');

      // Reset error status after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to check if field should show error
  const shouldShowError = (fieldName) => {
    return showAllErrors && errors[fieldName];
  };

  return (
    <>
      <div className="content">
        <div className="frame1" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
          <div className="top" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
            <div className="titles">
              {t('contact.title') || 'Get in Touch'} <span>{t('contact.titleHighlight') || 'Now'}</span>
            </div>
            <div className="subtitles" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
              {t('contact.subtitle') || "Let's Collaborate"}
            </div>
            <p>{t('contact.description') || 'Reach out to discuss your project.'}</p>
          </div>
          <div className="frame-form">
            <div className="form" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
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
                  {shouldShowError('email') && <div className="error-message">{errors.email}</div>}
                </div>

                {/* Company Name Field */}
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
                  {shouldShowError('companyName') && <div className="error-message">{errors.companyName}</div>}
                </div>

                {/* Message Field */}
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
                  {shouldShowError('message') && <div className="error-message">{errors.message}</div>}
                </div>

                {/* Services Field */}
                <div className="item">
                  <div className="title">
                    {t('contact.servicesLabel') || 'Services'} <span>*</span>
                  </div>
                  <div className="list">
                    {(Array.isArray(servicesData) ? servicesData : []).map((service) => (
                      <div
                        key={service.id || Math.random()}
                        className={`check-item ${formData.services.includes(service.id?.toString()) ? 'active' : ''}`}
                        onClick={() => handleServiceToggle(service.id)}
                      >
                        <input
                          type="checkbox"
                          id={`service-${service.id}`}
                          name="services"
                          value={service.id}
                          checked={formData.services.includes(service.id?.toString())}
                          onChange={() => handleServiceToggle(service.id)}
                          style={{ display: 'none' }}
                        />
                        <span>
                          {service.title?.[currentLang] ?? t('contact.unknownService', { id: service.id }) ?? 'Unknown Service'}
                        </span>
                      </div>
                    ))}
                  </div>
                  {shouldShowError('services') && <div className="error-message">{errors.services}</div>}
                </div>

                <div className="submit">
                  <button
                    type="submit"
                    disabled={isSubmitting || !shouldEnableSubmit()}
                    className={`submit-button ${shouldEnableSubmit() ? 'active' : 'disabled'}`}
                  >
                    {isSubmitting ? t('contact.submitting') || 'Submitting...' : t('contact.submit') || 'Submit'}
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
              style={{ left: currentLang === 'ar' ? '0' : 'initial', right: currentLang === 'ar' ? 'initial' : '0' }}
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