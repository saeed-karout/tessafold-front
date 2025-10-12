import React from 'react';
import '../styles/OurProcessPage.css';
import ProcessComponent from '../components/ourProcess/Process'; 
import LastSection from '../components/LastSection';

function OurProcessPage() {
  return (
    <div className='main-process-page'>
      <div className="frame1-process">
        <div className="top-process">
          <div className="topic-process">
            Website and App <span>Process</span>
          </div>
          <div className="p">
            Process is everything. It’s our IP, our bread and butter. Years and years of experience, mistakes and success have gone into creating the best possible experience, and equip us with the best tools to navigate the sometimes challenging waters of app development.
          </div>
        </div>
      </div>
      <ProcessComponent />

      <LastSection />
    </div>
  );
}

export default OurProcessPage;