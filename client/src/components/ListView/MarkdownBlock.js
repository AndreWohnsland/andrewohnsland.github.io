import React from 'react';
import ReactMarkdown from 'react-markdown';
import Tex from '@matejmazur/react-katex';
import math from 'remark-math';
import gfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import CodeBlock from './CodeBlock';
import HeadingRenderer from './HeadingRenderer';

const MarkdownBlock = ({ maxWidth, sourcedata }) => {
  const PictureRenderer = ({ alt, src, title }) => (
    <>
      <img
        alt={alt}
        src={src}
        title={title}
        className="blog-picture"
        style={{
          maxWidth,
        }}
      />
      <span className="picture-caption">{`${alt}`}</span>
    </>
  );
  return (
    <ReactMarkdown
      className="blog-md"
      plugins={[math, gfm]}
      escapeHtml={false}
      source={sourcedata}
      renderers={{
        code: CodeBlock,
        heading: HeadingRenderer,
        image: PictureRenderer,
        inlineMath: ({ value }) => <Tex math={value} />,
        math: ({ value }) => <Tex block math={value} />,
      }}
    />
  );
};

export default MarkdownBlock;
