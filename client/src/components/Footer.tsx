import React, {FunctionComponent} from 'react';

type FooterProps = {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <div className="footer">
      <footer>
        <div className="left">
          &copy;&nbsp;
          {`${new Date().getFullYear()} A. Wohnsland`}
        </div>
        <div className="right">
          Made with React&nbsp;
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
