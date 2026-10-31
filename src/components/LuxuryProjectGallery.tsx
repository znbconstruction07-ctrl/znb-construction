import { useState } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  SlidersHorizontal
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/siteData';
import type { CaseStudy } from '../data/siteData';

export const LuxuryProjectGallery: React.FC<{ onSelectProject: (id: string) => void }> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Completed' | 'Current'>('All');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.status === activeFilter);

  return (
    <div className="space-y-12">
      {/* Interactive Before / After Engineering Split Slider */}
      <div className="card-clean p-6 md:p-8 bg-white border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <span className="badge-amber mb-2">Technical Case Study Visualizer</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">
              Precision Engineering: Steel Rig vs Finished Superstructure
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mt-1">
              Drag horizontally to inspect high-tolerance slipform reinforcement fixing versus completed residential towers.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" /> Drag to inspect
          </div>
        </div>

        {/* Split Image Canvas */}
        <div className="relative h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden select-none border border-slate-200 shadow-sm">
          {/* Base Image: Superstructure (X1 Media City Towers) */}
          <img 
            src="/assets/x1-1024x777.jpg" 
            alt="Completed Twin Towers" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white">
            Finished Superstructure (550 Units)
          </div>

          {/* Overlay Image: Slipform Rig & Steel Fixing clipped by slider */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src="/assets/page_2_asset_1.jpg" 
              alt="Slipform Steelwork In-Progress" 
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '1000px' }}
            />
            <div className="absolute top-4 left-4 bg-amber-600/90 backdrop-blur px-3 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white">
              Slipform Climbing Stage
            </div>
          </div>

          {/* Draggable Divider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 cursor-ew-resize flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-md border-2 border-slate-900 flex items-center justify-center -ml-3.5">
              <span className="text-[10px] font-bold text-slate-900">⇄</span>
            </div>
          </div>

          {/* Invisible interactive range input covering the slider */}
          <input 
            type="range" 
            min="5" 
            max="95" 
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            aria-label="Engineering progress comparison slider"
          />
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 font-mono mt-3 px-1">
          <span>◀ In-Progress Slipform Rig</span>
          <span>Completed Towers ▶</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div>
          <h3 className="text-xl font-bold text-slate-950">Major Works Portfolio</h3>
          <p className="text-xs text-slate-500">Tier-1 commercial, residential, education and civil contracts across the UK.</p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200 self-start sm:self-auto">
          {(['All', 'Completed', 'Current'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeFilter === filter 
                  ? 'bg-white text-slate-950 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              {filter} Projects ({filter === 'All' ? PROJECTS_DATA.length : PROJECTS_DATA.filter(p => p.status === filter).length})
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Minimal Architectural Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project: CaseStudy) => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="card-clean group cursor-pointer flex flex-col bg-white"
          >
            {/* Card Hero Image */}
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img 
                src={project.heroImage} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase ${
                  project.status === 'Completed' 
                    ? 'bg-white/95 text-slate-950 shadow-xs' 
                    : 'bg-amber-500 text-white shadow-xs'
                }`}>
                  {project.status}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] font-mono text-slate-200 block truncate">{project.client}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{project.location}</span>
                </div>

                <h4 className="text-lg font-bold text-slate-950 group-hover:text-amber-700 transition line-clamp-1 mb-2">
                  {project.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {project.summary}
                </p>
              </div>

              <div>
                {/* Technical Metric pill */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 mb-4 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500">{project.duration || project.sector}</span>
                  <span className="font-semibold text-slate-900">{project.technicalMetrics[0]?.value || 'Turnkey Package'}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-amber-700">
                  <span>View Full Technical Specification</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
