import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSite } from '../context/SiteContext';

const SEO = ({ title, description, keywords, image, url }) => {
  const { content } = useSite();
  const siteTitle = content?.siteName ? `${content.siteName} | Cartas Coleccionables` : 'Adventure TCG';
  const fullTitle = title ? `${title} | ${content?.siteName || 'Adventure'}` : siteTitle;
  const defaultDesc = content?.tagline || 'Tu destino para cartas coleccionables.';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      {url && <meta property="twitter:url" content={url} />}
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
