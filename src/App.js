import { useState, Suspense } from 'react';
import { Canvas } from "react-three-fiber";
import { RecoilRoot, useRecoilValue } from "recoil";

import {
  Enemies,
  EnemiesDestroyed,
  GameLogic,
  GameOverText,
  LaserController, 
  Lasers, 
  Loading,
  MissedText,
  ScoreText,
  Ship,
  StarsForeground,
  StartScreen, 
  Target, 
  // Terrain 
} from './components';

import { 
  LASER_RANGE,
  LASER_Z_VELOCITY,
  ENEMY_SPEED,
  // GROUND_HEIGHT,
  TEXT_POS,
  getDistance,
} from './helpers';

import { gameOverState } from './gameState';

import "./App.css";

function Scene({ setGame, setNewLevel, setLevel, level }) {
  const gameOver = useRecoilValue(gameOverState);

  return (
    <>
      <ambientLight intensity={0.1} />
      {/* <pointLight intensity={0.6} position={[0, 10, 4]} /> */}
      <directionalLight intensity={1} />
      {/* <StartScreen />  */}
      <MissedText txtPos={TEXT_POS} />
      <ScoreText txtPos={TEXT_POS} />
      {gameOver && <GameOverText />}
      <Suspense fallback={<Loading />}>
        <Ship />
      </Suspense>
      {/* <Terrain groundSpeed={0.4} groundHeight={GROUND_HEIGHT} /> */}
      <StarsForeground />
      <Enemies />
      <EnemiesDestroyed />
      <Target />
      <Lasers />
      <LaserController />
      <GameLogic 
        getDistance={getDistance}
        distanceVar={3} 
        enemySpeed={
          level === 1 ? ENEMY_SPEED.level1 :
          level === 2 ? ENEMY_SPEED.level2 :
          level === 3 ? ENEMY_SPEED.level3 :
          level === 4 ? ENEMY_SPEED.level4 :
          ENEMY_SPEED.level5
        }
        laserZVelocity={LASER_Z_VELOCITY} 
        laserRange={LASER_RANGE}
        // groundHeight={GROUND_HEIGHT}
        setGame={setGame}
        setNewLevel={setNewLevel}
        setLevel={setLevel}
        level={level}
      />
    </>
  );
}

function App() {
  const [game, setGame] = useState(false);
  const [newLevel, setNewLevel] = useState(false);
  const [level, setLevel] = useState(1);

  return (
      <Canvas>
        {(game && newLevel) ?
          <RecoilRoot>
            <Scene setGame={setGame} setNewLevel={setNewLevel} setLevel={setLevel} level={level} />
          </RecoilRoot> : 
          <StartScreen setGame={setGame} setNewLevel={setNewLevel} level={level} />
        }
      </Canvas>
  );
}

export default App;
