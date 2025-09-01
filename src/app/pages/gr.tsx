// src/app/qr/page.tsx
"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const [text, setText] = useState("https://example.com");

  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    downloadLink.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h1 className="text-3xl font-bold">📲 QR Генератор</h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст или ссылку"
        className="border p-2 rounded w-80 text-black"
      />

      <QRCodeCanvas
        id="qr-gen"
        value={text}
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />

      <button
        onClick={downloadQR}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Скачать QR
      </button>
    </div>
  );
}
