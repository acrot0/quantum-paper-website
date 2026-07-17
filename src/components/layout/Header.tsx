import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-semibold text-lg hidden sm:inline text-slate-900 dark:text-white">
            RF Spectrogram Anomaly Detection
          </span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            to="/paper"
            className="text-blue-700 hover:text-blue-800 font-medium dark:text-blue-400 dark:hover:text-blue-300"
          >
            Read Paper
          </Link>
          <Link
            to="/download"
            className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Download
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
