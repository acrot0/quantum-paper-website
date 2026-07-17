import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paperSections } from '../../data/paperContent';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSection = location.pathname.split('/').pop() || 'abstract';

  return (
    <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto z-40">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Table of Contents
        </h2>
        <nav className="space-y-1">
          {paperSections.map((section) => (
            <button
              key={section.id}
              onClick={() => navigate(`/paper/${section.id}`)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentSection === section.id
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
