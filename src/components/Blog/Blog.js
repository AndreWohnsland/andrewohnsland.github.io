import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import HeadingRenderer from './HeadingRenderer';

class Blog extends Component {
  state = {
    blogText: '',
  };

  componentDidMount() {
    const markdownPath = require('../../dummydata/dummymd.md');
    fetch(markdownPath)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        this.setState({
          blogText: text,
        });
      });
  }

  render() {
    return (
      <div>
        <div className='main-header text-center'>
          <h1>It's Storytime</h1>
        </div>
        <br />
        <div className='main-text'>
          <p>
            Seems like the programmer did not implemented this fully yet :( Maybe next time if you have a look there
            will be more :) Take this dummy markdown for now:
          </p>
          <ReactMarkdown
            className='blog-md'
            source={this.state.blogText}
            renderers={{ code: CodeBlock, heading: HeadingRenderer }}
          ></ReactMarkdown>
        </div>
      </div>
    );
  }
}

export default Blog;
