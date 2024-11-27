import { useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import Settings from "./components/Settings";
import Board from "./components/Board";
import Cube from "./components/Cube";

function App() {
  const [screen, setScreen] = useState("home"); // Options: home, settings, game
  const [gameSettings, setGameSettings] = useState(null);

  const handleStart = (settings) => {
    setGameSettings(settings);
    setScreen("game");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 flex flex-col items-center justify-center p-4">
      {screen === "home" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Tic-Tac-Toe!</h1>
          <p className="text-lg text-gray-200 mb-6">
            Customize your game and challenge your friends to a battle of wits!
          </p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.5 }}
            className="w-64 h-64 mx-auto mb-6"
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Cube />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-blue-600 font-bold py-2 px-6 rounded shadow-lg hover:bg-gray-100"
            onClick={() => setScreen("settings")}
          >
            Start Game
          </motion.button>
        </motion.div>
      )}

      {screen === "settings" && (
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          exit={{ x: "-100vw" }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <Settings onStart={handleStart} onBack={() => setScreen("home")} />
        </motion.div>
      )}

      {screen === "game" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Board {...gameSettings} onReset={() => setScreen("settings")} />
        </motion.div>
      )}
    </div>
  );
}

export default App;
