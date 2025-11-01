"use client";
import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

type ChartType = "line" | "bar" | "pie" | "area" | "scatter" | "doughnut" | "radar" | "histogram";

interface DataPoint {
  label: string;
  value: number;
}

export default function Charts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [data, setData] = useState<DataPoint[]>([
    { label: "Январь", value: 65 },
    { label: "Февраль", value: 59 },
    { label: "Март", value: 80 },
    { label: "Апрель", value: 81 },
    { label: "Май", value: 56 }
  ]);
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");
  const [chartTitle, setChartTitle] = useState("Мой график");

  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"
  ];

  const gradients = [
    ["#FF6B6B", "#FF8E8E"], ["#4ECDC4", "#7FDBDA"], ["#45B7D1", "#6BC5E8"],
    ["#96CEB4", "#B8D8C7"], ["#FFEAA7", "#FFE5B4"], ["#DDA0DD", "#E6B3E6"],
    ["#98D8C8", "#B0E0D6"], ["#F7DC6F", "#F9E79F"], ["#BB8FCE", "#D2B4DE"],
    ["#85C1E9", "#A9CCE3"]
  ];

  const createGradient = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, colors: string[]) => {
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    return gradient;
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 0.5;
    
    // Вертикальные линии
    for (let i = 0; i <= 10; i++) {
      const x = area.x + (area.width / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, area.y);
      ctx.lineTo(x, area.y + area.height);
      ctx.stroke();
    }
    
    // Горизонтальные линии
    for (let i = 0; i <= 8; i++) {
      const y = area.y + (area.height / 8) * i;
      ctx.beginPath();
      ctx.moveTo(area.x, y);
      ctx.lineTo(area.x + area.width, y);
      ctx.stroke();
    }
  };

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Включаем сглаживание
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const width = canvas.width;
    const height = canvas.height;

    // Очистка и фон с градиентом
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, "#1F2937");
    bgGradient.addColorStop(1, "#111827");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Заголовок с тенью
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 28px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(chartTitle, width / 2, 45);
    ctx.shadowBlur = 0;

    const chartArea = {
      x: 80,
      y: 80,
      width: width - 160,
      height: height - 160
    };

    // Рисуем сетку
    drawGrid(ctx, chartArea);

    // Рисуем график
    switch (chartType) {
      case "bar":
        drawBarChart(ctx, chartArea);
        break;
      case "line":
        drawLineChart(ctx, chartArea);
        break;
      case "area":
        drawAreaChart(ctx, chartArea);
        break;
      case "pie":
        drawPieChart(ctx, chartArea);
        break;
      case "doughnut":
        drawDoughnutChart(ctx, chartArea);
        break;
      case "scatter":
        drawScatterChart(ctx, chartArea);
        break;
      case "radar":
        drawRadarChart(ctx, chartArea);
        break;
      case "histogram":
        drawHistogramChart(ctx, chartArea);
        break;
    }
  }, [chartType, data, chartTitle]);

  const drawBarChart = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = area.width / data.length * 0.7;
    const barSpacing = area.width / data.length * 0.3;

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * area.height;
      const x = area.x + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = area.y + area.height - barHeight;

      // Градиент для столбца
      const gradient = createGradient(ctx, x, y, x, y + barHeight, gradients[index % gradients.length]);
      ctx.fillStyle = gradient;
      
      // Тень
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 4;
      
      // Закругленные углы
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, [8, 8, 0, 0]);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Подпись
      ctx.fillStyle = "#E5E7EB";
      ctx.font = "bold 14px 'Segoe UI'";
      ctx.textAlign = "center";
      ctx.fillText(item.label, x + barWidth / 2, area.y + area.height + 25);
      
      // Значение
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 16px 'Segoe UI'";
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 10);
    });
  };

  const drawLineChart = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue || 1;

    // Рисуем линию
    ctx.strokeStyle = "#3B82F6";
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((item, index) => {
      const x = area.x + (index / (data.length - 1)) * area.width;
      const y = area.y + area.height - ((item.value - minValue) / valueRange) * area.height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Точки
      ctx.fillStyle = "#3B82F6";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Подписи
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(item.label, x, area.y + area.height + 20);
      ctx.fillText(item.value.toString(), x, y - 10);
    });

    ctx.stroke();
  };

  const drawAreaChart = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue || 1;

    // Создаем градиент для заливки
    const areaGradient = ctx.createLinearGradient(0, area.y, 0, area.y + area.height);
    areaGradient.addColorStop(0, "rgba(59, 130, 246, 0.6)");
    areaGradient.addColorStop(1, "rgba(59, 130, 246, 0.1)");

    ctx.beginPath();
    ctx.moveTo(area.x, area.y + area.height);

    data.forEach((item, index) => {
      const x = area.x + (index / (data.length - 1)) * area.width;
      const y = area.y + area.height - ((item.value - minValue) / valueRange) * area.height;
      
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(area.x + area.width, area.y + area.height);
    ctx.closePath();
    ctx.fillStyle = areaGradient;
    ctx.fill();

    // Рисуем линию поверх
    ctx.strokeStyle = "#3B82F6";
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((item, index) => {
      const x = area.x + (index / (data.length - 1)) * area.width;
      const y = area.y + area.height - ((item.value - minValue) / valueRange) * area.height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  };

  const drawScatterChart = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue || 1;

    data.forEach((item, index) => {
      const x = area.x + (index / (data.length - 1)) * area.width;
      const y = area.y + area.height - ((item.value - minValue) / valueRange) * area.height;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
      gradient.addColorStop(0, colors[index % colors.length]);
      gradient.addColorStop(1, colors[index % colors.length] + "80");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Обводка
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  const drawDoughnutChart = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const centerX = area.x + area.width / 2;
    const centerY = area.y + area.height / 2;
    const outerRadius = Math.min(area.width, area.height) / 2 - 20;
    const innerRadius = outerRadius * 0.6;

    let currentAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * Math.PI * 2;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
      gradient.addColorStop(0, gradients[index % gradients.length][0]);
      gradient.addColorStop(1, gradients[index % gradients.length][1]);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fill();

      currentAngle += sliceAngle;
    });

    // Центральный текст
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 24px 'Segoe UI'";
    ctx.textAlign = "center";
    ctx.fillText(total.toString(), centerX, centerY);
  };

  const drawRadarChart = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    const centerX = area.x + area.width / 2;
    const centerY = area.y + area.height / 2;
    const radius = Math.min(area.width, area.height) / 2 - 40;
    const maxValue = Math.max(...data.map(d => d.value));

    // Рисуем сетку
    for (let i = 1; i <= 5; i++) {
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      const points = data.length;
      for (let j = 0; j < points; j++) {
        const angle = (j / points) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * i / 5);
        const y = centerY + Math.sin(angle) * (radius * i / 5);
        
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Рисуем данные
    ctx.fillStyle = "rgba(59, 130, 246, 0.3)";
    ctx.strokeStyle = "#3B82F6";
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((item, index) => {
      const angle = (index / data.length) * Math.PI * 2 - Math.PI / 2;
      const distance = (item.value / maxValue) * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  const drawHistogramChart = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = area.width / data.length;

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * area.height;
      const x = area.x + index * barWidth;
      const y = area.y + area.height - barHeight;

      const gradient = createGradient(ctx, x, y, x, y + barHeight, gradients[index % gradients.length]);
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
      
      // Обводка
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barWidth - 1, barHeight);
    });
  };

  const drawPieChart = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const centerX = area.x + area.width / 2;
    const centerY = area.y + area.height / 2;
    const radius = Math.min(area.width, area.height) / 2 - 20;

    let currentAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * Math.PI * 2;
      
      // Рисуем сектор
      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      // Подпись
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
      const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
      
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${item.label}: ${item.value}`, labelX, labelY);

      currentAngle += sliceAngle;
    });
  };

  const addDataPoint = () => {
    if (newLabel && newValue) {
      setData([...data, { label: newLabel, value: parseFloat(newValue) }]);
      setNewLabel("");
      setNewValue("");
    }
  };

  const removeDataPoint = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const downloadChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${chartTitle.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    drawChart();
  }, [drawChart]);

    function generateChart(event: React.MouseEvent<HTMLButtonElement>): void {
        drawChart();
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-3 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">📊 Генератор графиков</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Панель управления */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">⚙️ Настройки</h2>
              <div className="mb-4">
                <label className="block text-sm mb-2">Заголовок:</label>
                <input
                  type="text"
                  value={chartTitle}
                  onChange={(e) => setChartTitle(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Тип графика:</label>
                  <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value as ChartType)}
                    className="w-full p-2 sm:p-3 bg-gray-700 border border-gray-600 rounded text-white text-sm sm:text-base touch-manipulation"
                  >
                    <option value="bar">📊 Столбчатый</option>
                    <option value="line">📈 Линейный</option>
                    <option value="area">🏔️ Площадной</option>
                    <option value="pie">🥧 Круговой</option>
                    <option value="doughnut">🍩 Кольцевой</option>
                    <option value="scatter">⭐ Точечный</option>
                    <option value="radar">🎯 Радарный</option>
                    <option value="histogram">📋 Гистограмма</option>
                  </select>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Добавить данные:</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Название"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="flex-1 p-2 rounded bg-gray-700 text-white"
                    />
                    <input
                      type="number"
                      placeholder="Значение"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-24 p-2 rounded bg-gray-700 text-white"
                    />
                  </div>
                  <button
                    onClick={addDataPoint}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base touch-manipulation"
                  >
                    Добавить
                  </button>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Данные:</h3>
                  <div className="space-y-2">
                    {data.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                        <span>{item.label}: {item.value}</span>
                        <button
                          onClick={() => removeDataPoint(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateChart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base touch-manipulation"
                >
                  🎨 Создать график
                </button>
              </div>
            </div>
          </div>

          {/* Область графика */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold">📈 График</h2>
                <button
                  onClick={downloadChart}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm sm:text-base touch-manipulation w-full sm:w-auto justify-center"
                >
                  <span>💾</span>
                  <span>Скачать</span>
                </button>
              </div>

              <div className="bg-white rounded-lg p-2 sm:p-4 flex justify-center items-center overflow-auto" style={{ minHeight: '300px' }}>
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="max-w-full max-h-full"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}