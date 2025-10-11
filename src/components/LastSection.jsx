import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import lastSectionData from '../data/last-section.json';
import "../styles/LastSection.css";
import { Link } from 'react-router-dom';

function LastSection() {
  const {  i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';

  // Log lastSectionData for debugging
  useEffect(() => {
    console.log('lastSectionData:', lastSectionData);
    if (!lastSectionData?.last_section) {
      console.error('Invalid lastSectionData:', lastSectionData);
    }
  }, []);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = '/big-logo.svg';
  }, []);

  return (
    <div className='lastSection-main' style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="lastSection-content">
        <div className="lastSection-left">
          <div className="lastSection-logo">
            <img src="/big-logo.svg" alt="Company Logo" className="lastSection-logo-img" />
            <div className="lastSection-child1"></div>
            <div className="lastSection-child2"></div>
          </div>
        </div>
        <div className="lastSection-right">
          <div className="lastSection-topic">
            {lastSectionData.last_section?.topic_part1?.[currentLang] || 'Innovate'}
            <span>.</span>
            {lastSectionData.last_section?.topic_part2?.[currentLang] || 'Create'}
            <span>.</span>
            {lastSectionData.last_section?.topic_part3?.[currentLang] || 'Succeed'}
            <span>.</span>
          </div>
          <div className="lastSection-sub-topic">
            {lastSectionData.last_section?.subtopic?.[currentLang] || 'Our mission is to deliver excellence.'}
          </div>
          <Link to={'/contact'} className="lastSection-btn-secondary">
            <span>{lastSectionData.last_section?.button?.[currentLang] || 'Get Started'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LastSection;