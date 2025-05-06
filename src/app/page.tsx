"use client";

import React, { useState } from 'react';
// import Image from 'next/image'; // Temporarily remove Image
import { portfolioItems } from '@/data/portfolio-items'; // Restore portfolioItems import
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import type { Slide } from "yet-another-react-lightbox"; // Import Slide type
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
// import { Expand, PlayCircle, Mail, MapPin, MessageSquare } from 'lucide-react'; // Temporarily remove icons
// import { motion } from 'framer-motion'; // Temporarily remove motion
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

  // Use proper Slide type for allSlides
  const allSlides: Slide[] = []; // COMPLETELY EMPTY FOR NOW

  const openLightbox = (index: number) => {
    // console.log("Attempting to open lightbox for index:", index, "Slide:", allSlides[index]);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section 
        id="home"
        // Simplified classes for debugging
        className="container mx-auto pt-12 pb-10 px-6"
      >
        <p className="text-lg md:text-xl italic font-medium text-left max-w-3xl mb-6"> 
          I specialize in vertical videography, transforming the 9:16 canvas into immersive narratives for mobile-first audiences. 
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-start items-start sm:items-center w-full max-w-lg text-sm text-muted-foreground gap-y-2 gap-x-4 md:gap-x-6">
          <div className="flex items-center gap-1.5">
            {/* <MapPin className="h-4 w-4" /> // Icons still commented out */}
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

      <section id="videography" className="container mx-auto pt-6 pb-8 px-6">
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
                // Simplified card structure
                <div 
                  key={item.id} 
                  className="mb-3 cursor-pointer p-2 border"
                  onClick={() => openLightbox(slideIndex)} // Lightbox won't show content yet
                >
                  <p>Video: {item.title}</p> 
                  <p>Camera: {item.camera}</p>
                  <p>Details: {item.projectDetails}</p>
                </div>
              );
            })
          ) : (
            <p>No videography or film projects yet.</p>
          )}
        </Masonry>
      </section>

      <section id="photography" className="container mx-auto pt-6 pb-8 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-center">Photography</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full"
          columnClassName="px-2"
        >
          {photographyItems.length > 0 ? (
            photographyItems.map((item, index) => {
              // Correct slideIndex calculation needs allSlides to be populated
              // For now, this click won't show correct item if lightbox had content
              const slideIndex = videoItems.length + index; 
              return (
                // Simplified card structure
                <div 
                  key={item.id} 
                  className="mb-3 cursor-pointer p-2 border"
                  onClick={() => openLightbox(slideIndex)} // Lightbox won't show content yet
                >
                  <p>Photo: {item.title}</p>
                  <p>Camera: {item.camera}</p>
                  <p>Details: {item.projectDetails}</p>
                </div>
              );
            })
          ) : (
            <p>No photography projects yet.</p>
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
