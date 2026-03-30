import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const PageLoader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const minDisplayTime = 300;
  const startTime = React.useRef(null);

  const handleRouteChange = useCallback(() => {
    startTime.current = Date.now();
    setIsLoading(true);
    setFadeOut(false);
  }, []);

  useEffect(() => {
    handleRouteChange();
  }, [location.pathname, handleRouteChange]);

  useEffect(() => {
    if (!isLoading) return;

    const elapsed = Date.now() - startTime.current;
    const remaining = Math.max(0, minDisplayTime - elapsed);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
        setFadeOut(false);
      }, 400);
    }, remaining);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, rgba(5,5,5,0.95) 0%, rgba(10,10,13,0.98) 100%)',
        backdropFilter: 'blur(8px)',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fadeOut ? 'none' : 'all'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '64px',
            height: '64px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '3px solid transparent',
              borderTopColor: 'var(--accent-primary)',
              borderRadius: '50%',
              animation: 'pageLoaderSpin 1s ease-in-out infinite'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              width: 'calc(100% - 16px)',
              height: 'calc(100% - 16px)',
              border: '3px solid transparent',
              borderTopColor: 'var(--accent-secondary)',
              borderRadius: '50%',
              animation: 'pageLoaderSpin 0.8s ease-in-out infinite reverse'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '12px',
              background: 'var(--accent-gradient)',
              borderRadius: '50%',
              boxShadow: '0 0 20px var(--accent-glow)'
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span
            style={{
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            Cargando
          </span>
          <div
            style={{
              display: 'flex',
              gap: '4px'
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: '4px',
                  background: 'var(--accent-primary)',
                  borderRadius: '50%',
                  animation: `pageLoaderDot 1.4s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pageLoaderSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pageLoaderDot {
            0%, 80%, 100% { 
              transform: scale(1);
              opacity: 0.4;
            }
            40% { 
              transform: scale(1.5);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PageLoader;
