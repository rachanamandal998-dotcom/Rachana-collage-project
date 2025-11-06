import React, { useState } from "react";
import "./navbar.css"; // make sure this path is correct

const defaultLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
//   {
//     label: "New Courses",
//     href: "/course",
//     children: [
//       { label: "Popular Course", href: "#new" },
//       { label: "Best Courses", href: "#best" },
//       { label: "upcoming Course", href: "#sale" },
//     ],
//   },
  { label: "Course", href: "/course" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({
  brand = "OPEN SKILL ZONE",
  links = defaultLinks,
  cta = { label: "homepage", href: "/" },
}) {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <a href="/" className="navbar-brand">
          <div className="brand-icon">{brand[0]}</div>
          <span>{brand}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar-links">
          {links.map((item) => (
            <div key={item.label} className="nav-item">
              {item.children ? (
                <div
                  className="dropdown"
                  onMouseEnter={() => setDropdown(item.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button className="dropdown-btn">{item.label} ▾</button>
                  {dropdown === item.label && (
                    <ul className="dropdown-menu">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <a href={c.href}>{c.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        {/* <div className="navbar-actions">
          <a href="#search" className="icon-btn">🔍</a>
          <a href="#cart" className="icon-btn">🛒</a>
          <a href="#account" className="icon-btn">👤</a>
          <a href={cta.href} className="cta-btn">{cta.label}</a>
        </div> */}

        {/* Mobile toggle */}
        <button className="mobile-toggle" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <ul>
            {links.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </ul>
          {/* <div className="mobile-actions">
            <a href="#cart" className="icon-btn">🛒</a>
            <a href="#account" className="icon-btn">👤</a>
            <a href={cta.href} className="cta-btn">{cta.label}</a>
          </div> */}
        </div>
      )}
    </header>
  );
}

function MobileNavItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <li>
        <a href={item.href} onClick={onNavigate}>
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li className="mobile-dropdown">
      <button onClick={() => setOpen(!open)} className="mobile-dropdown-btn">
        {item.label} ▾
      </button>
      {open && (
        <ul className="mobile-submenu">
          {item.children.map((c) => (
            <li key={c.label}>
              <a href={c.href} onClick={onNavigate}>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
