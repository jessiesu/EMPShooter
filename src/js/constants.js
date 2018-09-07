var DEBUG = 0
var SCALE = 4
var TILE = 16
var HALF_TILE = TILE / 2
var PLAYER_HITBOX = 13
var CANVAS_W = window.innerWidth;
var CANVAS_H = window.innerHeight;
var OFFSCREEN = { x: -100, y: -100 }
var STATE_INTRO = 0
var STATE_TUTORIAL = 1
var STATE_PLAY = 2
var STATE_END = 3
var STATE_OUTRO = 4

// Player
var PLAYER_STATIC = 0
var PLAYER_JUMPING = 1
var PLAYER_FALLING = 2
var PLAYER_RUNNING = 3

// Physics objects
var WALL = 'wall'
var PLAYER = 'player'
var ENEMY = 'enemy'
var BULLET = 'bullet'
