import * as THREE from "three";
import React, { useState, useRef, useEffect } from "react";
import { OrbitControls } from "drei";
import { Canvas, useFrame } from "react-three-fiber";
import "./App.css";

const tempObject = new THREE.Object3D();

function Boxes() {
  const ref = useRef();

  useFrame(() => {
    // ref.current.rotation.x += 0.002;
    ref.current.rotation.y += 0.002;

    // let i = 0;
    // for (let x = 0; x < 5; x++) {
    //   for (let y = 0; y < 5; y++) {
    //     for (let z = 0; z < 5; z++) {
    //       const id = i++;
    //       tempObject.position.set(x * 2, y * 2, z * 2);
    //       tempObject.updateMatrix();
    //       ref.current.setMatrixAt(id, tempObject.matrix);
    //     }
    //   }
    // }
    for (let i = 0; i < 10000; i ++) {
          // const id = i++;
          tempObject.position.set(Math.random() * 30 - 15, Math.random() * 30 - 15, Math.random() * 30 - 15);
          tempObject.updateMatrix();
          ref.current.setMatrixAt(i, tempObject.matrix);
        }
  });

  return (
    <instancedMesh ref={ref} args={[null, null, 1000]}>
      <boxBufferGeometry attach="geometry" args={[0.2, 0.2, 2.14]} />
      <meshPhongMaterial attach="material" color="red" />
    </instancedMesh>
  );
}

function Spehere() {
  return (
    
  )
}

function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight intensity={0.6} position={[0, 10, 4]} />
      <Boxes />
      <OrbitControls />
    </>
  );
}

function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
