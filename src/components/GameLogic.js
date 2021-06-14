import { useEffect } from 'react';
import { useFrame } from "react-three-fiber";
import { useRecoilState } from "recoil";
import {
 // gameState, 
 shipPositionState,
 shipDestroyedState, 
 laserPositionState, 
 enemyPositionState,
 enemyDestroyedState,
 scoreState, 
 missedEnemiesState,
 gameOverState 
} from "../gameState";

// This component runs game logic on each frame draw to update game state.
function GameLogic({
  setGame,
  setNewLevel,
  setLevel,
  getDistance,
  distanceVar, 
  enemySpeed, 
  laserZVelocity, 
  laserRange, 
  level
}) {
//  const [game, setGame] = useRecoilState(gameState);
 const [enemies, setEnemies] = useRecoilState(enemyPositionState);
 const [enemiesDestroyed, setEnemiesDestroyed] = useRecoilState(enemyDestroyedState);
 const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
 const [score, setScore] = useRecoilState(scoreState);
 const [shipPosition] = useRecoilState(shipPositionState);
 const [shipDestroyed, setShipDestroyed] = useRecoilState(shipDestroyedState);
 const [missed, setMissed] = useRecoilState(missedEnemiesState);
 const [gameOver, setGameOver] = useRecoilState(gameOverState);

  useEffect(() => {
   // Game over 
  //  if (missed.length >= 10) {
  //   setGameOver(true);

  //   setTimeout(() => {
  //     setGame(false);
  //   }, 2000);
  //  }

   if(score >= 30) {
     setNewLevel(false);
     setLevel(level + 1);
   }

  }, [missed, setGame, setGameOver, setNewLevel, setLevel, score, level]);

  useFrame(({ mouse }) => {
   // Draw destoyed sprite
   enemies.map(enemy => 
    lasers.map(laser => {
      if(getDistance(laser, enemy) < distanceVar) {
        setEnemiesDestroyed([{x: enemy.x, y: enemy.y, z: enemy.z }, ...enemiesDestroyed]);

        setTimeout(() => {
          setEnemiesDestroyed([])
        }, 100);
      }
    })
   );

   const hitEnemies = enemies
     ? enemies
      .map(
         (enemy) => 
           lasers.filter(
             (laser) =>
               lasers.filter((laser) => getDistance(laser, enemy) < distanceVar).length > 0
           ).length > 0
       )
     : [];

     if (hitEnemies.includes(true) && enemies.length > 0 && !gameOver) {
       setScore(score + hitEnemies.filter((hit) => hit).length);
     }

   // Move all of the enemies. Remove enemies that have been destroyed.
   setEnemies(
     enemies
      .map((enemy, idx) => ({ x: enemy.x, y: enemy.y, z: enemy.z + enemySpeed, yRotation: enemy.yRotation }))
      .filter((enemy, idx) => !hitEnemies[idx])
   );
   
   
   // Set missed number of enemies
   setMissed(
    enemies
      .filter((enemy) => enemy.z >= 0)
   );

   //If player hit display ship detroyed, remove enemy, and set game over
   enemies
     .map((enemy, idx) => {
       if (getDistance(shipPosition.position, enemy) < distanceVar) {
        setGameOver(true);

        setShipDestroyed([{ x: shipPosition.position.x, y: shipPosition.position.y, z: shipPosition.position.z}]);

        setEnemies(
          enemies.filter((enemy, idxy) => idx !== idxy)
        );

        setTimeout(() => {
          setGame(false);
        }, 2000);   
       } else return null
     }); 

   // Move the Lasers and remove lasers at end of range 
   setLaserPositions(
     lasers
       .map((laser) => ({
         id: laser.id,
         x: laser.x + laser.velocity[0],
         y: laser.y + laser.velocity[1],
         z: laser.z - laserZVelocity,
         velocity: laser.velocity,
       }))
       .filter((laser) => laser.z > -laserRange)
   );

   //Remove lasers that have hit enemies
   lasers
     .map((laser, idx) => {
      return enemies.forEach(enemy => {
       if (getDistance(enemy, laser) < distanceVar) {
        setLaserPositions(lasers.slice(idx + 1, lasers.length))
       } else return null
      });
     }); 
   });

   return null;
}

export default GameLogic;