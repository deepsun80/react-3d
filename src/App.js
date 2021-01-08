import { useState, useRef, Suspense } from 'react';
import { TextureLoader } from 'three';
import { Canvas, useThree, extend, useFrame, useLoader } from 'react-three-fiber';
import { a, useSpring } from 'react-spring/three';
import { OrbitControls, Torus } from 'drei';
import imageUrl from './nasaLogo.png';
import planeImg from './hexagonPattern.png';
import planeImgAlpha from './hexagonPatternAlpha.png';

import './App.css';

function PlaneTop(props) {
  const planeRef = useRef();
  const planeRef2 = useRef();
  const planeRef3 = useRef();
  const planeRef4 = useRef();
  const planeRef5 = useRef();
  const planeRef6 = useRef();

  const texturePlane = useLoader(TextureLoader, planeImg);
  const texturePlaneAlpha = useLoader(TextureLoader, planeImgAlpha);

  useFrame(() => {
    planeRef.current.position.z += 0.02;
    planeRef2.current.position.z += 0.02;
    planeRef3.current.position.z += 0.02;
    planeRef4.current.position.z += 0.02;
    planeRef5.current.position.z += 0.02;
    planeRef6.current.position.z += 0.02;

    planeRef.current.rotation.x = Math.PI / 2;
    planeRef2.current.rotation.x = Math.PI / 2;
    planeRef3.current.rotation.x = Math.PI / 2;
    planeRef4.current.rotation.x = Math.PI / 2;
    planeRef5.current.rotation.x = Math.PI / 2;
    planeRef6.current.rotation.x = Math.PI / 2;
  });

  return (
    <>
      <mesh receiveShadow={true} position={[0, 2.0, -48]} ref={planeRef}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={1} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, 2.1, -48]} ref={planeRef2}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.25} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, 2.2, -48]} ref={planeRef3}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.2} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, 2.3, -48]} ref={planeRef4}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.15} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, 2.4, -48]} ref={planeRef5}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.1} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, 2.5, -48]} ref={planeRef6}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.05} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
  </>
  )
}

function PlaneBottom(props) {
  const planeRef = useRef();
  const planeRef2 = useRef();
  const planeRef3 = useRef();
  const planeRef4 = useRef();
  const planeRef5 = useRef();
  const planeRef6 = useRef();

  const texturePlane = useLoader(TextureLoader, planeImg);
  const texturePlaneAlpha = useLoader(TextureLoader, planeImgAlpha);

  useFrame(() => {
    planeRef.current.position.z += 0.02;
    planeRef2.current.position.z += 0.02;
    planeRef3.current.position.z += 0.02;
    planeRef4.current.position.z += 0.02;
    planeRef5.current.position.z += 0.02;
    planeRef6.current.position.z += 0.02;

    planeRef.current.rotation.x = - Math.PI / 2;
    planeRef2.current.rotation.x = - Math.PI / 2;
    planeRef3.current.rotation.x = - Math.PI / 2;
    planeRef4.current.rotation.x = - Math.PI / 2;
    planeRef5.current.rotation.x = - Math.PI / 2;
    planeRef6.current.rotation.x = - Math.PI / 2;
  });

  return (
    <>
      <mesh receiveShadow={true} position={[0, -2.0, -48]} ref={planeRef}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={1} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, -2.1, -48]} ref={planeRef2}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.25} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, -2.2, -48]} ref={planeRef3}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.2} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, -2.3, -48]} ref={planeRef4}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.15} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, -2.4, -48]} ref={planeRef5}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.1} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
      <mesh receiveShadow={true} position={[0, -2.5, -48]} ref={planeRef6}>
        <planeBufferGeometry attach='geometry' args={[100, 100, 50, 50]}  />
        <meshStandardMaterial opacity={0.05} map={texturePlane} alphaMap={texturePlaneAlpha} attach='material' color='white' transparent depthWrite={false} />
      </mesh>
  </>
  )
}

function Cylinder() {
  const cylinderRef = useRef();

  useFrame(() => {
    cylinderRef.current.position.z += 0.05;
    cylinderRef.current.rotation.x = Math.PI / 2;;
  });

  return (
    <mesh receiveShadow={true} position={[0, 0, -1000]} ref={cylinderRef}>
      <cylinderBufferGeometry attach='geometry' args={[5, 5, 2000, 32, 2000]} openEnded/>
      <meshStandardMaterial attach='material' color='white' wireframe/>
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
        {/* <Cube rotation={[10, 10, 5]} position={[0, 0, 0]} />
        <Torus args={[1, 0.2, 10, 20]} position={[0, 1.6, 0]} scale={[0.6, 0.6, 0.6]}>
          <meshPhongMaterial
            roughness={1}
            metalness={0.5}
            shininess={100}
            attach='material'
            color={'blue'}
          />
        </Torus> */}
        <PlaneTop />
        <PlaneBottom />
        {/* <Cylinder /> */}
      </Suspense>
      <OrbitControls />
    </>
  )
}

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
