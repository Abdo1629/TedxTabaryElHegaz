"use client";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer>
            {/* Social Media Icons */}
            <div className="social-icons">
                <Link
                    className="social-icon facebook"
                    href="https://www.facebook.com/TEDxYouthTabaryElHegazHS"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaFacebook size={24} />
                </Link>
                <Link
                    className="social-icon instagram"
                    href="https://www.instagram.com/tedxtabaryelhegaz/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaInstagram size={24} />
                </Link>
                <Link
                    className="social-icon linkedin"
                    href="https://www.linkedin.com/tedxtabaryelhegaz/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin size={24} />
                </Link>
                <Link
                    className="social-icon whatsapp"
                    href="https://wa.me/201014735800"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaWhatsapp size={24} /> {/* أيقونة واتساب من react-icons */}
                </Link>
            </div>

            {/* Footer Logo */}
            <div className="footer2">
                <Image
                    src="/images/logo2.png"
                    alt="TEDx Logo"
                    width={100}
                    height={50}
                    loading="lazy"
                />
                <p>حقوق الطبع والنشر © TEDxTabaryElHegazHS. جميع الحقوق محفوظة 2025</p>
            </div>
        </footer>
    );
}
