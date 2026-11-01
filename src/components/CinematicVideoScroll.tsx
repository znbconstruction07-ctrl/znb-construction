import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, Sparkles } from 'lucide-react';

interface CinematicVideoScrollProps {
  totalFrames?: number;
  onExploreClick?: () => void;
}

export const CinematicVideoScroll: React.FC<CinematicVideoScrollProps> = ({
  totalFrames = 220,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  const animationFrameId = useRef<number | null>(null);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnImageRef = useRef<HTMLImageElement | null>(null);

  // Progressive frame preloading with robust error resilience
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(totalFrames).fill(null);
    let count = 0;

    // Load first frame immediately to paint instantly on page open
    const firstImg = new Image();
    firstImg.src = `/frames/frame_000.webp`;
    firstImg.onload = () => {
      if (!isCancelled) {
        imagesRef.current[0] = firstImg;
        lastDrawnImageRef.current = firstImg;
        count++;
        setLoadedCount(count);
        setIsLoaded(true);
        drawFrame(0);
      }
    };

    // Staggered loading: load every 2nd keyframe first, then the remaining frames
    const keyframes: number[] = [];
    const inBetweenFrames: number[] = [];

    for (let i = 1; i < totalFrames; i++) {
      if (i % 2 === 0) {
        keyframes.push(i);
      } else {
        inBetweenFrames.push(i);
      }
    }

    const loadBatch = (indices: number[], onDone?: () => void) => {
      let loadedInBatch = 0;
      if (indices.length === 0) {
        onDone?.();
        return;
      }
      indices.forEach((index) => {
        const img = new Image();
        img.src = `/frames/frame_${String(index).padStart(3, '0')}.webp`;
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            count++;
            setLoadedCount(count);
            loadedInBatch++;
            if (count >= 8) {
              setIsLoaded(true);
            }
            if (loadedInBatch === indices.length) {
              onDone?.();
            }
          }
        };
        img.onerror = () => {
          loadedInBatch++;
          if (loadedInBatch === indices.length) {
            onDone?.();
          }
        };
      });
    };

    // Fast priority load of keyframes, then complete set
    loadBatch(keyframes, () => {
      if (!isCancelled) {
        loadBatch(inBetweenFrames);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [totalFrames]);

  // Robust canvas drawing with DPR scaling and guaranteed fallback image
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Find requested frame or the nearest loaded frame
    let img: HTMLImageElement | null = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Search outward for closest available frame
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = frameIndex - offset;
        if (prev >= 0 && imagesRef.current[prev]?.complete && imagesRef.current[prev]!.naturalWidth > 0) {
          img = imagesRef.current[prev];
          break;
        }
        const next = frameIndex + offset;
        if (next < totalFrames && imagesRef.current[next]?.complete && imagesRef.current[next]!.naturalWidth > 0) {
          img = imagesRef.current[next];
          break;
        }
      }
    }

    // Ultimate fallback: never clear canvas or draw blue void; reuse last painted image
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = lastDrawnImageRef.current;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

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
    lastDrawnImageRef.current = img;
  };

  // High-performance RAF lerp loop (interpolates targetFrame smoothly)
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      // Smooth interpolation towards target frame
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.2);
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
      const navbarOffset = 80; // height of sticky h-20 navbar
      const effectiveViewportHeight = window.innerHeight - navbarOffset;
      const totalScrollable = rect.height - effectiveViewportHeight;

      if (totalScrollable <= 0) return;

      // Scrolled distance from when container top meets the bottom of navbar
      const scrolled = navbarOffset - rect.top;
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

  // Stage narrative copy reflecting the 3 engineering milestones
  const getStageContent = () => {
    if (currentProgress < 0.35) {
      return {
        badge: 'ENGINEERING EXCELLENCE • UK-WIDE',
        title: 'PRECISION CONCRETE & SLIPFORM',
        subtitle: 'Turnkey vertical core installations delivered with micron-level tolerance.',
        step: '01 / RIG SETUP & COMMENCEMENT',
      };
    } else if (currentProgress < 0.75) {
      return {
        badge: 'HIGH-TOLERANCE MONOLITHIC CORES',
        title: 'CONTINUOUS 24/7 HYDRAULIC CLIMB',
        subtitle: 'Climbing up to 50 storeys at 4–5m per day with continuous laser alignment.',
        step: '02 / ELEVATION & HYDRAULICS',
      };
    } else {
      return {
        badge: 'NATIONWIDE TIER-1 DELIVERY',
        title: 'SPEED, SAFETY & FIRST-TIME ACCURACY',
        subtitle: 'Eliminating cold-joints, accelerating delivery, and achieving zero-harm standards.',
        step: '03 / TOP OUT & MONOLITHIC FINISH',
      };
    }
  };

  const stage = getStageContent();

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#1e2338]"
      style={{ height: '240vh' }}
    >
      {/* Sticky Fullscreen Player: pinned cleanly directly below the 80px (h-20) main navbar */}
      <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden flex items-center justify-center bg-[#1e2338] z-20">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
        />

        {/* Top HUD: Status Bar */}
        <div className="absolute top-6 sm:top-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-none z-30">
          <div className="flex items-center gap-3 bg-[#1e2338]/85 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/20 text-xs text-slate-200 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] animate-pulse" />
            <span className="font-mono-tech tracking-wider uppercase font-semibold text-[11px] text-[#93c5fd]">
              Slipform Engineering Sequence
            </span>
          </div>

          <div className="flex items-center gap-3 bg-[#1e2338]/85 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/20 text-xs text-slate-200 shadow-xl font-mono-tech">
            <span className="text-slate-300">{stage.step}</span>
            <span className="text-slate-500">|</span>
            <span className="text-[#93c5fd] font-bold">{Math.round(currentProgress * 100)}% SCROLLED</span>
          </div>
        </div>

        {/* Compact Right-Aligned Overlay Card */}
        <div className="absolute bottom-8 right-4 sm:right-8 md:right-12 z-30 pointer-events-none max-w-sm sm:max-w-md w-full">
          <div className="bg-[#1e2338]/90 backdrop-blur-xl border border-blue-400/25 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-amber text-[10px]">
                <Sparkles className="w-3 h-3 text-[#3b82f6]" />
                {stage.badge}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight uppercase leading-snug mb-1.5">
              {stage.title}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-normal">
              {stage.subtitle}
            </p>

            {/* Scrub Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                <span className="flex items-center gap-1.5 text-[#93c5fd] font-semibold">
                  <Play className="w-3 h-3 fill-[#93c5fd] text-[#93c5fd]" /> Frame-by-frame scrub
                </span>
                <span>{Math.round(currentFrameRef.current) + 1} / {totalFrames}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#29295d] via-[#3b82f6] to-[#60a5fa] transition-all duration-75 rounded-full"
                  style={{ width: `${Math.max(4, currentProgress * 100)}%` }}
                />
              </div>

              {onExploreClick && (
                <div className="pt-2 pointer-events-auto flex items-center justify-between">
                  <button
                    onClick={onExploreClick}
                    className="text-xs uppercase font-bold text-[#93c5fd] hover:text-white transition flex items-center gap-1.5 cursor-pointer font-mono-tech"
                  >
                    <span>View Completed Projects</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-widest text-slate-300 pointer-events-none z-30 animate-bounce">
          <ArrowDown className="w-3.5 h-3.5 text-[#93c5fd]" />
          <span>Scroll down to advance build</span>
        </div>

        {/* Preload Status Indicator */}
        {!isLoaded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e2338]/95 backdrop-blur-md border border-blue-400/25 px-6 py-4 rounded-2xl flex items-center gap-3 z-40 shadow-2xl">
            <div className="w-5 h-5 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white block">Buffering Full Slipform Sequence</span>
              <span className="text-[11px] text-slate-400 font-mono-tech">
                {Math.round((loadedCount / totalFrames) * 100)}% preloaded
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
