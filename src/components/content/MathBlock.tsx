import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathBlockProps {
  inline?: boolean;
  children: string;
}

const MathBlock: React.FC<MathBlockProps> = ({ inline = false, children }) => {
  const latex = String(children).trim();
  try {
    if (inline) return <InlineMath math={latex} />;
    return <BlockMath math={latex} />;
  } catch {
    return <span className="text-red-500">Invalid LaTeX: {latex}</span>;
  }
};

export default MathBlock;
