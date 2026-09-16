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

export default function MinimalTemplate({ data, accentColor }: Props) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, references } = data;

  return (
    <div className="resume-page p-12 text-[11px] leading-relaxed text-gray-700" style={{ fontFamily: "'Source Sans 3', 'Inter', system-ui, sans-serif" }}>
      {/* Header - Elegant and minimal */}
      <div className="mb-8">
        <h1 className="text-[28px] font-light tracking-wide text-gray-900 mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.title && (
          <div className="text-sm text-gray-500 font-light mb-3">{personalInfo.title}</div>
        )}
        <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><span style={{ color: accentColor }}>·</span><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><span style={{ color: accentColor }}>·</span><span>{personalInfo.location}</span></>}
          {personalInfo.website && <><span style={{ color: accentColor }}>·</span><span>{personalInfo.website}</span></>}
          {personalInfo.linkedin && <><span style={{ color: accentColor }}>·</span><span>{personalInfo.linkedin}</span></>}
          {personalInfo.github && <><span style={{ color: accentColor }}>·</span><span>{personalInfo.github}</span></>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <p className="text-gray-600 leading-[1.8] font-light italic">{summary}</p>
        </div>
      )}

      {/* Divider */}
      <div className="mb-8 border-t" style={{ borderColor: accentColor, opacity: 0.3 }} />

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-5">Experience</h2>
          <div className="space-y-6">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-medium text-gray-900 text-[12px]">{exp.position}</div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-4">
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-[10px] font-medium mb-2" style={{ color: accentColor }}>{exp.company}</div>
                {exp.description && (
                  <div className="text-gray-600 whitespace-pre-line font-light leading-[1.7]">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-5">Education</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="font-medium text-gray-900 text-[12px]">{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</div>
                    <div className="text-[10px] font-medium" style={{ color: accentColor }}>{edu.institution}</div>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-4">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.gpa && <div className="text-[10px] text-gray-500 mt-0.5">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-5">Skills</h2>
          <div className="space-y-2">
            {skills.map(skill => (
              <div key={skill.id} className="flex items-baseline gap-3">
                {skill.category && (
                  <span className="text-[10px] font-medium text-gray-500 w-28 flex-shrink-0">{skill.category}</span>
                )}
                <span className="text-gray-700 font-light">{skill.items}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-5">Projects</h2>
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-gray-900 text-[12px]">{proj.name}</span>
                  {proj.link && <span className="text-[10px]" style={{ color: accentColor }}>{proj.link}</span>}
                </div>
                {proj.technologies && <div className="text-[10px] text-gray-400 mb-1">{proj.technologies}</div>}
                {proj.description && <p className="text-gray-600 font-light leading-[1.7]">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-5">Certifications</h2>
          <div className="space-y-2">
            {certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-medium text-gray-900">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-500"> — {cert.issuer}</span>}
                </div>
                {cert.date && <span className="text-[10px] text-gray-400">{formatDate(cert.date)}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-5">Languages</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {languages.map(lang => (
              <span key={lang.id}>
                <span className="font-medium text-gray-900">{lang.name}</span>
                <span className="text-gray-400"> · {lang.proficiency}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-5">References</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {references.map(ref => (
              <div key={ref.id}>
                <div className="font-medium text-gray-900">{ref.name}</div>
                <div className="text-[10px] text-gray-500">{ref.position}{ref.company ? `, ${ref.company}` : ''}</div>
                <div className="text-[10px] text-gray-400">{ref.email}{ref.phone ? ` · ${ref.phone}` : ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
