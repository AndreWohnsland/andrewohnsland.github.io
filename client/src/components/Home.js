import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <div className='main-header text-center'>
          <h1>Hi there!</h1>
        </div>
        <div className='main-text'>
          <p>
            Welcome to my little humble homepage. I am Andre, a Software, IoT and Data Science enthusiast. I enjoy
            spending my free time learning new technologies and tinker around with soft- and hardware of all kinds.
            That's how this homepage was born. In the process of learning React, I created this page to practise the
            framework and give me the possibility to present some of my work, as well as create blog entries.{' '}
          </p>
          <p>
            It's nothing big, but it gets better over time as I get better with React and other frameworks. Have a look
            around, get a glimpse what I do and maybe have a look in some of my projects{' '}
            <span role='img' aria-label='smile'>
              😃
            </span>
            . If you want to dive deeper, you can also have a look into my Github!
          </p>
          <p>
            In the meantime explore the different section. You can find them in the header. There is a list of some of
            my projects (mostly programming topics) and a section for blog entries. For now, that's all, maybe next time
            you can discover even more information!
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
