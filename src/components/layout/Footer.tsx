import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
        <p className="text-sm">
          &copy; 2026 Quantum Machine Learning Research. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Paper: RF Spectrogram Anomaly Detection with Quantum Kitchen Sinks
        </p>
      </div>
    </footer>
  );
};

export default Footer;
