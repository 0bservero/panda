"use client";
import React from "react";
import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const percentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const toggleSign = () => {
    if (display !== "0") {
      setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display);
    }
  };

  const sqrt = () => {
    const value = Math.sqrt(parseFloat(display));
    setDisplay(String(value));
  };

  const square = () => {
    const value = Math.pow(parseFloat(display), 2);
    setDisplay(String(value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-3 sm:p-6 md:p-8">
      <div className="max-w-sm sm:max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">🧮 Калькулятор</h1>
        
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
          {/* Дисплей */}
          <div className="bg-gray-900 rounded-lg p-3 sm:p-4 mb-4">
            <div className="text-right text-xl sm:text-2xl font-mono min-h-[2rem] break-all">
              {display || "0"}
            </div>
          </div>

          {/* Кнопки */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {/* Первый ряд */}
            <button onClick={clear} className="col-span-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              C
            </button>
            <button onClick={clearEntry} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              ⌫
            </button>
            <button onClick={() => inputOperation("÷")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              ÷
            </button>

            {/* Дополнительные функции */}
            <button onClick={sqrt} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              √
            </button>
            <button onClick={square} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              x²
            </button>
            <button onClick={percentage} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              %
            </button>
            <button onClick={toggleSign} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              ±
            </button>

            {/* Второй ряд */}
            <button onClick={() => inputNumber("7")} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              7
            </button>
            <button onClick={() => inputNumber("8")} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              8
            </button>
            <button onClick={() => inputNumber("9")} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              9
            </button>
            <button onClick={() => inputOperation("×")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              ×
            </button>

            {/* Четвертый ряд */}
            <button onClick={() => inputNumber("4")} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              4
            </button>
            <button onClick={() => inputNumber("5")} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              5
            </button>
            <button onClick={() => inputNumber("6")} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              6
            </button>
            <button onClick={() => inputOperation("+")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              +
            </button>

            {/* Пятый ряд */}
            <button onClick={() => inputNumber("1")} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              1
            </button>
            <button onClick={() => inputNumber("2")} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              2
            </button>
            <button onClick={() => inputNumber("3")} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              3
            </button>
            <button onClick={performCalculation} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              =
            </button>

            {/* Шестой ряд */}
            <button onClick={() => inputNumber("0")} className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              0
            </button>
            <button onClick={inputDecimal} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors touch-manipulation text-sm sm:text-base">
              .
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
