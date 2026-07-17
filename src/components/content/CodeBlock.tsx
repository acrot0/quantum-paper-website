import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const language = className?.replace('language-', '') || 'text';
  const code = String(children).trim();

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between bg-slate-800 rounded-t-lg px-4 py-2 border-b border-slate-700">
        <span className="text-xs text-slate-400 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-b-lg overflow-x-auto m-0">
        <code ref={ref} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
