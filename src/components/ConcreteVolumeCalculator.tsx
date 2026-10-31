import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ConcreteVolumeCalculator: React.FC<{ onApplyToQuote?: (scope: string) => void }> = ({ onApplyToQuote }) => {
  const [length, setLength] = useState<number>(30);
  const [width, setWidth] = useState<number>(15);
  const [depth, setDepth] = useState<number>(0.25);
  const [wasteFactor, setWasteFactor] = useState<number>(5); // 5%
  const [structureType, setStructureType] = useState<string>('Slab / Ground Floor');

  const rawVolume = length * width * depth;
  const totalVolume = Math.round((rawVolume * (1 + wasteFactor / 100)) * 10) / 10;
  const approximateTruckloads = Math.ceil(totalVolume / 7.5); // avg 7.5m3 per mixer truck

  const handleApply = () => {
    if (onApplyToQuote) {
      onApplyToQuote(
        `${structureType}: ${length}m x ${width}m x ${depth}m (Est. Concrete Volume: ${totalVolume} m³ / ~${approximateTruckloads} mixer truckloads)`
      );
    }
  };

  return (
    <div className="card-clean p-6 md:p-8 bg-white border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="badge-blue mb-2">Interactive Estimator</span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-950 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Concrete Volume & Mixer Logistics Estimator
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Calculate estimated cubic metres (m³) and recommended pump logistics for your upcoming pour.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center sm:text-right shrink-0">
          <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Estimated Concrete Volume</span>
          <span className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight">{totalVolume} m³</span>
          <span className="block text-[11px] text-slate-500 mt-0.5">Approx. {approximateTruckloads} mixer truckloads ({wasteFactor}% margin)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Structure Type</label>
          <select
            value={structureType}
            onChange={(e) => setStructureType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          >
            <option>Slab / Ground Floor</option>
            <option>Slipform Core Wall</option>
            <option>Columns & Beams</option>
            <option>Foundation Raft</option>
            <option>Pavement / Yard</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Length (m)</label>
          <input
            type="number"
            min="1"
            max="500"
            step="0.5"
            value={length}
            onChange={(e) => setLength(Math.max(0.1, Number(e.target.value)))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Width / Perimeter (m)</label>
          <input
            type="number"
            min="1"
            max="500"
            step="0.5"
            value={width}
            onChange={(e) => setWidth(Math.max(0.1, Number(e.target.value)))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Depth / Thickness (m)</label>
          <input
            type="number"
            min="0.05"
            max="5"
            step="0.05"
            value={depth}
            onChange={(e) => setDepth(Math.max(0.01, Number(e.target.value)))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Waste / Margin (%)</label>
          <select
            value={wasteFactor}
            onChange={(e) => setWasteFactor(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          >
            <option value={0}>0% (Exact)</option>
            <option value={3}>3% (Paved)</option>
            <option value={5}>5% (Standard UK Recommended)</option>
            <option value={10}>10% (Irregular / Excavated Ground)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Includes pump washout contingency calculation and Tier-1 standard site allowance.</span>
        </div>

        {onApplyToQuote && (
          <button
            onClick={handleApply}
            className="btn-blue w-full sm:w-auto py-2.5 px-6 text-xs font-semibold"
          >
            Transfer to Quotation Request <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};
