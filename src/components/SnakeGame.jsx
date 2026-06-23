import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Snake.css';

const GRID_SIZE = { x: 20, y: 15 };
const INITIAL_SNAKE = [{ x: 10, y: 7 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

const SnakeGame = ({ onExit }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE.x),
        y: Math.floor(Math.random() * GRID_SIZE.y)
      };
      // Yılanın üstüne gelmemesi için kontrol
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    generateFood();
    if (gameRef.current) gameRef.current.focus();
  };

  useEffect(() => {
    generateFood();
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        
        head.x += direction.x;
        head.y += direction.y;

        // Duvara çarpma kontrolü
        if (head.x < 0 || head.x >= GRID_SIZE.x || head.y < 0 || head.y >= GRID_SIZE.y) {
          setGameOver(true);
          return prevSnake;
        }

        // Kendine çarpma kontrolü
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Yemek yeme kontrolü
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(interval);
  }, [direction, food, gameOver, generateFood]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (gameOver) {
      if (e.key === 'Enter') resetGame();
      if (e.key === 'Escape') onExit();
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
      case 'Escape':
        onExit();
        break;
      default:
        break;
    }
  };

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
