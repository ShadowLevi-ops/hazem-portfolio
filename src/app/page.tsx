"use client";

import React, { useState } from 'react';
// import Image from 'next/image'; // For the logo - COMMENTED OUT FOR DEBUGGING
// import { portfolioItems } from '@/data/portfolio-items'; // Data will be used later, commented out for now
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import type { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
// import { Mail, MapPin, MessageSquare } from 'lucide-react'; // Icons for Hero - COMMENTED OUT FOR DEBUGGING
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import dynamic from 'next/dynamic';

// Lightbox is dynamically imported, keep it for later use
const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false });
// Masonry will be needed later
// const Masonry = dynamic(() => import('react-masonry-css'), { ssr: false });

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex /*, setLightboxIndex // Commented out as unused for now */] = useState(0);

  // Data processing will be added back later
  // const photographyItems = portfolioItems.filter(item => item.type === 'photography');
  // const videoItems = portfolioItems.filter(
  //   (item) => item.type === 'videography' || item.type === 'film'
  // );

  // allSlides will be populated later
  const allSlides: Slide[] = [];

  // openLightbox function will be used later
  // const openLightbox = (index: number) => {
  //   setLightboxIndex(index); // This would also be unused if setLightboxIndex is commented
  //   setLightboxOpen(true);
  // };

  return (
    <>
      {/* === Rebuilt Hero Section === */}
      <section 
        id="home"
        className="container mx-auto flex flex-col items-center justify-center text-center pt-16 md:pt-24 pb-12 md:pb-16 relative overflow-hidden px-6 md:px-10"
      >
        {/* Centered Logo Image - COMMENTED OUT FOR DEBUGGING */}
        {/* <div className="mb-8 md:mb-10">
          <Image 
            src="/favicon.png" 
            alt="Hazem Logo"
            width={128} 
            height={128} 
            priority 
          />
        </div> */}
        <div>Logo Placeholder</div> {/* Simple placeholder */}

        {/* Subtitle - SIMPLIFIED FOR DEBUGGING */}
        <p className="text-lg md:text-xl italic font-medium max-w-2xl mx-auto mb-8 md:mb-10"> 
          Test Subtitle
        </p>
        
        {/* Contact Info Row - ICONS COMMENTED OUT FOR DEBUGGING */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-6 md:gap-x-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {/* <MapPin className="h-4 w-4" /> */}
            <span>Kuala Lumpur, MY</span>
          </div>
          <a 
            href="mailto:hazem@noveltyventures.uk"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            {/* <Mail className="h-4 w-4" /> */}
            <span>hazem@noveltyventures.uk</span>
          </a>
          <a 
            href="https://wa.me/0173767247"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            {/* <MessageSquare className="h-4 w-4" /> */}
            <span>Contact</span>
          </a>
        </div>
      </section>
      {/* === End Rebuilt Hero Section === */}

      {/* Videography and Photography sections will be rebuilt here later */}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allSlides} // Empty for now
        plugins={[Video, Captions]}
        captions={{
          showToggle: true,
          descriptionTextAlign: "center",
        }}
      />
      <ScrollToTopButton />
    </>
  );
}
