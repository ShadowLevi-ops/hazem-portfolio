"use client";

import React, { useState } from 'react';
// import Image from 'next/image'; // Keep Image commented for this step
import { portfolioItems } from '@/data/portfolio-items';
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import type { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
// import { Expand, PlayCircle, Mail, MapPin, MessageSquare } from 'lucide-react'; // Keep icons commented
// import { motion } from 'framer-motion'; // Keep motion commented
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import dynamic from 'next/dynamic';

const Masonry = dynamic(() => import('react-masonry-css'), { ssr: false });
const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false });

const breakpointColumnsObj = {
  default: 4,
};

// Sample simplified data to avoid issues with original data source for now
// const sampleItems = [
//   { id: 'v1', type: 'videography', title: "Test Video 1" },
//   { id: 'v2', type: 'videography', title: "Test Video 2" },
//   { id: 'p1', type: 'photography', title: "Test Photo 1" },
// ];


export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Use original portfolioItems data
  const photographyItems = portfolioItems.filter(item => item.type === 'photography');
  const videoItems = portfolioItems.filter(
    (item) => item.type === 'videography' || item.type === 'film'
  );

  // allSlides remains empty for this step
  const allSlides: Slide[] = [];

  const openLightbox = (index: number) => {
    // console.log("Attempting to open lightbox for index:", index, "Slide:", allSlides[index]);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section 
        id="home"
        className="container mx-auto flex flex-col items-start justify-center text-left pt-12 md:pt-16 pb-10 md:pb-12 relative overflow-hidden px-6 md:px-10"
      >
        <div 
          aria-hidden="true" 
          className="absolute inset-0 -z-10"
        />
        <p className="text-lg md:text-xl italic font-medium text-left max-w-3xl mb-6"> 
          I specialize in vertical videography, transforming the 9:16 canvas into immersive narratives for mobile-first audiences. 
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-start items-start sm:items-center w-full max-w-lg text-sm text-muted-foreground gap-y-2 gap-x-4 md:gap-x-6">
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

      <section id="videography" className="container mx-auto pt-6 md:pt-10 pb-8 md:pb-12 px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-center">Videography & Film</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full"
          columnClassName="px-2"
        >
          {videoItems.length > 0 ? (
            videoItems.map((item, index) => {
              const slideIndex = index;
              return (
                // Simplified card structure from commit 11616a5
                <div 
                  key={item.id} 
                  className="mb-3 cursor-pointer p-2 border"
                  onClick={() => openLightbox(slideIndex)}
                >
                  <p>Video: {item.title}</p> 
                  <p>Camera: {item.camera}</p>
                  <p>Details: {item.projectDetails}</p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground col-span-full">No videography or film projects yet.</p>
          )}
        </Masonry>
      </section>

      <section id="photography" className="container mx-auto pt-6 md:pt-10 pb-8 md:pb-12 px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-center">Photography</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full"
          columnClassName="px-2"
        >
          {photographyItems.length > 0 ? (
            photographyItems.map((item, index) => {
              const slideIndex = videoItems.length + index;
              return (
                // Simplified card structure from commit 11616a5
                <div 
                  key={item.id} 
                  className="mb-3 cursor-pointer p-2 border"
                  onClick={() => openLightbox(slideIndex)}
                >
                  <p>Photo: {item.title}</p>
                  <p>Camera: {item.camera}</p>
                  <p>Details: {item.projectDetails}</p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground col-span-full">No photography projects yet.</p>
          )}
        </Masonry>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allSlides} // Still empty
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
