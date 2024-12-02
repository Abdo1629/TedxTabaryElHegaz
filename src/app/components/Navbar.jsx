"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  // ده بيخزن المسار ال انا دوست عليه
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleLinkClick = (path) => {
    setCurrentPath(path); // ده بيحدث المسار لما ادوس عليه
  };

  return (
      <div className="header">
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
        <div className="header-links">
          <Link
              href="/"
              className={`link ${currentPath === "/" ? "active" : ""}`}
              onClick={() => handleLinkClick("/")}
          >
            الرئيسية
          </Link>
          <Link
              href="/more-speakers"
              className={`link ${currentPath === "/more-speakers" ? "active" : ""}`}
              onClick={() => handleLinkClick("/more-speakers")}
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
