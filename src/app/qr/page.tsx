// src/app/qr/page.tsx
"use client";

import React from "react";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";

export default function QRPage() {
  const [text, setText] = useState("https://example.com");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [size, setSize] = useState(200);
  const [centerImage, setCenterImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState(40);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCenterImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = () => {
    const qrCanvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    const downloadCanvas = document.createElement("canvas");
    const ctx = downloadCanvas.getContext("2d");
    
    downloadCanvas.width = size;
    downloadCanvas.height = size;
    
    if (ctx) {
      // Рисуем QR код
      ctx.drawImage(qrCanvas, 0, 0);
      
      // Если есть картинка в центре, добавляем её
      if (centerImage) {
        const img = new window.Image();
        img.onload = () => {
          const centerX = size / 2;
          const centerY = size / 2;
          const imgX = centerX - imageSize / 2;
          const imgY = centerY - imageSize / 2;
          
          // Добавляем белый фон под картинку для лучшей читаемости
          ctx.fillStyle = bgColor;
          ctx.fillRect(imgX - 5, imgY - 5, imageSize + 10, imageSize + 10);
          
          // Рисуем картинку
          ctx.drawImage(img, imgX, imgY, imageSize, imageSize);
          
          // Скачиваем
          const pngUrl = downloadCanvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = "qr-code.png";
          downloadLink.click();
        };
        img.src = centerImage;
      } else {
        // Скачиваем без картинки
        const pngUrl = downloadCanvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        downloadLink.click();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">📲 QR Генератор</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст или ссылку"
          className="border p-2 rounded w-full text-black bg-white"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Цвет фона:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 rounded border"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Цвет QR:</label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-10 rounded border"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Размер: {size}px</label>
          <input
            type="range"
            min="100"
            max="400"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Картинка в центре:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-white"
          />
          {centerImage && (
            <div className="mt-2">
              <label className="block text-sm mb-1">Размер картинки: {imageSize}px</label>
              <input
                type="range"
                min="20"
                max="80"
                value={imageSize}
                onChange={(e) => setImageSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <canvas
          id="qr-container"
          width={size}
          height={size}
          className="hidden"
        />
        <QRCodeCanvas
          id="qr-gen"
          value={text}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level="H"
          includeMargin={true}
        />
        {centerImage && (
          <Image
            src={centerImage}
            alt="Center"
            width={imageSize}
            height={imageSize}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded object-cover"
          />
        )}
      </div>

      <button
        onClick={downloadQR}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Скачать QR
      </button>
    </div>
  );
}
