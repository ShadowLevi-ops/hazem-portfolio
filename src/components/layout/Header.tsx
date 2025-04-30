"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react'; // Import X for close icon

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center"> {/* Kept no pl-2, no space-x-2 */}
          <Image 
            src="/favicon.png" // Assuming logo is same as favicon
            alt="Hazem Logo" 
            width={64} // Keep aspect ratio hint
            height={16} // Keep aspect ratio hint
            className="h-6 w-auto" // Increased height from h-4
          />
          {/* Optional: Add text logo next to image if needed */}
          {/* <span className="font-bold inline-block">Hazem</span> */}
        </Link>

        {/* Desktop Navigation Removed */}
        {/* <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex"> ... </nav> */}

        {/* Right side: Only Mobile Menu Toggle remains here */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Desktop Contact Button Removed */}
          {/* <nav className="hidden items-center space-x-1 md:flex"> ... </nav> */}

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
      {/* Render Mobile Menu when open */}
      {isMobileMenuOpen && <MobileNav onLinkClick={toggleMobileMenu} />}
    </header>
  );
};

// Simple Mobile Navigation Component
interface MobileNavProps {
  onLinkClick: () => void; // Function to close menu when link is clicked
}

const MobileNav: React.FC<MobileNavProps> = ({ onLinkClick }) => {
  return (
    <div className="absolute top-full left-0 w-full border-b bg-background md:hidden">
      <nav className="container flex flex-col space-y-2 py-4">
        {/* Navigation Links Removed */}
        
        {/* Mobile Contact button Removed */}
        {/* <Button variant="outline" size="sm" ...> Contact </Button> */}

        {/* Mobile nav is now empty, consider removing if truly empty */}
        {/* Or add other relevant mobile actions here */}
      </nav>
    </div>
  );
};

// TODO: Create MobileNav component if needed
// const MobileNav = () => { ... } 