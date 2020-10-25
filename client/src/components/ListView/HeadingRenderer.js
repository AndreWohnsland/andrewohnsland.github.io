import React from 'react';

const flatten = (text, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const HeadingRenderer = (props) => {
  const { children, level } = props;
  const childrenElement = React.Children.toArray(children);
  const text = childrenElement.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '-');
  return React.createElement(`h${level}`, { id: slug }, children);
};

export default HeadingRenderer;
