import { useState, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { RecoilRoot, useRecoilValue } from "recoil";
// import { OrbitControls } from '@react-three/drei';
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
  Planets,
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
      <ambientLight intensity={2.0} />
      <directionalLight intensity={1.5} castShadow position={[0, 1, 1]} />
      <MissedText txtPos={TEXT_POS} />
      <ScoreText txtPos={TEXT_POS} />
      {gameOver && <GameOverText />}
      <Suspense fallback={<Loading />}>
        <Ship />
        <ShipDestroyed />
        <Enemies />
        <Planets />
        <EnemiesDestroyed />
        <Target />
        <Lasers />
        <LaserController />
      </Suspense>
      <StarsBackground speed={0.01} />
      <Effects brightness={1.0} />
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
        setGame={setGame}
        setNewLevel={setNewLevel}
        setLevel={setLevel}
        level={level}
      />
      {/* <OrbitControls /> */}
    </>
  );
}

function App() {
  const [game, setGame] = useState(false);
  const [newLevel, setNewLevel] = useState(false);
  const [level, setLevel] = useState(1);

  return (
      <Canvas
        shadowMap
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
