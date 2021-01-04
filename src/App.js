import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { shipPositionState, laserPositionState, enemyPositionState, scoreState } from "./gameState";

import "./App.css";

const tempObject = new THREE.Object3D();

// Game settings.
const LASER_RANGE = 30;
const LASER_Z_VELOCITY = 1;
const SHIP_Z_POSITION = 4.5;

function Boxes() {
  const cubes = useRef();

  useFrame(() => {
    // cubes.current.rotation.x += 0.003;
    cubes.current.rotation.y += 0.003;

    for (let i = 0; i < 500; i ++) {
          tempObject.position.set(Math.random() * 16 - 8, Math.random() * 16 - 8, Math.random() * 16 - 8);
          // tempObject.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
          tempObject.updateMatrix();
          cubes.current.setMatrixAt(i, tempObject.matrix);
        }
  });

  return (
    <instancedMesh ref={cubes} args={[null, null, 1000]}>
      {/* <torusBufferGeometry attach="geometry" args={[0.15, 0.15, 12, 36]} /> */}
      <boxBufferGeometry attach="geometry" args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial attach="material" color="red" />
    </instancedMesh>
  );
}

function Cylinder() {
  const cylinder = useRef();

  useFrame(() => {
    // cubes.current.rotation.x += 0.003;
    cylinder.current.rotation.y = Math.PI / 2;
  });

  return (
    <mesh ref={cylinder}>
      <cylinderBufferGeometry attach="geometry" args={[5, 5, 20, 32 ]} />
      <meshStandardMaterial attach="material" color="white" wireframe/>
    </mesh>
  );
}

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

function ArWing() {
  const [shipPosition, setShipPosition] = useRecoilState(shipPositionState);

  const ship = useRef();
  useFrame(({ mouse }) => {
    setShipPosition({
      position: { x: mouse.x * 2, y: mouse.y * 1 },
      rotation: { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 },
    });
  });
  // Update the ships position from the updated state.
  useFrame(() => {
    ship.current.rotation.z = shipPosition.rotation.z;
    ship.current.rotation.y = shipPosition.rotation.x;
    ship.current.rotation.x = shipPosition.rotation.y;
    ship.current.position.y = shipPosition.position.y;
    ship.current.position.x = shipPosition.position.x;
    ship.current.position.z = SHIP_Z_POSITION;
    ship.current.scale.x = 0.4;
    ship.current.scale.y = 0.4;
    ship.current.scale.z = 0.4;
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
  const target = useRef();

  const loader = new THREE.TextureLoader();
  // A png with transparency to use as the target sprite.
  const texture = loader.load("/target.png");

  // Update the position of both sprites based on the mouse x and y position. The front target has a larger scalar.
  // Its movement in both axis is exagerated since its farther in front. The end result should be the appearance that the
  // two targets are aligned with the ship in the direction of laser fire.
  useFrame(({ mouse }) => {
    target.current.position.y = -mouse.y * 0.5;
    target.current.position.x = -mouse.x * 0.5;
    target.current.position.z = 0.5;
    target.current.scale.x = 0.5;
    target.current.scale.y = 0.5;
  });
  // Return a group containing two sprites. One positioned eight units in front of the ship, and the other 16 in front.
  // We give the spriteMaterial a map prop with the loaded sprite texture as a value/
  return (
    <group>
      <sprite position={[0, 0, -8]} ref={target}>
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
          <boxBufferGeometry attach="geometry" args={[0.3, 0.3, 2.0]} />
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
            x: shipPosition.position.x,
            y: shipPosition.position.y,
            z: SHIP_Z_POSITION,
            velocity: [
              shipPosition.rotation.x,
              shipPosition.rotation.y,
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
function Enemy() {
  const enemies = useRecoilValue(enemyPositionState);
  return (
    <group>
      {enemies.map((enemy) => (
        <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${enemy.x}`}>
          <sphereBufferGeometry attach="geometry" args={[2, 32, 32]} />
          <meshStandardMaterial attach="material" color="hotpink" />
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
  const [enemy] = useRecoilState(enemyPositionState);
  const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
  const [score, setScore] = useRecoilState(scoreState);

  useFrame(({ mouse }) => {
    // Map through all of the enemy in state. Detect if each enemy is within one unit of a laser if they are set that place in the return array to true.
    // The result will be an array where each index is either a hit enemy or an unhit enemy.
    const hitEnemies = enemy
      ? enemy.map(
          (enemy) =>
            lasers.filter(
              (laser) =>
                lasers.filter((laser) => distance(laser, enemy) < 3).length > 0
            ).length > 0
        )
      : [];

    if (hitEnemies.includes(true) && enemy.length > 0) {
      setScore(score + hitEnemies.filter((hit) => hit).length);
      console.log("hit detected");
    }

    // Move all of the enemies. Remove enemies that have been destroyed, or that have passed the player.
    // setEnemies(
    //   enemies
    //     .map((enemy) => ({ x: enemy.x, y: enemy.y, z: enemy.z + ENEMY_SPEED }))
    //     .filter((enemy, idx) => !hitEnemies[idx] && enemy.z < 0)
    // );

    // Move the Lasers and remove lasers at end of range or that have hit the ground. 
    // Remove Lasers that have been destroyed.
    setLaserPositions(
      lasers
        .map((laser) => ({
          id: laser.id,
          x: laser.x + laser.velocity[0],
          y: laser.y + laser.velocity[1],
          z: laser.z - LASER_Z_VELOCITY,
          velocity: laser.velocity,
        }))
        .filter((laser, idx) => laser.z > -LASER_RANGE && !hitEnemies[idx])
    );
  });
  return null;
}

function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight intensity={0.6} position={[0, 10, 4]} />
      <Suspense fallback={<Loading />}>
        <ArWing />
      </Suspense>
      {/* <Boxes /> */}
      <Cylinder />
      {/* <Enemy /> */}
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
      <Canvas camera={{ position: [0, 0, 7] }}>
        <RecoilRoot>
          <Scene />
        </RecoilRoot>
      </Canvas>
    </>
  );
}

export default App;
