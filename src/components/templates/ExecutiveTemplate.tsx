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

function hexToLight(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default function ExecutiveTemplate({ data, accentColor }: Props) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, references } = data;

  return (
    <div className="resume-page text-[11px] leading-relaxed text-gray-800" style={{ fontFamily: "'Source Sans 3', 'Inter', system-ui, sans-serif" }}>
      {/* Bold Header Banner */}
      <div className="p-8 pb-6 text-white" style={{ backgroundColor: accentColor }}>
        <h1 className="text-[30px] font-black tracking-tight mb-1">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        {personalInfo.title && (
          <div className="text-sm font-medium opacity-85 mb-3">{personalInfo.title}</div>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] opacity-80">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      <div className="p-8 pt-6">
        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Professional Summary</h2>
            </div>
            <p className="text-gray-700 leading-relaxed pl-3">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Professional Experience</h2>
            </div>
            <div className="space-y-4 pl-3">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <div className="font-bold text-[12px] text-gray-900">{exp.position}</div>
                      <div className="font-medium text-[10px]" style={{ color: accentColor }}>{exp.company}</div>
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 mt-1 whitespace-pre-line">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Column Layout for Education + Skills */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Education</h2>
              </div>
              <div className="space-y-3 pl-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-gray-900">{edu.degree}</div>
                    <div className="text-[10px] font-medium" style={{ color: accentColor }}>{edu.field}</div>
                    <div className="text-[10px] text-gray-600">{edu.institution}</div>
                    <div className="text-[10px] text-gray-500">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Core Skills</h2>
              </div>
              <div className="space-y-2 pl-3">
                {skills.map(skill => (
                  <div key={skill.id}>
                    {skill.category && <div className="text-[9px] font-bold uppercase text-gray-500 mb-0.5">{skill.category}</div>}
                    <div className="flex flex-wrap gap-1">
                      {skill.items.split(',').map((item, i) => (
                        <span key={i} className="text-[9px] px-2 py-0.5 rounded-sm font-medium" style={{ backgroundColor: hexToLight(accentColor, 0.1), color: accentColor }}>
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Key Projects</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 pl-3">
              {projects.map(proj => (
                <div key={proj.id} className="p-3 rounded-lg" style={{ backgroundColor: hexToLight(accentColor, 0.04) }}>
                  <div className="font-bold text-gray-900 mb-0.5">{proj.name}</div>
                  {proj.technologies && <div className="text-[9px] font-medium mb-1" style={{ color: accentColor }}>{proj.technologies}</div>}
                  {proj.description && <p className="text-[10px] text-gray-700">{proj.description}</p>}
                  {proj.link && <div className="text-[9px] mt-1" style={{ color: accentColor }}>{proj.link}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row: Certifications + Languages */}
        <div className="grid grid-cols-2 gap-6">
          {certifications.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Certifications</h2>
              </div>
              <div className="space-y-1.5 pl-3">
                {certifications.map(cert => (
                  <div key={cert.id}>
                    <div className="font-semibold text-gray-900">{cert.name}</div>
                    <div className="text-[10px] text-gray-500">{cert.issuer}{cert.date ? ` • ${formatDate(cert.date)}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Languages</h2>
              </div>
              <div className="space-y-1 pl-3">
                {languages.map(lang => (
                  <div key={lang.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor, opacity: lang.proficiency === 'Native' ? 1 : lang.proficiency === 'Fluent' ? 0.7 : 0.4 }} />
                    <span className="text-gray-800">{lang.name}</span>
                    <span className="text-[10px] text-gray-500">– {lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* References */}
        {references.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">References</h2>
            </div>
            <div className="flex gap-6 pl-3">
              {references.map(ref => (
                <div key={ref.id}>
                  <div className="font-semibold text-gray-900">{ref.name}</div>
                  <div className="text-[10px] text-gray-600">{ref.position}{ref.company ? `, ${ref.company}` : ''}</div>
                  <div className="text-[10px] text-gray-500">{ref.email}{ref.phone ? ` • ${ref.phone}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
