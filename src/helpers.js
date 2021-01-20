// Game settings.
const LASER_RANGE = 80;
const LASER_Z_VELOCITY = 1;
const ENEMY_SPEED = { level1: 0.05, level2: 0.10, level3: 0.15, level4: 0.20, level5: 0.25 };
const GROUND_HEIGHT = -50;
const TEXT_POS = { x: 1.2, y: 3.4 };

// A helper function to calculate the distance between two points in 3d space.
// Used to detect lasers intersecting with enemies.
function getDistance(p1, p2) {
 const a = p2.x - p1.x;
 const b = p2.y - p1.y;
 const c = p2.z - p1.z;

 return Math.sqrt(a * a + b * b + c * c);
}

// A helper function for random nmber range
function getRandom(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export { 
 LASER_RANGE,
 LASER_Z_VELOCITY,
 ENEMY_SPEED,
 GROUND_HEIGHT,
 TEXT_POS,
 getDistance,
 getRandom
};