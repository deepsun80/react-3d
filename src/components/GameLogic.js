import { useEffect } from 'react';
import { useFrame } from "react-three-fiber";
import { useRecoilState } from "recoil";
import {
 // gameState, 
 shipPositionState, 
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
  groundHeight,
  level
}) {
//  const [game, setGame] = useRecoilState(gameState);
 const [enemies, setEnemies] = useRecoilState(enemyPositionState);
 const [enemiesDestroyed, setEnemiesDestroyed] = useRecoilState(enemyDestroyedState);
 const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
 const [score, setScore] = useRecoilState(scoreState);
 const [shipPosition] = useRecoilState(shipPositionState);
 const [missed, setMissed] = useRecoilState(missedEnemiesState);
 const [gameOver, setGameOver] = useRecoilState(gameOverState);

  useEffect(() => {
   // Game over 
   if (missed.length >= 5) {
    setGameOver(true);

    setTimeout(() => {
      setLevel(1);
      setGame(false);
    }, 2000);
   }

   if(score >= 30) {
     setNewLevel(false);
     setLevel(level + 1);
   }

  }, [missed, setGame, setGameOver, setNewLevel, setLevel, score, level])

  useFrame(({ mouse }) => {
   // Map through all of the enemies in state. Detect if each enemy is within one unit of a laser if they are set that place in the return array to true.
   // The result will be an array where each index is either a hit enemy or an unhit enemy.

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
      .map((enemy, idx) => ({ x: enemy.x, y: enemy.y, z: enemy.z + enemySpeed }))
      .filter((enemy, idx) => !hitEnemies[idx])
   );   
   
   // Set missed number of enemies
   setMissed(
    enemies
      .filter((enemy) => enemy.z >= 0)
   );

   //Player hit
   enemies
     .map((enemy, idx) => {
       if (getDistance(shipPosition.position, enemy) < distanceVar) {
           console.log("Player hit");
           return setEnemies(
             enemies.slice(idx + 1, enemies.length)
           );       
       } else return null
     }); 

   // Move the Lasers and remove lasers at end of range or that have hit the ground. 
   setLaserPositions(
     lasers
       .map((laser) => ({
         id: laser.id,
         x: laser.x + laser.velocity[0],
         y: laser.y + laser.velocity[1],
         z: laser.z - laserZVelocity,
         velocity: laser.velocity,
       }))
       .filter((laser) => laser.z > -laserRange && laser.y > groundHeight)
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