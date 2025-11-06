import React from "react";
import "./aboutus.css";

export default function About() {
  return (
    <div className="about-page">
      <section className="hero">
        <h1>About OpenSkillZone</h1>
        <p>Connecting learners with the best free courses online.</p>
      </section>

      <section className="about-content">
        <h2>Our Mission</h2>
        <p>
          At OpenSkillZone, our mission is to make knowledge accessible to
          everyone. We gather and organize the best free online courses from
          around the web so you can learn anytime, anywhere.
        </p>

        <h2>What We Offer</h2>
        <p>
          - Curated courses across multiple categories<br />
          - Easy navigation and search functionality<br />
          - A constantly updated list of new and popular courses<br />
          - A platform to help learners save time and find relevant content
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have suggestions or want to collaborate, feel free to reach
          out via our <a href="/contact">Contact Page</a>.
        </p>
      </section>
    </div>
  );
}
