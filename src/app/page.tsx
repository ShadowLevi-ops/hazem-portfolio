"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // Restore Image import
import { portfolioItems } from '@/data/portfolio-items';
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import type { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Expand, PlayCircle, Mail, MapPin, MessageSquare } from 'lucide-react'; // Restore icons
import { motion } from 'framer-motion'; // Restore motion
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

  // Restore allSlides generation
  const allSlides: Slide[] = [
    ...videoItems.map(item => ({
      type: 'video' as const,
      sources: [{ src: item.mediaUrl, type: 'video/mp4' }],
      title: item.title,
      description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
      poster: item.thumbnailUrl || '/videos/VT-1.png' // Default poster if not specified
    })),
    ...photographyItems.map(item => ({ 
      src: item.mediaUrl,
      title: item.title,
      description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
    })),
  ];

  const openLightbox = (index: number) => {
    console.log("Attempting to open lightbox for index:", index, "Slide:", allSlides[index]);
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
            <MapPin className="h-4 w-4" />
            <span>Kuala Lumpur, MY</span>
          </div>
          <a 
            href="mailto:hazem@noveltyventures.uk"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>hazem@noveltyventures.uk</span>
          </a>
          <a 
            href="https://wa.me/0173767247"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
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
                // Restore full card structure for videos
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="mb-3 cursor-pointer group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group-hover:ring-2 group-hover:ring-purple-500/60 group-hover:ring-offset-2 group-hover:ring-offset-background"
                  onClick={() => openLightbox(slideIndex)}
                >
                  <Image 
                     src={item.thumbnailUrl || '/images/p1.PNG'} // Default thumbnail if not specified
                     alt={`Thumbnail for ${item.title}`} 
                     width={400} 
                     height={225}
                     className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                   />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end p-3">
                    <h3 className="text-white font-semibold text-base mb-0.5 truncate">{item.title}</h3>
                    <p className="text-gray-300 text-xs line-clamp-1">{item.camera || ''}</p>
                    <p className="text-gray-300 text-xs line-clamp-1">{item.projectDetails || ''}</p>
                    <PlayCircle className="absolute top-2 right-2 h-5 w-5 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
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
                // Restore full card structure for photos
                <motion.div
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="mb-3 cursor-pointer group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group-hover:ring-2 group-hover:ring-purple-500/60 group-hover:ring-offset-2 group-hover:ring-offset-background"
                  onClick={() => openLightbox(slideIndex)}
                >
                  <Image 
                     src={item.mediaUrl} 
                     alt={item.title} 
                     width={400} 
                     height={400} // Assuming photography items might be square or different aspect ratio
                     className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                   />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end p-3">
                    <h3 className="text-white font-semibold text-base truncate">{item.title}</h3>
                    {/* Photography items might not have camera/projectDetails in overlay, adjust if needed */}
                    {/* <p className="text-gray-300 text-xs line-clamp-1">{item.camera || ''}</p> */}
                    {/* <p className="text-gray-300 text-xs line-clamp-1">{item.projectDetails || ''}</p> */}
                    <Expand className="absolute top-2 right-2 h-5 w-5 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
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
        slides={allSlides} // Now populated
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
