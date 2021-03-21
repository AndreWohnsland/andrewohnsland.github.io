import React from 'react';
import ReactMarkdown from 'react-markdown';
import Tex from '@matejmazur/react-katex';
import math from 'remark-math';
import gfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import CodeBlock from './CodeBlock';
import HeadingRenderer from './HeadingRenderer';
import Shortcodes from './CustomRender/Shortcodes';

type MarkdownBlockProps = {
  maxWidth: number | undefined;
  sourcedata: string;
};

type PictureRendererProps = {
  alt: string;
  src: string;
  title: string;
};

const MarkdownBlock: React.FC<MarkdownBlockProps> = ({
  maxWidth,
  sourcedata,
}) => {
  const PictureRenderer = ({ alt, src, title }: PictureRendererProps) => (
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
      plugins={[
        math,
        gfm,
        [
          require('remark-shortcodes'),
          { startBlock: '[[', endBlock: ']]', inlineMode: true },
        ],
      ]}
      escapeHtml={false}
      source={sourcedata}
      renderers={{
        code: CodeBlock,
        heading: HeadingRenderer,
        image: PictureRenderer,
        inlineMath: ({ value }) => <Tex math={value} />,
        math: ({ value }) => <Tex block math={value} />,
        shortcode: Shortcodes,
      }}
    />
  );
};

export default MarkdownBlock;
