"use client";

import React, { useState } from 'react';
// import Image from 'next/image'; // Temporarily remove Image
// import { portfolioItems } from '@/data/portfolio-items'; // Temporarily remove direct portfolioItems import
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
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
const sampleItems = [
  { id: 'v1', type: 'videography', title: "Test Video 1" },
  { id: 'v2', type: 'videography', title: "Test Video 2" },
  { id: 'p1', type: 'photography', title: "Test Photo 1" },
];


export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Use simplified data
  const photographyItems = sampleItems.filter(item => item.type === 'photography');
  const videoItems = sampleItems.filter(item => item.type === 'videography');

  // Hardcode allSlides to an empty array or very simple static content
  const allSlides: any[] = [
    // { type: 'video', sources: [{ src: '/videos/1.mp4', type: 'video/mp4'}], title: "Test Video Slide", description: "Test Desc", poster: "/videos/VT-1.png" }
  ]; // COMPLETELY EMPTY FOR NOW

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
        <p className="text-lg"> 
          Test subtitle.
        </p>
        <div className="flex">
            <div>Location</div>
            <div>Email</div>
            <div>Contact</div>
        </div>
      </section>

      <section id="videography" className="container mx-auto pt-6 pb-8 px-6">
        <h2 className="text-2xl font-bold mb-5 text-center">Videography & Film</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full"
          columnClassName="px-2"
        >
          {videoItems.length > 0 ? (
            videoItems.map((item, index) => {
              const slideIndex = index;
              return (
                // EXTREMELY SIMPLIFIED ITEM FOR DEBUGGING
                <div 
                  key={item.id} 
                  className="mb-3 cursor-pointer p-2 border"
                  onClick={() => openLightbox(slideIndex)}
                >
                  <p>Video: {item.title || item.id}</p> 
                  {/* <Image src="/videos/VT-1.png" alt="Test" width={100} height={100} /> */}
                </div>
              );
            })
          ) : (
            <p>No videography projects.</p>
          )}
        </Masonry>
      </section>

      <section id="photography" className="container mx-auto pt-6 pb-8 px-6">
        <h2 className="text-2xl font-bold mb-5 text-center">Photography</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full"
          columnClassName="px-2"
        >
          {photographyItems.length > 0 ? (
            photographyItems.map((item, index) => {
              const slideIndex = videoItems.length + index; // This will be wrong if allSlides is empty
              return (
                // EXTREMELY SIMPLIFIED ITEM FOR DEBUGGING
                <div 
                  key={item.id} 
                  className="mb-3 cursor-pointer p-2 border"
                  onClick={() => openLightbox(slideIndex)}
                >
                  <p>Photo: {item.title || item.id}</p>
                  {/* <Image src="/images/p1.PNG" alt="Test" width={100} height={100} /> */}
                </div>
              );
            })
          ) : (
            <p>No photography projects.</p>
          )}
        </Masonry>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allSlides} // Will be empty
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
