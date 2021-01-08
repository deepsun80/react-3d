import * as THREE from 'three';
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { shipPositionState, laserPositionState, enemyPositionState, scoreState, delayState } from "./gameState";

import "./App.css";

// Game settings.
const LASER_RANGE = 100;
const LASER_Z_VELOCITY = 1;
const ENEMY_SPEED = 0.1;
const GROUND_HEIGHT = -50;
const SHIP_Z_POSITION = 0;

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

// A Ground plane that moves relative to the player. The player stays at 0,0
function Terrain() {
  const terrain = useRef();

  useFrame(() => {
    terrain.current.position.z += 0.4;
  });

  return (
    <mesh
      visible
      position={[0, GROUND_HEIGHT, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        roughness={1}
        metalness={0}
        wireframe
      />
    </mesh>
  );
}

function ArWing() {
  const [shipPosition, setShipPosition] = useRecoilState(shipPositionState);

  const ship = useRef();
  useFrame(({ mouse }) => {
    setShipPosition({
      position: { x: mouse.x * 6, y: mouse.y * 2, z: 0 },
      rotation: { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2, z: 0 }
    });
  });
  // Update the ships position from the updated state.
  useFrame(() => {
    ship.current.rotation.z = shipPosition.rotation.z;
    ship.current.rotation.y = shipPosition.rotation.x;
    ship.current.rotation.x = shipPosition.rotation.y;
    ship.current.position.y = shipPosition.position.y;
    ship.current.position.x = shipPosition.position.x;
    ship.current.position.z = shipPosition.position.z;
  });

  const { nodes } = useLoader(GLTFLoader, "/arwing.glb");

  return (
    <group ref={ship}>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

// Draws two sprites in front of the ship, indicating the direction of fire.
// Uses a TextureLoader to load transparent PNG, and sprite to render on a 2d plane facing the camera.
function Target() {
  // Create refs for the two sprites we will create.
  const rearTarget = useRef();
  const frontTarget = useRef();

  const loader = new THREE.TextureLoader();
  // A png with transparency to use as the target sprite.
  const texture = loader.load("target.png");

  // Update the position of both sprites based on the mouse x and y position. The front target has a larger scalar.
  // Its movement in both axis is exagerated since its farther in front. The end result should be the appearance that the
  // two targets are aligned with the ship in the direction of laser fire.
  useFrame(({ mouse }) => {
    rearTarget.current.position.y = -mouse.y * 10;
    rearTarget.current.position.x = -mouse.x * 30;

    frontTarget.current.position.y = -mouse.y * 20;
    frontTarget.current.position.x = -mouse.x * 60;
  });
  // Return a group containing two sprites. One positioned eight units in front of the ship, and the other 16 in front.
  // We give the spriteMaterial a map prop with the loaded sprite texture as a value/
  return (
    <group>
      <sprite position={[0, 0, -8]} ref={rearTarget}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
      <sprite position={[0, 0, -16]} ref={frontTarget}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
    </group>
  );
}

// Draws all of the lasers existing in state.
function Lasers() {
  const lasers = useRecoilValue(laserPositionState);
  return (
    <group>
      {lasers.map((laser) => (
        <mesh position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" emissive="white" />
        </mesh>
      ))}
    </group>
  );
}

// An invisible clickable element in the front of the scene.
// Manages creating lasers with the correct initial velocity on click.
function LaserController() {
  const shipPosition = useRecoilValue(shipPositionState);
  const [lasers, setLasers] = useRecoilState(laserPositionState);
  return (
    <mesh
      position={[0, 0, -8]}
      onClick={() =>
        setLasers([
          ...lasers,
          {
            id: Math.random(),
            x: 0,
            y: 0,
            z: 0,
            velocity: [
              shipPosition.rotation.x * 6,
              shipPosition.rotation.y * 5,
            ],
          },
        ])
      }
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        attach="material"
        color="orange"
        emissive="#ff0860"
        visible={false}
      />
    </mesh>
  );
}

// Manages Drawing enemies that currently exist in state
function Enemies() {
  const enemies = useRecoilValue(enemyPositionState);
  return (
    <group>
      {enemies.map((enemy, id) => (
        <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${id}`}>
          <sphereBufferGeometry attach="geometry" args={[2, 8, 8]} />
          <meshStandardMaterial attach="material" color="white" wireframe />
        </mesh>
      ))}
    </group>
  );
}

// A helper function to calculate the distance between two points in 3d space.
// Used to detect lasers intersecting with enemies.
function distance(p1, p2) {
  const a = p2.x - p1.x;
  const b = p2.y - p1.y;
  const c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
}

// This component runs game logic on each frame draw to update game state.
function GameTimer() {
  const [enemies, setEnemies] = useRecoilState(enemyPositionState);
  const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
  const [score, setScore] = useRecoilState(scoreState);
  const [shipPosition] = useRecoilState(shipPositionState);
  const [delay, setDelay] = useRecoilState(delayState);

  useFrame(({ mouse }) => {
    // Map through all of the enemies in state. Detect if each enemy is within one unit of a laser if they are set that place in the return array to true.
    // The result will be an array where each index is either a hit enemy or an unhit enemy.
    const hitEnemies = enemies
      ? enemies.map(
          (enemy) =>
            lasers.filter(
              (laser) =>
                lasers.filter((laser) => distance(laser, enemy) < 3).length > 0
            ).length > 0
        )
      : [];

      if (hitEnemies.includes(true) && enemies.length > 0) {
        setScore(score + hitEnemies.filter((hit) => hit).length);
        console.log("hit detected", score);
      }

    // Move all of the enemies. Remove enemies that have been destroyed, or that have passed the player.
    setEnemies(
      enemies
        .map((enemy) => ({ x: enemy.x, y: enemy.y, z: enemy.z + ENEMY_SPEED }))
        .filter((enemy, idx) => !hitEnemies[idx])
    );
      // console.log(counter);
    //Player hit
    enemies
      .map((enemy) => {
        if(distance(shipPosition.position, enemy) < 2 && delay) {
            console.log("Player hit");
            setDelay(false);
            setInterval(() => { 
              setDelay(true);
            }, 1000);        
        }
      }); 
    // Move the Lasers and remove lasers at end of range or that have hit the ground. 
    setLaserPositions(
      lasers
        .map((laser) => ({
          id: laser.id,
          x: laser.x + laser.velocity[0],
          y: laser.y + laser.velocity[1],
          z: laser.z - LASER_Z_VELOCITY,
          velocity: laser.velocity,
        }))
        .filter((laser) => laser.z > -LASER_RANGE && laser.y > GROUND_HEIGHT)
    );
  });
  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      {/* <pointLight intensity={0.6} position={[0, 10, 4]} /> */}
      <directionalLight intensity={1} />
      <Suspense fallback={<Loading />}>
        <ArWing />
      </Suspense>
      <Terrain />
      <Enemies />
      <Target />
      <Lasers />
      <LaserController />
      <GameTimer />
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
