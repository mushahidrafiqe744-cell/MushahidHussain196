'use client';

import React, { useEffect, useState } from 'react';
import {
  Download,
  Smartphone,
  Monitor,
  Check,
  X,
  ExternalLink,
  FileDown,
  Copy,
  Share,
} from 'lucide-react';
import { DevicePlatform, usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'hero';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'navbar' }) => {
  const { isInstallable, isInstalled, platform, isInIframe, install } = usePWAInstall();
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [activeTab, setActiveTab] = useState<DevicePlatform>('pc');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMode, setToastMode] = useState<'installed' | 'downloaded'>('installed');
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    setActiveTab(platform);
  }, [platform]);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) {
        setToastMode('installed');
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 6000);
        return;
      }
    }
    setActiveTab(platform);
    setShowInstallModal(true);
  };

  const handleCopyUrl = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard?.writeText(window.location.origin || window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownloadOfflinePackage = () => {
    const portfolioHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mushahid Hussain - Web Developer Portfolio</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #F8F5EE; color: #11261B; padding: 24px; max-width: 720px; margin: 0 auto; line-height: 1.6; }
    h1 { color: #0A3D22; margin-bottom: 4px; }
    .card { background: white; padding: 20px; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid rgba(197,160,89,0.3); }
    .badge { background: #C5A059; color: #11261B; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; display: inline-block; margin-bottom: 10px; }
    a { color: #0A3D22; text-decoration: none; font-weight: bold; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <span class="badge">Verified Full-Stack Web Developer</span>
  <h1>Mushahid Hussain</h1>
  <p>Full-Stack Web Developer & Software Engineer with <strong>8+ Years</strong> of experience and <strong>50+ delivered projects</strong>.</p>
  <div class="card">
    <h3 style="margin-top:0; color:#0A3D22;">Direct Contact Channels</h3>
    <p><strong>WhatsApp / Phone:</strong> <a href="https://wa.me/923290725117">+92 329 0725117</a></p>
    <p><strong>Email:</strong> <a href="mailto:mushahidrafiqe744@gmail.com">mushahidrafiqe744@gmail.com</a></p>
    <p><strong>GitHub:</strong> <a href="https://github.com/mushahidhussain" target="_blank">github.com/mushahidhussain</a></p>
    <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mushahid-rafiqe-5b3259425/" target="_blank">linkedin.com/in/mushahid-rafiqe-5b3259425</a></p>
  </div>
  <div class="card">
    <h3 style="margin-top:0; color:#0A3D22;">Live Featured Websites</h3>
    <p>1. <strong>BizTop Enterprise</strong>: <a href="https://biztop-modern-business-consulting-g.vercel.app/" target="_blank">biztop-modern-business-consulting-g.vercel.app</a></p>
    <p>2. <strong>Al-Quran Interactive Portal</strong>: <a href="https://al-quran-beryl.vercel.app/" target="_blank">al-quran-beryl.vercel.app</a></p>
    <p>3. <strong>MBA Academy</strong>: <a href="https://mba-academy-6611-84sn.vercel.app/" target="_blank">mba-academy-6611-84sn.vercel.app</a></p>
    <p>4. <strong>Hotel Grand Faisalabad</strong>: <a href="https://hotel-grand-faisalabad-12-k721.vercel.app/" target="_blank">hotel-grand-faisalabad-12-k721.vercel.app</a></p>
  </div>
</body>
</html>`;

    const blob = new Blob([portfolioHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mushahid_Hussain_Portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowInstallModal(false);
    setToastMode('downloaded');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {variant === 'hero' ? (
        <button
          type="button"
          onClick={handleInstallClick}
          className="group inline-flex items-center gap-2.5 pl-2 pr-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#DFC285] bg-[#11261B] border border-[#C5A059]/60 hover:bg-[#1A3828] rounded-full transition-all shadow-md hover:scale-105 hover:shadow-xl cursor-pointer animate-shimmer"
          title="Install App on PC, Android or iPhone with Desktop Logo"
        >
          <img
            src="/pwa-192x192.png"
            alt="App Logo"
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full object-cover border border-[#C5A059] shrink-0"
          />
          <span>Install App</span>
          <Download className="w-4 h-4 text-[#C5A059] group-hover:translate-y-0.5 transition-transform duration-300" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 pl-1 pr-2.5 sm:pl-1.5 sm:pr-3 py-1 bg-[#11261B] hover:bg-[#1A3828] text-[#DFC285] border border-[#C5A059]/60 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm hover:scale-105 transition-all cursor-pointer animate-shimmer shrink-0"
          title="Install Website App on PC, Android or iPhone with Logo"
        >
          <img
            src="/pwa-192x192.png"
            alt="App Logo"
            referrerPolicy="no-referrer"
            className="w-5 h-5 rounded-md object-cover border border-[#C5A059]/50 shrink-0"
          />
          <Download className="w-3 h-3 text-[#C5A059] shrink-0 hidden sm:block" />
          <span className="sm:hidden">Install</span>
          <span className="hidden sm:inline">Install App</span>
        </button>
      )}

      {showInstallModal && (
        <div
          onClick={() => setShowInstallModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F5EE] rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-[#C5A059]/40 space-y-4 text-left text-[#11261B] max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#11261B]/10 pb-3">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-display font-bold text-lg text-[#11261B]">
                  Install App (PC · Android · iPhone)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInstallModal(false)}
                className="p-1.5 rounded-full hover:bg-[#11261B]/10 text-[#5C6E61] cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Universal Desktop/Mobile Logo Preview */}
            <div className="bg-[#081C11] rounded-2xl p-4 border border-[#C5A059]/40 flex items-center gap-4 text-white">
              <img
                src="/pwa-512x512.png"
                alt="Mushahid Dev App Logo"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C5A059] shadow-lg shrink-0"
              />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                  Official App Icon Logo
                </div>
                <div className="font-display text-lg font-bold text-white leading-tight mt-0.5">
                  Mushahid Dev
                </div>
                <div className="text-[11px] text-[#A3B8A8] mt-0.5 leading-snug">
                  Install hone ke baad PC Desktop, Android Home Screen aur iPhone par yahi logo show hoga.
                </div>
              </div>
            </div>

            {/* Iframe Helper Banner (for AI Studio preview window) */}
            {isInIframe && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 space-y-2.5">
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  Preview frame ke andar direct popup block hota hai. 1-click install ke liye pehle site ko full browser window me kholein:
                </p>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#11261B] hover:bg-[#1A3828] text-[#DFC285] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Window & Install</span>
                </a>
              </div>
            )}

            {/* Platform Tabs: PC / Android / iPhone */}
            <div className="grid grid-cols-3 gap-1.5 bg-[#EFE9DC] p-1 rounded-xl border border-[#11261B]/10">
              <button
                type="button"
                onClick={() => setActiveTab('pc')}
                className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  activeTab === 'pc' ? 'bg-[#11261B] text-[#DFC285] shadow-xs' : 'text-[#5C6E61] hover:text-[#11261B]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>PC</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('android')}
                className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  activeTab === 'android' ? 'bg-[#11261B] text-[#DFC285] shadow-xs' : 'text-[#5C6E61] hover:text-[#11261B]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ios')}
                className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  activeTab === 'ios' ? 'bg-[#11261B] text-[#DFC285] shadow-xs' : 'text-[#5C6E61] hover:text-[#11261B]'
                }`}
              >
                <Share className="w-3.5 h-3.5" />
                <span>iPhone</span>
              </button>
            </div>

            {/* Device-Specific Instructions */}
            {activeTab === 'pc' && (
              <div className="bg-white rounded-2xl p-4 border border-[#11261B]/10 text-xs text-[#11261B]/85 space-y-2">
                <p className="font-bold text-[#11261B]">Windows / Mac PC (Chrome & Edge):</p>
                <ol className="list-decimal pl-4 space-y-1.5 font-medium">
                  <li>
                    Address bar ke right side par <strong>Install (⊕)</strong> icon par click karein.
                  </li>
                  <li>
                    Ya browser menu <strong>⋮ → Cast, save, and share → Install page as app</strong> select karein (Mac Safari: <strong>File → Add to Dock</strong>).
                  </li>
                  <li>
                    <strong>Install</strong> dabate hi website PC Desktop aur Taskbar par golden logo ke saath app ban jayegi.
                  </li>
                </ol>
              </div>
            )}

            {activeTab === 'android' && (
              <div className="bg-white rounded-2xl p-4 border border-[#11261B]/10 text-xs text-[#11261B]/85 space-y-2">
                <p className="font-bold text-[#11261B]">Android Mobile (Chrome / Samsung Browser):</p>
                <ol className="list-decimal pl-4 space-y-1.5 font-medium">
                  <li>
                    Top-right me <strong>⋮ (3 dots menu)</strong> par tap karein.
                  </li>
                  <li>
                    <strong>Install app</strong> ya <strong>Add to Home screen → Install</strong> par tap karein.
                  </li>
                  <li>
                    App automatic install ho kar Android Home Screen & App Drawer me golden logo ke saath show hogi.
                  </li>
                </ol>
              </div>
            )}

            {activeTab === 'ios' && (
              <div className="bg-white rounded-2xl p-4 border border-[#11261B]/10 text-xs text-[#11261B]/85 space-y-2">
                <p className="font-bold text-[#11261B]">iPhone / iPad (Safari Browser):</p>
                <ol className="list-decimal pl-4 space-y-1.5 font-medium">
                  <li>
                    Website ko <strong>Safari</strong> browser me kholein aur bottom me <strong>Share</strong> icon (box with arrow) par tap karein.
                  </li>
                  <li>
                    Niche scroll karke <strong>Add to Home Screen</strong> par tap karein.
                  </li>
                  <li>
                    Top-right par <strong>Add</strong> dabate hi iPhone Home Screen par golden logo ke saath app icon show ho jayega.
                  </li>
                </ol>
              </div>
            )}

            {/* Footer Utilities: Copy URL & Offline File */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-[#F2EDE2] border border-[#11261B]/20 text-[#11261B] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C5A059]" />}
                <span>{copiedUrl ? 'Link Copied!' : 'Copy Link for Phone'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadOfflinePackage}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-[#F2EDE2] border border-[#11261B]/20 text-[#11261B] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <FileDown className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Offline Shortcut</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#11261B] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#C5A059] flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#DFC285]">
              {toastMode === 'installed'
                ? 'App Installed on Your Device!'
                : 'Offline Shortcut Saved!'}
            </div>
            <div className="text-[10px] text-gray-300">
              {toastMode === 'installed'
                ? 'Mushahid Dev golden logo is now on your PC Desktop, Android, or iPhone Home Screen.'
                : 'Check your Downloads folder for Mushahid_Hussain_Portfolio.html.'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
