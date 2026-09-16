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

export default function ModernTemplate({ data, accentColor }: Props) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, references } = data;

  return (
    <div className="resume-page flex text-[11px] leading-relaxed text-gray-800" style={{ fontFamily: "'Source Sans 3', 'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <div className="w-[210px] flex-shrink-0 p-6 text-white" style={{ backgroundColor: accentColor }}>
        {/* Name */}
        <div className="mb-6">
          <h1 className="text-[20px] font-bold leading-tight mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.title && (
            <div className="text-[10px] font-medium opacity-80">{personalInfo.title}</div>
          )}
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-3">Contact</h3>
          <div className="space-y-1.5 text-[10px]">
            {personalInfo.email && <div className="opacity-90 break-all">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="opacity-90">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="opacity-90">{personalInfo.location}</div>}
            {personalInfo.website && <div className="opacity-90 break-all">{personalInfo.website}</div>}
            {personalInfo.linkedin && <div className="opacity-90 break-all">{personalInfo.linkedin}</div>}
            {personalInfo.github && <div className="opacity-90 break-all">{personalInfo.github}</div>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-3">Skills</h3>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.id}>
                  {skill.category && <div className="text-[9px] font-semibold opacity-80 mb-1">{skill.category}</div>}
                  <div className="flex flex-wrap gap-1">
                    {skill.items.split(',').map((item, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: hexToLight('#ffffff', 0.15) }}>
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-3">Languages</h3>
            <div className="space-y-1.5">
              {languages.map(lang => (
                <div key={lang.id} className="flex justify-between text-[10px]">
                  <span className="opacity-90">{lang.name}</span>
                  <span className="opacity-60">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-3">Certifications</h3>
            <div className="space-y-2">
              {certifications.map(cert => (
                <div key={cert.id}>
                  <div className="text-[10px] font-medium opacity-90">{cert.name}</div>
                  <div className="text-[9px] opacity-60">{cert.issuer}{cert.date ? ` • ${formatDate(cert.date)}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-3">References</h3>
            <div className="space-y-2">
              {references.map(ref => (
                <div key={ref.id}>
                  <div className="text-[10px] font-medium opacity-90">{ref.name}</div>
                  <div className="text-[9px] opacity-60">{ref.position}{ref.company ? `, ${ref.company}` : ''}</div>
                  <div className="text-[9px] opacity-50">{ref.email}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1.5 border-b-2" style={{ color: accentColor, borderColor: hexToLight(accentColor, 0.2) }}>
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1.5 border-b-2" style={{ color: accentColor, borderColor: hexToLight(accentColor, 0.2) }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: hexToLight(accentColor, 0.3) }}>
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  <div className="font-bold text-gray-900">{exp.position}</div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[10px] font-medium" style={{ color: accentColor }}>{exp.company}</span>
                    <span className="text-[10px] text-gray-500">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 whitespace-pre-line">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1.5 border-b-2" style={{ color: accentColor, borderColor: hexToLight(accentColor, 0.2) }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id} className="relative pl-4 border-l-2" style={{ borderColor: hexToLight(accentColor, 0.3) }}>
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                  <div className="font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-medium" style={{ color: accentColor }}>{edu.institution}</span>
                    <span className="text-[10px] text-gray-500">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && <div className="text-[10px] text-gray-500 mt-0.5">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1.5 border-b-2" style={{ color: accentColor, borderColor: hexToLight(accentColor, 0.2) }}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-gray-900">{proj.name}</span>
                    {proj.link && <span className="text-[9px]" style={{ color: accentColor }}>{proj.link}</span>}
                  </div>
                  {proj.technologies && <div className="text-[10px] text-gray-500 mb-0.5">{proj.technologies}</div>}
                  {proj.description && <p className="text-gray-700">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
