"use client";
import React from "react";
import { useState, useEffect } from "react";

type GameType = "tic-tac-toe" | "snake" | "2048" | "memory";

export default function Games() {
  const [currentGame, setCurrentGame] = useState<GameType>("snake");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">🎮 Мини-игры</h1>
        
        {/* Выбор игры */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setCurrentGame('tic-tac-toe')}
            className={`p-2 sm:p-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-xs sm:text-base shadow-lg ${
              currentGame === 'tic-tac-toe' 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/50' 
                : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 shadow-gray-700/50'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg sm:text-2xl">❌⭕</span>
              <span className="hidden sm:block">Крестики-нолики</span>
              <span className="sm:hidden">X-O</span>
            </div>
          </button>
          <button
            onClick={() => setCurrentGame('snake')}
            className={`p-2 sm:p-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-xs sm:text-base shadow-lg ${
              currentGame === 'snake' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/50' 
                : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 shadow-gray-700/50'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg sm:text-2xl">🐍</span>
              <span className="hidden sm:block">Змейка</span>
              <span className="sm:hidden">Snake</span>
            </div>
          </button>
          <button
            onClick={() => setCurrentGame('2048')}
            className={`p-2 sm:p-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-xs sm:text-base shadow-lg ${
              currentGame === '2048' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/50' 
                : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 shadow-gray-700/50'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg sm:text-2xl">🎯</span>
              <span>2048</span>
            </div>
          </button>
          <button
            onClick={() => setCurrentGame('memory')}
            className={`p-2 sm:p-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-xs sm:text-base shadow-lg ${
              currentGame === 'memory' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/50' 
                : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 shadow-gray-700/50'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg sm:text-2xl">🧠</span>
              <span className="hidden sm:block">Память</span>
              <span className="sm:hidden">Memory</span>
            </div>
          </button>
        </div>

        {/* Игры */}
        {currentGame === "tic-tac-toe" && <TicTacToe />}
        {currentGame === "snake" && <Snake />}
        {currentGame === "2048" && <Game2048 />}
        {currentGame === "memory" && <Memory />}
      </div>
    </div>
  );
}

// Змейка с улучшенной графикой и плавным движением
function Snake() {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('snake-high-score') || '0');
    }
    return 0;
  });

  const gridSize = 25;
  const cellSize = 16;

  const startGame = () => {
    setGameStarted(true);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      
      if (e.key === " ") {
        if (!gameStarted) {
          startGame();
        } else {
          setIsPaused(!isPaused);
        }
        return;
      }
      
      if (!gameStarted || isPaused || gameOver) return;
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction[0] !== 1) setDirection([-1, 0]);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction[0] !== -1) setDirection([1, 0]);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction[1] !== 1) setDirection([0, -1]);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction[1] !== -1) setDirection([0, 1]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, isPaused, gameStarted, gameOver]);

  useEffect(() => {
    if (gameOver || isPaused || !gameStarted) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = [...newSnake[0]];
        
        head[0] += direction[0];
        head[1] += direction[1];

        if (head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize) {
          setGameOver(true);
          return prevSnake;
        }

        if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head[0] === food[0] && head[1] === food[1]) {
          const newScore = score + 10;
          setScore(newScore);
          
          if (newScore > highScore) {
            setHighScore(newScore);
            if (typeof window !== 'undefined') {
              localStorage.setItem('snake-high-score', newScore.toString());
            }
          }
          
          let newFood: [number, number];
          do {
            newFood = [
              Math.floor(Math.random() * gridSize),
              Math.floor(Math.random() * gridSize)
            ];
          } while (newSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, Math.max(60, 150 - Math.floor(score / 50) * 10));

    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, isPaused, score, gameStarted, highScore]);

  const resetGame = () => {
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGameStarted(false);
  };

  const getSnakeSegmentStyle = (index: number) => {
    const isHead = index === 0;
    const opacity = Math.max(0.7, 1 - (index * 0.03));
    
    if (isHead) {
      return `bg-gradient-to-br from-emerald-400 to-green-500 rounded-full shadow-lg border-2 border-emerald-300 transform scale-110`;
    } else {
      return `bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-md opacity-${Math.floor(opacity * 100)}`;
    }
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-700/50">
        <h2 className="text-2xl sm:text-3xl mb-4 font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">🐍 Змейка</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-3 rounded-xl border border-yellow-500/30">
            <p className="text-xs sm:text-sm text-yellow-400 font-semibold">Счет</p>
            <p className="text-lg sm:text-2xl font-bold text-yellow-300">{score}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl border border-purple-500/30">
            <p className="text-xs sm:text-sm text-purple-400 font-semibold">Рекорд</p>
            <p className="text-lg sm:text-2xl font-bold text-purple-300">{highScore}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl border border-blue-500/30 col-span-2 sm:col-span-1">
            <p className="text-xs sm:text-sm text-blue-400 font-semibold">Длина</p>
            <p className="text-lg sm:text-2xl font-bold text-blue-300">{snake.length}</p>
          </div>
        </div>
        
        {!gameStarted && (
          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <p className="text-2xl font-bold text-green-400 mb-3">🎮 Готовы играть?</p>
            <p className="text-green-300 mb-4">Нажмите пробел или кнопку ниже чтобы начать!</p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-white border border-green-500/30"
            >
              🚀 Начать игру
            </button>
          </div>
        )}
        
        {gameOver && (
          <div className="mb-6 p-6 rounded-2xl border-2 bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/50 animate-bounce">
            <p className="text-2xl font-bold text-red-400 mb-3">💀 Игра окончена!</p>
            <div className="space-y-2 text-red-300">
              <p>Финальный счет: <span className="font-bold text-yellow-400">{score}</span></p>
              <p>Длина змейки: <span className="font-bold text-blue-400">{snake.length}</span></p>
              {score === highScore && score > 0 && (
                <p className="text-purple-400 font-bold animate-pulse">🎉 Новый рекорд!</p>
              )}
            </div>
          </div>
        )}
        
        {isPaused && !gameOver && gameStarted && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
            <p className="text-yellow-400 font-bold flex items-center justify-center gap-2">
              ⏸️ Игра на паузе
            </p>
            <p className="text-yellow-300 text-sm mt-2">Нажмите пробел для продолжения</p>
          </div>
        )}
        
        <div className="relative mb-6">
          <div className="inline-block border-4 border-slate-600/50 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl overflow-hidden">
            <div 
              className="relative"
              style={{
                width: `${Math.min(gridSize * cellSize, 400)}px`,
                height: `${Math.min(gridSize * cellSize, 400)}px`,
                background: `
                  radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                  linear-gradient(45deg, rgba(15, 23, 42, 0.8) 25%, transparent 25%), 
                  linear-gradient(-45deg, rgba(15, 23, 42, 0.8) 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, rgba(15, 23, 42, 0.8) 75%), 
                  linear-gradient(-45deg, transparent 75%, rgba(15, 23, 42, 0.8) 75%)
                `,
                backgroundSize: `${cellSize * 2}px ${cellSize * 2}px`,
                backgroundPosition: '0 0, 0 0, 0 0, 0 8px, 8px -8px, -8px 0px'
              }}
            >
              {snake.map((segment, index) => {
                const isHead = index === 0;
                const opacity = Math.max(0.7, 1 - (index * 0.03));
                
                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-150 ease-out ${getSnakeSegmentStyle(index)}`}
                    style={{
                      left: `${segment[1] * cellSize + 1}px`,
                      top: `${segment[0] * cellSize + 1}px`,
                      width: `${cellSize - 2}px`,
                      height: `${cellSize - 2}px`,
                      zIndex: snake.length - index,
                      opacity: opacity
                    }}
                  >
                    {isHead && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xs transform transition-transform duration-150">
                          🐍
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              <div
                className="absolute bg-gradient-to-br from-red-400 via-pink-500 to-red-600 rounded-full shadow-lg animate-pulse border-2 border-red-300/50 transform transition-all duration-300"
                style={{
                  left: `${food[1] * cellSize + 1}px`,
                  top: `${food[0] * cellSize + 1}px`,
                  width: `${cellSize - 2}px`,
                  height: `${cellSize - 2}px`,
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs animate-bounce">🍎</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-slate-400">
            <p className="flex items-center gap-1">🎮 <span className="hidden sm:inline">Стрелки/WASD</span><span className="sm:hidden">Стрелки</span> - движение</p>
            <p className="flex items-center gap-1">⏸️ Пробел - пауза</p>
            <p className="flex items-center gap-1">🚀 <span className="hidden sm:inline">Пробел</span><span className="sm:hidden">Кнопка</span> - старт</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto sm:hidden">
            <div></div>
            <button
              onClick={() => !gameOver && gameStarted && setDirection([-1, 0])}
              disabled={!gameStarted || gameOver}
              className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 transform active:scale-95 touch-manipulation border border-slate-500/30"
            >
              ↑
            </button>
            <div></div>
            
            <button
              onClick={() => !gameOver && gameStarted && setDirection([0, -1])}
              disabled={!gameStarted || gameOver}
              className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 transform active:scale-95 touch-manipulation border border-slate-500/30"
            >
              ←
            </button>
            <button
              onClick={() => gameStarted ? setIsPaused(!isPaused) : startGame()}
              className="bg-gradient-to-br from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 px-4 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 transform active:scale-95 touch-manipulation border border-yellow-500/30"
            >
              {!gameStarted ? '🚀' : isPaused ? '▶️' : '⏸️'}
            </button>
            <button
              onClick={() => !gameOver && gameStarted && setDirection([0, 1])}
              disabled={!gameStarted || gameOver}
              className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 transform active:scale-95 touch-manipulation border border-slate-500/30"
            >
              →
            </button>
            
            <div></div>
            <button
              onClick={() => !gameOver && gameStarted && setDirection([1, 0])}
              disabled={!gameStarted || gameOver}
              className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 transform active:scale-95 touch-manipulation border border-slate-500/30"
            >
              ↓
            </button>
            <div></div>
          </div>
          
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-white border border-blue-500/30"
          >
            🔄 Новая игра
          </button>
        </div>
      </div>
    </div>
  );
}

// Крестики-нолики с улучшенным дизайном
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(line);
        return squares[a];
      }
    }
    return null;
  };

  const getAvailableMoves = (squares: (string | null)[]) => {
    return squares.map((square, index) => square === null ? index : null).filter(val => val !== null) as number[];
  };

  const minimax = (squares: (string | null)[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(squares);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    
    const availableMoves = getAvailableMoves(squares);
    if (availableMoves.length === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const move of availableMoves) {
        squares[move] = "O";
        const score = minimax(squares, depth + 1, false);
        squares[move] = null;
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const move of availableMoves) {
        squares[move] = "X";
        const score = minimax(squares, depth + 1, true);
        squares[move] = null;
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  };

  const getBestMove = (squares: (string | null)[]): number => {
    let bestScore = -Infinity;
    let bestMove = -1;
    
    const availableMoves = getAvailableMoves(squares);
    for (const move of availableMoves) {
      squares[move] = "O";
      const score = minimax(squares, 0, false);
      squares[move] = null;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;
    
    const newBoard = [...board];
    newBoard[index] = "X";
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setBoard(newBoard);
      return;
    }
    
    if (getAvailableMoves(newBoard).length === 0) {
      setBoard(newBoard);
      return;
    }
    
    setBoard(newBoard);
    setIsPlayerTurn(false);
    
    setTimeout(() => {
      setIsThinking(true);
      const botMove = getBestMove(newBoard);
      if (botMove !== -1) {
        newBoard[botMove] = "O";
        const botWinner = checkWinner(newBoard);
        if (botWinner) {
          setWinner(botWinner);
        }
        setBoard([...newBoard]);
      }
      setIsPlayerTurn(true);
      setIsThinking(false);
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-700/50">
        <h2 className="text-2xl sm:text-3xl mb-4 font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">❌⭕ Крестики-нолики</h2>
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="bg-blue-500/20 px-3 py-2 rounded-xl border border-blue-500/30">
            <span className="text-blue-400 font-semibold">Вы: X</span>
          </div>
          <div className="bg-red-500/20 px-3 py-2 rounded-xl border border-red-500/30">
            <span className="text-red-400 font-semibold">Бот: O</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-72 sm:w-80 mx-auto mb-6 p-4 bg-slate-900/50 rounded-2xl border border-slate-600/50">
          {board.map((cell, index) => {
            const isWinningCell = winningLine?.includes(index);
            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`
                  aspect-square bg-gradient-to-br from-slate-700 to-slate-800 
                  border-2 text-2xl sm:text-3xl font-bold 
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  touch-manipulation rounded-xl shadow-lg
                  ${
                    cell === null 
                      ? 'border-slate-600 hover:border-slate-500 hover:from-slate-600 hover:to-slate-700' 
                      : cell === 'X' 
                        ? 'border-blue-500/50 text-blue-400 shadow-blue-500/25' 
                        : 'border-red-500/50 text-red-400 shadow-red-500/25'
                  }
                  ${
                    isWinningCell 
                      ? 'animate-pulse bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border-yellow-400/50' 
                      : ''
                  }
                `}
                disabled={cell !== null || !!winner || isThinking}
              >
                {cell && (
                  <span className={`inline-block transition-all duration-300 ${
                    isWinningCell ? 'animate-bounce' : ''
                  }`}>
                    {cell}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        {winner && (
          <div className={`mb-6 p-4 rounded-2xl border-2 animate-bounce ${
            winner === 'X' 
              ? 'bg-green-500/20 border-green-500/50 text-green-400' 
              : winner === 'O' 
                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
          }`}>
            <p className="text-xl sm:text-2xl font-bold mb-2">
              {winner === 'X' ? '🎉 Вы победили!' : winner === 'O' ? '🤖 Бот победил!' : '🤝 Ничья!'}
            </p>
            <p className="text-sm opacity-80">
              {winner === 'X' ? 'Отличная игра!' : winner === 'O' ? 'Попробуйте еще раз!' : 'Хорошая партия!'}
            </p>
          </div>
        )}
        
        {!winner && getAvailableMoves(board).length === 0 && (
          <div className="mb-6 p-4 rounded-2xl border-2 bg-yellow-500/20 border-yellow-500/50 text-yellow-400 animate-bounce">
            <p className="text-xl sm:text-2xl font-bold mb-2">🤝 Ничья!</p>
            <p className="text-sm opacity-80">Никто не победил</p>
          </div>
        )}
        
        {isThinking && (
          <div className="mb-6 p-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30">
            <p className="text-yellow-400 font-semibold flex items-center justify-center gap-2">
              <span className="animate-spin">🤖</span>
              Бот думает...
            </p>
          </div>
        )}
        
        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-white border border-blue-500/30"
        >
          🔄 Новая игра
        </button>
      </div>
    </div>
  );
}

// 2048 с улучшенным дизайном и анимациями
function Game2048() {
  const [board, setBoard] = useState(() => {
    const initialBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(initialBoard);
    addRandomTile(initialBoard);
    return initialBoard;
  });
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('2048-best-score') || '0');
    }
    return 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [animatingTiles, setAnimatingTiles] = useState<{[key: string]: boolean}>({});

  function addRandomTile(grid: number[][]) {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  const moveLeft = (grid: number[][]) => {
    const newGrid = grid.map(row => [...row]);
    let moved = false;
    let scoreGain = 0;

    for (let i = 0; i < 4; i++) {
      const row = newGrid[i].filter(cell => cell !== 0);
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          scoreGain += row[j];
          if (row[j] === 2048 && !won) {
            setWon(true);
          }
          row.splice(j + 1, 1);
        }
      }
      while (row.length < 4) {
        row.push(0);
      }
      
      for (let j = 0; j < 4; j++) {
        if (newGrid[i][j] !== row[j]) {
          moved = true;
        }
        newGrid[i][j] = row[j];
      }
    }

    return { grid: newGrid, moved, scoreGain };
  };

  const rotateGrid = (grid: number[][]) => {
    const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newGrid[j][3 - i] = grid[i][j];
      }
    }
    return newGrid;
  };

  const move = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return;

    let currentGrid = [...board];
    let rotations = 0;

    switch (direction) {
      case 'right':
        rotations = 2;
        break;
      case 'up':
        rotations = 3;
        break;
      case 'down':
        rotations = 1;
        break;
    }

    for (let i = 0; i < rotations; i++) {
      currentGrid = rotateGrid(currentGrid);
    }

    const { grid: movedGrid, moved, scoreGain } = moveLeft(currentGrid);

    for (let i = 0; i < (4 - rotations) % 4; i++) {
      currentGrid = rotateGrid(movedGrid);
    }

    if (moved) {
      addRandomTile(currentGrid);
      setBoard(currentGrid);
      setScore(prev => {
        const newScore = prev + scoreGain;
        if (newScore > bestScore) {
          setBestScore(newScore);
          if (typeof window !== 'undefined') {
            localStorage.setItem('2048-best-score', newScore.toString());
          }
        }
        return newScore;
      });

      // Trigger animation
      setAnimatingTiles({});
      setTimeout(() => setAnimatingTiles({}), 150);

      // Check game over
      setTimeout(() => {
        if (!canMove(currentGrid)) {
          setGameOver(true);
        }
      }, 200);
    }
  };

  const canMove = (grid: number[][]) => {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) return true;
      }
    }

    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = grid[i][j];
        if (
          (i < 3 && grid[i + 1][j] === current) ||
          (j < 3 && grid[i][j + 1] === current)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const resetGame = () => {
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setAnimatingTiles({});
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          move('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          move('right');
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          move('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          move('down');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [board, gameOver]);

  const getTileColor = (value: number) => {
    const colors: {[key: number]: string} = {
      2: 'bg-gradient-to-br from-blue-200 to-blue-300 text-blue-800',
      4: 'bg-gradient-to-br from-blue-300 to-blue-400 text-blue-900',
      8: 'bg-gradient-to-br from-orange-300 to-orange-400 text-white',
      16: 'bg-gradient-to-br from-orange-400 to-orange-500 text-white',
      32: 'bg-gradient-to-br from-red-400 to-red-500 text-white',
      64: 'bg-gradient-to-br from-red-500 to-red-600 text-white',
      128: 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white',
      256: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white',
      512: 'bg-gradient-to-br from-yellow-600 to-orange-600 text-white',
      1024: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white',
      2048: 'bg-gradient-to-br from-pink-500 to-purple-600 text-white animate-pulse'
    };
    return colors[value] || 'bg-gradient-to-br from-gray-700 to-gray-800 text-white';
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-700/50">
        <h2 className="text-2xl sm:text-3xl mb-4 font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">🎯 2048</h2>
        
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-blue-500/20 px-4 py-2 rounded-xl border border-blue-500/30">
            <p className="text-blue-400 text-sm font-semibold">Счет</p>
            <p className="text-white text-xl font-bold">{score}</p>
          </div>
          <div className="bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-500/30">
            <p className="text-purple-400 text-sm font-semibold">Лучший</p>
            <p className="text-white text-xl font-bold">{bestScore}</p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-2xl border border-slate-600/50 mb-6">
          <div className="grid grid-cols-4 gap-2">
            {board.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center font-bold text-lg
                    transition-all duration-200 transform
                    ${cell === 0 
                      ? 'bg-slate-700/50 border border-slate-600/30' 
                      : `${getTileColor(cell)} shadow-lg scale-100 hover:scale-105`
                    }
                    ${animatingTiles[`${i}-${j}`] ? 'animate-bounce' : ''}
                  `}
                >
                  {cell !== 0 && (
                    <span className={`transition-all duration-200 ${
                      cell >= 1024 ? 'text-sm' : cell >= 100 ? 'text-base' : 'text-lg'
                    }`}>
                      {cell}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="block sm:hidden mb-6">
          <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
            <div></div>
            <button
              onClick={() => move('up')}
              className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 p-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation text-white border border-slate-500/30"
            >
              ⬆️
            </button>
            <div></div>
            <button
              onClick={() => move('left')}
              className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 p-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation text-white border border-slate-500/30"
            >
              ⬅️
            </button>
            <div></div>
            <button
              onClick={() => move('right')}
              className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 p-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation text-white border border-slate-500/30"
            >
              ➡️
            </button>
            <div></div>
            <button
              onClick={() => move('down')}
              className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 p-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation text-white border border-slate-500/30"
            >
              ⬇️
            </button>
            <div></div>
          </div>
        </div>

        {/* Desktop Instructions */}
        <div className="hidden sm:block mb-6 p-3 bg-slate-800/30 rounded-xl border border-slate-600/30">
          <p className="text-slate-300 text-sm">
            Используйте стрелки или WASD для движения
          </p>
        </div>

        {won && (
          <div className="mb-6 p-4 rounded-2xl border-2 bg-yellow-500/20 border-yellow-500/50 text-yellow-400 animate-bounce">
            <p className="text-xl sm:text-2xl font-bold mb-2">🎉 Вы достигли 2048!</p>
            <p className="text-sm opacity-80">Продолжайте играть для большего счета!</p>
          </div>
        )}

        {gameOver && (
          <div className="mb-6 p-4 rounded-2xl border-2 bg-red-500/20 border-red-500/50 text-red-400 animate-bounce">
            <p className="text-xl sm:text-2xl font-bold mb-2">💀 Игра окончена!</p>
            <p className="text-sm opacity-80">Финальный счет: {score}</p>
          </div>
        )}

        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-white border border-yellow-500/30"
        >
          🔄 Новая игра
        </button>
      </div>
    </div>
  );
}

// Игра на память с улучшенным дизайном
function Memory() {
  const cardSymbols = ['🎯', '🎮', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺'];
  const [cards, setCards] = useState<{id: number, symbol: string, isFlipped: boolean, isMatched: boolean}[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('memory-best-score') || '999');
    }
    return 999;
  });

  const initializeGame = () => {
    const shuffledCards = [...cardSymbols, ...cardSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCard, secondCard] = newFlippedCards.map(id => cards[id]);
      
      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            newFlippedCards.includes(card.id) 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === 8) {
              setGameWon(true);
              const currentMoves = moves + 1;
              if (currentMoves < bestScore) {
                setBestScore(currentMoves);
                if (typeof window !== 'undefined') {
                  localStorage.setItem('memory-best-score', currentMoves.toString());
                }
              }
            }
            return newMatches;
          });
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            newFlippedCards.includes(card.id) 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-700/50">
        <h2 className="text-2xl sm:text-3xl mb-4 font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">🧠 Память</h2>
        
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-blue-500/20 px-4 py-2 rounded-xl border border-blue-500/30">
            <p className="text-blue-400 text-sm font-semibold">Ходы</p>
            <p className="text-white text-xl font-bold">{moves}</p>
          </div>
          <div className="bg-green-500/20 px-4 py-2 rounded-xl border border-green-500/30">
            <p className="text-green-400 text-sm font-semibold">Пары</p>
            <p className="text-white text-xl font-bold">{matches}/8</p>
          </div>
          <div className="bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-500/30">
            <p className="text-purple-400 text-sm font-semibold">Рекорд</p>
            <p className="text-white text-xl font-bold">{bestScore === 999 ? '-' : bestScore}</p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-2xl border border-slate-600/50 mb-6">
          <div className="grid grid-cols-4 gap-2">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
                className={`
                  aspect-square rounded-xl flex items-center justify-center text-2xl font-bold
                  transition-all duration-500 transform perspective-1000
                  ${
                    card.isFlipped || card.isMatched
                      ? card.isMatched
                        ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-500/25 scale-105 animate-pulse'
                        : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 shadow-lg border border-slate-500/30'
                  }
                  hover:scale-105 active:scale-95 touch-manipulation
                  ${card.isFlipped && !card.isMatched ? 'animate-bounce' : ''}
                `}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: card.isFlipped || card.isMatched ? 'rotateY(0deg)' : 'rotateY(180deg)'
                }}
              >
                <div 
                  className={`
                    transition-all duration-500 transform
                    ${card.isFlipped || card.isMatched ? 'rotateY-0' : 'rotateY-180'}
                  `}
                  style={{
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {card.isFlipped || card.isMatched ? (
                    <span className="drop-shadow-lg">{card.symbol}</span>
                  ) : (
                    <span className="text-slate-400">❓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {gameWon && (
          <div className="mb-6 p-4 rounded-2xl border-2 bg-green-500/20 border-green-500/50 text-green-400 animate-bounce">
            <p className="text-xl sm:text-2xl font-bold mb-2">🎉 Поздравляем!</p>
            <p className="text-sm opacity-80">
              Игра завершена за {moves} {moves === 1 ? 'ход' : moves < 5 ? 'хода' : 'ходов'}!
              {moves < bestScore && <span className="block text-yellow-400 font-semibold mt-1">🏆 Новый рекорд!</span>}
            </p>
          </div>
        )}

        <div className="mb-6 p-3 bg-slate-800/30 rounded-xl border border-slate-600/30">
          <p className="text-slate-300 text-sm">
            Найдите все пары карт с одинаковыми символами
          </p>
        </div>

        <button
          onClick={initializeGame}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-white border border-purple-500/30"
        >
          🔄 Новая игра
        </button>
      </div>
    </div>
  );
}
