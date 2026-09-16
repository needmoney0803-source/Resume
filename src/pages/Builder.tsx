import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Download, Save, Check, Loader2, ArrowLeft,
  Palette, Layout, ChevronDown
} from 'lucide-react';
import { ResumeData, ResumeRecord, defaultResumeData, TEMPLATES, COLOR_PRESETS, generateId } from '../lib/types';
import EditorPanel from '../components/EditorPanel';
import PreviewPanel from '../components/PreviewPanel';

export default function Builder() {
  const { id } = useParams<{ id: string }>();
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [title, setTitle] = useState('My Resume');
  const [template, setTemplate] = useState('classic');
  const [accentColor, setAccentColor] = useState('#1e3a5f');
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeTab, setActiveTab] = useState('personal');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [loading, setLoading] = useState(true);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showResumeList, setShowResumeList] = useState(false);
  const [savedResumes, setSavedResumes] = useState<ResumeRecord[]>([]);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (templateRef.current && !templateRef.current.contains(e.target as Node)) setShowTemplateMenu(false);
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) setShowColorMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Load resume
  useEffect(() => {
    const loadResume = async () => {
      try {
        if (id) {
          const res = await fetch(`/api/resumes?id=${id}`);
          if (res.ok) {
            const data: ResumeRecord = await res.json();
            setResumeId(data.id);
            setTitle(data.title);
            setTemplate(data.template);
            setAccentColor(data.accent_color);
            setResumeData({
              personalInfo: data.personal_info || defaultResumeData.personalInfo,
              summary: data.summary || '',
              experience: data.experience || [],
              education: data.education || [],
              skills: data.skills || [],
              projects: data.projects || [],
              certifications: data.certifications || [],
              languages: data.languages || [],
              references: data.references_data || [],
            });
            setLoading(false);
            return;
          }
        }

        // Check for existing resumes
        const listRes = await fetch('/api/resumes');
        if (listRes.ok) {
          const list: ResumeRecord[] = await listRes.json();
          setSavedResumes(list);
          if (list.length > 0 && !id) {
            setShowResumeList(true);
          }
        }
      } catch (err) {
        console.error('Failed to load resume:', err);
      }
      setLoading(false);
    };
    loadResume();
  }, [id]);

  // Auto-save
  const autoSave = useCallback(async () => {
    if (saveStatus === 'saving') return;
    setSaveStatus('saving');
    try {
      const payload = {
        ...(resumeId ? { id: resumeId } : {}),
        title,
        template,
        accent_color: accentColor,
        personal_info: resumeData.personalInfo,
        summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        projects: resumeData.projects,
        certifications: resumeData.certifications,
        languages: resumeData.languages,
        references_data: resumeData.references,
      };

      const method = resumeId ? 'PUT' : 'POST';
      const res = await fetch('/api/resumes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        setResumeId(saved.id);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
        // Update URL without reload
        if (!id) {
          window.history.replaceState(null, '', `/builder/${saved.id}`);
        }
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  }, [resumeId, title, template, accentColor, resumeData, id]);

  // Debounced auto-save on data change
  useEffect(() => {
    if (loading) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(autoSave, 2000);
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [resumeData, title, template, accentColor, loading, autoSave]);

  const handleExport = () => {
    window.print();
  };

  const handleNewResume = () => {
    setResumeId(null);
    setTitle('My Resume');
    setTemplate('classic');
    setAccentColor('#1e3a5f');
    setResumeData({ ...defaultResumeData });
    setShowResumeList(false);
    window.history.replaceState(null, '', '/builder');
  };

  const handleLoadResume = (r: ResumeRecord) => {
    setResumeId(r.id);
    setTitle(r.title);
    setTemplate(r.template);
    setAccentColor(r.accent_color);
    setResumeData({
      personalInfo: r.personal_info || defaultResumeData.personalInfo,
      summary: r.summary || '',
      experience: r.experience || [],
      education: r.education || [],
      skills: r.skills || [],
      projects: r.projects || [],
      certifications: r.certifications || [],
      languages: r.languages || [],
      references: r.references_data || [],
    });
    setShowResumeList(false);
    window.history.replaceState(null, '', `/builder/${r.id}`);
  };

  const handleStartBlank = () => {
    setResumeId(null);
    setTitle('My Resume');
    setTemplate('classic');
    setAccentColor('#1e3a5f');
    setResumeData({
      personalInfo: { fullName: '', title: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      references: [],
    });
    setShowResumeList(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-gray-500">Loading resume...</p>
        </div>
      </div>
    );
  }

  const currentTemplate = TEMPLATES.find(t => t.id === template) || TEMPLATES[0];

  return (
    <div className="min-h-screen bg-gray-100 print-container">
      {/* Resume List Modal */}
      <AnimatePresence>
        {showResumeList && savedResumes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 no-print"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Saved Resumes</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                {savedResumes.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleLoadResume(r)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{r.title}</div>
                    <div className="text-sm text-gray-500">
                      {TEMPLATES.find(t => t.id === r.template)?.name || 'Classic'} • Updated {new Date(r.updated_at).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleStartBlank}
                  className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Start New Resume
                </button>
                <button
                  onClick={() => handleLoadResume(savedResumes[0])}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 no-print">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Home</span>
            </Link>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-violet-600 rounded flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="font-semibold text-gray-900 bg-transparent border-none outline-none focus:ring-2 focus:ring-indigo-200 rounded px-2 py-1 text-sm w-32 sm:w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Status */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 mr-2">
              {saveStatus === 'saving' && (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
              )}
              {saveStatus === 'saved' && (
                <><Check className="w-3.5 h-3.5 text-green-500" /> Saved</>
              )}
              {saveStatus === 'error' && (
                <span className="text-red-500">Save failed</span>
              )}
              {saveStatus === 'idle' && resumeId && (
                <><Save className="w-3.5 h-3.5" /> Auto-saved</>
              )}
            </div>

            {/* Template Selector */}
            <div className="relative" ref={templateRef}>
              <button
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Layout className="w-4 h-4" />
                <span className="hidden sm:inline">{currentTemplate.name}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {showTemplateMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 py-1 w-48 z-50"
                  >
                    {TEMPLATES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setTemplate(t.id); setShowTemplateMenu(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          template === t.id ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.description}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Color Picker */}
            <div className="relative" ref={colorRef}>
              <button
                onClick={() => setShowColorMenu(!showColorMenu)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Palette className="w-4 h-4" />
                <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: accentColor }} />
              </button>
              <AnimatePresence>
                {showColorMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 p-3 z-50"
                  >
                    <div className="text-xs font-medium text-gray-500 mb-2">Accent Color</div>
                    <div className="grid grid-cols-5 gap-2">
                      {COLOR_PRESETS.map(c => (
                        <button
                          key={c.value}
                          onClick={() => { setAccentColor(c.value); setShowColorMenu(false); }}
                          className={`w-8 h-8 rounded-lg transition-transform hover:scale-110 ${
                            accentColor === c.value ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>

            {/* Mobile Preview Toggle */}
            <button
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showMobilePreview ? 'Edit' : 'Preview'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-56px)]">
        {/* Editor Panel */}
        <div className={`lg:w-[480px] xl:w-[520px] flex-shrink-0 overflow-y-auto custom-scrollbar bg-white border-r border-gray-200 no-print ${
          showMobilePreview ? 'hidden lg:block' : 'block'
        }`}>
          <EditorPanel
            resumeData={resumeData}
            setResumeData={setResumeData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Preview Panel */}
        <div className={`flex-1 overflow-y-auto bg-gray-200 p-4 sm:p-8 print-only ${
          showMobilePreview ? 'block' : 'hidden lg:block'
        }`}>
          <PreviewPanel
            resumeData={resumeData}
            template={template}
            accentColor={accentColor}
          />
        </div>
      </div>
    </div>
  );
}
