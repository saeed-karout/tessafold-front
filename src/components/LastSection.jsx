import React from 'react'
import { useTranslation } from 'react-i18next'
import lastSectionData from '../data/last-section.json'
import "../styles/LastSection.css"
import { Link } from 'react-router-dom'

function LastSection() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || 'en'

  const handleButtonClick = () => {
    // يمكنك إضافة أي action هنا مثل الانتقال إلى صفحة الاتصال
    console.log('Button clicked - redirect to contact page')
  }

  return (
    <div className='lastSection-main' >
        <div className="lastSection-content">

            <div className="lastSection-left">
              <div className="lastSection-logo">
                  <img src="/big-logo.svg" alt="Company Logo" className="lastSection-logo-img" />
                  <div className="lastSection-child1"></div>
                  <div className="lastSection-child2"></div>
              </div>
            </div>

            <div className="lastSection-right" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
                <div className="lastSection-topic">
                  {lastSectionData.last_section.topic_part1[currentLang]}<span>.</span>  
                  {lastSectionData.last_section.topic_part2[currentLang]}<span>.</span>  
                  {lastSectionData.last_section.topic_part3[currentLang]}<span>.</span>
                </div>

                <div className="lastSection-sub-topic">
                  {lastSectionData.last_section.subtopic[currentLang]}
                </div>

                <Link to={'/contact'} className="lastSection-btn-secondary" onClick={handleButtonClick}>
                    <span>{lastSectionData.last_section.button[currentLang]}</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default LastSection