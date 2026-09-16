import { useRef, useState, useEffect } from 'react';
import { ResumeData } from '../lib/types';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface Props {
  resumeData: ResumeData;
  template: string;
  accentColor: string;
}

export default function PreviewPanel({ resumeData, template, accentColor }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // A4 width is 210mm ≈ 794px
        const newScale = Math.min(0.85, (containerWidth - 40) / 794);
        setScale(Math.max(0.45, newScale));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} accentColor={accentColor} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} accentColor={accentColor} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={resumeData} accentColor={accentColor} />;
    }
  };

  return (
    <div ref={containerRef} className="flex justify-center min-h-full">
      <div
        className="resume-page bg-white shadow-xl"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `-${(1 - scale) * 100}%`,
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
