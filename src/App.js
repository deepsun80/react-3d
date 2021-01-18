import { useState, Suspense } from 'react';
import { Canvas } from "react-three-fiber";
import { RecoilRoot, useRecoilValue } from "recoil";
import * as THREE from 'three';

import {
  Effects,
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
  ShipDestroyed,
  StarsBackground,
  StartScreen, 
  Target, 
} from './components';

import { 
  LASER_RANGE,
  LASER_Z_VELOCITY,
  ENEMY_SPEED,
  TEXT_POS,
  getDistance,
} from './helpers';

import { gameOverState } from './gameState';

import "./App.css";

function Scene({ setGame, setNewLevel, setLevel, level }) {
  const gameOver = useRecoilValue(gameOverState);

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight intensity={2.0} />
      <MissedText txtPos={TEXT_POS} />
      <ScoreText txtPos={TEXT_POS} />
      {gameOver && <GameOverText />}
      <Suspense fallback={<Loading />}>
        <Ship />
        <ShipDestroyed />
        <Enemies />
      </Suspense>
      <StarsBackground />
      <EnemiesDestroyed />
      <Target />
      <Lasers />
      <LaserController />
      <Effects />
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
      <Canvas 
        onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color('#000007'))
      }}>
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
