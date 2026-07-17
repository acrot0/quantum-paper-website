import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import MathBlock from '../components/content/MathBlock';
import CodeBlock from '../components/content/CodeBlock';
import FigureViewer from '../components/content/FigureViewer';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ children }) => {
          if (React.Children.toArray(children).some(
            (child) => React.isValidElement(child) && child.type === MathBlock
          )) {
            return <>{children}</>;
          }
          return <p className="mb-4 leading-relaxed">{children}</p>;
        },
        h1: ({ children }) => <h1 className="text-3xl font-bold font-serif mb-6 mt-8 text-slate-900 dark:text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold font-serif mb-4 mt-8 text-slate-900 dark:text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-900 dark:text-white">{children}</h3>,
        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-slate-700 dark:text-slate-300">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 py-2 rounded-r">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ className, children }) => {
          const match = /language-(\w+)/.exec(className || '');
          if (match) {
            return <CodeBlock className={className}>{String(children)}</CodeBlock>;
          }
          return (
            <code className="bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          );
        },
        img: ({ src, alt }) => {
          if (!src) return null;
          return <FigureViewer src={src} caption={alt || ''} />;
        },
        a: ({ href, children }) => {
          if (href?.startsWith('#')) {
            return <a href={href} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">{children}</a>;
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">
              {children}
            </a>
          );
        },
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-slate-200 dark:border-slate-700 px-4 py-2">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
