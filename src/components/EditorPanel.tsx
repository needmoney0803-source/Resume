import { ResumeData, ExperienceItem, EducationItem, SkillCategory, ProjectItem, CertificationItem, LanguageItem, ReferenceItem, generateId } from '../lib/types';
import {
  User, FileText, Briefcase, GraduationCap, Wrench, FolderOpen,
  Award, Globe, Users, Plus, Trash2, ChevronUp, ChevronDown, GripVertical
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'personal', label: 'Personal', icon: <User className="w-4 h-4" /> },
  { id: 'summary', label: 'Summary', icon: <FileText className="w-4 h-4" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Wrench className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
  { id: 'certifications', label: 'Certs', icon: <Award className="w-4 h-4" /> },
  { id: 'languages', label: 'Languages', icon: <Globe className="w-4 h-4" /> },
  { id: 'references', label: 'References', icon: <Users className="w-4 h-4" /> },
];

function InputField({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all resize-none"
      />
    </div>
  );
}

function SectionCard({ title, children, onRemove, onMoveUp, onMoveDown, showControls = true }: {
  title: string; children: React.ReactNode; onRemove?: () => void; onMoveUp?: () => void; onMoveDown?: () => void; showControls?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="border border-gray-200 rounded-xl p-4 bg-gray-50/50"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-300" />
          <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
        </div>
        {showControls && (
          <div className="flex items-center gap-1">
            {onMoveUp && (
              <button onClick={onMoveUp} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
            {onMoveDown && (
              <button onClick={onMoveDown} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
            {onRemove && (
              <button onClick={onRemove} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export default function EditorPanel({ resumeData, setResumeData, activeTab, setActiveTab }: Props) {
  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const moveItem = <T extends { id: string }>(arr: T[], index: number, direction: 'up' | 'down'): T[] => {
    const newArr = [...arr];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newArr.length) return arr;
    [newArr[index], newArr[targetIndex]] = [newArr[targetIndex], newArr[index]];
    return newArr;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-gray-200 bg-white sticky top-0 z-10 px-2 pt-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {/* Personal Info */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Full Name" value={resumeData.personalInfo.fullName} onChange={v => updatePersonalInfo('fullName', v)} placeholder="John Doe" />
              <InputField label="Job Title" value={resumeData.personalInfo.title} onChange={v => updatePersonalInfo('title', v)} placeholder="Software Engineer" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Email" value={resumeData.personalInfo.email} onChange={v => updatePersonalInfo('email', v)} placeholder="john@email.com" type="email" />
              <InputField label="Phone" value={resumeData.personalInfo.phone} onChange={v => updatePersonalInfo('phone', v)} placeholder="+1 (555) 123-4567" />
            </div>
            <InputField label="Location" value={resumeData.personalInfo.location} onChange={v => updatePersonalInfo('location', v)} placeholder="San Francisco, CA" />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Website" value={resumeData.personalInfo.website} onChange={v => updatePersonalInfo('website', v)} placeholder="yoursite.com" />
              <InputField label="LinkedIn" value={resumeData.personalInfo.linkedin} onChange={v => updatePersonalInfo('linkedin', v)} placeholder="linkedin.com/in/you" />
            </div>
            <InputField label="GitHub" value={resumeData.personalInfo.github} onChange={v => updatePersonalInfo('github', v)} placeholder="github.com/you" />
          </div>
        )}

        {/* Summary */}
        {activeTab === 'summary' && (
          <div>
            <TextAreaField
              label="Professional Summary"
              value={resumeData.summary}
              onChange={v => setResumeData(prev => ({ ...prev, summary: v }))}
              placeholder="Write a brief summary highlighting your key strengths and career objectives..."
              rows={6}
            />
            <p className="text-xs text-gray-400 mt-2">
              Tip: Keep it 2-4 sentences. Focus on your most relevant experience and what you bring to the role.
            </p>
          </div>
        )}

        {/* Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            {resumeData.experience.map((exp, i) => (
              <SectionCard
                key={exp.id}
                title={exp.position || 'New Position'}
                onRemove={() => setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== exp.id) }))}
                onMoveUp={i > 0 ? () => setResumeData(prev => ({ ...prev, experience: moveItem(prev.experience, i, 'up') })) : undefined}
                onMoveDown={i < resumeData.experience.length - 1 ? () => setResumeData(prev => ({ ...prev, experience: moveItem(prev.experience, i, 'down') })) : undefined}
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Position" value={exp.position} onChange={v => {
                      setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, position: v } : e) }));
                    }} placeholder="Software Engineer" />
                    <InputField label="Company" value={exp.company} onChange={v => {
                      setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, company: v } : e) }));
                    }} placeholder="Company Name" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Start Date" value={exp.startDate} onChange={v => {
                      setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, startDate: v } : e) }));
                    }} placeholder="2022-01" />
                    <div>
                      <InputField label="End Date" value={exp.endDate} onChange={v => {
                        setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, endDate: v } : e) }));
                      }} placeholder="2024-12" />
                      <label className="flex items-center gap-2 mt-1.5">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={e => {
                            setResumeData(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, current: e.target.checked } : ex) }));
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-xs text-gray-500">Currently working here</span>
                      </label>
                    </div>
                  </div>
                  <TextAreaField
                    label="Description"
                    value={exp.description}
                    onChange={v => {
                      setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === exp.id ? { ...e, description: v } : e) }));
                    }}
                    placeholder="• Led team of 5 developers..."
                    rows={4}
                  />
                </div>
              </SectionCard>
            ))}
            <button
              onClick={() => {
                const newItem: ExperienceItem = { id: generateId(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' };
                setResumeData(prev => ({ ...prev, experience: [...prev.experience, newItem] }));
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        )}

        {/* Education */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            {resumeData.education.map((edu, i) => (
              <SectionCard
                key={edu.id}
                title={edu.institution || 'New Education'}
                onRemove={() => setResumeData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== edu.id) }))}
                onMoveUp={i > 0 ? () => setResumeData(prev => ({ ...prev, education: moveItem(prev.education, i, 'up') })) : undefined}
                onMoveDown={i < resumeData.education.length - 1 ? () => setResumeData(prev => ({ ...prev, education: moveItem(prev.education, i, 'down') })) : undefined}
              >
                <div className="space-y-3">
                  <InputField label="Institution" value={edu.institution} onChange={v => {
                    setResumeData(prev => ({ ...prev, education: prev.education.map(e => e.id === edu.id ? { ...e, institution: v } : e) }));
                  }} placeholder="University Name" />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Degree" value={edu.degree} onChange={v => {
                      setResumeData(prev => ({ ...prev, education: prev.education.map(e => e.id === edu.id ? { ...e, degree: v } : e) }));
                    }} placeholder="Bachelor of Science" />
                    <InputField label="Field of Study" value={edu.field} onChange={v => {
                      setResumeData(prev => ({ ...prev, education: prev.education.map(e => e.id === edu.id ? { ...e, field: v } : e) }));
                    }} placeholder="Computer Science" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <InputField label="Start Date" value={edu.startDate} onChange={v => {
                      setResumeData(prev => ({ ...prev, education: prev.education.map(e => e.id === edu.id ? { ...e, startDate: v } : e) }));
                    }} placeholder="2018-09" />
                    <InputField label="End Date" value={edu.endDate} onChange={v => {
                      setResumeData(prev => ({ ...prev, education: prev.education.map(e => e.id === edu.id ? { ...e, endDate: v } : e) }));
                    }} placeholder="2022-05" />
                    <InputField label="GPA" value={edu.gpa} onChange={v => {
                      setResumeData(prev => ({ ...prev, education: prev.education.map(e => e.id === edu.id ? { ...e, gpa: v } : e) }));
                    }} placeholder="3.8/4.0" />
                  </div>
                </div>
              </SectionCard>
            ))}
            <button
              onClick={() => {
                const newItem: EducationItem = { id: generateId(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' };
                setResumeData(prev => ({ ...prev, education: [...prev.education, newItem] }));
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
        )}

        {/* Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            {resumeData.skills.map((skill, i) => (
              <SectionCard
                key={skill.id}
                title={skill.category || 'New Category'}
                onRemove={() => setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== skill.id) }))}
                onMoveUp={i > 0 ? () => setResumeData(prev => ({ ...prev, skills: moveItem(prev.skills, i, 'up') })) : undefined}
                onMoveDown={i < resumeData.skills.length - 1 ? () => setResumeData(prev => ({ ...prev, skills: moveItem(prev.skills, i, 'down') })) : undefined}
              >
                <div className="space-y-3">
                  <InputField label="Category" value={skill.category} onChange={v => {
                    setResumeData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === skill.id ? { ...s, category: v } : s) }));
                  }} placeholder="e.g. Programming Languages" />
                  <InputField label="Skills (comma separated)" value={skill.items} onChange={v => {
                    setResumeData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === skill.id ? { ...s, items: v } : s) }));
                  }} placeholder="JavaScript, Python, Go" />
                </div>
              </SectionCard>
            ))}
            <button
              onClick={() => {
                const newItem: SkillCategory = { id: generateId(), category: '', items: '' };
                setResumeData(prev => ({ ...prev, skills: [...prev.skills, newItem] }));
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Skill Category
            </button>
          </div>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {resumeData.projects.map((proj, i) => (
              <SectionCard
                key={proj.id}
                title={proj.name || 'New Project'}
                onRemove={() => setResumeData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== proj.id) }))}
                onMoveUp={i > 0 ? () => setResumeData(prev => ({ ...prev, projects: moveItem(prev.projects, i, 'up') })) : undefined}
                onMoveDown={i < resumeData.projects.length - 1 ? () => setResumeData(prev => ({ ...prev, projects: moveItem(prev.projects, i, 'down') })) : undefined}
              >
                <div className="space-y-3">
                  <InputField label="Project Name" value={proj.name} onChange={v => {
                    setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, name: v } : p) }));
                  }} placeholder="My Awesome Project" />
                  <TextAreaField label="Description" value={proj.description} onChange={v => {
                    setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, description: v } : p) }));
                  }} placeholder="Brief description of the project..." rows={3} />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Technologies" value={proj.technologies} onChange={v => {
                      setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, technologies: v } : p) }));
                    }} placeholder="React, Node.js" />
                    <InputField label="Link" value={proj.link} onChange={v => {
                      setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, link: v } : p) }));
                    }} placeholder="github.com/you/project" />
                  </div>
                </div>
              </SectionCard>
            ))}
            <button
              onClick={() => {
                const newItem: ProjectItem = { id: generateId(), name: '', description: '', technologies: '', link: '' };
                setResumeData(prev => ({ ...prev, projects: [...prev.projects, newItem] }));
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        )}

        {/* Certifications */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            {resumeData.certifications.map((cert, i) => (
              <SectionCard
                key={cert.id}
                title={cert.name || 'New Certification'}
                onRemove={() => setResumeData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== cert.id) }))}
                onMoveUp={i > 0 ? () => setResumeData(prev => ({ ...prev, certifications: moveItem(prev.certifications, i, 'up') })) : undefined}
                onMoveDown={i < resumeData.certifications.length - 1 ? () => setResumeData(prev => ({ ...prev, certifications: moveItem(prev.certifications, i, 'down') })) : undefined}
              >
                <div className="space-y-3">
                  <InputField label="Certification Name" value={cert.name} onChange={v => {
                    setResumeData(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, name: v } : c) }));
                  }} placeholder="AWS Solutions Architect" />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Issuing Organization" value={cert.issuer} onChange={v => {
                      setResumeData(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, issuer: v } : c) }));
                    }} placeholder="Amazon Web Services" />
                    <InputField label="Date" value={cert.date} onChange={v => {
                      setResumeData(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, date: v } : c) }));
                    }} placeholder="2024-03" />
                  </div>
                </div>
              </SectionCard>
            ))}
            <button
              onClick={() => {
                const newItem: CertificationItem = { id: generateId(), name: '', issuer: '', date: '' };
                setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, newItem] }));
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Certification
            </button>
          </div>
        )}

        {/* Languages */}
        {activeTab === 'languages' && (
          <div className="space-y-4">
            {resumeData.languages.map((lang, i) => (
              <SectionCard
                key={lang.id}
                title={lang.name || 'New Language'}
                onRemove={() => setResumeData(prev => ({ ...prev, languages: prev.languages.filter(l => l.id !== lang.id) }))}
                onMoveUp={i > 0 ? () => setResumeData(prev => ({ ...prev, languages: moveItem(prev.languages, i, 'up') })) : undefined}
                onMoveDown={i < resumeData.languages.length - 1 ? () => setResumeData(prev => ({ ...prev, languages: moveItem(prev.languages, i, 'down') })) : undefined}
              >
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Language" value={lang.name} onChange={v => {
                    setResumeData(prev => ({ ...prev, languages: prev.languages.map(l => l.id === lang.id ? { ...l, name: v } : l) }));
                  }} placeholder="English" />
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Proficiency</label>
                    <select
                      value={lang.proficiency}
                      onChange={e => {
                        setResumeData(prev => ({ ...prev, languages: prev.languages.map(l => l.id === lang.id ? { ...l, proficiency: e.target.value } : l) }));
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all bg-white"
                    >
                      <option value="">Select...</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Professional">Professional</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Basic">Basic</option>
                    </select>
                  </div>
                </div>
              </SectionCard>
            ))}
            <button
              onClick={() => {
                const newItem: LanguageItem = { id: generateId(), name: '', proficiency: '' };
                setResumeData(prev => ({ ...prev, languages: [...prev.languages, newItem] }));
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Language
            </button>
          </div>
        )}

        {/* References */}
        {activeTab === 'references' && (
          <div className="space-y-4">
            {resumeData.references.map((ref, i) => (
              <SectionCard
                key={ref.id}
                title={ref.name || 'New Reference'}
                onRemove={() => setResumeData(prev => ({ ...prev, references: prev.references.filter(r => r.id !== ref.id) }))}
                onMoveUp={i > 0 ? () => setResumeData(prev => ({ ...prev, references: moveItem(prev.references, i, 'up') })) : undefined}
                onMoveDown={i < resumeData.references.length - 1 ? () => setResumeData(prev => ({ ...prev, references: moveItem(prev.references, i, 'down') })) : undefined}
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Name" value={ref.name} onChange={v => {
                      setResumeData(prev => ({ ...prev, references: prev.references.map(r => r.id === ref.id ? { ...r, name: v } : r) }));
                    }} placeholder="Jane Smith" />
                    <InputField label="Position" value={ref.position} onChange={v => {
                      setResumeData(prev => ({ ...prev, references: prev.references.map(r => r.id === ref.id ? { ...r, position: v } : r) }));
                    }} placeholder="VP of Engineering" />
                  </div>
                  <InputField label="Company" value={ref.company} onChange={v => {
                    setResumeData(prev => ({ ...prev, references: prev.references.map(r => r.id === ref.id ? { ...r, company: v } : r) }));
                  }} placeholder="Company Name" />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Email" value={ref.email} onChange={v => {
                      setResumeData(prev => ({ ...prev, references: prev.references.map(r => r.id === ref.id ? { ...r, email: v } : r) }));
                    }} placeholder="jane@company.com" />
                    <InputField label="Phone" value={ref.phone} onChange={v => {
                      setResumeData(prev => ({ ...prev, references: prev.references.map(r => r.id === ref.id ? { ...r, phone: v } : r) }));
                    }} placeholder="+1 (555) 987-6543" />
                  </div>
                </div>
              </SectionCard>
            ))}
            <button
              onClick={() => {
                const newItem: ReferenceItem = { id: generateId(), name: '', position: '', company: '', email: '', phone: '' };
                setResumeData(prev => ({ ...prev, references: [...prev.references, newItem] }));
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Reference
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
