import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import 'katex/dist/katex.min.css'
import CodeBlock from './CodeBlock'

type MarkdownBlockProps = {
  maxWidth: number | undefined
  sourcedata: string
}

type PictureRendererProps = {
  alt?: string
  src?: string
  title?: string
}

const MarkdownBlock: React.FC<MarkdownBlockProps> = ({
  maxWidth,
  sourcedata,
}) => {
  const PictureRenderer = ({ src, alt, title }: PictureRendererProps) => (
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
  )
  return (
    <div className="blog-md">
      <ReactMarkdown
        remarkPlugins={[
          remarkMath,
          remarkGfm,
          remarkToc,
          remarkDirective,
          remarkDirectiveRehype,
        ]}
        rehypePlugins={[rehypeKatex, rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          code: CodeBlock,
          img: PictureRenderer,
        }}
      >
        {sourcedata}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownBlock
