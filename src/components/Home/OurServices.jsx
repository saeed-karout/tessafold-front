import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/our-services.css';
import ServicesData from '../../data/our_services.json';
import { useTranslation } from 'react-i18next';

function OurServices() {
  const {  i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const servicesSection = ServicesData?.section ?? { topic: { title: { [currentLang]: '' }, description: { [currentLang]: '' } }, services: [] };
  const servicesList = Array.isArray(servicesSection.services) ? servicesSection.services : [];

  // Log ServicesData for debugging
  useEffect(() => {
    console.log('ServicesData:', ServicesData);
    if (!ServicesData?.section) {
      console.error('Invalid ServicesData:', ServicesData);
    }
  }, []);

  return (
    <div className="main-our-services" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="bg-image">
        <div className="topic-service">
          <div className="title">{servicesSection.topic.title?.[currentLang] || 'Our Services'}</div>
          <div className="description">{servicesSection.topic.description?.[currentLang] || 'Explore our offerings.'}</div>
        </div>
        <div className="frame-services">
          {servicesList.map((service, index) => (
            <div key={index} className={`card-service ${service.isLink ? 'card-service-link' : ''}`}>
              {service.isLink ? (
                <Link to={service.to || '/'}>
                  <span>{service.title?.[currentLang] || 'Service'}</span>
                </Link>
              ) : (
                <span>{service.title?.[currentLang] || 'Service'}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurServices;