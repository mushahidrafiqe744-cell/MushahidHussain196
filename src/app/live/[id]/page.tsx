'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { initialProjects } from '../../../data/portfolioData';
import { cmsService } from '../../../services/cms';
import { Project } from '../../../types/portfolio';
import { LiveProjectDemo } from '../../../components/LiveProjectDemo';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function StandaloneLiveProjectPage() {
  const params = useParams();
  const rawId = typeof params?.id === 'string' ? decodeURIComponent(params.id) : '';
  const [project, setProject] = useState<Project | null>(() => {
    const match = initialProjects.find((p) => p.id === rawId);
    return match || null;
  });
  const [loading, setLoading] = useState(!project);

  useEffect(() => {
    let active = true;
    const loadProject = async () => {
      try {
        const cmsProjects = await cmsService.fetchData('projects');
        const all = [...(cmsProjects || []), ...initialProjects];
        const found = all.find(
          (p: any) =>
            String(p.id) === rawId ||
            (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') === rawId.toLowerCase()
        );
        if (active && found) {
          setProject(found);
        }
      } catch (err) {
        console.warn('Live route project lookup error:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadProject();
    return () => {
      active = false;
    };
  }, [rawId]);

  if (loading && !project) {
    return (
      <div className="min-h-screen bg-[#06120B] text-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#DFC285]">
          Booting Live Project Preview...
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#06120B] text-white flex flex-col items-center justify-center p-6 text-center gap-4">
        <h1 className="font-display text-2xl font-bold text-[#F3DFAD]">Project Preview Not Found</h1>
        <p className="text-xs text-[#A3B8A8] max-w-md">
          The requested live project preview could not be located. Return to the portfolio to browse all live projects.
        </p>
        <a
          href="/#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A059] text-[#06120B] text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </a>
      </div>
    );
  }

  return <LiveProjectDemo project={project} isStandalonePage={true} />;
}
