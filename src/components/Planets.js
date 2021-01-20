import * as THREE from 'three'
import { useRef, } from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import earthTexture from '../images/earthTexture.jpg'
import marsTexture from '../images/marsTexture.jpg';

function Planets() {
  const [texture1, texture2] = useLoader(THREE.TextureLoader, [earthTexture, marsTexture]);

  const moonRef = useRef();
  const earthRef = useRef();

  useFrame(() => {
   if(moonRef && moonRef.current) {
     moonRef.current.rotation.y += 0.0003;
   }
   if(earthRef && earthRef.current) {
    earthRef.current.rotation.y += 0.005;
   }
  });

  return (
   <group>
      <mesh position={[-45, 20, -50]} ref={moonRef}>
        <sphereBufferGeometry attach="geometry" args={[25, 32, 32]} />
        <meshStandardMaterial attach="material" roughness={1} map={texture1} color='white' depthWrite={false} />
      </mesh>
      <mesh position={[35, -20, -50]} ref={earthRef} rotation={[0, 0, 50]} >
        <sphereBufferGeometry attach="geometry" args={[5, 32, 32]} />
        <meshStandardMaterial attach="material" roughness={1} map={texture2} color='white' depthWrite={false} />
      </mesh>
   </group>
  );
}

export default Planets;