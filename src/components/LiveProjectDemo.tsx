'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Image as ImageIcon,
  Globe,
  ArrowLeft,
  Lock,
  Loader2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types/portfolio';
import {
  resolveProjectImage,
  resolveProjectDomain,
  resolveLiveProjectUrl,
  isPlaceholderDemoDomain,
  isIframeBlockedUrl,
} from '../lib/projectImage';
import { LiveSiteRenderer } from './LiveSiteRenderer';

interface LiveProjectDemoProps {
  project: Project | null;
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export const LiveProjectDemo: React.FC<LiveProjectDemoProps> = ({
  project,
  onClose,
  isStandalonePage = false,
}) => {
  const resolvedLiveUrl = project ? resolveLiveProjectUrl(project) : '';
  const hasRealExternalUrl =
    Boolean(resolvedLiveUrl) &&
    resolvedLiveUrl !== '#' &&
    !isPlaceholderDemoDomain(resolvedLiveUrl);
  const canEmbedExternal = hasRealExternalUrl && !isIframeBlockedUrl(resolvedLiveUrl);

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewTab, setViewTab] = useState<'external' | 'interactive' | 'fullpage'>(() =>
    canEmbedExternal ? 'external' : 'interactive'
  );
  const [imgLoaded, setImgLoaded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setViewTab(canEmbedExternal ? 'external' : 'interactive');
    setIframeLoaded(false);
    setImgLoaded(false);
    setRetryCount(0);
  }, [project?.id, canEmbedExternal]);

  useEffect(() => {
    if (isStandalonePage || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStandalonePage, onClose]);

  if (!project) return null;

  const imageSrc = resolveProjectImage(project);
  const cleanDomain = resolveProjectDomain(project);

  const viewportWidthClass =
    viewport === 'mobile'
      ? 'max-w-[390px] border-x-4 border-b-4 border-[#11261B] rounded-b-3xl'
      : viewport === 'tablet'
      ? 'max-w-[768px] border-x-2 border-b-2 border-[#11261B]/60 rounded-b-2xl'
      : 'max-w-full';

  const containerClass = isStandalonePage
    ? 'min-h-screen flex flex-col bg-[#06120B] text-white'
    : 'fixed inset-0 z-[80] flex flex-col bg-[#06120B]/95 backdrop-blur-md text-white';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClass}
    >
      {/* Top Browser Control Bar */}
      <div className="bg-[#0B1F14] border-b border-[#C5A059]/30 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg">
        {/* Left: Back / Traffic Lights + Domain Pill */}
        <div className="flex items-center gap-3 min-w-0">
          {isStandalonePage ? (
            <a
              href="/#projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-[#DFC285] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </a>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F56] hover:scale-110 transition-transform cursor-pointer"
                title="Close Preview"
              />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-[#C5A059]/30 text-xs font-mono text-[#DFC285] max-w-[240px] sm:max-w-[340px] truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{cleanDomain}</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold uppercase shrink-0">
              LIVE
            </span>
          </div>
        </div>

        {/* Center: Mode & Viewport Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Live Site vs Interactive vs Full Page Design Tabs */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
            {hasRealExternalUrl && (
              <button
                type="button"
                onClick={() => setViewTab('external')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  viewTab === 'external'
                    ? 'bg-[#C5A059] text-[#0B1F14]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Live Site</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setViewTab('interactive')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                viewTab === 'interactive'
                  ? 'bg-[#C5A059] text-[#0B1F14]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Interactive Demo</span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab('fullpage')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                viewTab === 'fullpage'
                  ? 'bg-[#C5A059] text-[#0B1F14]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>Full Design</span>
            </button>
          </div>

          {/* Responsive Viewport Switcher */}
          <div className="hidden md:flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              title="Desktop View"
              className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                viewport === 'desktop' ? 'bg-[#11261B] text-[#C5A059]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              title="Tablet View"
              className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                viewport === 'tablet' ? 'bg-[#11261B] text-[#C5A059]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              title="Mobile View"
              className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                viewport === 'mobile' ? 'bg-[#11261B] text-[#C5A059]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Open Live Site, Standalone Tab, WhatsApp & Close */}
        <div className="flex items-center gap-2 shrink-0">
          {hasRealExternalUrl && (
            <a
              href={resolvedLiveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#d4af68] text-xs font-bold text-[#0B1F14] shadow-sm transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open Live Site</span>
            </a>
          )}

          {!isStandalonePage && (
            <a
              href={`/live/${encodeURIComponent(project.id)}`}
              target="_blank"
              rel="noreferrer"
              title="Open Standalone Preview in New Tab"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Preview Tab</span>
            </a>
          )}

          <a
            href={`https://wa.me/923290725117?text=${encodeURIComponent(
              `Hi Mushahid! I tested your live preview for "${project.title}" and want to order a similar website. Please share pricing & timeline.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline">Order Similar</span>
          </a>

          {!isStandalonePage && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/80 text-white transition-all cursor-pointer"
              aria-label="Close Live Preview"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Live Preview Canvas */}
      <div className="flex-1 overflow-y-auto bg-[#06120B] flex justify-center p-0 sm:p-3">
        <div
          className={`w-full ${viewportWidthClass} mx-auto bg-white rounded-none sm:rounded-xl overflow-hidden shadow-2xl transition-all duration-300 min-h-full flex flex-col`}
        >
          {viewTab === 'external' && hasRealExternalUrl && (
            canEmbedExternal ? (
              <div className="relative w-full flex-1 min-h-[calc(100vh-88px)] bg-[#07130A]">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#07130A] z-10">
                    <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#DFC285]">
                      Loading Live Site: {cleanDomain}
                    </span>
                  </div>
                )}
                <iframe
                  key={resolvedLiveUrl}
                  src={resolvedLiveUrl}
                  title={project.title}
                  onLoad={() => setIframeLoaded(true)}
                  className="w-full h-full min-h-[calc(100vh-88px)] border-0 bg-white"
                  allow="autoplay; fullscreen; clipboard-write; encrypted-media"
                />
              </div>
            ) : (
              <div className="flex-1 bg-[#07130A] text-white flex flex-col items-center justify-center p-8 text-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#11261B] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                  <Globe className="w-7 h-7" />
                </div>
                <div className="max-w-md space-y-2">
                  <h3 className="font-display text-2xl font-bold text-[#F3DFAD]">{project.title}</h3>
                  <p className="text-xs text-[#A3B8A8] leading-relaxed">
                    This deployment has Vercel Team Protection enabled, so browsers restrict embedding it inside an iframe. Launch it directly in a new browser tab or use the Interactive Demo below.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={resolvedLiveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#d4af68] text-[#0B1F14] text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Site ({cleanDomain})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setViewTab('interactive')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>View Interactive Demo</span>
                  </button>
                </div>
              </div>
            )
          )}

          {viewTab === 'interactive' && (
            <LiveSiteRenderer project={project} imageSrc={imageSrc} />
          )}

          {viewTab === 'fullpage' && (
            <div className="relative bg-[#07130A] min-h-[60vh]">
              {!imgLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-[#07130A] z-10 py-20">
                  <Loader2 className="w-7 h-7 text-[#C5A059] animate-spin" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#DFC285]">
                    Loading {project.title}...
                  </span>
                </div>
              )}
              <img
                key={`${project.id}-${retryCount}`}
                src={retryCount > 0 ? `${imageSrc}?v=${retryCount}` : imageSrc}
                alt={project.title}
                referrerPolicy="no-referrer"
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                  if (retryCount < 2) {
                    setTimeout(() => setRetryCount((c) => c + 1), 350);
                  } else {
                    e.currentTarget.onerror = null;
                    setImgLoaded(true);
                  }
                }}
                className={`w-full h-auto block select-none transition-opacity duration-300 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
