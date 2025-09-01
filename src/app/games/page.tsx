"use client";
import React from "react";
import { useState, useEffect } from "react";

type GameType = "tic-tac-toe" | "snake" | "2048" | "memory";

export default function Games() {
  const [currentGame, setCurrentGame] = useState<GameType>("tic-tac-toe");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-3 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">🎮 Мини-игры</h1>
        
        {/* Выбор игры */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setCurrentGame('tic-tac-toe')}
            className={`p-3 sm:p-4 rounded-lg font-semibold transition-all touch-manipulation text-sm sm:text-base ${
              currentGame === 'tic-tac-toe' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            ❌⭕ Крестики-нолики
          </button>
          <button
            onClick={() => setCurrentGame('snake')}
            className={`p-3 sm:p-4 rounded-lg font-semibold transition-all touch-manipulation text-sm sm:text-base ${
              currentGame === 'snake' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            🐍 Змейка
          </button>
          <button
            onClick={() => setCurrentGame('2048')}
            className={`p-3 sm:p-4 rounded-lg font-semibold transition-all touch-manipulation text-sm sm:text-base ${
              currentGame === '2048' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            🎯 2048
          </button>
          <button
            onClick={() => setCurrentGame('memory')}
            className={`p-3 sm:p-4 rounded-lg font-semibold transition-all touch-manipulation text-sm sm:text-base ${
              currentGame === 'memory' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            🧠 Память
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

// Крестики-нолики
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
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
    
    // Проверяем на ничью
    if (getAvailableMoves(newBoard).length === 0) {
      setBoard(newBoard);
      return;
    }
    
    setBoard(newBoard);
    setIsPlayerTurn(false);
    
    // Ход бота через небольшую задержку
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
  };

  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4">❌⭕ Крестики-нолики</h2>
      <p className="mb-3 sm:mb-4 text-sm sm:text-base">Вы: X | Бот: O</p>
      
      <div className="grid grid-cols-3 gap-2 w-48 sm:w-64 mx-auto mb-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-700 border border-gray-500 text-xl sm:text-2xl font-bold hover:bg-gray-600 transition-colors touch-manipulation"
            disabled={cell !== null || !!winner || isThinking}
          >
            {cell}
          </button>
        ))}
      </div>
      
      {winner && (
        <p className="text-lg sm:text-xl mb-3 sm:mb-4">
          {winner === 'X' ? 'Вы победили!' : winner === 'O' ? 'Бот победил!' : 'Ничья!'}
        </p>
      )}
      
      {!winner && getAvailableMoves(board).length === 0 && (
        <p className="text-lg sm:text-xl mb-3 sm:mb-4">Ничья!</p>
      )}
      
      {isThinking && <p className="text-yellow-400 mb-3 sm:mb-4 text-sm sm:text-base">Бот думает...</p>}
      
      <button
        onClick={resetGame}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg transition-all touch-manipulation text-sm sm:text-base"
      >
        🔄 Новая игра
      </button>
    </div>
  );
}

