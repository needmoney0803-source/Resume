import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, Palette, Download, Layout, Sparkles, Zap,
  ArrowRight, CheckCircle2, Star, Eye, Layers
} from 'lucide-react';
import { TEMPLATES, COLOR_PRESETS } from '../lib/types';

const features = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: '4 Professional Templates',
    description: 'Choose from Classic, Modern, Executive, and Minimal designs crafted by hiring experts.',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Live Preview',
    description: 'See every change instantly with real-time preview as you build your perfect resume.',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Custom Colors',
    description: 'Personalize your resume with 10+ accent color presets to match your personal brand.',
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'PDF Export',
    description: 'Download your resume as a print-ready PDF with one click. ATS-friendly formatting.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'All Sections',
    description: 'Experience, education, skills, projects, certifications, languages, and references.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Auto-Save',
    description: 'Your work is automatically saved to the cloud. Pick up right where you left off.',
  },
];

const steps = [
  { step: '01', title: 'Fill Your Details', description: 'Enter your information section by section with our guided editor.' },
  { step: '02', title: 'Choose a Template', description: 'Pick a design that matches your industry and personality.' },
  { step: '03', title: 'Download & Apply', description: 'Export as PDF and start landing your dream job interviews.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ResumeForge</span>
            </div>
            <Link
              to="/builder"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Start Building <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                Professional Resume Builder
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Build a Resume That{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  Lands Interviews
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Create stunning, ATS-friendly resumes in minutes. Choose from professional templates,
                customize colors, and export as PDF — all for free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/builder"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5"
                >
                  Build Your Resume <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#templates"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all border border-gray-200"
                >
                  View Templates
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Free forever
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  No signup required
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ATS-friendly
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border border-gray-100 p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-gray-900">Alexandra Chen</div>
                    <div className="text-sm text-indigo-600 font-medium">Senior Software Engineer</div>
                    <div className="flex items-center justify-center gap-3 mt-2 text-xs text-gray-500">
                      <span>alex.chen@email.com</span>
                      <span>•</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Professional Summary</div>
                    <div className="text-xs text-gray-600 leading-relaxed">Results-driven senior software engineer with 8+ years of experience building scalable web applications...</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Experience</div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-semibold text-gray-900">Senior Software Engineer</span>
                          <span className="text-[10px] text-gray-500">2022 – Present</span>
                        </div>
                        <div className="text-[11px] text-indigo-600">TechCorp Inc.</div>
                      </div>
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-semibold text-gray-900">Full Stack Developer</span>
                          <span className="text-[10px] text-gray-500">2019 – 2021</span>
                        </div>
                        <div className="text-[11px] text-indigo-600">StartupXYZ</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {['TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'].map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build a Perfect Resume
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our builder includes all the tools and sections you need to create a professional resume that stands out.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Professional Templates
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from four carefully crafted designs, each optimized for different industries and career levels.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEMPLATES.map((tmpl, i) => (
              <motion.div
                key={tmpl.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group"
              >
                <Link to="/builder" className="block">
                  <div className="aspect-[3/4] bg-white rounded-xl border-2 border-gray-100 group-hover:border-indigo-200 overflow-hidden transition-all group-hover:shadow-xl group-hover:shadow-indigo-50 group-hover:-translate-y-1">
                    <div className="h-full p-4 flex flex-col">
                      {tmpl.id === 'classic' && (
                        <div className="space-y-2 flex-1">
                          <div className="text-center">
                            <div className="h-3 w-32 bg-gray-800 rounded mx-auto mb-1" />
                            <div className="h-1.5 w-24 bg-indigo-400 rounded mx-auto mb-1" />
                            <div className="h-1 w-36 bg-gray-200 rounded mx-auto" />
                          </div>
                          <div className="border-t border-gray-200 pt-2 space-y-2">
                            <div className="h-1.5 w-16 bg-gray-700 rounded" />
                            <div className="space-y-1">
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-3/4 bg-gray-100 rounded" />
                            </div>
                            <div className="h-1.5 w-20 bg-gray-700 rounded mt-3" />
                            <div className="space-y-1">
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-5/6 bg-gray-100 rounded" />
                            </div>
                          </div>
                        </div>
                      )}
                      {tmpl.id === 'modern' && (
                        <div className="flex h-full gap-2">
                          <div className="w-1/3 bg-indigo-50 rounded p-2 space-y-2">
                            <div className="h-2 w-12 bg-indigo-600 rounded mx-auto" />
                            <div className="space-y-1 mt-3">
                              <div className="h-1 w-full bg-indigo-200 rounded" />
                              <div className="h-1 w-full bg-indigo-200 rounded" />
                              <div className="h-1 w-3/4 bg-indigo-200 rounded" />
                            </div>
                            <div className="h-1.5 w-8 bg-indigo-400 rounded mt-3" />
                            <div className="flex flex-wrap gap-0.5">
                              {[...Array(6)].map((_, j) => (
                                <div key={j} className="h-1 w-4 bg-indigo-200 rounded" />
                              ))}
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="h-1.5 w-14 bg-gray-700 rounded" />
                            <div className="space-y-1">
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-full bg-gray-100 rounded" />
                            </div>
                            <div className="h-1.5 w-16 bg-gray-700 rounded mt-2" />
                            <div className="space-y-1">
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-4/5 bg-gray-100 rounded" />
                            </div>
                          </div>
                        </div>
                      )}
                      {tmpl.id === 'executive' && (
                        <div className="space-y-2 flex-1">
                          <div className="bg-gray-800 rounded p-3 text-center">
                            <div className="h-3 w-28 bg-white rounded mx-auto mb-1" />
                            <div className="h-1.5 w-20 bg-gray-400 rounded mx-auto" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-3 bg-indigo-500 rounded" />
                              <div className="h-1.5 w-16 bg-gray-700 rounded" />
                            </div>
                            <div className="space-y-1 pl-2">
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-full bg-gray-100 rounded" />
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              <div className="w-1 h-3 bg-indigo-500 rounded" />
                              <div className="h-1.5 w-20 bg-gray-700 rounded" />
                            </div>
                            <div className="space-y-1 pl-2">
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-5/6 bg-gray-100 rounded" />
                            </div>
                          </div>
                        </div>
                      )}
                      {tmpl.id === 'minimal' && (
                        <div className="space-y-3 flex-1">
                          <div>
                            <div className="h-3 w-24 bg-gray-800 rounded mb-1" />
                            <div className="h-1 w-32 bg-gray-300 rounded" />
                          </div>
                          <div className="border-t border-gray-200" />
                          <div>
                            <div className="h-1.5 w-10 bg-gray-600 rounded mb-2" />
                            <div className="space-y-1">
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-full bg-gray-100 rounded" />
                            </div>
                          </div>
                          <div className="border-t border-gray-100" />
                          <div>
                            <div className="h-1.5 w-14 bg-gray-600 rounded mb-2" />
                            <div className="space-y-1">
                              <div className="h-1 w-full bg-gray-100 rounded" />
                              <div className="h-1 w-4/5 bg-gray-100 rounded" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-semibold text-gray-900">{tmpl.name}</h3>
                    <p className="text-sm text-gray-500">{tmpl.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Three Simple Steps
            </h2>
            <p className="text-gray-600">Build your professional resume in under 10 minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-indigo-100 mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Make It Yours
          </h2>
          <p className="text-gray-600 mb-8">
            Choose from a curated palette of accent colors to match your personal brand.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {COLOR_PRESETS.map(color => (
              <div
                key={color.value}
                className="w-12 h-12 rounded-xl shadow-sm border-2 border-white hover:scale-110 transition-transform cursor-pointer"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Build Your Resume?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
              Join thousands of professionals who've created their perfect resume with ResumeForge.
            </p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:-translate-y-0.5"
            >
              Start Building Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-violet-600 rounded flex items-center justify-center">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-gray-900">ResumeForge</span>
          </div>
          <p className="text-sm text-gray-500">Free professional resume builder. No account required.</p>
        </div>
      </footer>
    </div>
  );
}
