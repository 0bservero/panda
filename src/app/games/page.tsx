"use client";
import React from "react";
import { useState, useEffect } from "react";

type GameType = "tictactoe" | "snake" | "2048" | "memory";

export default function Games() {
  const [currentGame, setCurrentGame] = useState<GameType>("tictactoe");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">🎮 Мини-игры</h1>
      
      <div className="max-w-4xl mx-auto">
        {/* Выбор игры */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setCurrentGame("tictactoe")}
            className={`px-4 py-2 rounded ${currentGame === "tictactoe" ? "bg-blue-600" : "bg-gray-600"}`}
          >
            Крестики-нолики
          </button>
          <button
            onClick={() => setCurrentGame("snake")}
            className={`px-4 py-2 rounded ${currentGame === "snake" ? "bg-blue-600" : "bg-gray-600"}`}
          >
            Змейка
          </button>
          <button
            onClick={() => setCurrentGame("2048")}
            className={`px-4 py-2 rounded ${currentGame === "2048" ? "bg-blue-600" : "bg-gray-600"}`}
          >
            2048
          </button>
          <button
            onClick={() => setCurrentGame("memory")}
            className={`px-4 py-2 rounded ${currentGame === "memory" ? "bg-blue-600" : "bg-gray-600"}`}
          >
            Память
          </button>
        </div>

        {/* Игры */}
        {currentGame === "tictactoe" && <TicTacToe />}
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
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8],
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8],
      [0, 4, 8], 
      [2, 4, 6]
    ];
    
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Крестики-нолики</h2>
      {winner ? (
        <p className="text-xl mb-4 text-green-400">Победитель: {winner}!</p>
      ) : (
        <p className="text-xl mb-4">Ход: {isXNext ? "X" : "O"}</p>
      )}
      
      <div className="grid grid-cols-3 gap-2 w-64 mx-auto mb-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-gray-700 border border-gray-500 text-2xl font-bold hover:bg-gray-600"
          >
            {cell}
          </button>
        ))}
      </div>
      
      <button
        onClick={resetGame}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Новая игра
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

  const gridSize = 20;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection([-1, 0]);
          break;
        case "ArrowDown":
          setDirection([1, 0]);
          break;
        case "ArrowLeft":
          setDirection([0, -1]);
          break;
        case "ArrowRight":
          setDirection([0, 1]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (gameOver) return;

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
          setFood([
            Math.floor(Math.random() * gridSize),
            Math.floor(Math.random() * gridSize)
          ]);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver]);

  const resetGame = () => {
    setSnake([[5, 5]]);
    setFood([10, 10]);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Змейка</h2>
      <p className="mb-4">Счет: {score}</p>
      {gameOver && <p className="text-red-400 mb-4">Игра окончена!</p>}
      
      <div className="inline-block border border-gray-500 mb-4">
        <div className="grid grid-cols-20 gap-0" style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}>
          {Array.from({length: gridSize * gridSize}, (_, i) => {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
            const isFood = food[0] === row && food[1] === col;
            
            return (
              <div
                key={i}
                className={`w-4 h-4 ${
                  isSnake ? "bg-green-500" : isFood ? "bg-red-500" : "bg-gray-800"
                }`}
              />
            );
          })}
        </div>
      </div>
      
      <div>
        <p className="mb-2">Используйте стрелки для управления</p>
        <button
          onClick={resetGame}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Новая игра
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
  const [gameOver, setGameOver] = useState(false);

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

  const move = (direction: string) => {
    if (gameOver) return;

    const newBoard = board.map(row => [...row]);
    let moved = false;
    let newScore = score;

    // Логика движения (упрощенная)
    if (direction === "left") {
      for (let i = 0; i < 4; i++) {
        const row = newBoard[i].filter(val => val !== 0);
        for (let j = 0; j < row.length - 1; j++) {
          if (row[j] === row[j + 1]) {
            row[j] *= 2;
            newScore += row[j];
            row[j + 1] = 0;
          }
        }
        const newRow = row.filter(val => val !== 0);
        while (newRow.length < 4) newRow.push(0);
        if (JSON.stringify(newBoard[i]) !== JSON.stringify(newRow)) moved = true;
        newBoard[i] = newRow;
      }
    }

    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
  }, [board, gameOver, move]);

  const resetGame = () => {
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">2048</h2>
      <p className="mb-4">Счет: {score}</p>
      
      <div className="grid grid-cols-4 gap-2 w-64 mx-auto mb-4">
        {board.flat().map((cell, index) => (
          <div
            key={index}
            className="w-14 h-14 bg-gray-700 border border-gray-500 flex items-center justify-center font-bold"
          >
            {cell !== 0 && cell}
          </div>
        ))}
      </div>
      
      <div>
        <p className="mb-2">Используйте стрелки для движения</p>
        <button
          onClick={resetGame}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Новая игра
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
      <h2 className="text-2xl mb-4">Игра на память</h2>
      <p className="mb-4">Ходы: {moves}</p>
      
      <div className="grid grid-cols-4 gap-2 w-64 mx-auto mb-4">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-14 h-14 bg-gray-700 border border-gray-500 flex items-center justify-center font-bold text-xl hover:bg-gray-600"
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
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Новая игра
      </button>
    </div>
  );
}
