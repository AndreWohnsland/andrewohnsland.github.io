import React from 'react';
import CaptionBanner from './CaptionBanner';

const Home = () => {
  return (
    <>
      <CaptionBanner text="Hi there!" />
      <div className="main-text-page">
        <p>
          Welcome to my little humble homepage. I am Andre, an IoT-Enthusiast,
          Engineer, Developer, and Explorer! I enjoy spending my free time
          learning new technologies and tinker around with soft- and hardware of
          all kinds. That&#39;s how this homepage was born. In the process of
          learning React, I created this page to practise the framework and give
          me the possibility to present some of my work, as well as create blog
          entries.
        </p>
        <p>
          It&#39;s nothing big, but it gets better over time as I get better
          with React and other frameworks. Have a look around, get a glimpse
          what I do and maybe have a look in some of my projects
          <span role="img" aria-label="smile">
            😃
          </span>
          . If you want to dive deeper, you can also have a look into my Github!
        </p>
        <p>
          In the meantime explore the different section. You can find them in
          the header. There is a list of some of my projects (mostly programming
          topics) and a section for blog entries. Also, there are some pictures
          from my hobby fotography and my other passion, woodworking with
          resign. For now, that&#39;s all, maybe next time you can discover even
          more information!
        </p>
      </div>
    </>
  );
};

export default Home;
