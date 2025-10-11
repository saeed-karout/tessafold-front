import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/our-services.css';
import ServicesData from '../../data/our_services.json';
import { useTranslation } from 'react-i18next';


function OurServices() {
   const {  i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const servicesSection = ServicesData?.section ?? { topic: { title: { en: '' }, description: { en: '' } }, services: [] };
    const servicesList = Array.isArray(servicesSection.services) ? servicesSection.services : [];

  return (
    <div className="main-our-services"  >
      <div className="bg-image">
        <div className="topic-service" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="title">{servicesSection.topic.title[currentLang]}</div>
          <div className="description">{servicesSection.topic.description[currentLang]}</div>
        </div>
        <div className="frame-services">
          {servicesList.map((service, index) => (
            <div key={index} className={`card-service ${service.isLink ? 'card-service-link' : ''}`} dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
              {service.isLink ? (
                <Link to={service.to}>
                  <span>{service.title[currentLang]}</span>
                </Link>
              ) : (
                <span>{service.title[currentLang]}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurServices;