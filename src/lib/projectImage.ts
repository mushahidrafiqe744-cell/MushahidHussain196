import { Project } from '../types/portfolio';

const DEMO_PLACEHOLDER_DOMAINS = [
  'biztop.org',
  'meerroyaldecor.com',
  'draqsaramzan.com',
  'novarastore.com',
  'grandpavilion.com',
  'quaidtribute.org',
  'alquranportal.com',
  'mbaacademy.edu',
  'raheemrehab.com',
  'alnoortextiles.com',
  'horizonluxuryrealestate.com',
  'maisongourmet.com',
  'finedgewealth.com',
  'cloudpulseapi.io',
];

export const VERCEL_LIVE_URL_BY_ID: Record<string, string> = {
  'proj-1': 'https://biztop-modern-business-consulting-g.vercel.app/',
  'proj-2': 'https://meer-royal-decor-hkh5.vercel.app/',
  'proj-3': 'https://aqsa-ramzan-graphics-designer-portf-hazel.vercel.app/',
  'proj-4': 'https://novara-premium-pakistani-e-commerce.vercel.app/',
  'proj-5': 'https://the-grand-pavilion-commercial-busin-delta.vercel.app/',
  'proj-6': 'https://25-december-quaid-e-azam-day-tribut.vercel.app/',
  'proj-7': 'https://al-quran-beryl.vercel.app/',
  'proj-8': 'https://mba-academy-6611-84sn.vercel.app/',
  'proj-9': 'https://raheem-insdad-e-manshiyat-2gag58lu0-ai-work2.vercel.app/',
  'proj-10': 'https://al-noor-processing-and-textile-mill.vercel.app/',
  'proj-15': 'https://hotel-grand-faisalabad-12-k721.vercel.app/',
};

export const isPlaceholderDemoDomain = (url?: string): boolean => {
  if (!url || url === '#' || url.trim() === '') return true;
  const lower = url.toLowerCase();
  return DEMO_PLACEHOLDER_DOMAINS.some((domain) => lower.includes(domain));
};

export const isIframeBlockedUrl = (url?: string): boolean => {
  if (!url) return false;
  const lower = url.toLowerCase();
  // Vercel preview URLs protected behind Vercel Team SSO return X-Frame-Options: DENY
  return lower.includes('raheem-insdad-e-manshiyat-2gag58lu0-ai-work2.vercel.app');
};

export const resolveLiveProjectUrl = (project: Pick<Project, 'id' | 'title' | 'liveUrl'> & { link?: string }): string => {
  const raw = (project.liveUrl || project.link || '').trim();
  if (raw && raw !== '#' && !raw.startsWith('#') && !isPlaceholderDemoDomain(raw)) {
    return raw.startsWith('http') ? raw : `https://${raw}`;
  }

  if (project.id && VERCEL_LIVE_URL_BY_ID[project.id]) {
    return VERCEL_LIVE_URL_BY_ID[project.id];
  }

  const titleLower = (project.title || '').toLowerCase();
  if (titleLower.includes('biztop')) return VERCEL_LIVE_URL_BY_ID['proj-1'];
  if (titleLower.includes('meer') || titleLower.includes('decor') || titleLower.includes('candle')) return VERCEL_LIVE_URL_BY_ID['proj-2'];
  if (titleLower.includes('aqsa')) return VERCEL_LIVE_URL_BY_ID['proj-3'];
  if (titleLower.includes('novara')) return VERCEL_LIVE_URL_BY_ID['proj-4'];
  if (titleLower.includes('pavilion')) return VERCEL_LIVE_URL_BY_ID['proj-5'];
  if (titleLower.includes('quaid') || titleLower.includes('25th') || titleLower.includes('december')) return VERCEL_LIVE_URL_BY_ID['proj-6'];
  if (titleLower.includes('quran')) return VERCEL_LIVE_URL_BY_ID['proj-7'];
  if (titleLower.includes('mba') || titleLower.includes('academy')) return VERCEL_LIVE_URL_BY_ID['proj-8'];
  if (titleLower.includes('raheem') || titleLower.includes('rehab') || titleLower.includes('manshiyat')) return VERCEL_LIVE_URL_BY_ID['proj-9'];
  if (titleLower.includes('noor') || titleLower.includes('textile')) return VERCEL_LIVE_URL_BY_ID['proj-10'];
  if (titleLower.includes('hotel grand') || titleLower.includes('faisalabad')) return VERCEL_LIVE_URL_BY_ID['proj-15'];

  return raw || '';
};

