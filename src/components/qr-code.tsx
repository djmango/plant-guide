"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

const BASE_URL = "https://plants.skg.gg";

export function PlantQRCode({
  slug,
  name,
  size = 120,
}: {
  slug: string;
  name: string;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = `${BASE_URL}/plants/${slug}`;
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 1,
        color: { dark: "#1a1a1a", light: "#00000000" },
      });
    }
    QRCode.toDataURL(url, {
      width: size * 3,
      margin: 2,
      color: { dark: "#1a1a1a", light: "#ffffff" },
    }).then(setDataUrl);
  }, [slug, size]);

  const handlePrint = () => {
    if (!dataUrl) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head><title>QR — ${name}</title></head>
        <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:monospace">
          <img src="${dataUrl}" style="width:200px;height:200px" />
          <p style="margin-top:12px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em">${name}</p>
          <p style="margin-top:4px;font-size:9px;color:#6b6b6b">plants.skg.gg/plants/${slug}</p>
          <script>window.print();window.close();</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas ref={canvasRef} className="block" />
      <button
        onClick={handlePrint}
        className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-light hover:text-ink transition-colors cursor-pointer"
      >
        Print QR
      </button>
    </div>
  );
}
