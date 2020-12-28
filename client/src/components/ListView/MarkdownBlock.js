import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import HeadingRenderer from './HeadingRenderer';

const MarkdownBlock = ({ maxWidth, sourcedata }) => {
  const PictureRenderer = ({ alt, src, title }) => (
    <img alt={alt} src={src} title={title} style={{ maxWidth }} />
  );
  return (
    <ReactMarkdown
      className="blog-md"
      escapeHtml={false}
      source={sourcedata}
      renderers={{
        code: CodeBlock,
        heading: HeadingRenderer,
        image: PictureRenderer,
      }}
    />
  );
};

export default MarkdownBlock;
