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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">🧮 Калькулятор</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Дисплей */}
        <div className="bg-black p-4 rounded mb-4 text-right">
          <div className="text-3xl font-mono overflow-hidden">
            {display}
          </div>
        </div>

        {/* Кнопки */}
        <div className="grid grid-cols-4 gap-2">
          {/* Первый ряд */}
          <button onClick={clear} className="bg-red-600 hover:bg-red-700 p-4 rounded text-lg font-semibold">
            C
          </button>
          <button onClick={clearEntry} className="bg-red-500 hover:bg-red-600 p-4 rounded text-lg font-semibold">
            CE
          </button>
          <button onClick={percentage} className="bg-blue-600 hover:bg-blue-700 p-4 rounded text-lg font-semibold">
            %
          </button>
          <button onClick={() => inputOperation("÷")} className="bg-orange-600 hover:bg-orange-700 p-4 rounded text-lg font-semibold">
            ÷
          </button>

          {/* Второй ряд */}
          <button onClick={sqrt} className="bg-blue-600 hover:bg-blue-700 p-4 rounded text-lg font-semibold">
            √
          </button>
          <button onClick={square} className="bg-blue-600 hover:bg-blue-700 p-4 rounded text-lg font-semibold">
            x²
          </button>
          <button onClick={toggleSign} className="bg-blue-600 hover:bg-blue-700 p-4 rounded text-lg font-semibold">
            ±
          </button>
          <button onClick={() => inputOperation("×")} className="bg-orange-600 hover:bg-orange-700 p-4 rounded text-lg font-semibold">
            ×
          </button>

          {/* Третий ряд */}
          <button onClick={() => inputNumber("7")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            7
          </button>
          <button onClick={() => inputNumber("8")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            8
          </button>
          <button onClick={() => inputNumber("9")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            9
          </button>
          <button onClick={() => inputOperation("-")} className="bg-orange-600 hover:bg-orange-700 p-4 rounded text-lg font-semibold">
            -
          </button>

          {/* Четвертый ряд */}
          <button onClick={() => inputNumber("4")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            4
          </button>
          <button onClick={() => inputNumber("5")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            5
          </button>
          <button onClick={() => inputNumber("6")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            6
          </button>
          <button onClick={() => inputOperation("+")} className="bg-orange-600 hover:bg-orange-700 p-4 rounded text-lg font-semibold">
            +
          </button>

          {/* Пятый ряд */}
          <button onClick={() => inputNumber("1")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            1
          </button>
          <button onClick={() => inputNumber("2")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            2
          </button>
          <button onClick={() => inputNumber("3")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            3
          </button>
          <button onClick={performCalculation} className="bg-green-600 hover:bg-green-700 p-4 rounded text-lg font-semibold row-span-2">
            =
          </button>

          {/* Шестой ряд */}
          <button onClick={() => inputNumber("0")} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold col-span-2">
            0
          </button>
          <button onClick={inputDecimal} className="bg-gray-600 hover:bg-gray-700 p-4 rounded text-lg font-semibold">
            .
          </button>
        </div>
      </div>
    </div>
  );
}
