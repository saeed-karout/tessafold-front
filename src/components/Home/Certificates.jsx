import React from 'react'
import { useTranslation } from 'react-i18next'
import certificatesData from '../../data/certificates.json'
import "../../styles/Certificates.css"

function Certificates() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || 'en'

  return (
    <div className='main-cert' style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="left-cert">
         <div className="top-cert">
            {certificatesData.certificates.title_part1[currentLang]} 
            <span> {certificatesData.certificates.germany[currentLang]}</span> 
            {certificatesData.certificates.and[currentLang]} 
            <span> {certificatesData.certificates.california[currentLang]}</span>
          </div>
          
          <div className="description-cert">
            {certificatesData.certificates.description[currentLang]}
          </div>
          
          <div className="subtitle-cert">
            {certificatesData.certificates.subtitle[currentLang]}
          </div>

          <div className="btn-profile">
            <div className="view">{certificatesData.certificates.button[currentLang]}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M9.71295 18.5L14.6523 13.5606C15.2357 12.9773 15.2357 12.0227 14.6523 11.4394L9.71295 6.5" stroke="#FFC159" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
      </div>

      <div className="right-cert">
          <div className="card-cert">
            <img src="/images/Certificates/1.png" alt="Certificate" />
          </div>

          <div className="card-cert">
            <img src="/images/Certificates/2.png" alt="Certificate" />
          </div>

          <div className="card-cert">
            <img src="/images/Certificates/3.svg" alt="Certificate" />
          </div>

          <div className="card-cert">
            <img src="/images/Certificates/4.png" alt="Certificate" />
          </div>

          <div className="card-cert">
            <img src="/images/Certificates/5.png" alt="Certificate" />
          </div>

          <div className="card-cert">
            <img src="/images/Certificates/6.png" alt="Certificate" />
          </div>
      </div>
    </div>
  )
}

export default Certificates