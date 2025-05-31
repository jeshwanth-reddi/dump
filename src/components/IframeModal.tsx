import React, { useEffect, useState, useRef, useCallback } from 'react';

interface IframeModalProps {
  url: string | null;
  onClose: () => void;
}

const IframeModal: React.FC<IframeModalProps> = ({ url, onClose }) => {
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const startCloseAnimation = useCallback(() => {
    setIsAnimatingOut(true);
  }, []);

  useEffect(() => {
    if (isAnimatingOut) {
      const timer = setTimeout(() => {
        onClose();
        setIsAnimatingOut(false); 
        setIsLoading(true); // Reset loading state for next open
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isAnimatingOut, onClose]);

  useEffect(() => {
    if (url) {
      setIsAnimatingOut(false);
      setIsFullyOpen(false);
      setIsLoading(true); // Set loading to true when new URL is provided

      const openAnimTimer = setTimeout(() => {
        setIsFullyOpen(true);
      }, 50);

      const handleClickOutside = (event: MouseEvent) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
          startCloseAnimation();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        clearTimeout(openAnimTimer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    } else {
      setIsFullyOpen(false);
      setIsLoading(true); // Reset loading state if URL is cleared
    }
  }, [url, startCloseAnimation]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleOpenInNewTab = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!url) {
    return null;
  }

  const baseModalContentClasses = "bg-slate-900/90 border border-slate-700/50 p-4 rounded-xl shadow-2xl w-[90vw] h-[85vh] md:w-[80vw] md:h-[80vh] flex flex-col relative transform transition-all duration-300 ease-in-out";
  const modalContentAnimationClasses = (isFullyOpen && !isAnimatingOut)
    ? 'scale-100 opacity-100' 
    : 'scale-95 opacity-0';
  const backdropAnimationClasses = (isFullyOpen && !isAnimatingOut) 
    ? 'opacity-100' 
    : 'opacity-0';

  return (
    <div 
      className={`fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[200] p-4 transition-opacity duration-300 ${backdropAnimationClasses}`}
    >
      <div 
        ref={modalContentRef}
        className={`${baseModalContentClasses} ${modalContentAnimationClasses}`}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/50 gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleOpenInNewTab}
              className="text-slate-400 hover:text-white transition-colors text-xs px-3 py-1.5 rounded-md bg-slate-700/50 hover:bg-slate-600/50 flex items-center space-x-1.5"
              aria-label="Open in new tab"
              title="Open in new tab"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Open</span>
            </button>
            <button
              onClick={startCloseAnimation}
              className="text-slate-400 hover:text-white transition-colors text-2xl leading-none"
              aria-label="Close window"
            >
              &times;
            </button>
          </div>
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-b-lg">
            <p className="text-white text-lg">Loading content...</p>
            {/* You can add a spinner here */}
          </div>
        )}
        <iframe
          src={url}
          title="Embedded Content"
          className={`w-full h-full rounded-b-lg bg-white ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleIframeLoad}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms" // Security for iframes
          onError={() => setIsLoading(false)} // Handle potential loading errors
        />
      </div>
    </div>
  );
};

export default IframeModal; 