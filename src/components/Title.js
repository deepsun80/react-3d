import * as THREE from 'three';
import OrbitronExtraBold from '../fonts/OrbitronExtraBold.json';

function Title({position}) {
 const font = new THREE.FontLoader().load(OrbitronExtraBold);

 const textOptions = {
   font,
   size: 1,
   height: 1
 };

 return (
  <mesh position={position} castShadow receiveShadow>
    <textGeometry attach='geometry' args={['VENUS MINEFEILD', textOptions]} />
    <meshStandardMaterial attach='material' color={new THREE.Color('#EC2D2D')} />
  </mesh>
 );
}

export default Title;