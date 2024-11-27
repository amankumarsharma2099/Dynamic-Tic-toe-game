import { useState } from "react";
import { motion } from "framer-motion";

function Board({ gridSize, winStreak, onReset }) {
  const [board, setBoard] = useState(
    Array(gridSize).fill(null).map(() => Array(gridSize).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
    );

    setBoard(newBoard);
    checkWinner(newBoard, row, col, currentPlayer);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = (board, row, col, player) => {
    const directions = [
      { dr: 0, dc: 1 }, // Horizontal
      { dr: 1, dc: 0 }, // Vertical
      { dr: 1, dc: 1 }, // Diagonal \
      { dr: 1, dc: -1 }, // Diagonal /
    ];

    for (const { dr, dc } of directions) {
      let count = 1;

      for (let step = 1; step < winStreak; step++) {
        const r = row + dr * step;
        const c = col + dc * step;
        if (r < 0 || c < 0 || r >= gridSize || c >= gridSize) break;
        if (board[r][c] === player) count++;
        else break;
      }

      for (let step = 1; step < winStreak; step++) {
        const r = row - dr * step;
        const c = col - dc * step;
        if (r < 0 || c < 0 || r >= gridSize || c >= gridSize) break;
        if (board[r][c] === player) count++;
        else break;
      }

      if (count >= winStreak) {
        setWinner(player);
        return;
      }
    }

    if (board.flat().every((cell) => cell)) {
      setWinner("Draw");
    }
  };

  return (
    <div className="text-center">
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <motion.button
              key={`${rowIndex}-${colIndex}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className="w-12 h-12 text-lg font-bold bg-white border rounded flex items-center justify-center"
            >
              {cell}
            </motion.button>
          ))
        )}
      </div>
      {winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <h3 className="text-xl font-bold text-white">
            {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={onReset}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default Board;
