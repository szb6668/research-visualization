/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, AnatomyScene } from './components/QuantumScene';
import { AngleComparisonChart, StudyMethodsDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, FileText } from 'lucide-react';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[200px] hover:border-blue-300" style={{ animationDelay: delay }}>
      <div className="w-12 h-1 bg-slate-100 mb-4 group-hover:bg-blue-500 transition-colors"></div>
      <h3 className="font-serif text-lg text-slate-900 text-center mb-2 leading-tight">{name}</h3>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">S</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              SPINE<span className="text-blue-500">SURG</span> <span className="font-normal text-slate-400 text-sm">2025</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-500">
            <a href="#background" onClick={scrollToSection('background')} className="hover:text-blue-600 transition-colors cursor-pointer uppercase">Background</a>
            <a href="#methods" onClick={scrollToSection('methods')} className="hover:text-blue-600 transition-colors cursor-pointer uppercase">Methods</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-blue-600 transition-colors cursor-pointer uppercase">Findings</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-blue-600 transition-colors cursor-pointer uppercase">Impact</a>
            <a 
              href="https://dx.doi.org/10.21037/jss-24-19" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              <FileText size={16} /> Paper
            </a>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#background" onClick={scrollToSection('background')} className="hover:text-blue-600 transition-colors cursor-pointer uppercase">Background</a>
            <a href="#methods" onClick={scrollToSection('methods')} className="hover:text-blue-600 transition-colors cursor-pointer uppercase">Methods</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-blue-600 transition-colors cursor-pointer uppercase">Findings</a>
            <a 
              href="https://dx.doi.org/10.21037/jss-24-19" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg cursor-pointer"
            >
              View Article
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F0F4F8]">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.85)_0%,rgba(248,250,252,0.5)_60%,rgba(248,250,252,0.0)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <div className="inline-block mb-6 px-4 py-1.5 border border-blue-200 text-blue-600 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/60">
            Journal of Spine Surgery • 2025
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-8 text-slate-900">
            The effect of smartphone texting on <br/>
            <span className="italic text-blue-600">cervical spine alignment</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-12">
            A radiographic study revealing how "text neck" specifically alters the upper cervical segments in healthy young adults.
          </p>
          
          <div className="flex justify-center">
             <a href="#background" onClick={scrollToSection('background')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-800 transition-colors cursor-pointer">
                <span>SCROLL TO EXPLORE</span>
                <span className="p-2 border border-slate-300 rounded-full group-hover:border-slate-800 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Background */}
        <section id="background" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">Background</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900">The Rise of "Text Neck"</h2>
              <div className="w-16 h-1 bg-blue-500 mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-blue-500">N</span>ever before has technology been so universally accepted as the smartphone. However, spine surgeons have noticed a concurrent rise in patients complaining of neck and upper back pain.
              </p>
              <p>
                Prolonged smartphone use forces the cervical spine into flexion angles of <strong>15 to 60 degrees</strong>. While it is known that this forward flexed position leads to "text neck", questions remain: which specific segments are most affected? And does posture (sitting vs standing) matter?
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="methods" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-slate-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-slate-200">
                         Study Design
                    </div>
                    <h2 className="font-serif text-4xl mb-4 text-slate-900">Radiographic Analysis</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                       Researchers conducted a cross-sectional observational study on volunteers aged 20–39 using lateral cervical X-rays.
                    </p>
                </div>
                
                <StudyMethodsDiagram />

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="font-serif text-2xl mb-4">What was measured?</h3>
                            <ul className="space-y-4 text-slate-600">
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
                                    <p><strong>Intervertebral Angles (IVA):</strong> Angle between upper and lower surfaces of adjacent vertebrae.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
                                    <p><strong>Interdiscal Angles (IDA):</strong> Angle between vertebrae across the disc space.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
                                    <p><strong>Angle of Lordosis (AOL):</strong> Total curve between C2 and C7 posterior surfaces.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="relative h-64 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                           <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-serif italic">
                                Cervical Lateral X-Ray Simulation
                           </div>
                           <div className="absolute inset-0 opacity-50">
                                {/* Simple visual representation of x-ray view */}
                                <div className="w-[2px] h-40 bg-slate-300 absolute left-1/2 top-10 rotate-12"></div>
                                <div className="w-20 h-20 border-2 border-slate-300 rounded-full absolute left-1/2 top-4 -translate-x-10"></div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Results */}
        <section id="results" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5">
                        <div className="sticky top-24">
                            <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">Key Findings</div>
                            <h2 className="font-serif text-4xl mb-6 text-slate-900">Upper Segments Under Stress</h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                The study revealed that smartphone texting significantly alters sagittal alignment, but the changes are not uniform across the spine.
                            </p>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                <strong>Upper Cervical Vulnerability:</strong> The most significant deviations were observed in the Foramen Magnum (FM)–C2, C1–2, and C3–4 angles. 
                            </p>
                             <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                <strong>Sitting vs. Standing:</strong> Postural changes were more pronounced while sitting. This suggests that seated texting may be more detrimental than standing.
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <AngleComparisonChart />
                    </div>
                 </div>
            </div>
        </section>

        {/* Impact */}
        <section id="impact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
             {/* Abstract background */}
             <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <div className="w-full h-full bg-gradient-to-l from-blue-500 to-transparent"></div>
             </div>

             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                    <div className="aspect-square bg-slate-800 rounded-xl overflow-hidden relative border border-slate-700 shadow-2xl">
                        <AnatomyScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-400 font-sans">
                            Visualization of Upper Cervical Segments (C1-C3)
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-blue-400 uppercase">Clinical Significance</div>
                    <h2 className="font-serif text-4xl mb-6 text-white">Accelerated Degeneration?</h2>
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                        While degenerative spondylosis typically affects the lower cervical spine (C5–6) in older adults, the study suggests that repetitive "text neck" places mechanical demand on the <strong>upper segments</strong>.
                    </p>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                        This shift in biomechanical stress could potentially lead to a new pattern of degeneration in younger populations.
                    </p>
                    
                    <div className="p-6 bg-slate-800 border-l-4 border-blue-500 rounded-r-lg">
                        <p className="font-serif italic text-xl text-slate-200 mb-4">
                            "Our observation shows that the most significant changes in the cervical spine while texting occur in the upper segments, more pronounced while sitting."
                        </p>
                        <span className="text-sm font-bold text-slate-500 tracking-wider uppercase">— Simonovich et al. (2025)</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Authors */}
        <section className="py-24 bg-[#F8FAFC] border-t border-slate-200">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">Research Team</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-slate-900">Contributors</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Spine Unit, Orthopedic Division, Rambam Health Care Campus, Haifa, Israel.</p>
                </div>
                
                <div className="flex flex-wrap gap-6 justify-center">
                    <AuthorCard name="Ianiv Trior Simonovich" role="Lead Author" delay="0s" />
                    <AuthorCard name="Elias Haddad" role="Author" delay="0.1s" />
                    <AuthorCard name="Shahar Vider" role="Author" delay="0.2s" />
                    <AuthorCard name="Alon Loberman" role="Author" delay="0.3s" />
                    <AuthorCard name="Farouk Khury" role="Author" delay="0.4s" />
                    <AuthorCard name="Elad Apt" role="Author" delay="0.5s" />
                    <AuthorCard name="Ory Keynan" role="Author" delay="0.6s" />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-white text-slate-500 py-16 border-t border-slate-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-slate-900 font-serif font-bold text-2xl mb-2">J Spine Surg 2025</div>
                <p className="text-sm">Effect of smartphone texting on cervical spine sagittal alignment.</p>
            </div>
            <div className="flex gap-4">
                <a href="https://dx.doi.org/10.21037/jss-24-19" className="text-sm font-medium hover:text-blue-600 transition-colors">Original Article DOI</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-slate-400">
            © AME Publishing Company. Visualized by AI.
        </div>
      </footer>
    </div>
  );
};

export default App;