// Code Practice: Rocket patrol
// Name: Suramya Shakya
// Date: 01/26/2025

// Rocket Patrol variation 934683580 Plus (will think of something better later)
// MOD LIST
////////////////////////////////////////////////////////////////
// 1-Point Tier
// Create a new scrolling tile sprite for the background (1)
// 3-Point Tier
// Create 4 new explosion sound effects and randomize which one plays on impact (3)
// Display the time remaining (in seconds) on the screen (3)
// Implement parallax scrolling for the background (3)
// 5-Point Tier
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)

// doing this took me 10 hours i think. I am just leaving here for now because its late. 
// I believe what I have is enough for 20 points but i might add more just to practice more.

// I mostly used phaser documentation and alot of trial and error.
// I needed to look up syntax and values for things like clock and randomization
let config = {
    type: Phaser.AUTO,
    // width: 640,
    // height: 480,
    width: 1280,
    height: 720,
    scene: [ Menu, Play, Play2 ]
  }

let game = new Phaser.Game(config)

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
