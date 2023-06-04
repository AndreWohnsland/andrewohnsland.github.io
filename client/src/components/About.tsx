import React, { useEffect, FunctionComponent } from 'react';
import CaptionBanner from './CaptionBanner';

const About: FunctionComponent = () => {
  useEffect(() => {
    document.title = `About | ${process.env.REACT_APP_SHOWN_NAME}`;
  }, []);
  return (
    <>
      <CaptionBanner text="Made with React" />
      <main className="content-container h-100">
        <div className="main-text-page">
          <p>
            This page was created while practising and improving my react
            knowledge. It is also used to present some of my other coding
            projects and give me the possibility to write blog entries. Here is
            a list of the mandatory tools and frameworks used in combination
            with this side.
          </p>
          <p className="list-header">For the Frontend:</p>
          <ul className="list-elements">
            <li>React</li>
            <li>React Router (Dom)</li>
            <li>React (Router) Bootstrap</li>
            <li>React Query</li>
            <li>React Markdown</li>
            <li>React Syntax Highlighter</li>
            <li>Axios</li>
          </ul>
          <p className="list-header">For the Backend:</p>
          <ul className="list-elements">
            <li>Express</li>
            <li>MongoDB / Mongoose</li>
            <li>CORS</li>
            <li>Jsonwebtoken</li>
            <li>Cookie Parser</li>
            <li>Bcrypt</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default About;
