import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { RecoilRoot, useRecoilState } from "recoil";

import {
  Enemies,
  GameLogic,
  GameOverText,
  LaserController, 
  Lasers, 
  Loading,
  MissedText,
  ScoreText,
  Ship, 
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

import "./App.css";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      {/* <pointLight intensity={0.6} position={[0, 10, 4]} /> */}
      <directionalLight intensity={1} />
      <MissedText txtPos={TEXT_POS} />
      <ScoreText txtPos={TEXT_POS} />
      <GameOverText />
      <Suspense fallback={<Loading />}>
        <Ship />
      </Suspense>
      <Terrain groundSpeed={0.4} groundHeight={GROUND_HEIGHT} />
      <Enemies />
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
      />
    </>
  );
}

function App() {
  return (
    <>
      <Canvas>
        <RecoilRoot>
          <Scene />
        </RecoilRoot>
      </Canvas>
    </>
  );
}

export default App;
