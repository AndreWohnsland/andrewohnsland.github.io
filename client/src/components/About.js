import React from 'react';
import CaptionBanner from './CaptionBanner';

const About = () => {
  return (
    <>
      <CaptionBanner text='Made with React' />
      <div className='main-text-page'>
        <p>
          This page was created while practising and improving my react knowledge. It is also used to present some of my
          other coding projects and give me the possibility to write blog entries. Here is a list of the mandatory tools
          and frameworks used in combination with this side
        </p>
        <p style={{ textAlign: 'left', paddingLeft: '12%', marginBottom: '0px' }}>For the Frontend:</p>
        <ul style={{ listStylePosition: 'inside', textAlign: 'left', paddingLeft: '12%' }}>
          <li>React</li>
          <li>React Router (Dom)</li>
          <li>React (Router) Bootstrap</li>
          <li>React Query</li>
          <li>React Markdown</li>
          <li>React Syntax Highlighter</li>
          <li>Axios</li>
        </ul>
        <p style={{ textAlign: 'left', paddingLeft: '12%', marginBottom: '0px' }}>For the Backend:</p>
        <ul style={{ listStylePosition: 'inside', textAlign: 'left', paddingLeft: '12%' }}>
          <li>Express</li>
          <li>MongoDB / Mongoose</li>
          <li>CORS</li>
          <li>Jsonwebtoken</li>
          <li>Cookie Parser</li>
          <li>Bcrypt</li>
        </ul>
      </div>
    </>
  );
};

export default About;
