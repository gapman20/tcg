import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that forces the browser to scroll to the top of the page 
 * whenever the route changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // We wrap this in a small timeout to ensure the new page hasn't 
    // already started rendering before we scroll to top.
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // 'instant' prevents jarring smooth scrolling on initial load
      });
    }, 0);
  }, [pathname]);

  return null;
}
