import { useState } from "react";
import { motion } from "framer-motion";

function Settings({ onStart, onBack }) {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ gridSize, winStreak });
  };

  return (
    <motion.form
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="bg-white p-6 rounded shadow-lg w-80"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold text-gray-700 mb-4">Game Settings</h2>
      <label className="block mb-3">
        <span className="text-gray-600">Grid Size (3-10):</span>
        <input
          type="number"
          min="3"
          max="10"
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-600">Win Streak (3-grid size):</span>
        <input
          type="number"
          min="3"
          max={gridSize}
          value={winStreak}
          onChange={(e) => setWinStreak(Number(e.target.value))}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>
      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-300"
          onClick={onBack}
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
        >
          Start Game
        </motion.button>
      </div>
    </motion.form>
  );
}

export default Settings;
