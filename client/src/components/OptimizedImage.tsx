import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

/**
 * OptimizedImage component with responsive srcset for maximum performance
 * Generates multiple image sizes for different screen resolutions
 * Optimizes Unsplash URLs with appropriate quality and format parameters
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);

  // Extract base URL from Unsplash or other CDN URLs
  const getBaseUrl = (url: string): string => {
    // Remove existing query parameters
    return url.split('?')[0];
  };

  // Generate optimized srcset for responsive images
  const generateSrcSet = (baseUrl: string): string => {
    const isUnsplash = baseUrl.includes('unsplash.com');

    if (!isUnsplash) {
      // For non-Unsplash images, return original
      return '';
    }

    // Fewer breakpoints = fewer bytes in srcset attribute, faster parsing
    const sizes = [
      { w: 320, q: 35 },   // Mobile portrait - aggressive compression
      { w: 640, q: 40 },   // Mobile landscape
      { w: 1024, q: 50 },  // Tablet / small desktop
      { w: 1440, q: 55 },  // Desktop
    ];

    return sizes
      .map(({ w, q }) => {
        const params = new URLSearchParams({
          w: w.toString(),
          q: q.toString(),
          auto: 'format',
          fit: 'crop',
          fm: 'webp', // Force WebP format for better compression
        });
        return `${baseUrl}?${params.toString()} ${w}w`;
      })
      .join(', ');
  };

  // Generate sizes attribute for responsive loading
  const getSizes = (): string => {
    return '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw';
  };

  // Generate fallback src with optimal parameters
  const getOptimizedSrc = (url: string): string => {
    const baseUrl = getBaseUrl(url);
    const isUnsplash = baseUrl.includes('unsplash.com');

    if (!isUnsplash) {
      return url;
    }

    // Default size: 800px width with quality 50 for faster loading
    const params = new URLSearchParams({
      w: '800',
      q: '50',
      auto: 'format',
      fit: 'crop',
      fm: 'webp',
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const baseUrl = getBaseUrl(src);
  const srcset = generateSrcSet(baseUrl);
  const optimizedSrc = getOptimizedSrc(src);
  const sizes = getSizes();

  useEffect(() => {
    // Reset error state when src changes
    setHasError(false);
  }, [src]);

  const handleError = () => {
    setHasError(true);
  };

  // Fallback for broken images
  if (hasError) {
    return (
      <div
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={optimizedSrc}
      srcSet={srcset || undefined}
      sizes={srcset ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      fetchpriority={fetchPriority}
      onError={handleError}
      style={{ objectFit }}
      decoding="async"
    />
  );
}
