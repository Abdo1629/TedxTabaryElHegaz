"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (path) => {
    setCurrentPath(path);
    setMenuOpen(false);
  };

  return (
      <div className={`header ${menuOpen ? "menu-open" : ""}`}>
        <Link href="/" onClick={() => handleLinkClick("/")}>
          <Image
              className="logo"
              src="https://res.cloudinary.com/dbgdvnkev/image/upload/v1730659366/tedx_qogx0k.webp"
              alt="الشعار"
              width={200}
              height={100}
              loading="lazy"
          />
        </Link>
        <button
            className="hamburger-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={`header-links ${menuOpen ? "active" : ""}`}>
          <Link
              href="/"
              className={`link ${currentPath === "/" ? "active" : ""}`}
              onClick={() => handleLinkClick("/")}
          >
            الرئيسية
          </Link>
          <Link
              href="/speakers"
              className={`link ${currentPath === "/speakers" ? "active" : ""}`}
              onClick={() => handleLinkClick("/speakers")}
          >
            المتحدثون
          </Link>
          <Link
              href="/event-3"
              className={`link ${currentPath === "/event-3" ? "active" : ""}`}
              onClick={() => handleLinkClick("/event-3")}
          >
            الفعاليات
          </Link>
          <Link
              href="#contactform"
              className={`link ${currentPath === "#contactform" ? "active" : ""}`}
              onClick={() => handleLinkClick("#contactform")}
          >
            اتصل بنا
          </Link>
          <button id="language-toggle" className="btn_lang">
            AR
          </button>
        </div>
      </div>
  );
}
