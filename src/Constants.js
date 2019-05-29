export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const JUMP_RAMP = 'jumpRamp';
export const JUMP_TAXI = 'jumpTaxi';
export const JUMP_TAKEOFF = 'jumpTakeOff';
export const JUMP_CRUISE = 'jumpCruise';
export const JUMP_GEAR_DOWN = 'jumpGearDown';
export const JUMP_TOUCHDOWN = 'jumpTouchdown';

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [TREE]: 'img/tree_1.png',
    [TREE_CLUSTER]: 'img/tree_cluster.png',
    [ROCK1]: 'img/rock_1.png',
    [ROCK2]: 'img/rock_2.png',
    [JUMP_RAMP]: 'img/jump_ramp.png',
    [JUMP_TAXI]: 'img/skier_jump_1.png',
    [JUMP_TAKEOFF]: 'img/skier_jump_2.png',
    [JUMP_CRUISE]: 'img/skier_jump_3.png',
    [JUMP_GEAR_DOWN]: 'img/skier_jump_4.png',
    [JUMP_TOUCHDOWN]: 'img/skier_jump_5.png'
};

export const SKIER_DIRECTIONS = {
    CRASH: 0,
    LEFT: 1,
    LEFT_DOWN: 2,
    DOWN: 3,
    RIGHT_DOWN: 4,
    RIGHT: 5
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH]: SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT]: SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN]: SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN]: SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT]: SKIER_RIGHT
};

export const SKIER_JUMP_STAGE = {
    TAXI: 1,
    TAKE_OFF: 2,
    CRUISE: 3,
    GEAR_DOWN: 4,
    TOUCHDOWN: 5
}

export const SKIER_JUMP_ASSET = {
    [SKIER_JUMP_STAGE.TAXI]: JUMP_TAXI,
    [SKIER_JUMP_STAGE.TAKE_OFF]: JUMP_TAKEOFF,
    [SKIER_JUMP_STAGE.CRUISE]: JUMP_CRUISE,
    [SKIER_JUMP_STAGE.GEAR_DOWN]: JUMP_GEAR_DOWN,
    [SKIER_JUMP_STAGE.TOUCHDOWN]: JUMP_TOUCHDOWN,
}
export const KEYS = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACE: 32
};