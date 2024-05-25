import React, { FunctionComponent } from 'react'

const Footer: FunctionComponent = () => {
  return (
    <div className="footer">
      <footer>
        <div className="left">
          &copy;&nbsp;
          {`${new Date().getFullYear()} ${process.env.REACT_APP_COPYRIGHT}`}
        </div>
        <div className="right">Made with React ❤️</div>
      </footer>
    </div>
  )
}

export default Footer
