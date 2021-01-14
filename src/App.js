import { useState } from 'react';
import { Suspense } from "react";
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
  StartScreen, 
  Target, 
  Terrain 
} from './components';

import { 
  LASER_RANGE,
  LASER_Z_VELOCITY,
  ENEMY_SPEED,
  GROUND_HEIGHT,
  TEXT_POS,
  getDistance,
} from './helpers';

import { gameOverState } from './gameState';

import "./App.css";

function Scene({ setGame }) {
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
      <Terrain groundSpeed={0.4} groundHeight={GROUND_HEIGHT} />
      <Enemies />
      <EnemiesDestroyed />
      <Target />
      <Lasers />
      <LaserController />
      <GameLogic 
        getDistance={getDistance}
        distanceVar={3} 
        enemySpeed={ENEMY_SPEED}
        laserZVelocity={LASER_Z_VELOCITY} 
        laserRange={LASER_RANGE}
        groundHeight={GROUND_HEIGHT}
        setGame={setGame}
      />
    </>
  );
}

function App() {
  const [game, setGame] = useState(false);

  return (
      <Canvas>
        {game ?
          <RecoilRoot>
            <Scene setGame={setGame} />
          </RecoilRoot> : 
          <StartScreen setGame={setGame} />
        }
      </Canvas>
  );
}

export default App;
