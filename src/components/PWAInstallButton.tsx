'use client';

import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Monitor,
  Check,
  X,
  ExternalLink,
  FileDown,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isInIframe, install } = usePWAInstall();
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMode, setToastMode] = useState<'installed' | 'downloaded'>('installed');

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) {
        setToastMode('installed');
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 6000);
      }
      return;
    }

    setShowInstallModal(true);
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
      <button
        type="button"
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 pl-1.5 pr-3 py-1 bg-[#11261B] hover:bg-[#1A3828] text-[#DFC285] border border-[#C5A059]/60 text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm hover:scale-105 transition-all cursor-pointer animate-shimmer"
        title="Install Website App on PC or Mobile with Desktop Logo"
      >
        <img
          src="/pwa-192x192.png"
          alt="App Logo"
          referrerPolicy="no-referrer"
          className="w-5 h-5 rounded-md object-cover border border-[#C5A059]/50 shrink-0"
        />
        <Download className="w-3 h-3 text-[#C5A059] shrink-0" />
        <span>Install App</span>
      </button>

      {showInstallModal && (
        <div
          onClick={() => setShowInstallModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F5EE] rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#C5A059]/40 space-y-5 text-left text-[#11261B]"
          >
            <div className="flex items-center justify-between border-b border-[#11261B]/10 pb-3.5">
              <div className="flex items-center gap-2.5">
                {isIOS ? (
                  <Smartphone className="w-5 h-5 text-[#C5A059]" />
                ) : (
                  <Monitor className="w-5 h-5 text-[#C5A059]" />
                )}
                <h3 className="font-display font-bold text-lg text-[#11261B]">
                  {isIOS ? 'Install App on iPhone / iPad' : 'Install Website on PC & Mobile'}
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

            {/* PC Desktop App Icon Preview */}
            <div className="bg-[#081C11] rounded-2xl p-4 border border-[#C5A059]/40 flex items-center gap-4 text-white">
              <img
                src="/pwa-512x512.png"
                alt="Mushahid Dev PC App Icon"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C5A059] shadow-lg shrink-0"
              />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                  Desktop & Home Screen App Logo
                </div>
                <div className="font-display text-lg font-bold text-white leading-tight mt-0.5">
                  Mushahid Dev
                </div>
                <div className="text-[11px] text-[#A3B8A8] mt-0.5">
                  Installs on Windows Desktop, Taskbar, Mac Dock & Mobile with this golden crest logo.
                </div>
              </div>
            </div>

            {isIOS ? (
              <div className="text-xs text-[#11261B]/85 space-y-2.5 leading-relaxed bg-white p-4 rounded-2xl border border-[#11261B]/10">
                <p className="font-semibold text-[#11261B]">Follow these 3 quick steps in Safari:</p>
                <ol className="list-decimal pl-4 space-y-1.5 font-medium">
                  <li>Tap the <strong>Share</strong> icon in your Safari toolbar.</li>
                  <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                  <li>Tap <strong>Add</strong> — the app logo will appear on your screen.</li>
                </ol>
              </div>
            ) : (
              <div className="space-y-3">
                {isInIframe && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 space-y-2.5">
                    <p className="text-xs text-amber-950 font-medium leading-relaxed">
                      You are viewing inside an embedded preview frame. Open the site directly in its own browser tab so 1-click PC installation activates immediately:
                    </p>
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#11261B] hover:bg-[#1A3828] text-[#DFC285] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Full Window & Install on PC</span>
                    </a>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-4 border border-[#11261B]/10 text-xs text-[#11261B]/85 space-y-2">
                  <p className="font-bold text-[#11261B]">How to Install on PC (Chrome / Edge):</p>
                  <ol className="list-decimal pl-4 space-y-1.5 font-medium">
                    <li>
                      Click the <strong>Install App icon (⊕)</strong> on the right side of Chrome or Edge address bar.
                    </li>
                    <li>
                      Or click browser menu <strong>⋮ → Cast, save, and share → Install page as app</strong>.
                    </li>
                    <li>
                      Click <strong>Install</strong> — the website opens as a PC app and pins the golden logo on your Desktop & Taskbar.
                    </li>
                  </ol>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleDownloadOfflinePackage}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-[#F2EDE2] border border-[#11261B]/20 text-[#11261B] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <FileDown className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Save Offline Shortcut</span>
              </button>
              <button
                type="button"
                onClick={() => setShowInstallModal(false)}
                className="py-2.5 px-5 rounded-xl bg-[#11261B] text-[#DFC285] font-bold text-xs hover:bg-[#1A3828] cursor-pointer transition-all"
              >
                Got It
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
                ? 'Portfolio Installed on Your Device!'
                : 'Offline Shortcut Saved!'}
            </div>
            <div className="text-[10px] text-gray-300">
              {toastMode === 'installed'
                ? 'Mushahid Dev app logo is now available on your PC Desktop / Home Screen.'
                : 'Check your Downloads folder for Mushahid_Hussain_Portfolio.html.'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
