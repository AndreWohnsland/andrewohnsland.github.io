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
          other coding projects.
        </p>
        <p style={{ textAlign: 'left', paddingLeft: '15%' }}>Tools used are:</p>
        <ul style={{ listStylePosition: 'inside', textAlign: 'left', paddingLeft: '15%' }}>
          <li>React</li>
          <li>React Router</li>
          <li>React Bootstrap</li>
          <li>Some Other Frameworks</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
