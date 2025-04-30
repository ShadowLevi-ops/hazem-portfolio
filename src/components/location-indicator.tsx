"use client";

import React from 'react';
import { MapPin } from 'lucide-react';

export const LocationIndicator = () => {
  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
                 flex items-center gap-1.5 
                 px-2.5 py-1 
                 text-xs font-medium 
                 bg-background/80 backdrop-blur-sm 
                 border rounded-full 
                 text-muted-foreground"
    >
      <MapPin className="h-3 w-3" />
      Kuala Lumpur, MY
    </div>
  );
}; 