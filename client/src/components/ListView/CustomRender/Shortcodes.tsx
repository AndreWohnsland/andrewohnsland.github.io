import React from 'react';
import ReactMarkdown from 'react-markdown';
import Tex from '@matejmazur/react-katex';

type ShortcodeProps = {
  identifier: string;
  attributes: {
    text: string;
  };
};

const Shortcodes: React.FC<ShortcodeProps> = ({ identifier, attributes }) => {
  return (
    <ReactMarkdown
      className={identifier}
      escapeHtml={false}
      source={attributes.text}
      renderers={{
        inlineMath: ({ value }) => <Tex math={value} />,
        math: ({ value }) => <Tex block math={value} />,
      }}
    />
  );
};

export default Shortcodes;
