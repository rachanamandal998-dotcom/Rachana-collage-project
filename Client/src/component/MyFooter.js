import React from "react";
import "./myfooter.css";

export default function MyFooter() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2025 OpenSkillZone. All rights reserved.</p>
        <div className="social-links">
          <a
            href="https://www.facebook.com/rachana.mandal.5872"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
