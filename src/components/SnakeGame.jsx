import React, { useState, useEffect, useRef } from 'react';
import './Snake.css';

const GRID_SIZE = { x: 20, y: 15 };
const INITIAL_SNAKE = [{ x: 10, y: 7 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

const SnakeGame = ({ onExit }) => {
  const snakeRef = useRef(INITIAL_SNAKE);
  const directionRef = useRef(INITIAL_DIRECTION);
  const lastProcessedDirectionRef = useRef(INITIAL_DIRECTION);
  const foodRef = useRef({ x: 5, y: 5 });

  const [renderTrigger, setRenderTrigger] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);

  const generateFood = () => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE.x),
        y: Math.floor(Math.random() * GRID_SIZE.y)
      };
      if (!snakeRef.current.some(s => s.x === newFood.x && s.y === newFood.y)) {
        break;
      }
    }
    foodRef.current = newFood;
  };

  useEffect(() => {
    generateFood();
    setRenderTrigger(v => v + 1);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const prevSnake = snakeRef.current;
      const head = { ...prevSnake[0] };
      const currentDir = directionRef.current;
      lastProcessedDirectionRef.current = currentDir;
      
      head.x += currentDir.x;
      head.y += currentDir.y;

      // Duvara çarpma
      if (head.x < 0 || head.x >= GRID_SIZE.x || head.y < 0 || head.y >= GRID_SIZE.y) {
        setGameOver(true);
        return;
      }

      // Kendine çarpma
      if (prevSnake.some(s => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        return;
      }

      const newSnake = [head, ...prevSnake];

      // Yemek yeme
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(s => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      snakeRef.current = newSnake;
      setRenderTrigger(v => v + 1);
    }, GAME_SPEED);

    return () => clearInterval(interval);
  }, [gameOver]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (gameOver) {
      if (e.key === 'Enter') {
        snakeRef.current = INITIAL_SNAKE;
        directionRef.current = INITIAL_DIRECTION;
        lastProcessedDirectionRef.current = INITIAL_DIRECTION;
        setScore(0);
        setGameOver(false);
        generateFood();
        setRenderTrigger(v => v + 1);
      }
      if (e.key === 'Escape') onExit();
      return;
    }

    const lastDir = lastProcessedDirectionRef.current;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (lastDir.y !== 1) directionRef.current = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (lastDir.y !== -1) directionRef.current = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (lastDir.x !== 1) directionRef.current = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (lastDir.x !== -1) directionRef.current = { x: 1, y: 0 };
        break;
      case 'Escape':
        onExit();
        break;
      default:
        break;
    }
  };

  const snake = snakeRef.current;
  const food = foodRef.current;

  return (
    <div 
      className="snake-container" 
      tabIndex={0} 
      onKeyDown={handleKeyDown} 
      ref={gameRef}
      autoFocus
    >
      <div className="snake-header">
        <span>SNAKE</span>
        <span>SCORE: {score}</span>
      </div>
      
      <div className="snake-board">
        {Array.from({ length: GRID_SIZE.y }).map((_, y) => (
          Array.from({ length: GRID_SIZE.x }).map((_, x) => {
            const isSnake = snake.some(segment => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;
            let className = 'snake-cell';
            if (isSnake) className += ' snake';
            if (isFood) className += ' food';
            
            return <div key={`${x}-${y}`} className={className} />;
          })
        ))}
      </div>

      {gameOver && (
        <div className="snake-game-over">
          <h3>GAME OVER</h3>
          <p>Tekrar Oynamak için <b>ENTER</b>'a Bas</p>
          <p>Çıkmak için <b>ESC</b>'ye Bas</p>
        </div>
      )}
      {!gameOver && (
        <div style={{ marginTop: '10px', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Yön tuşları veya W A S D ile hareket et, ESC ile çık
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
