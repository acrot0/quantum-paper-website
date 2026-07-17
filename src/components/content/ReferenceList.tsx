import React, { useState, useEffect } from 'react';
import SectionRenderer from './SectionRenderer';

const ReferenceList: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch('/data/sections/references.md')
      .then(res => res.ok ? res.text() : '## References\n\nContent not yet available.')
      .then(setContent)
      .catch(() => setContent('## References\n\nContent not yet available.'));
  }, []);

  return (
    <section id="references" className="mt-16 scroll-mt-24">
      {content ? <SectionRenderer content={content} /> : null}
    </section>
  );
};

export default ReferenceList;
