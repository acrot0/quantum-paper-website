import React, { useState } from 'react';

interface FigureViewerProps {
  src: string;
  caption: string;
}

const FigureViewer: React.FC<FigureViewerProps> = ({ src, caption }) => {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <figure className="my-8">
        <div
          className="cursor-zoom-in relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
          onClick={() => setOpen(true)}
        >
          <img src={src} alt={caption} className="w-full h-auto" loading="lazy" />
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            {caption}
          </figcaption>
        )}
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={src}
            alt={caption}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {caption && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center text-sm bg-black/50 px-4 py-2 rounded">
              {caption}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default FigureViewer;
