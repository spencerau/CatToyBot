'use client'; // Required for useState and event handlers

import { useState, useEffect } from 'react';

export function VideoStream() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_FEED_URL;

  // Effect to reset state if URL changes (though unlikely in this case)
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [videoUrl]);

  if (!videoUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0F]">
        <p className="text-red-500">Video feed URL not configured.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-[#0A0A0F]">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 animate-pulse">Loading feed...</p>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-red-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Camera feed unavailable
          </p>
        </div>
      )}
      <img
        src={videoUrl}
        alt="Live Camera Feed"
        className={`object-cover w-full h-full transition-opacity duration-300 ${
          isLoading || hasError ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        // Hide broken image icon on error, rely on error message overlay
        style={{ display: hasError ? 'none' : 'block' }}
      />
    </div>
  );
}
