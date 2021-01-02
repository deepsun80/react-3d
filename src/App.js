import * as THREE from "three";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { OrbitControls, Sphere, RoundedBox } from "drei";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./App.css";

const tempObject = new THREE.Object3D();

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
  const [shipPosition, setShipPosition] = useState();
  const ship = useRef();
  useFrame(({ mouse }) => {
    setShipPosition({
      position: { x: mouse.x * 6, y: mouse.y * 2 },
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
    ship.current.position.z = 4;
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

function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight intensity={0.6} position={[0, 10, 4]} />
      <Boxes />
      <Suspense fallback={<Loading />}>
        <ArWing />
        <Target />
        <Sphere args={[0.5, 32, 32]}>
          <meshBasicMaterial attach="material" color="hotpink" />
        </Sphere>
      </Suspense>
      {/* <OrbitControls /> */}
    </>
  );
}

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 7] }}>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
