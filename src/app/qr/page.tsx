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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-3 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">📱 QR Code Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Левая панель - настройки */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Текст для QR кода:</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none text-sm sm:text-base"
                rows={3}
                placeholder="Введите текст или URL..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Цвет фона:</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded border border-gray-600 cursor-pointer touch-manipulation"
                  />
                  <span className="text-xs sm:text-sm text-gray-300">{bgColor}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Цвет QR кода:</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded border border-gray-600 cursor-pointer touch-manipulation"
                  />
                  <span className="text-xs sm:text-sm text-gray-300">{fgColor}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Размер: {size}px</label>
              <input
                type="range"
                min="128"
                max="512"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>128px</span>
                <span>512px</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Изображение в центре (опционально):</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm file:mr-2 sm:file:mr-4 file:py-2 file:px-2 sm:file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:text-xs sm:file:text-sm touch-manipulation"
              />
              {centerImage && (
                <div className="mt-2">
                  <p className="text-sm text-green-400 mb-2">✓ Изображение загружено</p>
                  <button
                    onClick={() => setCenterImage(null)}
                    className="text-sm text-red-400 hover:text-red-300 touch-manipulation"
                  >
                    Удалить изображение
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Правая панель - превью и скачивание */}
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg max-w-full overflow-hidden">
              <div className="flex justify-center">
                <QRCodeCanvas
                  id="qr-gen"
                  value={text}
                  size={Math.min(size, 300)}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>
            
            <button
              onClick={downloadQR}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm sm:text-base touch-manipulation w-full sm:w-auto justify-center"
            >
              <span>📥</span>
              <span>Скачать QR код</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
