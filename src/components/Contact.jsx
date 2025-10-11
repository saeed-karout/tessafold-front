import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import servicesData from '../data/services-contact.json';

function Contact() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    message: '',
    services: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((service) => service !== value)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure services is an array before joining
    const servicesValue = Array.isArray(formData.services) ? formData.services.join(', ') : String(formData.services ?? '');

    emailjs
      .send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
        { ...formData, services: servicesValue },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS Public Key
      )
      .then(() => alert(t('message_sent')))
      .catch((error) => alert(t('message_error') + (error?.text ?? String(error))));
  };

  return (
    <section >
      <h2>{t('contact')}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder={t('email_placeholder')}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder={t('company_name_placeholder')}
          value={formData.companyName}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder={t('message_placeholder')}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <h4>{t('select_services')}</h4>
        {servicesData.map((service) => (
          <label key={service.id}>
            <input
              type="checkbox"
              name="services"
              value={service.id} // Use service.id to avoid object in value
              onChange={handleChange}
            />
            {service.title[currentLang]}
          </label>
        ))}
        <button type="submit">{t('send_button')}</button>
      </form>
    </section>
  );
}

export default Contact;