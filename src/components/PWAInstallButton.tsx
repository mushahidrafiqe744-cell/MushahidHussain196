'use client';

import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Check, FileDown } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 5000);
      }
      return;
    }

    // Direct Instant Portfolio Download File for PC and Mobile
    const portfolioHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mushahid Hussain - Web Developer Portfolio</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #F8F5EE; color: #11261B; padding: 24px; max-width: 700px; margin: 0 auto; line-height: 1.6; }
    h1 { color: #0A3D22; margin-bottom: 4px; }
    .card { background: white; padding: 20px; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid rgba(197,160,89,0.3); }
    .badge { background: #C5A059; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; display: inline-block; margin-bottom: 10px; }
    a { color: #0A3D22; text-decoration: none; font-weight: bold; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <span class="badge">Verified Full-Stack Web Developer</span>
  <h1>Mushahid Hussain</h1>
  <p>Expert Full-Stack Web Developer & Software Engineer based in Pakistan with <strong>8+ Years</strong> of experience and <strong>50+ delivered projects</strong>.</p>
  
  <div class="card">
    <h3 style="margin-top:0; color:#0A3D22;">📞 Direct Contact Channels</h3>
    <p><strong>WhatsApp / Phone:</strong> <a href="https://wa.me/923290725117">+92 329 0725117</a></p>
    <p><strong>Email:</strong> <a href="mailto:mushahidrafiqe744@gmail.com">mushahidrafiqe744@gmail.com</a></p>
    <p><strong>GitHub:</strong> <a href="https://github.com/mushahidhussain" target="_blank">github.com/mushahidhussain</a></p>
    <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mushahid-rafiqe-5b3259425/" target="_blank">linkedin.com/in/mushahid-rafiqe-5b3259425</a></p>
  </div>

  <div class="card">
    <h3 style="margin-top:0; color:#0A3D22;">🚀 Services & Starting Prices</h3>
    <p>• Custom Websites & Landing Pages starting from <strong>PKR 20,000 / $100+</strong></p>
    <p>• Full-Stack SaaS, E-Commerce & Web Applications</p>
    <p>• Speed Optimization (95+ Lighthouse Core Web Vitals)</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0; color:#0A3D22;">🌟 Featured Projects</h3>
    <p>1. <strong>BizTop Enterprise Portal</strong> (https://biztop.org/)</p>
    <p>2. <strong>Meer Royal Decor E-Commerce</strong> (https://meerroyaldecor.com/)</p>
    <p>3. <strong>Dr. Aqsa Ramzan Healthcare Portal</strong> (https://draqsaramzan.com/)</p>
    <p>4. <strong>Novara Apparel Global Store</strong> (https://novarastore.com/)</p>
  </div>

  <p style="text-align: center; color: #5C6E61; font-size: 12px; margin-top: 30px;">
    © 2026 Mushahid Hussain. Saved offline package from portfolio web app.
  </p>
</body>
</html>`;

    const blob = new Blob([portfolioHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mushahid_Hussain_Portfolio_Package.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#b0893f] text-[#11261B] text-[11px] font-black uppercase tracking-wider rounded-lg shadow-sm hover:scale-105 transition-all cursor-pointer animate-shimmer"
        title="Download Portfolio Package or Install App"
      >
        <FileDown className="w-3.5 h-3.5 animate-bounce" />
        <span>Download Portfolio</span>
      </button>

      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 space-y-4 text-left">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#C5A059]" />
                <span>Install on iOS Device</span>
              </h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
              <p>To install this portfolio app on your iPhone or iPad home screen:</p>
              <ol className="list-decimal pl-4 space-y-1.5 font-medium text-gray-800">
                <li>Tap the <strong>Share</strong> button <span className="text-blue-600 font-bold">⎋</span> in Safari.</li>
                <li>Scroll down and tap <strong>Add to Home Screen ⊞</strong>.</li>
                <li>Tap <strong>Add</strong> at top right.</li>
              </ol>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#11261B] text-[#DFC285] font-bold text-xs hover:bg-[#1A3828] cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#11261B] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#C5A059] flex items-center gap-3 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#DFC285]">Portfolio Downloaded Successfully!</div>
            <div className="text-[10px] text-gray-300">Check your device downloads folder for Mushahid_Hussain_Portfolio_Package.html.</div>
          </div>
        </div>
      )}
    </>
  );
};
