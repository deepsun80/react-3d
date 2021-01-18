import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
// import earthImg from '../images/earth.jpg'
import moonImg from './texture/moonTexture.png'

function Planets() {
  const [moonTexture] = useLoader(THREE.TextureLoader, [moonImg]);

  return (
      <mesh position={[0, 0, 0]}>
        <sphereBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" roughness={1} map={moonTexture} />
      </mesh>
  )
}

export default Planets;