export const resolveProjectDomain = (project: Project): string => {
  const resolved = resolveLiveProjectUrl(project);
  if (resolved && resolved !== '#' && !resolved.startsWith('#')) {
    try {
      const parsed = new URL(resolved.startsWith('http') ? resolved : `https://${resolved}`);
      if (parsed.hostname && parsed.hostname !== '#') {
        return parsed.hostname.replace(/^www\./, '');
      }
    } catch (_) {
      const cleaned = resolved.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
      if (cleaned && cleaned !== '#') return cleaned;
    }
  }

  const titleLower = (project.title || '').toLowerCase();
  if (titleLower.includes('quran')) return 'al-quran-beryl.vercel.app';
  if (titleLower.includes('gourmet') || titleLower.includes('restaurant')) return 'maisongourmet.com';
  if (titleLower.includes('finedge') || titleLower.includes('wealth')) return 'finedgewealth.com';
  if (titleLower.includes('cloudpulse') || titleLower.includes('microservice')) return 'cloudpulseapi.io';
  if (titleLower.includes('biztop')) return 'biztop-modern-business-consulting-g.vercel.app';
  if (titleLower.includes('meer') || titleLower.includes('decor')) return 'meer-royal-decor-hkh5.vercel.app';
  if (titleLower.includes('aqsa')) return 'aqsa-ramzan-graphics-designer-portf-hazel.vercel.app';
  if (titleLower.includes('novara')) return 'novara-premium-pakistani-e-commerce.vercel.app';
  if (titleLower.includes('pavilion')) return 'the-grand-pavilion-commercial-busin-delta.vercel.app';
  if (titleLower.includes('quaid') || titleLower.includes('25th')) return '25-december-quaid-e-azam-day-tribut.vercel.app';
  if (titleLower.includes('mba') || titleLower.includes('academy')) return 'mba-academy-6611-84sn.vercel.app';
  if (titleLower.includes('rehab') || titleLower.includes('raheem')) return 'raheem-insdad-e-manshiyat-2gag58lu0-ai-work2.vercel.app';
  if (titleLower.includes('textile') || titleLower.includes('noor')) return 'al-noor-processing-and-textile-mill.vercel.app';
  if (titleLower.includes('hotel grand') || titleLower.includes('faisalabad')) return 'hotel-grand-faisalabad-12-k721.vercel.app';
  if (titleLower.includes('estate') || titleLower.includes('horizon')) return 'horizonluxuryrealestate.com';

  const slug = (project.title || 'project').toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${slug || 'portfolio'}.com`;
};

export const resolveProjectImage = (project: Project): string => {
  const rawUrl =
    typeof project.imageUrl === 'object' && (project.imageUrl as any)?.src
      ? (project.imageUrl as any).src
      : typeof project.image === 'object' && (project.image as any)?.src
      ? (project.image as any).src
      : typeof project.imageUrl === 'string' && project.imageUrl
      ? project.imageUrl
      : typeof project.image === 'string' && project.image
      ? project.image
      : '';

  const titleLower = (project.title || '').toLowerCase();
  if (titleLower.includes('quran')) return '/assets/images/al_quran_full_web_1790428789923.jpg';
  if (titleLower.includes('gourmet') || titleLower.includes('restaurant')) return '/assets/images/restaurant_web_1791805986623.jpg';
  if (titleLower.includes('hotel grand') || titleLower.includes('faisalabad')) return '/assets/images/grand_pavilion_1790426037130.jpg';
  if (titleLower.includes('mba') || titleLower.includes('academy')) return '/assets/images/mba_academy_full_web_1790428843333.jpg';
  if (titleLower.includes('textile') || titleLower.includes('noor')) return '/assets/images/al_noor_textile_full_web_1790428824308.jpg';
  if (titleLower.includes('rehab') || titleLower.includes('raheem')) return '/assets/images/raheem_rehab_full_web_1790428879741.jpg';
  if (titleLower.includes('pavilion')) return '/assets/images/grand_pavilion_full_web_1790428751763.jpg';
  if (titleLower.includes('quaid') || titleLower.includes('25th')) return '/assets/images/quaid_tribute_full_web_1790428772996.jpg';
  if (titleLower.includes('aqsa')) return '/assets/images/aqsa_ramzan_full_web_1790428861081.jpg';
  if (titleLower.includes('novara')) return '/assets/images/novara_store_full_web_1790428808211.jpg';
  if (titleLower.includes('meer') || titleLower.includes('decor')) return '/assets/images/meer_royal_decor_full_web_1791025431587.jpg';
  if (titleLower.includes('estate') || titleLower.includes('horizon')) return '/assets/images/real_estate_web_1791805973161.jpg';
  if (titleLower.includes('finedge') || titleLower.includes('wealth')) return '/assets/images/fintech_web_1791806009333.jpg';
  if (titleLower.includes('cloudpulse') || titleLower.includes('microservice')) return '/assets/images/cloud_api_web_1791806022294.jpg';
  if (titleLower.includes('biztop')) return '/assets/images/biztop_full_web_1790852703068.jpg';

  const PROJECT_ID_MAP: Record<string, string> = {
    'proj-1': '/assets/images/biztop_full_web_1790852703068.jpg',
    'proj-2': '/assets/images/meer_royal_decor_full_web_1791025431587.jpg',
    'proj-3': '/assets/images/aqsa_ramzan_full_web_1790428861081.jpg',
    'proj-4': '/assets/images/novara_store_full_web_1790428808211.jpg',
    'proj-5': '/assets/images/grand_pavilion_full_web_1790428751763.jpg',
    'proj-6': '/assets/images/quaid_tribute_full_web_1790428772996.jpg',
    'proj-7': '/assets/images/al_quran_full_web_1790428789923.jpg',
    'proj-8': '/assets/images/mba_academy_full_web_1790428843333.jpg',
    'proj-9': '/assets/images/raheem_rehab_full_web_1790428879741.jpg',
    'proj-10': '/assets/images/al_noor_textile_full_web_1790428824308.jpg',
    'proj-11': '/assets/images/real_estate_web_1791805973161.jpg',
    'proj-12': '/assets/images/restaurant_web_1791805986623.jpg',
    'proj-13': '/assets/images/fintech_web_1791806009333.jpg',
    'proj-14': '/assets/images/cloud_api_web_1791806022294.jpg',
    'proj-15': '/assets/images/grand_pavilion_1790426037130.jpg',
  };

  if (PROJECT_ID_MAP[project.id]) {
    return PROJECT_ID_MAP[project.id];
  }

  return rawUrl || '/assets/images/biztop_full_web_1790852703068.jpg';
};
