import { useState } from 'react';
import { useRecoilState } from "recoil";
import { gameState } from "../gameState";
import { Text, Box } from 'drei';

function StartScreen() {
 const [game, setGame] = useRecoilState(gameState);

 const [hovered, setHover] = useState(false);
 const hover = event => setHover(true);
 const unhover = event =>  setHover(false);

 return (
   !game ? (
    <>
    <group onPointerOver={hover} onPointerOut={unhover} onClick={() => setGame(true)}>
      <Text
        color={hovered ? "white" : "black"}
        scale={[1.5, 1.5]}
        position-z={1}
      >
        START
      </Text>
      <Box args={[1, 0.5, 1]}>
        <meshBasicMaterial attach="material" color={hovered ? "grey" : "white"} />
      </Box>
      </group>
    </>
   ) : null
 );
}

export default StartScreen;