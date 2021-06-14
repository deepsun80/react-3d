import { useState, useEffect } from 'react';
import { Text, RoundedBox } from 'drei';
import StarsBackground from './StarsBackground';
import Title from './Title';
import Effects from './Effects';
import EndScreen from './EndScreen';
import * as THREE from 'three';
import fonts from '../fonts';

function StartScreen({ setGame, level, setNewLevel }) {
 const [hovered, setHover] = useState(false);
 const [didMount, setDidMount] = useState(false); 

 const hover = event => setHover(true);
 const unhover = event =>  setHover(false);

 useEffect(() => {
  setDidMount(true);
  return () => setDidMount(false);
  }, [])

  const startGame = () => {
    setGame(true);
    setNewLevel(true);
  }

 return (
   didMount ? 
    level <= 5 ? 
      <>
        <ambientLight intensity={0.1} />
        <directionalLight intensity={1.0} castShadow position={[0, 0, 1]} />
        <Title position={[-7.75, 7.5, -10]} />
        {level === 1 && 
          <Text
            color="white"
            scale={[2.0, 2.0]}
            position-z={1}
            position-y={0.5}
            font={fonts.Roboto}
            lineHeight={1.75}
            maxWidth={2.5}
          >
            Welcome to Venus Minefeild. There is a minefeild between Venus and Earth, and you must help to eliminate it. Just aim and click mouse to fire. If you miss 10 mines, or a mine hits your ship, you lose the level. If you hit 30 mines, you advance to the next level. The mines in each level move faster. Pass 5 levels to complete the game.
          </Text>
        }
        <Text
          color="white"
          scale={[3.0, 3.0]}
          position-z={1}
          position-y={level !== 1 ? 0.65 : -1.1}
          font={fonts.Orbitron}
        >
          LEVEL {level.toString()}
        </Text>
        <group onPointerOver={hover} onPointerOut={unhover} onClick={startGame}>
          <Text
            color="black"
            scale={[2.5, 2.5]}
            position-z={1}
            position-y={level !== 1 ? 0 : -1.64}
            font={fonts.Orbitron}
          >
            START
          </Text>
          <RoundedBox 
            args={[1.95, 0, 0.5]} 
            castShadow 
            receiveShadow 
            position-y={level !== 1 ? .02 : -2.02} 
            rotation={[Math.PI / 2, 0, 0]}
            radius={0.01}
          >
            <meshBasicMaterial attach="material" color={hovered ? new THREE.Color('#DDDDDD') : "grey"} />
          </RoundedBox>
        </group>
        <StarsBackground speed={0.005} />
        <Effects brightness={0.7} />
      </> : <EndScreen />
    : null
 );
}

export default StartScreen;