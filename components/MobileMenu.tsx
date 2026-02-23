"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAnimationState } from "@/hooks/useAnimationState";
import NavItem from "./NavItem";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // const [showButton, setShowButton] = useState(false)
  const pathname = usePathname();
  const { startTransition, showHeader, showBlurOverlay } = useAnimationState();

  useEffect(() => {
    // Show menu button after loading animation completes
    // const timer = setTimeout(() => setShowButton(true), 3000)
    // return () => clearTimeout(timer)
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className={`mobile-menu-btn ${showHeader ? "show" : ""} ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
        id="menuBtn"
      >
        <i className={`bi bi-${isOpen ? "x-lg" : "list"}`}></i>
      </button>

      {/* Mobile Menu Overlay */}
       <nav className={`mobile-menu ${isOpen ? 'show' : ''}`} id="mobileMenu">
        <Link 
          href="/" 
          onClick={handleLinkClick}
          className={`nav-link ${pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          href="/works" 
          onClick={handleLinkClick}
          className={`nav-link ${pathname === '/works' ? 'active' : ''}`}
        >
          Works
        </Link>

          <Link href="/HighBaller" className={`nav-link ${pathname === "/HighBaller" ? "active" : ""}`}>
          HighBaller
        </Link>
        <Link 
          href="/about" 
          onClick={handleLinkClick}
          className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
        >
          About
        </Link>
        <Link 
          href="/contact" 
          onClick={handleLinkClick}
          className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
        >
          Contact
        </Link>
      </nav>

      {/* Blur Overlay */}
      {showBlurOverlay && (
        <div
          id="mobile-overlay-blur"
          onClick={handleLinkClick}
          style={{ display: "block" }}
        />
      )}
    </>
  );
}
