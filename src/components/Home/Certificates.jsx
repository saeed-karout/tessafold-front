import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import certificatesData from '../../data/certificates.json';
import "../../styles/Certificates.css";

function Certificates() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';

  // Log certificatesData for debugging
  useEffect(() => {
    console.log('certificatesData:', certificatesData);
    if (!certificatesData?.certificates) {
      console.error('Invalid certificatesData:', certificatesData);
    }
  }, []);

  // Preload images
  useEffect(() => {
    const images = [
      '/images/Certificates/1.png',
      '/images/Certificates/2.png',
      '/images/Certificates/3.svg',
      '/images/Certificates/4.png',
      '/images/Certificates/5.png',
      '/images/Certificates/6.png',
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className='main-cert'>
      <div className="left-cert">
        <div className="top-cert" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
          {certificatesData.certificates?.title_part1?.[currentLang] || 'Our Certifications'}
          <span> {certificatesData.certificates?.germany?.[currentLang] || 'Germany'}</span>
          {certificatesData.certificates?.and?.[currentLang] || ' and '}
          <span> {certificatesData.certificates?.california?.[currentLang] || 'California'}</span>
        </div>
        <div className="description-cert" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
          {certificatesData.certificates?.description?.[currentLang] || 'Our achievements in excellence.'}
        </div>
        <div className="subtitle-cert">
          {certificatesData.certificates?.subtitle?.[currentLang] || 'Certified quality.'}
        </div>
        <Link to="/profile">
          <div className="btn-profile">
            <div className="view">{certificatesData.certificates?.button?.[currentLang] || 'View Profile'}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M9.71295 18.5L14.6523 13.5606C15.2357 12.9773 15.2357 12.0227 14.6523 11.4394L9.71295 6.5" stroke="#FFC159" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
      </div>
      <div className="right-cert">
        <div className="card-cert"><img src="/images/Certificates/1.png" alt="Certificate 1" /></div>
        <div className="card-cert"><img src="/images/Certificates/2.png" alt="Certificate 2" /></div>
        <div className="card-cert"><img src="/images/Certificates/3.svg" alt="Certificate 3" /></div>
        <div className="card-cert"><img src="/images/Certificates/4.png" alt="Certificate 4" /></div>
        <div className="card-cert"><img src="/images/Certificates/5.png" alt="Certificate 5" /></div>
        <div className="card-cert"><img src="/images/Certificates/6.png" alt="Certificate 6" /></div>
      </div>
    </div>
  );
}

export default Certificates;