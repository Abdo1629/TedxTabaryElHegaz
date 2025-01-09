import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import blogPostsData from '../data/blogPosts.json';

const BlogsPage = () => {
  const { blogPosts } = blogPostsData;

  return (
    <div className="blogs-container">
      <h1 className="page-title">مدونة TEDx طبري الحجاز</h1>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={200}
              className="blog-image"
            />
            <div className="blog-content">
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-date">{post.date}</span>
                <Link href={`/blogs/${post.id}`} className="read-more">
                  اقرأ المزيد
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;

