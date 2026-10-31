import { useState, useEffect } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  Award, 
  HardHat, 
  Layers, 
  Wrench, 
  Sparkles, 
  Grid, 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  FileText, 
  Send
} from 'lucide-react';
import { 
  COMPANY_PROFILE, 
  SERVICES_DATA, 
  PROJECTS_DATA, 
  TEAM_DATA, 
  TESTIMONIALS_DATA, 
  CLIENT_LOGOS, 
  JOB_LISTINGS
} from './data/siteData';
import { ConcreteGridBackground } from './components/ConcreteGridBackground';
import { ConcreteVolumeCalculator } from './components/ConcreteVolumeCalculator';
import { LuxuryProjectGallery } from './components/LuxuryProjectGallery';
import { CinematicVideoScroll } from './components/CinematicVideoScroll';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  // Quote prepopulation state
  const [quoteScopeMessage, setQuoteScopeMessage] = useState<string>('');

  // Form states
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [careerSuccess, setCareerSuccess] = useState(false);

  const handleCalculatorTransfer = (calcScope: string) => {
    setQuoteScopeMessage(calcScope);
    navigateTo('contact');
  };

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [currentRoute, selectedServiceSlug, selectedProjectSlug]);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    setSelectedServiceSlug(null);
    setSelectedProjectSlug(null);
  };

  const openService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentRoute('service-detail');
  };

  const openProject = (id: string) => {
    setSelectedProjectSlug(id);
    setCurrentRoute('project-detail');
  };

  const activeService = SERVICES_DATA.find(s => s.slug === selectedServiceSlug) || SERVICES_DATA[0];
  const activeProject = PROJECTS_DATA.find(p => p.id === selectedProjectSlug) || PROJECTS_DATA[0];

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-6 h-6 text-[#29295d]" />;
      case 'Layers': return <Layers className="w-6 h-6 text-[#29295d]" />;
      case 'Grid': return <Grid className="w-6 h-6 text-[#29295d]" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-[#29295d]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#29295d]" />;
      case 'HardHat': return <HardHat className="w-6 h-6 text-[#29295d]" />;
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6 text-[#29295d]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#29295d]" />;
      default: return <Building2 className="w-6 h-6 text-[#29295d]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-50/800 selection:text-white relative overflow-x-hidden">
      {/* Dynamic Animated Canvas Grid & Structural Filament Background */}
      <ConcreteGridBackground />

      {/* Top Notification / Emergency Bar */}
      <header className="bg-slate-950 border-b border-slate-900 text-xs py-2.5 px-4 z-50 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#3b82f6]" /> Manchester, UK (Nationwide Delivery)
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <Award className="w-3.5 h-3.5 text-[#3b82f6]" /> CHAS SSIP Accredited Contractor [CDM]
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a 
              href={`tel:${COMPANY_PROFILE.contact.legacyEmergencyMobile}`} 
              className="flex items-center gap-1.5 text-[#60a5fa] hover:text-white font-semibold transition"
              title="Legacy 24/7 Save-a-Slab hotline"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#60a5fa]" /> 
              <span>24/7 Emergency Response: {COMPANY_PROFILE.contact.legacyEmergencyMobile}</span>
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a 
              href={COMPANY_PROFILE.contact.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="hidden md:flex items-center gap-1.5 hover:text-[#60a5fa] transition"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer shrink-0"
          >
            <img 
              src="/assets/znb-logo.jpg" 
              alt="ZNB Construction Ltd Logo" 
              className="h-10 sm:h-11 w-auto object-contain rounded border border-slate-200 group-hover:border-[#29295d]/50 transition" 
            />
            <div className="hidden sm:block">
              <span className="block font-bold text-base tracking-tight text-slate-900 group-hover:text-[#29295d] transition leading-tight">
                ZNB CONSTRUCTION
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Specialist Concrete & Slipform
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-6 text-[13px] font-semibold tracking-wide whitespace-nowrap h-full">
            <button 
              onClick={() => navigateTo('home')}
              className={`h-full flex items-center relative transition cursor-pointer px-1 ${currentRoute === 'home' ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#29295d]' : 'text-slate-600 hover:text-slate-950'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('about')}
              className={`h-full flex items-center relative transition cursor-pointer px-1 ${currentRoute === 'about' ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#29295d]' : 'text-slate-600 hover:text-slate-950'}`}
            >
              About Us
            </button>
            <button 
              onClick={() => navigateTo('team')}
              className={`h-full flex items-center relative transition cursor-pointer px-1 ${currentRoute === 'team' ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#29295d]' : 'text-slate-600 hover:text-slate-950'}`}
            >
              Our Team
            </button>

            {/* Services Dropdown */}
            <div className="relative group h-full flex items-center">
              <button 
                onClick={() => navigateTo('services')}
                className={`h-full flex items-center gap-1 relative transition cursor-pointer px-1 ${currentRoute.startsWith('service') ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#29295d]' : 'text-slate-600 hover:text-slate-950'}`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-slate-400 group-hover:text-slate-900" />
              </button>
              <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl p-2.5 hidden group-hover:block border border-slate-200 z-50">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5 border-b border-slate-100 mb-1 tracking-wider">
                  Specialist Capabilities
                </div>
                {SERVICES_DATA.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => openService(srv.slug)}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:text-slate-950 hover:bg-slate-50 font-medium rounded-lg transition flex items-center justify-between cursor-pointer"
                  >
                    <span>{srv.title}</span>
                    {srv.id === 'slipform-packages' && (
                      <span className="text-[9px] bg-blue-50/80 text-[#1e1e4a] border border-blue-200 px-1.5 py-0.5 rounded font-bold uppercase">Priority</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => navigateTo('projects')}
              className={`h-full flex items-center relative transition cursor-pointer px-1 ${currentRoute.startsWith('project') ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#29295d]' : 'text-slate-600 hover:text-slate-950'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => navigateTo('health-safety')}
              className={`h-full flex items-center relative transition cursor-pointer px-1 ${currentRoute === 'health-safety' ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#29295d]' : 'text-slate-600 hover:text-slate-950'}`}
            >
              Health & Safety
            </button>
            <button 
              onClick={() => navigateTo('careers')}
              className={`h-full flex items-center relative transition cursor-pointer px-1 ${currentRoute === 'careers' ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#29295d]' : 'text-slate-600 hover:text-slate-950'}`}
            >
              Careers
            </button>
            <button 
              onClick={() => navigateTo('contact')}
              className={`h-full flex items-center relative transition cursor-pointer px-1 ${currentRoute === 'contact' ? 'text-slate-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#29295d]' : 'text-slate-600 hover:text-slate-950'}`}
            >
              Contact
            </button>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button 
              onClick={() => navigateTo('contact')}
              className="btn-primary text-xs uppercase tracking-wider py-2.5 px-4 font-bold shadow-md whitespace-nowrap cursor-pointer"
            >
              Request a Quote
            </button>
            <a 
              href={`tel:${COMPANY_PROFILE.contact.office.replace(/\s+/g, '')}`}
              className="btn-secondary text-xs font-semibold py-2.5 px-3.5 whitespace-nowrap flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#29295d]" />
              <span>{COMPANY_PROFILE.contact.office}</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="xl:hidden p-2 text-slate-600 hover:text-slate-950 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu modal/drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden glass-panel border-t border-slate-200 px-6 py-6 flex flex-col gap-4 text-base font-semibold">
            <button onClick={() => navigateTo('home')} className="text-left py-2 border-b border-slate-100">Home</button>
            <button onClick={() => navigateTo('about')} className="text-left py-2 border-b border-slate-100">About Us</button>
            <button onClick={() => navigateTo('team')} className="text-left py-2 border-b border-slate-100">Our Team</button>
            <div>
              <button 
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)} 
                className="w-full text-left py-2 flex items-center justify-between border-b border-slate-100"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesDropdownOpen && (
                <div className="pl-4 py-2 flex flex-col gap-2 text-sm text-slate-500">
                  {SERVICES_DATA.map(s => (
                    <button key={s.id} onClick={() => openService(s.slug)} className="text-left py-1 hover:text-[#29295d]">
                      • {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => navigateTo('projects')} className="text-left py-2 border-b border-slate-100">Projects & Case Studies</button>
            <button onClick={() => navigateTo('health-safety')} className="text-left py-2 border-b border-slate-100">Health & Safety</button>
            <button onClick={() => navigateTo('careers')} className="text-left py-2 border-b border-slate-100">Careers & Operatives</button>
            <button onClick={() => navigateTo('contact')} className="text-left py-2 border-b border-slate-100">Contact Us</button>
            <div className="pt-2 flex flex-col gap-3">
              <button onClick={() => navigateTo('contact')} className="btn-primary w-full py-3">Request a Quote</button>
              <a href={`tel:${COMPANY_PROFILE.contact.office}`} className="btn-secondary w-full py-3 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call {COMPANY_PROFILE.contact.office}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        {/* VIEW: HOME */}
        {currentRoute === 'home' && (
          <div>
            {/* Cinematic High-Quality Scroll Video Animation Sequence */}
            <CinematicVideoScroll 
              totalFrames={240} 
              onExploreClick={() => navigateTo('projects')} 
            />

            {/* Cinematic Hero - Spacious & De-congested */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 py-28 sm:py-36">
              {/* Subtle ambient lighting */}
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-50/800/10 rounded-full blur-[140px] pointer-events-none" />

              <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url('/assets/page_1_asset_3.jpg')`,
                  filter: 'brightness(0.95) contrast(1.02)', opacity: 0.12
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-10" />

              <div className="max-w-5xl mx-auto flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="badge-amber mb-8">
                  <ShieldCheck className="w-4 h-4 text-[#29295d]" />
                  <span>Nationwide Concrete & Slipform Contractor • Est. 2013</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 mb-6 uppercase leading-[1.05] max-w-4xl">
                  Engineering Precision <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29295d] via-[#3b82f6] to-[#1e1e4a]">
                    Concrete & Slipform
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-10 max-w-2xl font-normal leading-relaxed">
                  Manchester-based specialists delivering turnkey slipform packages, reinforced concrete frames, 
                  and high-tolerance finishing for Tier-1 contractors across the United Kingdom.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md mb-16">
                  <button 
                    onClick={() => navigateTo('contact')}
                    className="btn-primary w-full sm:w-auto py-3.5 px-8 font-bold"
                  >
                    Request a Quote <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <button 
                    onClick={() => navigateTo('projects')}
                    className="btn-secondary w-full sm:w-auto py-3.5 px-7"
                  >
                    Discuss Your Project
                  </button>
                </div>

                {/* Metric Strip - Uncongested, balanced 4-column cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left pt-8 border-t border-slate-200">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono-tech">2013</span>
                    <div className="mt-2">
                      <span className="text-xs uppercase text-slate-800 font-bold tracking-wide block">Established</span>
                      <span className="text-[11px] text-slate-500">Delivering UK-wide</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono-tech">50 Floors</span>
                    <div className="mt-2">
                      <span className="text-xs uppercase text-slate-800 font-bold tracking-wide block">Slipform Heights</span>
                      <span className="text-[11px] text-slate-500">Croydon & UK Cores</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono-tech">36,000 m³</span>
                    <div className="mt-2">
                      <span className="text-xs uppercase text-slate-800 font-bold tracking-wide block">MECD Concrete</span>
                      <span className="text-[11px] text-slate-500">4,500t rebar installed</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono-tech">100% CSCS</span>
                    <div className="mt-2">
                      <span className="text-xs uppercase text-slate-800 font-bold tracking-wide block">Vetted Operatives</span>
                      <span className="text-[11px] text-slate-500">CHAS SSIP Accredited</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Approved Company Proposition & Heritage */}
            <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                  <div className="badge-amber mb-4">About ZNB Construction Ltd</div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6 leading-tight">
                    A Trusted UK Specialist Built on Quality, Safety and Programme Delivery
                  </h2>
                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <p className="font-medium text-slate-900 text-base sm:text-lg">
                      Established in 2013, ZNB Construction Ltd is a Manchester-based construction specialist 
                      delivering projects throughout the UK. We provide full slipform packages, reinforced concrete works, 
                      formwork, reinforcement fixing, concrete placing and finishing, and skilled site operatives.
                    </p>
                    <p>
                      Our experienced management and site teams work closely with contractors to deliver safe, 
                      well-coordinated works, with a strong focus on quality, reliability and meeting project programmes.
                    </p>
                    <p>
                      As a proud family-run business, we prioritize working smarter, not harder, to achieve the best results. 
                      Understanding client needs is central to our operations: concrete does not allow for significant adjustments 
                      post-installation, making first-time precision our non-negotiable benchmark.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-[#29295d] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-950">First-Time Accuracy</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Eliminating costly post-pour remedial delays</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-[#29295d] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-950">Save-a-Slab Response</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Rapid nationwide emergency deployment</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative">
                    <img 
                      src="/assets/About-1.jpg" 
                      alt="ZNB Construction Site Work" 
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur border border-slate-200 text-xs shadow-md">
                      <span className="font-mono-tech text-[#29295d] uppercase font-bold tracking-wider block mb-1">
                        Tier-1 Contractor Relationships
                      </span>
                      <p className="text-slate-600">
                        Working closely with prominent construction partners including Heyrod, Laing O'Rourke, and Morrisroe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Services (All 8 Categories) - Spacious 3-Column Grid */}
            <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                  <div>
                    <div className="badge-amber mb-3">Specialist Concrete Capabilities</div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950">
                      Our Core Specialist Services
                    </h2>
                  </div>
                  <button 
                    onClick={() => navigateTo('services')} 
                    className="btn-secondary self-start md:self-auto text-xs"
                  >
                    View All 8 Categories <ArrowRight className="w-3.5 h-3.5 text-[#29295d]" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICES_DATA.map((srv) => (
                    <div 
                      key={srv.id} 
                      className="card-clean bg-white flex flex-col justify-between group cursor-pointer"
                      onClick={() => openService(srv.slug)}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={srv.heroImage} 
                          alt={srv.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur p-2.5 rounded-xl border border-slate-200 shadow-sm">
                          {getServiceIcon(srv.iconName)}
                        </div>
                        {srv.id === 'slipform-packages' && (
                          <div className="absolute top-3 right-3 bg-blue-50/800 text-white text-[10px] font-mono-tech font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                            Priority Service
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-slate-950 group-hover:text-[#29295d] transition mb-3">
                            {srv.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">
                            {srv.shortDescription}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-[#29295d]">
                          <span>Explore Capability</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Projects Highlight */}
            <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                  <div>
                    <div className="badge-amber mb-3">Proven Track Record</div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950">
                      Featured Completed & Current Works
                    </h2>
                  </div>
                  <button 
                    onClick={() => navigateTo('projects')} 
                    className="btn-secondary self-start md:self-auto text-sm"
                  >
                    View All Case Studies ({PROJECTS_DATA.length}) <ArrowRight className="w-4 h-4 text-[#29295d]" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PROJECTS_DATA.slice(0, 3).map((proj) => (
                    <div 
                      key={proj.id} 
                      className="card-clean bg-white overflow-hidden group cursor-pointer flex flex-col justify-between"
                      onClick={() => openProject(proj.id)}
                    >
                      <div className="relative h-60 overflow-hidden">
                        <img 
                          src={proj.heroImage} 
                          alt={proj.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
                          {proj.location}
                        </span>
                        <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs ${proj.status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-blue-50/80 text-[#1e1e4a] border border-blue-200'}`}>
                          {proj.status}
                        </span>
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#29295d] transition mb-2">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-3 mb-6">
                            {proj.summary}
                          </p>

                          <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            {proj.technicalMetrics.slice(0, 2).map((m, i) => (
                              <div key={i}>
                                <span className="block text-[10px] uppercase font-bold text-slate-500">{m.label}</span>
                                <span className="text-xs font-extrabold text-[#29295d] font-mono-tech">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-[#29295d]">
                          <span>Read Full Case Study</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Genuine Client / Contractor Logos */}
            <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-8 block">
                  Trusted Partner to Major UK Tier-1 Main Contractors & Engineering Groups
                </span>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  {CLIENT_LOGOS.map((client, idx) => (
                    <div 
                      key={idx} 
                      className="h-20 w-44 flex items-center justify-center p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#3b82f6] hover:shadow-md transition-all duration-200"
                      title={client.name}
                    >
                      <img 
                        src={client.image} 
                        alt={client.name} 
                        className="max-h-full max-w-full object-contain transition-transform duration-200 hover:scale-105" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Carousel / Grid */}
            <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <div className="badge-amber mb-3">Authentic Client Feedback</div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
                    What Our Main Contractor Partners Say
                  </h2>
                  <p className="text-sm text-slate-600">
                    Direct quotations preserved from client feedback, tenders, and verified on-site delivery contracts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {TESTIMONIALS_DATA.slice(0, 6).map((t) => (
                    <div key={t.id} className="card-clean bg-white p-7 flex flex-col justify-between">
                      <p className="text-sm text-slate-600 italic mb-6 leading-relaxed">
                        "{t.quote}"
                      </p>
                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-950 text-sm">{t.author}</h4>
                          <span className="text-xs text-[#29295d] font-medium">{t.title} — {t.company}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          {t.source === 'brochure' ? 'Brochure' : 'Website'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Interactive Estimator Tool Section */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ConcreteVolumeCalculator onApplyToQuote={handleCalculatorTransfer} />
              </div>
            </section>

            {/* Call to Action Bar */}
            <section className="py-20 sm:py-24 bg-slate-950 text-white border-b border-slate-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                <div className="max-w-2xl">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    Need a Quote or Have an Urgent Concrete Requirement?
                  </h3>
                  <p className="text-sm text-slate-400">
                    Contact our estimating team today for Slipform Packages, RC Frames, or 24/7 Save-a-Slab emergency assistance.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 shrink-0">
                  <button onClick={() => navigateTo('contact')} className="btn-amber py-3.5 px-7 text-sm font-bold">
                    Submit Project Drawings
                  </button>
                  <a href={`tel:${COMPANY_PROFILE.contact.office}`} className="btn-secondary py-3.5 px-6 text-sm font-semibold">
                    <Phone className="w-4 h-4 text-[#29295d]" /> {COMPANY_PROFILE.contact.office}
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: ABOUT US */}
        {currentRoute === 'about' && (
          <div className="py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto mb-16 text-center">
                <div className="badge-amber mb-3">Heritage & Precision</div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 mb-6">About ZNB Construction Ltd</h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Established in 2013 in Manchester, delivering excellence in concrete expertise, labour, 
                  and finishing techniques across the UK.
                </p>
              </div>

              {/* Full Preserved Story */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
                <div className="lg:col-span-7 space-y-6 text-slate-600 leading-relaxed text-base">
                  <div className="card-clean bg-white p-8 border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-950 mb-4">Our Background & National Expansion</h3>
                    <p className="mb-4">
                      Established in 2013, ZNB Construction offers the very best in concrete expertise, labor, 
                      and finishing techniques across the UK. Drawing on decades of specialist know-how and excellence 
                      in concrete services, we provide tailor-made solutions to the Construction, Manufacturing, 
                      and Infrastructure sectors.
                    </p>
                    <p className="mb-4">
                      In our early years, we successfully delivered many projects in the Manchester area and soon expanded 
                      our reach to work on projects throughout the UK. We have developed ongoing relationships with prominent 
                      construction companies such as Heyrod, Laing O’Rourke, Morrisroe, and many others.
                    </p>
                    <p>
                      We are proud to be a family-run business, with our family values at the heart of everything we do. 
                      Safety is paramount in our approach to every job, ensuring the well-being of both our operatives and clients. 
                      We prioritize working smarter, not harder, to achieve the best results.
                    </p>
                  </div>

                  <div className="card-clean bg-white p-8 border border-slate-200">
                    <h3 className="text-xl font-bold text-[#1e1e4a] mb-3">The Principle of First-Time Precision</h3>
                    <p className="mb-4">
                      Understanding the needs of our clients is central to our operations. We recognize the crucial importance 
                      of precision in our work, as concrete does not allow for significant adjustments post-installation. 
                      Getting it right the first time eliminates the massive financial impact and programme delays of correcting concrete after cure.
                    </p>
                    <p>
                      Additionally, we are renowned across the country for our quick response in “save a slab” emergency situations, 
                      effectively addressing imperfections, misjudged mixes, or cold joints, thereby saving our clients substantial time and money.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                    <img src="/assets/About-2.jpg" alt="ZNB Operative Work" className="w-full h-80 object-cover" />
                  </div>
                  <div className="card-clean bg-white p-8 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-slate-950 text-xl mb-2">Our Mission & Vision</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-900 block mb-1">Mission:</strong> To provide the highest quality concrete expertise, labor, and finishing techniques across the UK, 
                      delivering tailor-made solutions to the Construction, Manufacturing, and Infrastructure sectors.
                    </p>
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-900 block mb-1">Vision:</strong> To be the leading provider of concrete services in the UK, known for our reliability, 
                        precision, and quick response to emergency situations while enhancing our strong reputation in the industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="card-clean bg-white p-7 border border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-center text-[#29295d] mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-slate-950 mb-2">Safety Paramount</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Full CSCS vetting, SSIP CHAS compliance, and systematic risk assessments to protect our team and partners.
                  </p>
                </div>
                <div className="card-clean bg-white p-7 border border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-center text-[#29295d] mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-slate-950 mb-2">Working Smarter</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Leveraging modern boom pumps, laser levelling, and seasoned coordination to optimize cycle time and finish.
                  </p>
                </div>
                <div className="card-clean bg-white p-7 border border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-center text-[#29295d] mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-slate-950 mb-2">Family Values</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Honesty, mutual respect, and long-standing partnership with main contractors built over a decade of trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: OUR TEAM */}
        {currentRoute === 'team' && (
          <div className="py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto mb-16 text-center">
                <div className="badge-amber mb-3">Leadership & Experience</div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 mb-4">Our Management Team</h1>
                <p className="text-base sm:text-lg text-slate-600">
                  Meet the leadership behind ZNB Construction Ltd, blending 15+ years of hands-on concrete craft with modern project coordination.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                {TEAM_DATA.map((member) => (
                  <div key={member.id} className="card-clean bg-white overflow-hidden border border-slate-200 flex flex-col">
                    <div className="h-80 overflow-hidden relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6">
                        <span className="text-xs uppercase tracking-wider text-[#60a5fa] font-bold block mb-1">
                          {member.role}
                        </span>
                        <h3 className="text-2xl font-bold text-white">
                          {member.name} {member.nickname ? `("${member.nickname}")` : ''}
                        </h3>
                      </div>
                    </div>

                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {member.bio}
                      </p>
                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                        <span>Industry Experience</span>
                        <span className="font-bold text-[#29295d] font-mono-tech">{member.experienceYears}+ Years</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Operative Recruitment Notice */}
              <div className="card-clean bg-white p-8 sm:p-10 rounded-2xl max-w-4xl mx-auto text-center border border-slate-200 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3">Expanding Our Workforce</h3>
                <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
                  In addition to our core leadership, ZNB deploys dedicated site supervisors, shuttering carpenters, 
                  steel fixers, and concrete finishers across projects nationwide.
                </p>
                <button onClick={() => navigateTo('careers')} className="btn-amber text-sm font-bold py-3 px-6">
                  Join Our Site Team <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: SERVICES OVERVIEW */}
        {currentRoute === 'services' && (
          <div className="py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto mb-16 text-center">
                <div className="badge-amber mb-3">Specialist Concrete Capabilities</div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 mb-4">Our Services</h1>
                <p className="text-base sm:text-lg text-slate-600">
                  From turnkey vertical slipform packages and complex RC frames to emergency slab salvage and skilled trade supply.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {SERVICES_DATA.map((s) => (
                  <div 
                    key={s.id} 
                    className="card-clean bg-white overflow-hidden border border-slate-200 flex flex-col justify-between group cursor-pointer"
                    onClick={() => openService(s.slug)}
                  >
                    <div>
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={s.heroImage} 
                          alt={s.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur p-2.5 rounded-xl border border-slate-200 shadow-sm">
                          {getServiceIcon(s.iconName)}
                        </div>
                        {s.id === 'slipform-packages' && (
                          <div className="absolute top-4 right-4 bg-blue-50/800 text-white text-[11px] font-mono-tech font-bold uppercase px-3 py-1 rounded-full shadow-sm">
                            Priority Service
                          </div>
                        )}
                      </div>

                      <div className="p-7">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#29295d] transition mb-3">
                          {s.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                          {s.shortDescription}
                        </p>

                        <div className="space-y-2 mb-6">
                          {s.keyFeatures.slice(0, 3).map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#29295d] shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-7 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#29295d]">
                      <span>View Technical Scope & Projects</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: SERVICE DETAIL */}
        {currentRoute === 'service-detail' && activeService && (
          <div className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button 
                onClick={() => navigateTo('services')} 
                className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#29295d] hover:text-[#1e1e4a] hover:underline mb-8 cursor-pointer"
              >
                ← Back to All Services
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
                <div className="lg:col-span-8">
                  <div className="badge-amber mb-3">Service Category</div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight">
                    {activeService.title}
                  </h1>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 mb-8 shadow-xl">
                    <img 
                      src={activeService.heroImage} 
                      alt={activeService.title} 
                      className="w-full h-80 sm:h-96 object-cover" 
                    />
                  </div>

                  <div className="card-clean bg-white p-8 border border-slate-200 mb-8 space-y-4 text-slate-700 text-base leading-relaxed">
                    <h3 className="text-xl font-bold text-slate-950 mb-2">Service Overview & Delivery Approach</h3>
                    {activeService.fullDescription.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Key Features */}
                  <div className="card-clean bg-white p-8 border border-slate-200 mb-8">
                    <h3 className="text-xl font-bold text-slate-950 mb-6">Key Scope of Works & Technical Capabilities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeService.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#29295d] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Details Accordion / Sections */}
                  {activeService.technicalDetails && (
                    <div className="space-y-4 mb-8">
                      {activeService.technicalDetails.map((tech, idx) => (
                        <div key={idx} className="card-clean bg-white p-6 border border-slate-200">
                          <h4 className="text-lg font-bold text-slate-950 mb-2">{tech.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{tech.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Service Gallery */}
                  {activeService.galleryImages.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-950 mb-4">Site & Equipment Gallery</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {activeService.galleryImages.map((img, i) => (
                          <div key={i} className="h-44 rounded-xl overflow-hidden border border-slate-200">
                            <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="card-clean bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-950 mb-3">Request a Package Quote</h4>
                    <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                      Speak directly with our estimating team regarding tender prices, lead times, and programme availability for this package.
                    </p>
                    <button onClick={() => navigateTo('contact')} className="btn-amber w-full py-3 text-xs uppercase tracking-wider font-bold mb-3">
                      Enquire for this Service
                    </button>
                    <a href={`tel:${COMPANY_PROFILE.contact.office}`} className="btn-secondary w-full py-3 text-xs flex items-center justify-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#29295d]" /> Call Estimating
                    </a>
                  </div>

                  {/* Emergency Notice if applicable */}
                  {activeService.id === 'concrete-repairs-emergency' && (
                    <div className="card-clean bg-blue-50/80/60 p-6 rounded-2xl border border-blue-300">
                      <div className="flex items-center gap-2 text-[#1e1e4a] font-bold text-sm mb-2">
                        <AlertTriangle className="w-4 h-4 text-[#29295d]" /> Save a Slab Urgent Hotline
                      </div>
                      <p className="text-xs text-slate-700 mb-4 leading-relaxed">
                        Immediate assistance for plastic state failures, cold-joints, or plant breakdowns:
                      </p>
                      <a href={`tel:${COMPANY_PROFILE.contact.legacyEmergencyMobile}`} className="block text-center font-bold text-base text-[#0f172a] bg-blue-200/60 py-2.5 rounded-xl border border-blue-300 hover:bg-blue-200 transition">
                        {COMPANY_PROFILE.contact.legacyEmergencyMobile}
                      </a>
                    </div>
                  )}

                  <div className="card-clean bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">All Services</h4>
                    <div className="flex flex-col gap-1.5">
                      {SERVICES_DATA.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => openService(s.slug)}
                          className={`text-left text-xs py-2 px-3 rounded-lg transition cursor-pointer ${s.slug === activeService.slug ? 'bg-blue-50/800 text-white font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: PROJECTS OVERVIEW */}
        {currentRoute === 'projects' && (
          <div className="py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <LuxuryProjectGallery onSelectProject={openProject} />
            </div>
          </div>
        )}

        {/* VIEW: PROJECT DETAIL */}
        {currentRoute === 'project-detail' && activeProject && (
          <div className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button 
                onClick={() => navigateTo('projects')} 
                className="inline-flex items-center gap-2 text-xs uppercase font-bold text-[#29295d] hover:text-[#1e1e4a] hover:underline mb-8 cursor-pointer"
              >
                ← Back to All Case Studies
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="badge-amber">{activeProject.sector}</span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs text-slate-700 font-semibold">{activeProject.location}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight">
                    {activeProject.title}
                  </h1>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 mb-8 shadow-xl">
                    <img 
                      src={activeProject.heroImage} 
                      alt={activeProject.title} 
                      className="w-full h-80 sm:h-96 object-cover" 
                    />
                  </div>

                  {activeProject.isPlaceholder && (
                    <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs mb-8">
                      <strong>Client Placeholder Notice:</strong> This project case study is prepared in accordance with the 
                      new client brief and is awaiting client photograph uploads and finalized scope verification.
                    </div>
                  )}

                  <div className="card-clean bg-white p-8 border border-slate-200 mb-8 space-y-3">
                    <h3 className="text-xl font-bold text-slate-950 mb-3">Project Overview</h3>
                    <p className="text-base text-slate-700 leading-relaxed">
                      {activeProject.summary}
                    </p>
                    {activeProject.value && (
                      <p className="text-sm text-[#1e1e4a] font-bold pt-2">
                        Contract Value / Investment: {activeProject.value}
                      </p>
                    )}
                    {activeProject.duration && (
                      <p className="text-sm text-slate-600">
                        Delivery Duration: {activeProject.duration}
                      </p>
                    )}
                  </div>

                  {/* Confirmed ZNB Scope of Works */}
                  <div className="card-clean bg-white p-8 border border-slate-200 mb-8">
                    <h3 className="text-xl font-bold text-slate-950 mb-6">Confirmed ZNB Scope of Works</h3>
                    <div className="space-y-3">
                      {activeProject.scopeOfWorks.map((scope, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#29295d] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{scope}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Metrics Table */}
                  <div className="card-clean bg-white p-8 border border-slate-200 mb-8">
                    <h3 className="text-xl font-bold text-slate-950 mb-6">Key Engineering & Project Facts</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {activeProject.technicalMetrics.map((metric, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="block text-xs uppercase text-slate-500 font-bold mb-1">{metric.label}</span>
                          <span className="text-base font-extrabold text-[#1e1e4a] font-mono-tech">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery */}
                  {activeProject.galleryImages.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-950 mb-4">Project Photography</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {activeProject.galleryImages.map((img, i) => (
                          <div key={i} className="h-44 rounded-xl overflow-hidden border border-slate-200">
                            <img src={img} alt="Project detail" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="card-clean bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-950 mb-3">Discuss Similar Projects</h4>
                    <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                      Looking to achieve similar speed and structural tolerances for your upcoming RC frame or slipform scheme?
                    </p>
                    <button onClick={() => navigateTo('contact')} className="btn-amber w-full py-3 text-xs uppercase tracking-wider font-bold mb-3">
                      Discuss Your Project
                    </button>
                    <a href={`tel:${COMPANY_PROFILE.contact.office}`} className="btn-secondary w-full py-3 text-xs flex items-center justify-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#29295d]" /> {COMPANY_PROFILE.contact.office}
                    </a>
                  </div>

                  <div className="card-clean bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Related Projects</h4>
                    <div className="flex flex-col gap-1.5">
                      {PROJECTS_DATA.filter(p => p.id !== activeProject.id).slice(0, 5).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => openProject(p.id)}
                          className="text-left text-xs py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50 transition flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate pr-2">{p.title}</span>
                          <span className="text-[10px] text-[#1e1e4a] font-bold shrink-0">{p.status}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: HEALTH & SAFETY */}
        {currentRoute === 'health-safety' && (
          <div className="py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto mb-16 text-center">
                <div className="badge-amber mb-3">Accreditation & Compliance</div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 mb-4">Health & Safety</h1>
                <p className="text-base sm:text-lg text-slate-600">
                  Uncompromising commitment to workforce wellbeing, CDM regulations, method statements, and SSIP accreditation.
                </p>
              </div>

              {/* Exact Preserved H&S Narrative */}
              <div className="card-clean bg-white p-8 sm:p-10 border border-slate-200 mb-12 space-y-4 text-slate-700 leading-relaxed text-base">
                <h3 className="text-2xl font-bold text-slate-950 mb-3">Our Safety Philosophy & Operative Standards</h3>
                <p>
                  ZNB Construction LTD takes the safety of our workers and other onsite personnel extremely seriously. 
                  All of our operatives are fully safety trained and use the required safety equipment when working on site, 
                  including high-visibility clothing, safety helmets, and steel toe-capped boots.
                </p>
                <p>
                  As an employer, we recognize that our duty of care to our employees is paramount. Because much of our work 
                  is conducted at height, all of our staff receive working-at-height training, alongside comprehensive manual 
                  handling and plant awareness certifications.
                </p>
                <p>
                  Method statements and risk assessments are carried out for every task undertaken. We work in full compliance 
                  with the latest Health and Safety Executive (HSE) standards and Tier-1 site induction protocols.
                </p>
              </div>

              {/* Verified Accreditations & Certificates */}
              <div className="card-clean bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 mb-12 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
                  <div>
                    <span className="badge-amber mb-2">Verified Documentation</span>
                    <h3 className="text-2xl font-bold text-slate-950">CHAS Accreditation & Compliance</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full font-bold">
                      Membership No.: 170693
                    </span>
                    <span className="text-xs bg-blue-50/80 text-[#1e1e4a] border border-blue-200 px-3.5 py-1.5 rounded-full font-bold">
                      SSIP Approved [CDM]
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Certificate 1 */}
                  <div className="card-clean bg-slate-50/70 p-7 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-8 h-8 text-[#29295d] shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-950 text-base">CHAS SSIP Certificate</h4>
                          <span className="text-xs text-slate-500">Classification: PUBLIC | SSIP Approved Contractor [CDM]</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                        Demonstrating compliance with CHAS standards in line with the requirements of SSIP Core Criteria and UK H&S Legislation.
                      </p>
                    </div>
                    <a 
                      href={COMPANY_PROFILE.accreditations.chasCertPath} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-secondary text-xs py-2.5 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-[#29295d]" /> View Verified Certificate (PDF)
                    </a>
                  </div>

                  {/* Certificate 2 */}
                  <div className="card-clean bg-slate-50/70 p-7 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-8 h-8 text-[#29295d] shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-950 text-base">Standard GB Certificate</h4>
                          <span className="text-xs text-slate-500">CHAS Standards Compliance Document</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                        Full compliance verification via SSIP Portal & Veriforce ONE audit databases.
                      </p>
                    </div>
                    <a 
                      href={COMPANY_PROFILE.accreditations.standardGbCertPath} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-secondary text-xs py-2.5 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-[#29295d]" /> View Verified Certificate (PDF)
                    </a>
                  </div>
                </div>
              </div>

              {/* Dedicated Awaiting Client Accreditation Placeholder Box */}
              <div className="p-8 rounded-2xl border border-dashed border-slate-300 text-center bg-slate-50/50">
                <h4 className="font-bold text-slate-800 text-sm mb-1">Additional Accreditations & Safety Badges</h4>
                <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
                  Space reserved for upcoming client-supplied certification badges and safety audit renewals. 
                  (Per brief guidelines: no unverified certificates or logos are fabricated).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: CAREERS */}
        {currentRoute === 'careers' && (
          <div className="py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto mb-16 text-center">
                <div className="badge-amber mb-3">Work With ZNB</div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 mb-4">Careers & Operatives</h1>
                <p className="text-base sm:text-lg text-slate-600">
                  Join our nationwide concrete and slipform teams. We recruit both dedicated construction operatives and commercial specialists.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
                {/* Operative Registration Form */}
                <div className="lg:col-span-7">
                  <div className="card-clean bg-white p-8 sm:p-10 border border-slate-200">
                    <div className="badge-amber mb-2">Trade Operative Enquiry</div>
                    <h2 className="text-2xl font-bold text-slate-950 mb-2">Register for Site Operative Work</h2>
                    <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                      We are continuously recruiting concrete finishers, steel fixers, shuttering carpenters, and site supervisors for upcoming UK packages.
                    </p>

                    {careerSuccess ? (
                      <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                        <h4 className="font-bold text-lg mb-1">Operative Application Received!</h4>
                        <p className="text-xs text-slate-600 max-w-md mx-auto">
                          Thank you for registering your details. Our site recruitment manager will contact you for upcoming assignments.
                        </p>
                        <button onClick={() => setCareerSuccess(false)} className="btn-secondary text-xs mt-4 py-2.5 px-5">
                          Submit Another Registration
                        </button>
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          setCareerSuccess(true);
                        }} 
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-600 mb-1">Full Name *</label>
                            <input required type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:border-amber-600 focus:bg-white focus:outline-none" />
                          </div>
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-600 mb-1">Phone Number *</label>
                            <input required type="tel" placeholder="+44 7..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:border-amber-600 focus:bg-white focus:outline-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-600 mb-1">Email Address *</label>
                            <input required type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:border-amber-600 focus:bg-white focus:outline-none" />
                          </div>
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-600 mb-1">Primary Trade / Role *</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:border-amber-600 focus:bg-white focus:outline-none">
                              <option>Concrete Finisher / Power Float</option>
                              <option>Steel Fixer (Reinforcement)</option>
                              <option>Shuttering Carpenter (Formwork)</option>
                              <option>Site Supervisor (SSSTS / SMSTS)</option>
                              <option>Boom Pump / Plant Operator</option>
                              <option>General Groundworks Operative</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-600 mb-1">CSCS Card Status</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:border-amber-600 focus:bg-white focus:outline-none">
                              <option>CSCS Blue / Skilled Worker</option>
                              <option>CSCS Gold / Supervisor</option>
                              <option>CSCS Green / Labourer</option>
                              <option>CPCS / NPORS Plant Operator</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-600 mb-1">Years of Experience</label>
                            <input type="text" placeholder="e.g. 5 Years" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:border-amber-600 focus:bg-white focus:outline-none" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-bold text-slate-600 mb-1">Upload CV / Certifications</label>
                          <input type="file" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800" />
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-bold text-slate-600 mb-1">Message / Current Location</label>
                          <textarea rows={3} placeholder="Tell us your availability, transport, and recent projects..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:border-amber-600 focus:bg-white focus:outline-none" />
                        </div>

                        <button type="submit" className="btn-amber w-full py-4 text-sm uppercase tracking-wider font-bold">
                          Submit Operative Registration
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Legacy Preserved Vacancies */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="badge-amber mb-2">Preserved Existing Job Listings</div>
                  <h3 className="text-xl font-bold text-slate-950 mb-4">Historical / General Vacancies</h3>

                  {JOB_LISTINGS.map((job) => (
                    <div key={job.id} className="card-clean bg-white p-7 border border-slate-200">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-base text-slate-900">{job.title}</h4>
                        <span className="text-[10px] bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded font-bold">
                          {job.employmentType}
                        </span>
                      </div>
                      <div className="text-xs text-[#1e1e4a] font-bold mb-3">
                        {job.salary} • {job.training}
                      </div>

                      <div className="text-xs text-slate-600 mb-3 space-y-1">
                        <strong className="text-slate-800">Requirements:</strong>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                          {job.requirements.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <strong className="text-slate-800">Responsibilities:</strong>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                          {job.responsibilities.slice(0, 3).map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: CONTACT */}
        {currentRoute === 'contact' && (
          <div className="py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto mb-16 text-center">
                <div className="badge-amber mb-3">Get In Touch</div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 mb-4">Contact & Quotations</h1>
                <p className="text-base sm:text-lg text-slate-600">
                  Submit tender drawings, request package estimates, or reach our operational management team.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
                {/* Contact Information Cards */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="card-clean bg-white p-7 border border-slate-200 space-y-4 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-950 mb-2">Company Information</h3>
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <MapPin className="w-5 h-5 text-[#29295d] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Head Office:</strong>
                        <p>{COMPANY_PROFILE.contact.address.line1}, {COMPANY_PROFILE.contact.address.city}, {COMPANY_PROFILE.contact.address.postcode}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Phone className="w-5 h-5 text-[#29295d] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Main Office:</strong>
                        <p><a href={`tel:${COMPANY_PROFILE.contact.office}`} className="hover:text-[#29295d] font-semibold">{COMPANY_PROFILE.contact.office}</a></p>
                        <strong className="text-slate-900">Direct Mobile:</strong>
                        <p><a href={`tel:${COMPANY_PROFILE.contact.mobile}`} className="hover:text-[#29295d] font-semibold">{COMPANY_PROFILE.contact.mobile}</a></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Mail className="w-5 h-5 text-[#29295d] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Email Enquiries:</strong>
                        <p><a href={`mailto:${COMPANY_PROFILE.contact.email}`} className="hover:text-[#29295d] font-semibold">{COMPANY_PROFILE.contact.email}</a></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Clock className="w-5 h-5 text-[#29295d] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Hours of Operation:</strong>
                        <p>Monday – Friday: 07:00 – 18:00</p>
                        <p className="text-xs text-slate-500">Weekend On-Call for Active Site Pours</p>
                      </div>
                    </div>
                  </div>

                  {/* Conflict Documentation & Emergency Box */}
                  <div className="card-clean bg-blue-50/80/70 p-7 border border-blue-300">
                    <div className="flex items-center gap-2 text-[#1e1e4a] font-bold text-sm mb-2">
                      <AlertTriangle className="w-4 h-4 text-[#29295d]" /> 24/7 "Save a Slab" Emergency Hotline
                    </div>
                    <p className="text-xs text-slate-700 mb-4 leading-relaxed">
                      For rapid on-site troubleshooting, cold joint mitigation, and emergency pouring assistance:
                    </p>
                    <a 
                      href={`tel:${COMPANY_PROFILE.contact.legacyEmergencyMobile}`} 
                      className="block text-center font-bold text-lg text-[#0f172a] bg-blue-200/70 py-3 rounded-xl border border-blue-300 hover:bg-blue-200 transition"
                    >
                      {COMPANY_PROFILE.contact.legacyEmergencyMobile}
                    </a>
                    <span className="block text-[11px] text-slate-500 mt-2 text-center">
                      (Preserved legacy emergency contact number pending client confirmation)
                    </span>
                  </div>

                  <div className="card-clean bg-white p-6 border border-slate-200">
                    <h4 className="font-bold text-slate-950 text-sm mb-2">Connect on LinkedIn</h4>
                    <p className="text-xs text-slate-500 mb-4">Follow project milestones and active high-rise core slips.</p>
                    <a 
                      href={COMPANY_PROFILE.contact.linkedin} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn-secondary w-full py-2.5 text-xs flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 fill-current text-[#29295d]" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      <span>ZNB Construction LinkedIn</span>
                    </a>
                  </div>
                </div>

                {/* Quotation & Enquiry Form */}
                <div className="lg:col-span-7">
                  <div className="card-clean bg-white p-8 border border-slate-200">
                    <div className="badge-amber mb-2">Commercial & Technical Tenders</div>
                    <h2 className="text-2xl font-bold text-slate-950 mb-2">Request a Quote / Discuss Your Project</h2>
                    <p className="text-xs text-slate-600 mb-6">
                      Upload project schedules, general arrangement drawings, or bill of quantities for our estimating team.
                    </p>

                    {quoteSuccess ? (
                      <div className="p-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-center">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                        <h4 className="font-bold text-xl mb-2">Quotation Request Dispatched!</h4>
                        <p className="text-sm text-slate-600 max-w-md mx-auto">
                          Thank you for submitting your project requirements. Our estimating department will review your specifications and be in touch within 24 hours.
                        </p>
                        <button onClick={() => setQuoteSuccess(false)} className="btn-secondary text-xs mt-6 py-2.5 px-6">
                          Send Another Enquiry
                        </button>
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          setQuoteSuccess(true);
                        }} 
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Your Name *</label>
                            <input required type="text" placeholder="John Smith" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:border-gold focus:outline-none" />
                          </div>
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Company Name *</label>
                            <input required type="text" placeholder="Main Contracting Ltd" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:border-gold focus:outline-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Email Address *</label>
                            <input required type="email" placeholder="john@contractor.co.uk" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:border-gold focus:outline-none" />
                          </div>
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Telephone Number *</label>
                            <input required type="tel" placeholder="0161 ..." className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:border-gold focus:outline-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Required Service Package *</label>
                            <select className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:border-gold focus:outline-none">
                              <option>Full Slipform Package</option>
                              <option>Reinforced Concrete Frame</option>
                              <option>Formwork and Shuttering</option>
                              <option>Steel Fixing Package</option>
                              <option>Concrete Placing & Finishing</option>
                              <option>Groundworks & Foundations</option>
                              <option>Urgent Concrete Repairs / Save a Slab</option>
                              <option>Skilled Labour / Operative Supply</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Project Location *</label>
                            <input required type="text" placeholder="e.g. Manchester, London, Leeds" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:border-gold focus:outline-none" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Attach Project Drawings / BoQ (PDF, DWG, ZIP)</label>
                          <input type="file" className="w-full bg-slate-50/80 border border-slate-200 rounded-lg p-2 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#29295d] file:text-navy-950 hover:file:bg-amber-400" />
                          <span className="block text-[11px] text-slate-500 mt-1">Up to 25MB file size supported.</span>
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Project Scope & Programme Details *</label>
                          <textarea 
                            required 
                            rows={4} 
                            value={quoteScopeMessage}
                            onChange={(e) => setQuoteScopeMessage(e.target.value)}
                            placeholder="Please provide details of concrete volume, slab depths, core heights, anticipated start dates, or specific programme requirements..." 
                            className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:border-gold focus:outline-none" 
                          />
                        </div>

                        <div className="flex items-start gap-2 pt-2">
                          <input required type="checkbox" id="consent" className="mt-1 rounded border-white/20 text-[#29295d] focus:ring-0" />
                          <label htmlFor="consent" className="text-xs text-slate-500">
                            I consent to ZNB Construction Ltd holding my details to respond to this commercial enquiry in accordance with standard privacy regulations.
                          </label>
                        </div>

                        <button type="submit" className="btn-primary w-full py-4 text-sm uppercase tracking-wider font-bold">
                          Submit Quotation Request <Send className="w-4 h-4 ml-2" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Comprehensive Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/znb-logo.jpg" alt="ZNB Logo" className="h-10 w-auto rounded border border-slate-800" />
              <div>
                <span className="block font-bold text-white text-base">ZNB CONSTRUCTION LTD</span>
                <span className="block text-[10px] uppercase text-[#3b82f6] tracking-widest font-semibold">Established 2013 • Nationwide UK</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-sm">
              Manchester-based specialist delivering turnkey slipform packages, reinforced concrete works, 
              formwork, reinforcement fixing, concrete finishing, and skilled site operatives nationwide.
            </p>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
                CHAS SSIP 170693
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
                Family-Run Business
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Specialist Services</h4>
            <ul className="space-y-2">
              {SERVICES_DATA.slice(0, 5).map(s => (
                <li key={s.id}>
                  <button onClick={() => openService(s.slug)} className="hover:text-[#60a5fa] transition text-left text-slate-400 cursor-pointer">
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => navigateTo('services')} className="text-[#3b82f6] font-bold hover:underline cursor-pointer">
                  View All 8 Categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigateTo('about')} className="hover:text-[#60a5fa] transition text-slate-400 cursor-pointer">About Us</button></li>
              <li><button onClick={() => navigateTo('team')} className="hover:text-[#60a5fa] transition text-slate-400 cursor-pointer">Our Management Team</button></li>
              <li><button onClick={() => navigateTo('projects')} className="hover:text-[#60a5fa] transition text-slate-400 cursor-pointer">Case Studies Archive</button></li>
              <li><button onClick={() => navigateTo('health-safety')} className="hover:text-[#60a5fa] transition text-slate-400 cursor-pointer">Health & Safety Policy</button></li>
              <li><button onClick={() => navigateTo('careers')} className="hover:text-[#60a5fa] transition text-slate-400 cursor-pointer">Careers & Operatives</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-[#60a5fa] transition text-slate-400 cursor-pointer">Contact & Quotations</button></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Head Office</h4>
            <address className="not-italic space-y-2 text-slate-400">
              <p>{COMPANY_PROFILE.contact.address.line1}</p>
              <p>{COMPANY_PROFILE.contact.address.city}, {COMPANY_PROFILE.contact.address.postcode}</p>
              <p className="pt-2 text-white font-semibold">
                Tel: <a href={`tel:${COMPANY_PROFILE.contact.office}`} className="hover:text-[#60a5fa]">{COMPANY_PROFILE.contact.office}</a>
              </p>
              <p className="text-white font-semibold">
                Mobile: <a href={`tel:${COMPANY_PROFILE.contact.mobile}`} className="hover:text-[#60a5fa]">{COMPANY_PROFILE.contact.mobile}</a>
              </p>
              <p className="text-[#60a5fa] font-semibold pt-1">
                Emergency: <a href={`tel:${COMPANY_PROFILE.contact.legacyEmergencyMobile}`} className="hover:underline">{COMPANY_PROFILE.contact.legacyEmergencyMobile}</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} ZNB Construction Ltd. All rights reserved. Registered in England & Wales.</p>
          <div className="flex items-center gap-6">
            <a href={COMPANY_PROFILE.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#60a5fa]">
              LinkedIn
            </a>
            <button onClick={() => navigateTo('health-safety')} className="hover:text-[#60a5fa] cursor-pointer">
              HSE Compliance
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-[#60a5fa] cursor-pointer">
              Privacy & Cookies
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
