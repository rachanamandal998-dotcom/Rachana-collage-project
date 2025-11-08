import React, { useState, useEffect } from "react";
import "./navbar.css";

const defaultLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Course", href: "/course" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" }, // will change dynamically
];

export default function Navbar({
  brand = "OPEN SKILL ZONE",
  links = defaultLinks,
}) {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Detect token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // optional redirect
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <a href="/" className="navbar-brand">
          <div className="brand-icon">{brand[0]}</div>
          <span>{brand}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar-links">
          {links.map((item) => {
            // ✅ Replace Login with Logout when logged in
            if (item.label === "Login" && isLoggedIn) {
              return (
                <div key="logout" className="nav-item">
                  <a style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</a>
                </div>
              );
            }

            return (
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
            );
          })}
        </nav>

        <button className="mobile-toggle" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <ul>
            {links.map((item) => {
              if (item.label === "Login" && isLoggedIn) {
                return (
                  <li key="logout">
                    <a style={{ cursor: "pointer" }} onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                );
              }

              return (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  onNavigate={() => setOpen(false)}
                />
              );
            })}
          </ul>
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
