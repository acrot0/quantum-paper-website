import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import PaperViewer from '../components/content/PaperViewer';

const Paper: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <Sidebar />
      <main className="lg:ml-64 pt-16">
        <PaperViewer />
      </main>
    </div>
  );
};

export default Paper;
