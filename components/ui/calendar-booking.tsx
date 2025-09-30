'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export function CalendarBooking() {
  useEffect(() => {
    // Initialize Cal.com when component mounts
    if (typeof window !== 'undefined' && (window as any).Cal) {
      (window as any).Cal("init", "30min", {origin:"https://cal.com"});

      (window as any).Cal.ns["30min"]("inline", {
        elementOrSelector:"#my-cal-inline",
        config: {"layout":"month_view","theme":"light"},
        calLink: "futureflowai/30min",
      });

      (window as any).Cal.ns["30min"]("ui", {
        "theme":"light",
        "cssVarsPerTheme":{
          "light":{"cal-brand":"#32a029"}
        },
        "hideEventTypeDetails":false,
        "layout":"month_view"
      });
    }
  }, []);

  return (
    <div className="w-full">
      {/* Cal.com Script */}
      <Script
        id="cal-com-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (C, A, L) {
              let p = function (a, ar) { a.q.push(ar); };
              let d = C.document;
              C.Cal = C.Cal || function () {
                let cal = C.Cal;
                let ar = arguments;
                if (!cal.loaded) {
                  cal.ns = {};
                  cal.q = cal.q || [];
                  d.head.appendChild(d.createElement("script")).src = A;
                  cal.loaded = true;
                }
                if (ar[0] === L) {
                  const api = function () { p(api, arguments); };
                  const namespace = ar[1];
                  api.q = api.q || [];
                  if(typeof namespace === "string"){
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    p(cal.ns[namespace], ar);
                    p(cal, ["initNamespace", namespace]);
                  } else p(cal, ar);
                  return;
                }
                p(cal, ar);
              };
            })(window, "https://app.cal.com/embed/embed.js", "init");

            Cal("init", "30min", {origin:"https://cal.com"});

            Cal.ns["30min"]("inline", {
              elementOrSelector:"#my-cal-inline",
              config: {"layout":"month_view","theme":"light"},
              calLink: "futureflowai/30min",
            });

            Cal.ns["30min"]("ui", {
              "theme":"light",
              "cssVarsPerTheme":{"light":{"cal-brand":"#32a029"}},
              "hideEventTypeDetails":false,
              "layout":"month_view"
            });
          `
        }}
      />

      {/* Calendar Container */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-4 text-[#3D3D3D]">
          Kies een moment dat u schikt
        </h3>
        <p className="text-gray-600 mb-6">
          Selecteer een datum en tijd voor uw gratis kennismakingsgesprek van 30 minuten
        </p>

        {/* Cal.com Embed Container */}
        <div
          id="my-cal-inline"
          className="w-full min-h-[600px] overflow-auto rounded-lg border border-gray-200"
        />
      </div>
    </div>
  );
}