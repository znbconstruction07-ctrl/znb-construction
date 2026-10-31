import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, Sparkles } from 'lucide-react';

interface CinematicVideoScrollProps {
  totalFrames?: number;
  onExploreClick?: () => void;
}

export const CinematicVideoScroll: React.FC<CinematicVideoScrollProps> = ({
  totalFrames = 240,
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

  // Progressive frame preloading: load initial batch rapidly, then stream remaining frames
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    // Load first keyframe immediately to paint canvas without delay
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

    // Staggered loading: load every 4th frame first for instantaneous scrubbing responsiveness
    const priorityIndices: number[] = [];
    const regularIndices: number[] = [];

    for (let i = 1; i < totalFrames; i++) {
      if (i % 4 === 0) {
        priorityIndices.push(i);
      } else {
        regularIndices.push(i);
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
            if (count >= 12) {
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

    // Load priority frames first, then remainder
    loadBatch(priorityIndices, () => {
      if (!isCancelled) {
        loadBatch(regularIndices);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [totalFrames]);

  // High performance cover drawing onto canvas with retina DPR scaling
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Nearest neighbor fallback: if exact frame is still downloading, find nearest loaded frame
    let img: HTMLImageElement | null = imagesRef.current[frameIndex];
    if (!img || !img.complete) {
      for (let offset = 1; offset < 30; offset++) {
        const prev = frameIndex - offset;
        if (prev >= 0 && imagesRef.current[prev]?.complete) {
          img = imagesRef.current[prev];
          break;
        }
        const next = frameIndex + offset;
        if (next < totalFrames && imagesRef.current[next]?.complete) {
          img = imagesRef.current[next];
          break;
        }
      }
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
    lastDrawnFrameRef.current = frameIndex;
  };

  // High-performance RAF lerp loop (interpolates towards targetFrame on scroll)
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      // 0.22 lerp factor guarantees ultra-smooth, instant-feeling scroll scrub
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.22);
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

  // Precise scroll calculation:
  // Starts when container top hits top of viewport (scrolled = 0)
  // Reaches 100% when reaching the end of the scroll track
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // When rect.top is 0, user has scrolled to start of video
      // When rect.top is -totalScrollable, user has completed video
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

  // Stage narrative copy reflecting the 3 engineering milestones
  const getStageContent = () => {
    if (currentProgress < 0.33) {
      return {
        badge: 'ENGINEERING EXCELLENCE • UK-WIDE',
        title: 'PRECISION CONCRETE & SLIPFORM',
        subtitle: 'Turnkey vertical core installations delivered with micron-level tolerance.',
        step: '01 / INITIATION',
      };
    } else if (currentProgress < 0.72) {
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
      className="relative w-full bg-[#0d0f1f]"
      style={{ height: '360vh' }}
    >
      {/* Sticky Fullscreen Player: pinned in viewport across 360vh scroll track */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0d0f1f] z-20">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
          style={{ filter: 'contrast(1.05) brightness(1.02)' }}
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0d0f1f] via-transparent to-[#0d0f1f]/60" />

        {/* Top HUD: Status Bar */}
        <div className="absolute top-24 sm:top-28 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-none z-30">
          <div className="flex items-center gap-3 bg-[#0d0f1f]/85 backdrop-blur-md px-4 py-2 rounded-full border border-blue-900/40 text-xs text-slate-300 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] animate-pulse" />
            <span className="font-mono-tech tracking-wider uppercase font-semibold text-[11px] text-[#60a5fa]">
              Slipform Engineering Sequence
            </span>
          </div>

          <div className="flex items-center gap-3 bg-[#0d0f1f]/85 backdrop-blur-md px-4 py-2 rounded-full border border-blue-900/40 text-xs text-slate-300 shadow-xl font-mono-tech">
            <span className="text-slate-400">{stage.step}</span>
            <span className="text-slate-600">|</span>
            <span className="text-[#60a5fa] font-bold">{Math.round(currentProgress * 100)}% SCROLLED</span>
          </div>
        </div>

        {/* Compact Right-Aligned Overlay Card */}
        <div className="absolute bottom-10 right-4 sm:right-8 md:right-12 z-30 pointer-events-none max-w-sm sm:max-w-md w-full">
          <div className="bg-[#0d0f1f]/90 backdrop-blur-xl border border-blue-900/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
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
                <span className="flex items-center gap-1.5 text-[#60a5fa] font-semibold">
                  <Play className="w-3 h-3 fill-[#60a5fa] text-[#60a5fa]" /> Frame-by-frame scrub
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
                    className="text-xs uppercase font-bold text-[#60a5fa] hover:text-[#93c5fd] transition flex items-center gap-1.5 cursor-pointer font-mono-tech"
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
          <ArrowDown className="w-3.5 h-3.5 text-[#60a5fa]" />
          <span>Scroll to advance core construction</span>
        </div>

        {/* Preload Status Indicator */}
        {!isLoaded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d0f1f]/95 backdrop-blur-md border border-blue-900/40 px-6 py-4 rounded-2xl flex items-center gap-3 z-40 shadow-2xl">
            <div className="w-5 h-5 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white block">Buffering Full High-Definition Sequence</span>
              <span className="text-[11px] text-slate-400 font-mono-tech">
                {Math.round((loadedCount / totalFrames) * 100)}% preloaded
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Seamless Transition Border to Next Section */}
      <div className="relative z-20 h-16 bg-gradient-to-b from-[#0d0f1f] to-white" />
    </div>
  );
};
