import { useState, useRef, Suspense } from 'react';
import { TextureLoader } from 'three';
import { Canvas, useThree, extend, useFrame, useLoader } from 'react-three-fiber';
import { a, useSpring } from 'react-spring/three';
import { OrbitControls, Torus } from 'drei';
import imageUrl from './nasaLogo.png';

import './App.css';

function Plane(props) {
  return (
    <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -1]}>
      <planeBufferGeometry attach='geometry' args={[10, 10]} />
      <meshStandardMaterial attach='material' color='green' />
    </mesh>
  )
}

function Cube(props) {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01
  });

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0
  });

  const texture = useLoader(TextureLoader, imageUrl)

  const color = isHovered ? 'red' : 'salmon';

  return (
    <a.mesh 
      {...props}
      ref={ref}
      scale={size}
      position-x={x}
      castShadow={true}
      receiveShadow={true}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHovered(false)}
      onPointerOver={() => setIsHovered(true)}
    >
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} attach='material' color={color} />
    </a.mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight castShadow={true} intensity={0.6} position={[0, 4, 5]} />
      <Suspense fallback={null}>
        <Cube rotation={[10, 10, 5]} position={[0, 0, 0]} />
        <Torus args={[1, 0.2, 10, 20]} position={[0, 1.6, 0]} scale={[0.6, 0.6, 0.6]}>
          <meshPhongMaterial
            roughness={1}
            metalness={0.5}
            shininess={100}
            attach='material'
            color={'blue'}
          />
        </Torus>
      </Suspense>
      <Plane />
      <OrbitControls />
    </>
  )
}

function App() {
  return (
    <Canvas shadowMap={true}>
      <Scene />
    </Canvas>
  );
}

export default App;
