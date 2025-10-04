'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/favicon.png"
            alt="Hazem Logo"
            width={64}
            height={16}
            className="h-6 w-auto"
          />
        </Link>
      </div>
    </header>
  );
};
