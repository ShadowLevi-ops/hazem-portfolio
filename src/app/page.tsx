"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { portfolioItems } from '@/data/portfolio-items';
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import type { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Expand, PlayCircle, Mail, MapPin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import dynamic from 'next/dynamic';

const Masonry = dynamic(() => import('react-masonry-css'), { ssr: false });
const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false });

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 3,
  500: 3
};

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const photographyItems = portfolioItems.filter(item => item.type === 'photography');
  const videoItems = portfolioItems.filter(
    (item) => item.type === 'videography' || item.type === 'film'
  );

  const allSlides: Slide[] = [
    ...videoItems.map(item => ({
      type: 'video' as const,
      sources: [{ src: item.mediaUrl, type: 'video/mp4' }],
      title: item.title,
      description: `${item.camera ? item.camera + ' | ' : ''}${item.projectDetails || ''}`,
      poster: item.thumbnailUrl || '/videos/VT-1.png'
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image 
              src="/favicon.png"
              alt="Hazem Logo"
              width={24} 
              height={24} 
              priority 
              className="h-6 w-auto"
            />
          </div>
          <nav className="flex items-center space-x-4 md:space-x-6 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Kuala Lumpur, MY</span>
              <span className="sm:hidden">KL, MY</span>
            </div>
            <a 
              href="mailto:hazem@noveltyventures.uk"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">hazem@noveltyventures.uk</span>
              <span className="sm:hidden">Email</span>
            </a>
            <a 
              href="https://wa.me/0173767247"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Contact</span>
            </a>
          </nav>
        </div>
      </header>

      <section 
        id="home"
        className="container mx-auto flex flex-col items-center justify-center text-center pt-32 md:pt-40 pb-12 md:pb-16 relative overflow-hidden px-4 md:px-10"
      >
        <p className="text-sm md:text-base font-medium max-w-3xl mx-auto mb-8 md:mb-10 text-justify"> 
          I create attention-grabbing 5-second videos optimized for today&apos;s vertical viewing experience. My commercial work spans global locations from Paris to Bali, delivering professional vertical content that maximizes engagement on Instagram and social platforms. Whether capturing scenic landscapes or high-energy music events, my vertical-first approach ensures your brand message fits perfectly into modern scrolling habits—no awkward cropping, no wasted space.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>Kuala Lumpur, MY</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            <a 
              href="mailto:hazem@noveltyventures.uk"
              className="hover:text-primary transition-colors"
            >
              hazem@noveltyventures.uk
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            <a 
              href="https://wa.me/0173767247"
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              +60 17-376 7247
            </a>
          </div>
        </div>
      </section>

      <section id="videography" className="container mx-auto pt-6 md:pt-10 pb-8 md:pb-12 px-4 md:px-10">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Videography & Film</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full"
          columnClassName="px-1 md:px-2"
        >
          {videoItems.length > 0 ? (
            videoItems.map((item, index) => {
              const slideIndex = index;
              return (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="mb-2 md:mb-3 cursor-pointer group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group-hover:ring-2 group-hover:ring-purple-500/60 group-hover:ring-offset-2 group-hover:ring-offset-background"
                  onClick={() => openLightbox(slideIndex)}
                >
                  <Image 
                     src={item.thumbnailUrl || '/images/p1.PNG'} 
                     alt={`Thumbnail for ${item.title}`} 
                     width={400} 
                     height={225}
                     className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                   />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end p-2 md:p-3">
                    <h3 className="text-white font-semibold text-sm md:text-base mb-0.5 truncate">{item.title}</h3>
                    <p className="text-gray-300 text-xs line-clamp-1">{item.camera || ''}</p>
                    <p className="text-gray-300 text-xs line-clamp-1">{item.projectDetails || ''}</p>
                    <PlayCircle className="absolute top-2 right-2 h-4 w-4 md:h-5 md:w-5 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground col-span-full">No videography or film projects yet.</p>
          )}
        </Masonry>
      </section>

      <section id="photography" className="container mx-auto pt-6 md:pt-10 pb-8 md:pb-12 px-4 md:px-10">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Photography</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full"
          columnClassName="px-1 md:px-2"
        >
          {photographyItems.length > 0 ? (
            photographyItems.map((item, index) => {
              const slideIndex = videoItems.length + index;
              return (
                <motion.div
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="mb-2 md:mb-3 cursor-pointer group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group-hover:ring-2 group-hover:ring-purple-500/60 group-hover:ring-offset-2 group-hover:ring-offset-background"
                  onClick={() => openLightbox(slideIndex)}
                >
                  <Image 
                     src={item.mediaUrl} 
                     alt={item.title} 
                     width={400} 
                     height={400}
                     className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                   />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end p-2 md:p-3">
                    <h3 className="text-white font-semibold text-sm md:text-base truncate">{item.title}</h3>
                    <Expand className="absolute top-2 right-2 h-4 w-4 md:h-5 md:w-5 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
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
        slides={allSlides}
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
