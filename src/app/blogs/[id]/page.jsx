import React from 'react';
import Link from 'next/link';
import fullBlogPostsData from '../../data/fullBlogPosts.json';

export default function BlogPost({ params }) {
  const { id } = params;
  const post = fullBlogPostsData.fullBlogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return <div className="blog-post-container">المقال غير موجود</div>;
  }

  return (
    <div className="blog-post-container">
      <Link href="/blogs" className="back-button">
        &larr; العودة إلى المدونة
      </Link>
      <article className="blog-post">
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-meta">
          <span className="blog-post-author">{post.author}</span>
          <span className="blog-post-date">{post.date}</span>
        </div>
        <div className="blog-post-content">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

