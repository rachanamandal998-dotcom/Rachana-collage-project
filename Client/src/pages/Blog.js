import React from "react";
import "./blog.css";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Free Online Coding Courses in 2025",
    date: "August 27, 2025",
    summary:
      "Discover the best free online coding courses for beginners and advanced learners. Boost your programming skills without spending a dime.",
    link: "https://www.coursera.org/courses?query=coding",
  },
  {
    id: 2,
    title: "Graphic Design Resources You Must Know",
    date: "August 20, 2025",
    summary:
      "A curated list of free graphic design tutorials, tools, and courses to improve your design skills.",
    link: "https://www.coursera.org/courses?query=coding",
  },
  {
    id: 3,
    title: "How to Learn Data Science for Free",
    date: "August 15, 2025",
    summary:
      "Learn how to master data science with free resources, courses, and projects available online.",
    link: "https://www.coursera.org/courses?query=coding",
  },
];

export default function Blog() {
  return (
    <div className="blog-page">
      <header className="blog-hero">
        <h1>OpenSkillZone Blog</h1>
        <p>Insights, tutorials, and guides on free online courses.</p>
      </header>

      <main className="blog-content">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-card">
            <h2>{post.title}</h2>
            <span className="blog-date">{post.date}</span>
            <p>{post.summary}</p>
            <a href={post.link} className="read-more">
              Read More
            </a>
          </article>
        ))}
      </main>
    </div>
  );
}