// Змейка
function Snake() {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const gridSize = 20;
  const cellSize = 20;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setIsPaused(!isPaused);
        return;
      }
      
      if (isPaused) return;
      
      switch (e.key) {
        case "ArrowUp":
          if (direction[0] !== 1) setDirection([-1, 0]);
          break;
        case "ArrowDown":
          if (direction[0] !== -1) setDirection([1, 0]);
          break;
        case "ArrowLeft":
          if (direction[1] !== 1) setDirection([0, -1]);
          break;
        case "ArrowRight":
          if (direction[1] !== -1) setDirection([0, 1]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, isPaused]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = [...newSnake[0]];
        
        head[0] += direction[0];
        head[1] += direction[1];

        // Проверка столкновения со стенами
        if (head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize) {
          setGameOver(true);
          return prevSnake;
        }

        // Проверка столкновения с собой
        if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Проверка поедания еды
        if (head[0] === food[0] && head[1] === food[1]) {
          setScore(prev => prev + 1);
          // Генерируем еду в свободном месте
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
    }, Math.max(80, 200 - score * 5)); // Ускоряется с ростом счета

    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, isPaused, score]);

  const resetGame = () => {
    setSnake([[5, 5]]);
    setFood([10, 10]);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const getSnakeSegmentStyle = (index: number, segment: number[]) => {
    const isHead = index === 0;
    const isTail = index === snake.length - 1;
    
    if (isHead) {
      return "bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg border-2 border-green-300";
    } else if (isTail) {
      return "bg-gradient-to-br from-green-600 to-green-800 rounded-lg";
    } else {
      return "bg-gradient-to-br from-green-500 to-green-700 rounded-md";
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4">🐍 Змейка</h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-3 sm:mb-4">
        <p className="text-lg sm:text-xl">🏆 Счет: <span className="text-yellow-400 font-bold">{score}</span></p>
        <p className="text-sm sm:text-lg">⚡ Скорость: {Math.min(10, Math.floor(score / 3) + 1)}</p>
      </div>
      
      {gameOver && (
        <div className="mb-4 p-4 bg-red-900 rounded-lg border border-red-500">
          <p className="text-xl text-red-400 mb-2">💀 Игра окончена!</p>
          <p className="text-gray-300">Финальный счет: {score}</p>
        </div>
      )}
      
      {isPaused && !gameOver && (
        <div className="mb-4 p-3 bg-yellow-900 rounded-lg border border-yellow-500">
          <p className="text-yellow-400">⏸️ Пауза</p>
        </div>
      )}
      
      <div className="inline-block border-2 sm:border-4 border-gray-600 rounded-lg mb-4 bg-gray-900 shadow-2xl">
        <div 
          className="relative"
          style={{
            width: `${Math.min(gridSize * cellSize, 320)}px`,
            height: `${Math.min(gridSize * cellSize, 320)}px`,
            background: 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          {/* Змейка */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-75 ${getSnakeSegmentStyle(index, segment)}`}
              style={{
                left: `${segment[1] * cellSize + 1}px`,
                top: `${segment[0] * cellSize + 1}px`,
                width: `${cellSize - 2}px`,
                height: `${cellSize - 2}px`,
                zIndex: snake.length - index
              }}
            >
              {index === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xs">👁️</div>
                </div>
              )}
            </div>
          ))}
          
          {/* Еда */}
          <div
            className="absolute bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg animate-pulse border-2 border-red-300"
            style={{
              left: `${food[1] * cellSize + 2}px`,
              top: `${food[0] * cellSize + 2}px`,
              width: `${cellSize - 4}px`,
              height: `${cellSize - 4}px`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-xs">🍎</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
          <p>🎮 Стрелки - движение</p>
          <p>⏸️ Пробел - пауза</p>
        </div>
        
        {/* Mobile controls */}
        <div className="sm:hidden space-y-2">
          <div className="flex justify-center">
            <button
              onClick={() => setDirection([-1, 0])}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm touch-manipulation"
            >
              ↑
            </button>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setDirection([0, -1])}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm touch-manipulation"
            >
              ←
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm touch-manipulation"
            >
              ⏸️
            </button>
            <button
              onClick={() => setDirection([0, 1])}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm touch-manipulation"
            >
              →
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setDirection([1, 0])}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm touch-manipulation"
            >
              ↓
            </button>
          </div>
        </div>
        
        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg transition-all touch-manipulation text-sm sm:text-base"
        >
          🔄 Новая игра
        </button>
      </div>
    </div>
  );
}

// 2048
function Game2048() {
  const [board, setBoard] = useState(() => {
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  });
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('2048-best') || '0');
    }
    return 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [animatingCells, setAnimatingCells] = useState<{[key: string]: boolean}>({});

  function addRandomTile(board: number[][]) {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  const slideArray = (arr: number[]) => {
    const filtered = arr.filter(val => val !== 0);
    const missing = 4 - filtered.length;
    const zeros = Array(missing).fill(0);
    return filtered.concat(zeros);
  };

  const combineArray = (arr: number[]) => {
    let newScore = 0;
    for (let i = 0; i < 3; i++) {
      if (arr[i] !== 0 && arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        arr[i + 1] = 0;
        newScore += arr[i];
        if (arr[i] === 2048 && !won) {
          setWon(true);
        }
      }
    }
    return { arr, score: newScore };
  };

  const moveLeft = (board: number[][]) => {
    let newScore = 0;
    let moved = false;
    const newBoard = board.map(row => {
      const originalRow = [...row];
      const { arr: combinedRow, score } = combineArray(slideArray(row));
      const finalRow = slideArray(combinedRow);
      newScore += score;
      if (JSON.stringify(originalRow) !== JSON.stringify(finalRow)) {
        moved = true;
      }
      return finalRow;
    });
    return { board: newBoard, score: newScore, moved };
  };

  const moveRight = (board: number[][]) => {
    const reversedBoard = board.map(row => [...row].reverse());
    const { board: movedBoard, score, moved } = moveLeft(reversedBoard);
    return { 
      board: movedBoard.map(row => [...row].reverse()), 
      score, 
      moved 
    };
  };

  const moveUp = (board: number[][]) => {
    const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    const { board: movedBoard, score, moved } = moveLeft(transposed);
    return { 
      board: movedBoard[0].map((_, colIndex) => movedBoard.map(row => row[colIndex])), 
      score, 
      moved 
    };
  };

  const moveDown = (board: number[][]) => {
    const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    const { board: movedBoard, score, moved } = moveRight(transposed);
    return { 
      board: movedBoard[0].map((_, colIndex) => movedBoard.map(row => row[colIndex])), 
      score, 
      moved 
    };
  };

  const move = (direction: string) => {
    if (gameOver) return;

    let result;
    switch (direction) {
      case "left":
        result = moveLeft(board);
        break;
      case "right":
        result = moveRight(board);
        break;
      case "up":
        result = moveUp(board);
        break;
      case "down":
        result = moveDown(board);
        break;
      default:
        return;
    }

    if (result.moved) {
      const newScore = score + result.score;
      addRandomTile(result.board);
      setBoard(result.board);
      setScore(newScore);
      
      if (newScore > bestScore) {
        setBestScore(newScore);
        if (typeof window !== 'undefined') {
          localStorage.setItem('2048-best', newScore.toString());
        }
      }

      // Проверка на проигрыш
      if (!canMove(result.board)) {
        setGameOver(true);
      }
    }
  };

  const canMove = (board: number[][]) => {
    // Проверяем пустые клетки
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) return true;
      }
    }
    
    // Проверяем возможность слияния
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = board[i][j];
        if (
          (j < 3 && current === board[i][j + 1]) ||
          (i < 3 && current === board[i + 1][j])
        ) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowRight":
          move("right");
          break;
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
      }
    };
    
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [board, gameOver]);

  const resetGame = () => {
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const getTileColor = (value: number) => {
    const colors: {[key: number]: string} = {
      2: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800",
      4: "bg-gradient-to-br from-blue-200 to-blue-300 text-blue-900",
      8: "bg-gradient-to-br from-orange-200 to-orange-300 text-orange-900",
      16: "bg-gradient-to-br from-orange-300 to-orange-400 text-white",
      32: "bg-gradient-to-br from-red-300 to-red-400 text-white",
      64: "bg-gradient-to-br from-red-400 to-red-500 text-white",
      128: "bg-gradient-to-br from-yellow-300 to-yellow-400 text-white",
      256: "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white",
      512: "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white",
      1024: "bg-gradient-to-br from-purple-400 to-purple-500 text-white",
      2048: "bg-gradient-to-br from-purple-500 to-purple-600 text-white animate-pulse"
    };
    return colors[value] || "bg-gradient-to-br from-purple-600 to-purple-700 text-white";
  };

  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4">🎯 2048</h2>
      
      <div className="flex justify-center items-center gap-4 sm:gap-8 mb-4 sm:mb-6">
        <div className="bg-gray-800 rounded-lg p-2 sm:p-3">
          <p className="text-xs sm:text-sm text-gray-400">Счет</p>
          <p className="text-lg sm:text-xl font-bold text-yellow-400">{score}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-2 sm:p-3">
          <p className="text-xs sm:text-sm text-gray-400">Лучший</p>
          <p className="text-lg sm:text-xl font-bold text-green-400">{bestScore}</p>
        </div>
      </div>

      {won && !gameOver && (
        <div className="mb-4 p-4 bg-green-900 rounded-lg border border-green-500">
          <p className="text-xl text-green-400 mb-2">🎉 Победа! Вы достигли 2048!</p>
          <p className="text-gray-300">Продолжайте играть для большего счета</p>
        </div>
      )}

      {gameOver && (
        <div className="mb-4 p-4 bg-red-900 rounded-lg border border-red-500">
          <p className="text-xl text-red-400 mb-2">💀 Игра окончена!</p>
          <p className="text-gray-300">Финальный счет: {score}</p>
        </div>
      )}

      <div className="inline-block bg-gray-700 p-2 sm:p-4 rounded-xl shadow-2xl mb-4">
        <div className="grid grid-cols-4 gap-1 sm:gap-2" style={{width: '280px', height: '280px', maxWidth: '90vw', maxHeight: '90vw'}}>
          {board.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`
                  w-16 h-16 sm:w-18 sm:h-18 rounded-lg flex items-center justify-center font-bold text-sm sm:text-lg
                  transition-all duration-200 transform hover:scale-105
                  ${cell === 0 
                    ? "bg-gray-600" 
                    : `${getTileColor(cell)} shadow-lg`
                  }
                `}
              >
                {cell !== 0 && (
                  <span className={cell >= 1000 ? "text-xs sm:text-sm" : "text-sm sm:text-lg"}>
                    {cell}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
          <p>🎮 Стрелки для движения</p>
          <p>🎯 Цель: достичь 2048</p>
        </div>
        
        {/* Mobile and desktop controls */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <button
              onClick={() => move("up")}
              className="bg-gray-600 hover:bg-gray-700 px-3 sm:px-4 py-2 rounded text-sm touch-manipulation"
            >
              ↑
            </button>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => move("left")}
              className="bg-gray-600 hover:bg-gray-700 px-3 sm:px-4 py-2 rounded text-sm touch-manipulation"
            >
              ←
            </button>
            <button
              onClick={() => move("down")}
              className="bg-gray-600 hover:bg-gray-700 px-3 sm:px-4 py-2 rounded text-sm touch-manipulation"
            >
              ↓
            </button>
            <button
              onClick={() => move("right")}
              className="bg-gray-600 hover:bg-gray-700 px-3 sm:px-4 py-2 rounded text-sm touch-manipulation"
            >
              →
            </button>
          </div>
        </div>
        
        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg transition-all touch-manipulation text-sm sm:text-base"
        >
          🔄 Новая игра
        </button>
      </div>
    </div>
  );
}

// Игра на память
function Memory() {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const numbers = Array.from({length: 8}, (_, i) => i + 1);
    const shuffled = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4">🧠 Игра на память</h2>
      <p className="mb-3 sm:mb-4 text-sm sm:text-base">Ходы: <span className="text-yellow-400 font-bold">{moves}</span></p>
      
      <div className="grid grid-cols-4 gap-2 w-48 sm:w-64 mx-auto mb-4">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-10 h-10 sm:w-14 sm:h-14 bg-gray-700 border border-gray-500 flex items-center justify-center font-bold text-sm sm:text-xl hover:bg-gray-600 transition-colors touch-manipulation"
          >
            {flipped.includes(index) || matched.includes(index) ? card : "?"}
          </button>
        ))}
      </div>
      
      {matched.length === cards.length && (
        <p className="text-green-400 mb-4">Поздравляем! Игра завершена за {moves} ходов!</p>
      )}
      
      <button
        onClick={initGame}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg transition-all touch-manipulation text-sm sm:text-base"
      >
        🔄 Новая игра
      </button>
    </div>
  );
}
