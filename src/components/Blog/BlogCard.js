import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blogArticle }) => {
  return (
    <div key={blogArticle._id}>
      <Link to={`/project/${blogArticle._id}`} style={{ textDecoration: 'none' }}>
        <div className='card-div'>
          <div className='card-content'>
            <h3 className='card-title'>{blogArticle.title}</h3>
            <p className='card-desc'>{blogArticle.description}</p>
          </div>
        </div>
      </Link>
      <br />
    </div>
  );
};

export default BlogCard;
