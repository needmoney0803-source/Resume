import { ResumeData } from '../../lib/types';

interface Props {
  data: ResumeData;
  accentColor: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function ClassicTemplate({ data, accentColor }: Props) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, references } = data;

  return (
    <div className="resume-page p-10 text-[11px] leading-relaxed text-gray-800" style={{ fontFamily: "'Source Sans 3', 'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-[26px] font-bold tracking-wide text-gray-900 mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.title && (
          <div className="text-sm font-medium mb-2" style={{ color: accentColor }}>
            {personalInfo.title}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><span className="text-gray-300">|</span><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><span className="text-gray-300">|</span><span>{personalInfo.location}</span></>}
          {personalInfo.website && <><span className="text-gray-300">|</span><span>{personalInfo.website}</span></>}
          {personalInfo.linkedin && <><span className="text-gray-300">|</span><span>{personalInfo.linkedin}</span></>}
          {personalInfo.github && <><span className="text-gray-300">|</span><span>{personalInfo.github}</span></>}
        </div>
      </div>

      <div className="border-t-2 mb-5" style={{ borderColor: accentColor }} />

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div>
                    <span className="font-bold text-gray-900">{exp.position}</span>
                    {exp.company && <span className="text-gray-600"> • {exp.company}</span>}
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap ml-4">
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-gray-700 mt-1 whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Education
          </h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
                    {edu.institution && <span className="text-gray-600"> • {edu.institution}</span>}
                    {edu.gpa && <span className="text-gray-500"> (GPA: {edu.gpa})</span>}
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap ml-4">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Skills
          </h2>
          <div className="space-y-1">
            {skills.map(skill => (
              <div key={skill.id}>
                <span className="font-semibold text-gray-900">{skill.category}:</span>{' '}
                <span className="text-gray-700">{skill.items}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900">{proj.name}</span>
                  {proj.technologies && <span className="text-[10px] text-gray-500">({proj.technologies})</span>}
                </div>
                {proj.description && <p className="text-gray-700 mt-0.5">{proj.description}</p>}
                {proj.link && <p className="text-[10px] mt-0.5" style={{ color: accentColor }}>{proj.link}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-gray-900">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-600"> – {cert.issuer}</span>}
                </div>
                {cert.date && <span className="text-[10px] text-gray-500">{formatDate(cert.date)}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {languages.map(lang => (
              <span key={lang.id}>
                <span className="font-semibold text-gray-900">{lang.name}</span>
                {lang.proficiency && <span className="text-gray-500"> ({lang.proficiency})</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 pb-1 border-b border-gray-300">
            References
          </h2>
          <div className="space-y-2">
            {references.map(ref => (
              <div key={ref.id}>
                <span className="font-semibold text-gray-900">{ref.name}</span>
                {ref.position && <span className="text-gray-600">, {ref.position}</span>}
                {ref.company && <span className="text-gray-600"> at {ref.company}</span>}
                <div className="text-[10px] text-gray-500">
                  {ref.email && <span>{ref.email}</span>}
                  {ref.phone && <span> • {ref.phone}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
