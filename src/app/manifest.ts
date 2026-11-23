import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Mushahid Hussain - Web Developer Portfolio',
    short_name: 'Mushahid Dev',
    description:
      'Professional Web & Full-Stack Developer portfolio of Mushahid Hussain featuring responsive projects, live deployments, technical skills, and contact channels.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    prefer_related_applications: false,
    categories: ['portfolio', 'developer', 'business'],
    background_color: '#081C11',
    theme_color: '#0A3D22',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
