import React from 'react';

const Footer = () => {
  return (
    <div className='footer'>
      <footer>
        <div className='left-footer' style={{ float: 'left' }}>
          &copy;{new Date().getFullYear()} A. Wohnsland
        </div>
        <div className='right-footer' style={{ float: 'right' }}>
          Made with React{' '}
          <span role='img' aria-label='heart'>
            ❤️
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
