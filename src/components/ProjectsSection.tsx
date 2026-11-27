'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, ArrowUpRight, Search, Code, Sparkles, Layers, MessageCircle, ChevronLeft, ChevronRight, LayoutGrid, Sliders, FolderGit2, Cpu, ShoppingCart, Terminal, Play } from 'lucide-react';
import { Project } from '../types/portfolio';
import { resolveProjectImage, resolveProjectDomain } from '../lib/projectImage';
import { LiveProjectDemo } from './LiveProjectDemo';
import { RevealCard, RevealItem, STUDIO_EASE } from './MotionPrimitives';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenLiveDemo?: (project: Project) => void;
}

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
  onOpenLiveDemo: (project: Project) => void;
}> = ({ project, index, onSelectProject, onOpenLiveDemo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentNum, setCurrentNum] = useState(0);
  const targetNum = index + 1;

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 500;

    if (isHovered) {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCurrentNum(Math.round(easeOut * targetNum));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      animationFrameId = requestAnimationFrame(animate);
    } else {
      setCurrentNum(0);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, targetNum]);

  const formattedNum = String(currentNum).padStart(2, '0');
  const cleanDomain = resolveProjectDomain(project);
  const imageSrc = resolveProjectImage(project);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-[#F2EDE2] rounded-2xl border border-[#11261B]/10 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 flex flex-col justify-between animate-shimmer"
    >
      <div>
        {/* Realistic Browser Mockup Frame */}
        <div className="relative overflow-hidden bg-[#07130A] border-b border-[#11261B]/15">
          {/* Top Browser Bar */}
          <div className="bg-[#0C1F15] px-3.5 py-2 flex items-center justify-between border-b border-white/5 select-none">
            {/* macOS Window Traffic Lights */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block shadow-2xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block shadow-2xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block shadow-2xs" />
            </div>

            {/* Address Bar Pill */}
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/40 border border-white/5 text-[10px] font-mono text-[#DFC285]/90 max-w-[170px] sm:max-w-[210px] truncate shadow-inner">
              <span className="text-[8px] text-[#5C6E61]">🔒</span>
              <span className="truncate">{cleanDomain}</span>
            </div>

            {/* Hover to Scroll Pulsing Badge */}
            <div className="flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase text-[#C5A059] bg-[#11261B] px-2 py-0.5 rounded border border-[#C5A059]/30 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
              <span>HOVER TO SCROLL</span>
            </div>
          </div>

          {/* Smooth Vertical Scrolling Screenshot Window */}
          <div
            onClick={() => onSelectProject(project)}
            className="relative h-60 sm:h-64 overflow-hidden bg-[#07130A] cursor-pointer group/frame"
          >
            <img
              src={imageSrc}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto block select-none will-change-transform"
              style={{
                transform: isHovered ? 'translateY(calc(-100% + 240px))' : 'translateY(0%)',
                transition: isHovered
                  ? 'transform 7s cubic-bezier(0.25, 0.1, 0.25, 1)'
                  : 'transform 1.8s ease-out',
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/images/biztop_full_web_1790852703068.jpg';
              }}
            />

            {/* Subtle gradient overlay at bottom for badge readability */}
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#11261B]/80 to-transparent pointer-events-none z-10" />

            {/* Category Label at bottom-left */}
            <div className="absolute bottom-3 left-3 bg-[#11261B]/90 backdrop-blur-xs text-[#C5A059] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#C5A059]/30 z-20 shadow-md">
              {project.categoryLabel || project.category}
            </div>

            {/* Number Badge Index at bottom-right */}
            <div
              className={`absolute bottom-3 right-3 text-xs font-mono font-bold px-2 py-0.5 rounded-lg border shadow-md transition-all duration-300 select-none z-20 ${
                isHovered
                  ? 'bg-[#C5A059] text-[#11261B] border-[#DFC285] scale-105 shadow-lg shadow-[#C5A059]/30'
                  : 'bg-[#11261B]/90 text-[#DFC285]/80 border-[#C5A059]/40'
              }`}
            >
              #{formattedNum}
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-[11px] text-[#5C6E61] font-medium mb-2">
            <span className="font-semibold text-[#11261B]">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{project.year}</span>
            {project.metrics && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#C5A059] font-bold bg-[#11261B] px-2 py-0.5 rounded text-[10px]">{project.metrics}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProject(project)}
            className="font-display text-xl sm:text-2xl font-bold text-[#11261B] group-hover:text-[#C5A059] transition-colors cursor-pointer mb-2 leading-snug"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#5C6E61] leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Tech Stack Tags with Hover Bounce */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium text-[#11261B] bg-white px-2.5 py-1 rounded-lg border border-[#11261B]/10 hover:border-[#C5A059] hover:bg-[#11261B] hover:text-[#DFC285] transition-all duration-200 cursor-default hover:scale-105"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-[11px] font-medium text-[#5C6E61] px-1.5 py-1">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="px-6 py-4 bg-white/70 border-t border-[#11261B]/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="View GitHub Repository"
              className="p-2 rounded-lg bg-[#11261B] text-white hover:bg-[#1A3828] hover:text-[#C5A059] transition-all shadow-xs flex items-center gap-1.5 text-xs font-semibold hover:scale-105"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => onOpenLiveDemo(project)}
            title="Launch Interactive Live Demo"
            className="p-2 rounded-lg bg-white border border-[#11261B]/15 text-[#11261B] hover:border-[#C5A059] hover:bg-[#F2EDE2] transition-all shadow-xs flex items-center gap-1.5 text-xs font-semibold hover:scale-105 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Play className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
            <span className="hidden sm:inline">Live Demo</span>
          </button>

          <a
            href={`https://wa.me/923290725117?text=${encodeURIComponent(
              `Hi Mushahid! I saw your "${project.title}" project on your portfolio and I would like to order a similar website. Please share quotation and timeline.`
            )}`}
            target="_blank"
            rel="noreferrer"
            title="Order a website like this on WhatsApp"
            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs flex items-center gap-1.5 text-xs font-semibold hover:scale-105"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="hidden md:inline">Order Web</span>
          </a>
        </div>

        <button
          onClick={() => onSelectProject(project)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#11261B] group-hover:text-[#C5A059] transition-all hover:translate-x-1 cursor-pointer"
        >
          <span>Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onSelectProject, onOpenLiveDemo }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('slider');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [localLiveProject, setLocalLiveProject] = useState<Project | null>(null);

  const handleLaunchLiveDemo = (project: Project) => {
    if (onOpenLiveDemo) {
      onOpenLiveDemo(project);
    } else {
      setLocalLiveProject(project);
    }
  };

  const categories: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Projects', icon: FolderGit2 },
    { id: 'saas', label: 'SaaS & Web Apps', icon: Cpu },
    { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart },
    { id: 'fullstack', label: 'Full Stack', icon: Layers },
    { id: 'api', label: 'APIs & Backend', icon: Terminal },
  ];

  const normalizeCategory = (cat?: string): 'saas' | 'ecommerce' | 'fullstack' | 'api' => {
    if (!cat) return 'saas';
    const c = cat.toLowerCase();
    if (c.includes('e-com') || c.includes('shop') || c.includes('store') || c.includes('apparel') || c.includes('decor') || c.includes('textile')) {
      return 'ecommerce';
    }
    if (c.includes('api') || c.includes('backend') || c.includes('cloud') || c.includes('microservice') || c.includes('devops') || c.includes('fintech') || c.includes('developer')) {
      return 'api';
    }
    if (c.includes('full') || c.includes('stack') || c.includes('health') || c.includes('medical') || c.includes('hospitality') || c.includes('rehab') || c.includes('estate') || c.includes('restaurant')) {
      return 'fullstack';
    }
    return 'saas';
  };

  const filteredProjects = projects.filter((project) => {
    const projectCatNorm = normalizeCategory(project.category);
    const matchesCategory = activeCategory === 'all' || projectCatNorm === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  // Autoplay effect for Slider View
  useEffect(() => {
    if (viewMode !== 'slider' || isAutoplayPaused || filteredProjects.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [viewMode, isAutoplayPaused, filteredProjects.length]);

  // Reset slider index when filters/searches change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, searchQuery]);

  const sectionTitleLetters = 'Featured Projects'.split('');

  return (
    <section id="projects" className="py-16 bg-[#F8F5EE] relative overflow-hidden">
      
      {/* Subtle background ambient light */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <RevealItem delay={0.04} y={24} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#11261B]/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059] mb-1.5 px-3 py-1 rounded-full bg-white border border-[#C5A059]/30 animate-shimmer">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin-slow" />
              <span>SELECTED WORKS</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#11261B] select-none">
              {sectionTitleLetters.map((char, index) => (
                <span key={index} className="hover-letter-bounce cursor-pointer">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
            <p className="text-sm text-[#5C6E61] mt-1 max-w-xl">
              Explore recent web applications, production codebases, and architectural implementations with live previews and open-source GitHub repositories.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-800 mt-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Websites Starting From ₨ 20,000 · Custom Built in 4–7 Days</span>
            </div>
          </div>

          {/* Controls: Search and Layout Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* View Mode Toggle */}
            <div className="flex bg-[#F2EDE2] border border-[#11261B]/15 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setViewMode('slider')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-[#11261B] text-[#DFC285] shadow-xs'
                    : 'text-[#5C6E61] hover:text-[#11261B]'
                }`}
                title="3D Fanned Showcase Slider"
              >
                <Sliders className="w-3.5 h-3.5 rotate-90" />
                <span>3D Showcase</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#11261B] text-[#DFC285] shadow-xs'
                    : 'text-[#5C6E61] hover:text-[#11261B]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid ({filteredProjects.length})</span>
              </button>
            </div>

            {/* Search Bar with Focus Animation */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#5C6E61] absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#C5A059] transition-colors" />
              <input
                type="text"
                placeholder="Search tech, stack, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#F2EDE2] border border-[#11261B]/15 rounded-xl text-[#11261B] placeholder-[#5C6E61] focus:outline-hidden focus:border-[#C5A059] focus:bg-white transition-all shadow-xs focus:ring-2 focus:ring-[#C5A059]/20"
              />
            </div>
          </div>
        </RevealItem>

        {/* Filter Segmented Buttons (Tabs with Icons and Count Badges) */}
        <RevealItem delay={0.1} y={20} className="flex items-center gap-1.5 p-1.5 bg-[#F2EDE2] rounded-xl border border-[#11261B]/10 mb-8 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all' 
              ? projects.length 
              : projects.filter((p) => normalizeCategory(p.category) === cat.id).length;

            return (
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#11261B] text-[#F8F5EE] shadow-md border border-[#C5A059]/40'
                    : 'text-[#5C6E61] hover:text-[#11261B] hover:bg-white/60'
                }`}
              >
                <cat.icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-[#5C6E61]'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-[#C5A059] text-[#11261B] font-bold'
                      : 'bg-black/5 text-[#5C6E61]'
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </RevealItem>

        {/* Projects Viewport (Grid vs Slider) */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#F2EDE2] rounded-2xl border border-dashed border-[#11261B]/20 animate-pulse">
            <Code className="w-10 h-10 text-[#5C6E61] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#11261B]">No projects found matching your search.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-[#C5A059] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === 'slider' ? (
          /* Video-Matched 3D Perspective Fanned Arc Showcase Slider */
          <RevealItem
            delay={0.08}
            y={32}
            className="relative select-none py-4"
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => setIsAutoplayPaused(false)}
          >
            {/* 3D Perspective Stage */}
            <div
              className="relative h-[560px] sm:h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-[#07160D] via-[#0B2014] to-[#06120B] border border-[#C5A059]/25 shadow-2xl px-4"
              style={{ perspective: '1300px' }}
            >
              {/* Subtle Ambient Spotlight Behind Active Card */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-80 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.16),transparent_65%)] pointer-events-none" />

              {filteredProjects.map((project, index) => {
                const total = filteredProjects.length;
                let diff = index - currentIndex;
                if (total > 2) {
                  if (diff > total / 2) diff -= total;
                  if (diff < -total / 2) diff += total;
                }

                const absDiff = Math.abs(diff);
                if (absDiff > 2) return null;

                const isCenter = diff === 0;
                const xOffset = diff === 0 ? 0 : diff * (absDiff === 1 ? 265 : 445);
                const yOffset = absDiff === 0 ? 0 : absDiff === 1 ? 22 : 58;
                const scaleVal = absDiff === 0 ? 1 : absDiff === 1 ? 0.86 : 0.74;
                const rotateZVal = diff * 4.2;
                const rotateYVal = -diff * 12;
                const opacityVal = absDiff === 0 ? 1 : absDiff === 1 ? 0.88 : 0.48;
                const zIndexVal = 30 - absDiff * 10;

                return (
                  <motion.div
                    key={project.id}
                    initial={false}
                    animate={{
                      x: xOffset,
                      y: yOffset,
                      scale: scaleVal,
                      rotateZ: rotateZVal,
                      rotateY: rotateYVal,
                      opacity: opacityVal,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 230,
                      damping: 26,
                      mass: 0.9,
                    }}
                    style={{
                      zIndex: zIndexVal,
                      transformStyle: 'preserve-3d',
                    }}
                    onClick={() => {
                      if (!isCenter) setCurrentIndex(index);
                    }}
                    className={`absolute w-[92%] max-w-[430px] sm:max-w-[480px] ${
                      isCenter ? 'cursor-default' : 'cursor-pointer hidden sm:block'
                    }`}
                  >
                    <div
                      className={`rounded-2xl transition-shadow duration-300 ${
                        isCenter
                          ? 'ring-2 ring-[#C5A059]/70 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)]'
                          : 'brightness-[0.82] hover:brightness-95 shadow-2xl pointer-events-none'
                      }`}
                    >
                      <ProjectCard
                        project={project}
                        index={index}
                        onSelectProject={onSelectProject}
                        onOpenLiveDemo={handleLaunchLiveDemo}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Video-Matched Dark Pill Navigation Controller */}
            {filteredProjects.length > 1 && (
              <div className="max-w-3xl mx-auto mt-6">
                <div className="bg-[#091A10] border border-[#C5A059]/30 rounded-2xl px-4 sm:px-6 py-3.5 shadow-xl flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)}
                      className="w-10 h-10 rounded-full bg-white/5 border border-[#C5A059]/30 text-[#DFC285] hover:bg-[#C5A059] hover:text-[#11261B] flex items-center justify-center transition-colors cursor-pointer"
                      title="Previous Project"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)}
                      className="w-10 h-10 rounded-full bg-white/5 border border-[#C5A059]/30 text-[#DFC285] hover:bg-[#C5A059] hover:text-[#11261B] flex items-center justify-center transition-colors cursor-pointer"
                      title="Next Project"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </motion.button>
                    <span className="text-xs font-mono font-bold text-[#F8F5EE] ml-1 tabular-nums">
                      {String(currentIndex + 1).padStart(2, '0')} <span className="text-[#8A9B8F]">/ {String(filteredProjects.length).padStart(2, '0')}</span>
                    </span>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex items-center gap-1.5 overflow-x-auto max-w-[260px] py-1">
                    {filteredProjects.map((proj, idx) => (
                      <button
                        key={proj.id}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`View project ${idx + 1}: ${proj.title}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                          currentIndex === idx
                            ? 'w-7 bg-[#C5A059]'
                            : 'w-2 bg-white/25 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </RevealItem>
        ) : (
          /* Standard Projects Grid with Staggered Wave Entrance */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <RevealCard key={project.id} index={index} columns={2} hoverY={-6} className="flex">
                <div className="w-full flex">
                  <ProjectCard
                    project={project}
                    index={index}
                    onSelectProject={onSelectProject}
                    onOpenLiveDemo={handleLaunchLiveDemo}
                  />
                </div>
              </RevealCard>
            ))}
          </div>
        )}
      </div>

      {!onOpenLiveDemo && localLiveProject && (
        <LiveProjectDemo
          project={localLiveProject}
          onClose={() => setLocalLiveProject(null)}
        />
      )}
    </section>
  );
};
