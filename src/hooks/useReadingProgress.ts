import { useState, useEffect } from 'react';

interface Progress {
  currentSection: string;
  percentage: number;
}

const useReadingProgress = (contentRef: React.RefObject<HTMLDivElement | null>) => {
  const [progress, setProgress] = useState<Progress>({
    currentSection: '',
    percentage: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const sections = contentRef.current.querySelectorAll('section[id]');
      const scrollTop = contentRef.current.scrollTop;
      const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const percentage = Math.round((scrollTop / scrollHeight) * 100);

      let currentSection = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          currentSection = section.id;
        }
      });

      setProgress({ currentSection, percentage });
    };

    const el = contentRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [contentRef]);

  return progress;
};

export default useReadingProgress;
