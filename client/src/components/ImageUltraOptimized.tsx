import React, { useState, useEffect, useRef, memo } from 'react';

interface ImageUltraOptimizedProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

/**
 * ImageUltraOptimized - High performance image component
 *
 * - Uses WebP format via Unsplash params (AVIF not supported by Unsplash)
 * - Implements lazy loading with Intersection Observer
 * - Critical images use priority={true} for eager loading
 * - Prevents CLS with explicit width/height
 *
 * NOTE: For LCP (Hero) images, use native <img> in HeroCarousel.tsx instead
 * to ensure URLs match the preload hints in index.html exactly.
 */
const ImageUltraOptimized = memo<ImageUltraOptimizedProps>(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 50,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate optimized Unsplash URL with WebP
  const getOptimizedUrl = (url: string, w: number, q: number = quality): string => {
    if (!url.includes('unsplash.com')) return url;
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${w}&q=${q}&auto=format&fit=crop&fm=webp`;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !containerRef.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Generate srcset for responsive images
  const generateSrcSet = (): string => {
    if (!src.includes('unsplash.com')) return '';
    const breakpoints = [
      { w: 400, q: 40 },
      { w: 800, q: 50 },
      { w: 1200, q: 60 },
    ];
    return breakpoints
      .map(({ w, q }) => `${getOptimizedUrl(src, w, q)} ${w}w`)
      .join(', ');
  };

  const aspectRatio = width && height ? `${width}/${height}` : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio,
        backgroundColor: isLoaded ? 'transparent' : '#f0f0f0',
      }}
    >
      {isVisible && (
        <picture>
          {/* WebP source for modern browsers */}
          <source
            type="image/webp"
            srcSet={generateSrcSet()}
            sizes={sizes}
          />
          {/* Fallback img */}
          <img
            src={getOptimizedUrl(src, width || 800)}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            {...{fetchpriority: priority ? 'high' : 'auto'}}
            decoding={priority ? 'sync' : 'async'}
            className="w-full h-full object-cover"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
            onLoad={() => setIsLoaded(true)}
          />
        </picture>
      )}
    </div>
  );
});

ImageUltraOptimized.displayName = 'ImageUltraOptimized';

export default ImageUltraOptimized;

// Utility functions for performance
export const deferTask = (task: () => void): void => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(task, { timeout: 4000 });
  } else {
    setTimeout(task, 1);
  }
};

export const batchDOMUpdates = (callback: () => void): Promise<void> => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      callback();
      resolve();
    });
  });
};
