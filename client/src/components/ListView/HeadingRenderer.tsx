import React from 'react';

const flatten = (text: string, child: string | any): string | any => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

type HeadingRendererProps = {
  children: any;
  level: string;
};

const HeadingRenderer = (props: HeadingRendererProps): React.ReactElement => {
  const { children, level } = props;
  const childrenElement = React.Children.toArray(children);
  const text = childrenElement.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '-');
  return React.createElement(
    `h${level}`,
    { id: slug, style: { textAlign: 'left', padding: '15px 0px 2px 0px' } },
    children
  );
};

export default HeadingRenderer;
