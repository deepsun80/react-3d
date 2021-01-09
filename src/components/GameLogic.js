import { useFrame } from "react-three-fiber";
import { useRecoilState } from "recoil";
import { shipPositionState, laserPositionState, enemyPositionState, scoreState } from "../gameState";

// This component runs game logic on each frame draw to update game state.
function GameLogic({
  distance,
  distanceVar, 
  enemySpeed, 
  laserZVelocity, 
  laserRange, 
  groundHeight 
}) {
 const [enemies, setEnemies] = useRecoilState(enemyPositionState);
 const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
 const [score, setScore] = useRecoilState(scoreState);
 const [shipPosition] = useRecoilState(shipPositionState);

 useFrame(({ mouse }) => {
   // Map through all of the enemies in state. Detect if each enemy is within one unit of a laser if they are set that place in the return array to true.
   // The result will be an array where each index is either a hit enemy or an unhit enemy.
   const hitEnemies = enemies
     ? enemies.map(
         (enemy) =>
           lasers.filter(
             (laser) =>
               lasers.filter((laser) => distance(laser, enemy) < distanceVar).length > 0
           ).length > 0
       )
     : [];

     if (hitEnemies.includes(true) && enemies.length > 0) {
       setScore(score + hitEnemies.filter((hit) => hit).length);
       console.log("hit detected", score);
     }

   // Move all of the enemies. Remove enemies that have been destroyed.
   setEnemies(
     enemies
       .map((enemy) => ({ x: enemy.x, y: enemy.y, z: enemy.z + enemySpeed }))
       .filter((enemy, idx) => !hitEnemies[idx])
   );

   //Player hit
   enemies
     .map((enemy, idx) => {
       if (distance(shipPosition.position, enemy) < distanceVar) {
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
 });
 return null;
}

export default GameLogic;