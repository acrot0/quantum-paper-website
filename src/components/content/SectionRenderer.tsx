import React, { Suspense } from 'react';
import MarkdownRenderer from '../../utils/markdown';

interface SectionRendererProps {
  content: string;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ content }) => {
  return (
    <Suspense fallback={<div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-64 rounded-lg" />}>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </Suspense>
  );
};

export default SectionRenderer;
