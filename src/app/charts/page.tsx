"use client";
import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

type ChartType = "line" | "bar" | "pie";

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
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
    "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1"
  ];

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Очистка canvas
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#1F2937";
    ctx.fillRect(0, 0, width, height);

    // Заголовок
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(chartTitle, width / 2, 40);

    const chartArea = {
      x: 80,
      y: 70,
      width: width - 160,
      height: height - 140
    };

    if (chartType === "bar") {
      drawBarChart(ctx, chartArea);
    } else if (chartType === "line") {
      drawLineChart(ctx, chartArea);
    } else if (chartType === "pie") {
      drawPieChart(ctx, chartArea);
    }
  }, [chartType, data, chartTitle]);

  const drawBarChart = (ctx: CanvasRenderingContext2D, area: { x: number; y: number; width: number; height: number }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = area.width / data.length * 0.8;
    const barSpacing = area.width / data.length * 0.2;

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * area.height;
      const x = area.x + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = area.y + area.height - barHeight;

      // Рисуем столбец
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x, y, barWidth, barHeight);

      // Подпись
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(item.label, x + barWidth / 2, area.y + area.height + 20);
      
      // Значение
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">📊 Генератор графиков</h1>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Настройки */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Настройки</h2>
          
          <div className="mb-4">
            <label className="block text-sm mb-2">Заголовок:</label>
            <input
              type="text"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Тип графика:</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="bar">Столбчатый</option>
              <option value="line">Линейный</option>
              <option value="pie">Круговой</option>
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
              className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
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
            onClick={downloadChart}
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-semibold"
          >
            📥 Скачать график
          </button>
        </div>

        {/* График */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full border border-gray-600 rounded"
          />
        </div>
      </div>
    </div>
  );
}
