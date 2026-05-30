import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEOHead = ({ 
  title = 'AETHER - AI-Powered Hiring & Verification', 
  description = 'Verify ex-employees instantly and hire top talent using advanced AI matching, ATS analysis, and fraud detection.',
  url = 'https://aether-platform.vercel.app',
  image = 'https://aether-platform.vercel.app/og-image.jpg'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
