import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { paperSections } from '../../data/paperContent';
import type { Section } from '../../data/paperContent';
import SectionRenderer from './SectionRenderer';
import ReferenceList from './ReferenceList';
import useReadingProgress from '../../hooks/useReadingProgress';

const SECTION_CONTENT_URL = '/data/sections';

const PaperViewer: React.FC = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const progress = useReadingProgress(contentRef);
  const [contents, setContents] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadAllSections = async () => {
      const loaded: Record<string, string> = {};
      for (const section of paperSections) {
        try {
          const res = await fetch(`${SECTION_CONTENT_URL}/${section.id}.md`);
          if (res.ok) {
            loaded[section.id] = await res.text();
          } else {
            loaded[section.id] = `## ${section.title}\n\nContent not yet available.`;
          }
        } catch {
          loaded[section.id] = `## ${section.title}\n\nContent not yet available.`;
        }
      }
      setContents(loaded);
    };
    loadAllSections();
  }, []);

  const handleSectionClick = useCallback((section: Section) => {
    navigate(`/paper/${section.id}`, { replace: true });
    const el = document.getElementById(section.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navigate]);

  return (
    <div className="flex">
      {/* Mobile TOC Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <div className="relative group">
          <button
            className="w-12 h-12 bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
            onClick={() => {
              const menu = document.getElementById('mobile-toc');
              if (menu) menu.classList.toggle('hidden');
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div id="mobile-toc" className="hidden absolute bottom-14 right-0 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 max-h-80 overflow-y-auto">
            {paperSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  handleSectionClick(section);
                  document.getElementById('mobile-toc')?.classList.add('hidden');
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${
                  progress.currentSection === section.id
                    ? 'text-blue-700 dark:text-blue-400 font-medium'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 z-40">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${Math.min(100, progress.percentage)}%` }}
        />
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Section Jump Buttons */}
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
            {paperSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                  progress.currentSection === section.id
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Section Content */}
          {paperSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-16 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold font-serif mb-6 text-slate-900 dark:text-white">
                {section.title}
              </h2>
              {contents[section.id] ? (
                <SectionRenderer content={contents[section.id]} />
              ) : (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                </div>
              )}
            </section>
          ))}

          {/* References */}
          <ReferenceList />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                const idx = paperSections.findIndex(s => s.id === progress.currentSection);
                if (idx > 0) handleSectionClick(paperSections[idx - 1]);
              }}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              &larr; Previous
            </button>
            <button
              onClick={() => {
                const idx = paperSections.findIndex(s => s.id === progress.currentSection);
                if (idx < paperSections.length - 1) handleSectionClick(paperSections[idx + 1]);
              }}
              className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperViewer;
