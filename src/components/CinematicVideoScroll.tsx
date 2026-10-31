import React, { useEffect, useRef, useState } from 'react';
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
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  const animationFrameId = useRef<number | null>(null);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);

  // Preload frames in high quality
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = `/frames/frame_000.webp`;
    firstImg.onload = () => {
      if (!isCancelled) {
        imagesRef.current[0] = firstImg;
        count++;
        setLoadedCount(count);
        setIsLoaded(true);
        drawFrame(0);
      }
    };

    // Preload remaining frames concurrently
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(3, '0')}.webp`;
      img.onload = () => {
        if (!isCancelled) {
          imagesRef.current[i] = img;
          count++;
          setLoadedCount(count);
          if (count >= 15) {
            setIsLoaded(true);
          }
        }
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [totalFrames]);

  // Robust canvas drawing
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Find requested frame or the closest loaded frame
    let img: HTMLImageElement | null = imagesRef.current[frameIndex];
    if (!img || !img.complete) {
      // Find nearest loaded frame backward
      for (let f = frameIndex - 1; f >= 0; f--) {
        if (imagesRef.current[f]?.complete) {
          img = imagesRef.current[f];
          break;
        }
      }
      // If still none, find nearest forward
      if (!img || !img.complete) {
        for (let f = frameIndex + 1; f < totalFrames; f++) {
          if (imagesRef.current[f]?.complete) {
            img = imagesRef.current[f];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Canvas coordinate dimensions
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Cover calculation
    const canvasRatio = width / height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
    lastDrawnFrameRef.current = frameIndex;
  };

  // High-performance RAF lerp render loop
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      // Smooth interpolation towards target frame
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.16);
      const targetIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(currentFrameRef.current)));

      drawFrame(targetIndex);

      animationFrameId.current = requestAnimationFrame(tick);
    };

    animationFrameId.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [totalFrames]);

  // Viewport scroll measurement
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress from 0 (top of section enters) to 1 (reaches bottom of section)
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

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

  // Stage narrative copy
  const getStageContent = () => {
    if (currentProgress < 0.3) {
      return {
        badge: 'ENGINEERING EXCELLENCE • UK-WIDE',
        title: 'PRECISION CONCRETE & SLIPFORM',
        subtitle: 'Turnkey vertical core installations delivered with micron-level tolerance.',
        step: '01 / INITIATION',
      };
    } else if (currentProgress < 0.68) {
      return {
        badge: 'HIGH-TOLERANCE MONOLITHIC CORES',
        title: 'CONTINUOUS 24/7 HYDRAULIC CLIMB',
        subtitle: 'Climbing up to 50 storeys at 4–5m per day with continuous laser alignment.',
        step: '02 / ELEVATION',
      };
    } else {
      return {
        badge: 'NATIONWIDE TIER-1 DELIVERY',
        title: 'SPEED, SAFETY & FIRST-TIME ACCURACY',
        subtitle: 'Eliminating cold-joints, accelerating delivery, and achieving zero-harm standards.',
        step: '03 / COMPLETION',
      };
    }
  };

  const stage = getStageContent();

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-slate-950"
      style={{ height: '280vh' }}
    >
      {/* Sticky Fullscreen Frame Player: stays pinned until scroll completes */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950 z-20">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
          style={{ filter: 'contrast(1.04) brightness(0.98)' }}
        />

        {/* Ambient Vignette & Cinema Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        <div className="absolute inset-0 pointer-events-none bg-radial-[at_center] from-transparent via-transparent to-slate-950/75" />

        {/* Top HUD: Status Bar */}
        <div className="absolute top-24 sm:top-28 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-none z-30">
          <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 text-xs text-slate-300 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono-tech tracking-wider uppercase font-semibold text-[11px] text-amber-400">
              Interactive Slipform Sequence
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 text-xs text-slate-300 shadow-xl font-mono-tech">
            <span className="text-slate-500">{stage.step}</span>
            <span className="text-slate-700">|</span>
            <span className="text-amber-400 font-bold">{Math.round(currentProgress * 100)}% SCROLLED</span>
          </div>
        </div>

        {/* Center / Lower Cinematic Narrative Card */}
        <div className="absolute bottom-10 sm:bottom-14 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-30 pointer-events-none">
          <div className="max-w-2xl bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
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
                  style={{ width: `${Math.max(3, currentProgress * 100)}%` }}
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
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-widest text-slate-400 pointer-events-none z-30 animate-bounce">
          <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
          <span>Scroll to explore</span>
        </div>

        {/* Loading Pill Indicator */}
        {!isLoaded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950/95 backdrop-blur-md border border-slate-800 px-6 py-4 rounded-2xl flex items-center gap-3 z-40 shadow-2xl">
            <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white block">Loading Ultra-HD Slipform Sequence</span>
              <span className="text-[11px] text-slate-400 font-mono-tech">
                {Math.round((loadedCount / totalFrames) * 100)}% buffered
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
