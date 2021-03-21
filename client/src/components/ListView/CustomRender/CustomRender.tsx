import React from 'react';
import ReactMarkdown from 'react-markdown';
import Tex from '@matejmazur/react-katex';
import math from 'remark-math';
import './blockstyles.scss';

type CustomRenderProps = {
  identifier: string | undefined;
  text: string;
};

const SimpleDivClass: React.FC<CustomRenderProps> = ({ identifier, text }) => {
  return (
    <ReactMarkdown
      className={`${identifier} md-custom-block`}
      escapeHtml={false}
      source={text}
      plugins={[math]}
      renderers={{
        inlineMath: ({ value }) => <Tex math={value} />,
        math: ({ value }) => <Tex block math={value} />,
      }}
    />
  );
};

const CustomRender: React.FC<CustomRenderProps> = ({ identifier, text }) => {
  switch (identifier) {
    default:
      return <SimpleDivClass identifier={identifier} text={text} />;
  }
};

export default CustomRender;
