import React from 'react';

const About = () => {
  return (
    <div>
      <div className='main-header text-center'>
        <h1>Made with React</h1>
      </div>
      <br />
      <div className='main-text'>
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
        </ul>
        <p style={{ textAlign: 'left', paddingLeft: '12%', marginBottom: '0px' }}>For the Backend:</p>
        <ul style={{ listStylePosition: 'inside', textAlign: 'left', paddingLeft: '12%' }}>
          <li>Express</li>
          <li>MongoDB / Mongoose</li>
          <li>CORS</li>
          <li>Jsonwebtoken</li>
          <li>Cookie Parser</li>
          <li>Brypt</li>
        </ul>
      </div>
    </div>
  );
};

export default About;