import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, Play, Sparkles } from 'lucide-react';

interface CinematicVideoScrollProps {
  totalFrames?: number;
  onExploreClick?: () => void;
}

export const CinematicVideoScroll: React.FC<CinematicVideoScrollProps> = ({
  totalFrames = 120,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);

  // Preload frames in high quality
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    let count = 0;

    // Load first frame immediately to display instant hero
    const firstImg = new Image();
    firstImg.src = `/frames/frame_000.webp`;
    firstImg.onload = () => {
      if (!isCancelled) {
        images[0] = firstImg;
        imagesRef.current = images;
        setLoadedCount(1);
        renderFrame(0);
      }
    };

    // Preload remaining frames
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(3, '0')}.webp`;
      img.onload = () => {
        if (!isCancelled) {
          images[i] = img;
          count++;
          setLoadedCount(count);
          if (count >= Math.min(25, totalFrames)) {
            setIsLoaded(true);
          }
        }
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [totalFrames]);

  // High-fidelity responsive canvas drawing with crisp DPI scaling
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex] || imagesRef.current[0];
    if (!img || !img.complete) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Cover calculation to ensure cinematic full bleed
    const canvasRatio = rect.width / rect.height;
    const imgRatio = img.width / img.height;
    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Smooth lerp loop for ultra-fluid 60FPS scroll scrubbing (no stutter)
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      // Lerp toward target frame smoothly
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.14);
      const rounded = Math.round(currentFrameRef.current);
      const safeIndex = Math.max(0, Math.min(totalFrames - 1, rounded));

      renderFrame(safeIndex);

      animationFrameId.current = requestAnimationFrame(tick);
    };

    animationFrameId.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [renderFrame, totalFrames]);

  // Window scroll handler mapped to video scrub progress
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      setCurrentProgress(progress);
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [totalFrames]);

  // Calculate dynamic overlay narrative based on scrub stage
  const getStageContent = () => {
    if (currentProgress < 0.28) {
      return {
        badge: 'ENGINEERING EXCELLENCE • UK-WIDE',
        title: 'PRECISION CONCRETE & SLIPFORM',
        subtitle: 'Watch our vertical core systems rise in synchronized engineering precision.',
        step: '01 / INITIATION',
      };
    } else if (currentProgress < 0.65) {
      return {
        badge: 'HIGH-TOLERANCE MONOLITHIC CORES',
        title: 'CONTINUOUS 24/7 HYDRAULIC SLIPFORM',
        subtitle: 'Climbing up to 50 floors with sub-millimeter laser verticality controls.',
        step: '02 / ELEVATION',
      };
    } else {
      return {
        badge: 'NATIONWIDE TIER-1 DELIVERY',
        title: 'SPEED, SAFETY & FIRST-TIME ACCURACY',
        subtitle: 'Eliminating joints, compressing critical-path programmes, delivering zero-harm standards.',
        step: '03 / COMPLETION',
      };
    }
  };

  const stage = getStageContent();

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-slate-950"
      style={{ height: '320vh' }} // Extended height gives buttery smooth scroll control
    >
      {/* Sticky Fullscreen Frame Player */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
          style={{ filter: 'contrast(1.05) brightness(0.96)' }}
        />

        {/* Ambient Vignette & Cinema Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        <div className="absolute inset-0 pointer-events-none bg-radial-[at_center] from-transparent via-transparent to-slate-950/80" />

        {/* Top HUD: Status Bar */}
        <div className="absolute top-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-3 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 text-xs text-slate-300 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono-tech tracking-wider uppercase font-semibold text-[11px] text-amber-400">
              Interactive 4K Cinema Scrub
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 text-xs text-slate-300 shadow-xl font-mono-tech">
            <span className="text-slate-500">{stage.step}</span>
            <span className="text-slate-700">|</span>
            <span className="text-amber-400 font-bold">{Math.round(currentProgress * 100)}% SCROLLED</span>
          </div>
        </div>

        {/* Center / Lower Cinematic Narrative Card */}
        <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 pointer-events-none">
          <div className="max-w-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Ambient accent glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-3">
              <span className="badge-amber text-[10px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {stage.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight mb-2">
              {stage.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              {stage.subtitle}
            </p>

            {/* Scrub Progress Bar & Quick Action */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Play className="w-3 h-3 fill-amber-400 text-amber-400" /> Scroll down to sequence
                </span>
                <span>Frame {Math.round(currentFrameRef.current) + 1} / {totalFrames}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 transition-all duration-75 rounded-full"
                  style={{ width: `${Math.max(2, currentProgress * 100)}%` }}
                />
              </div>

              {onExploreClick && (
                <div className="pt-2 pointer-events-auto flex items-center justify-between">
                  <button
                    onClick={onExploreClick}
                    className="text-xs uppercase font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer font-mono-tech"
                  >
                    <span>Explore Case Studies & Slipform Data</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-widest text-slate-400 pointer-events-none z-20 animate-bounce">
          <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
          <span>Scroll to explore</span>
        </div>

        {/* Loading Pill Indicator */}
        {!isLoaded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-6 py-4 rounded-2xl flex items-center gap-3 z-30 shadow-2xl">
            <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white block">Buffering Enhanced 4K Frames</span>
              <span className="text-[11px] text-slate-400 font-mono-tech">
                {Math.round((loadedCount / totalFrames) * 100)}% loaded
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
