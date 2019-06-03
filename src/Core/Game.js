import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect, secondsToDuraion } from './Utils';
import { Rhino } from "../Entities/Rhino";
import { ScoreBoard } from "./ScoreBoard";
import { GamePaused } from "./GamePaused";
import { SoundManager } from "./SoundManager";

export class Game {
    gameWindow = null;
    soundManager = new SoundManager();

    rhino = null;
    startRhinoTimer = false;
    rhinoTimerStarted = false;
    pause = false;
    skierIsAlive = true;
    sid = 0;
    scoreTimerStarted = false;

    timers = {
        scoreBoardUpdate: {
            started: false,
            id: 0
        },
        score: {
            started: false,
            id: 0
        },
        unleashRhino: {
            started: false,
            id: 0
        },
        gameDuration: {
            started: false,
            id: 0
        }
    }

    gameConfig = {
        rhinoTime: 15,
        rhinoSpeedBoost: 0,
        skerLives: 1,
        score: 0,
        scoreIncrementInterval: 1,
        tick: 0,
        tickId: 0
    };

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0, this.gameConfig.skerLives);
        this.obstacleManager = new ObstacleManager();
        this.scoreBoard = new ScoreBoard();
        this.gamePaused = new GamePaused();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {

        if (!this.pause) {
            this.canvas.clearCanvas();

            this.updateGameWindow();
            this.drawGameWindow();

            if (this.skier.direction === Constants.SKIER_DIRECTIONS.DOWN) {
                this.startRhinoTimer = true;
            }

            if (this.startRhinoTimer && !this.rhinoTimerStarted) {
                this.startTimers();
                this.rhinoTimerStarted = true;
            }

            if (this.rhino) {
                if (this.skier.isJumping) {
                    this.rhino.speed = Constants.RHINO_STARTING_SPEED - 2
                } else {
                    this.rhino.speed = Constants.RHINO_STARTING_SPEED + this.gameConfig.rhinoSpeedBoost;
                }
            }

            this.gamePaused.hide();

            this.checkGameOver();

            this.scoreBoard.updateScoreBoard(this.gameConfig.tick, this.gameConfig.score);
        } else {
            clearInterval(this.sid);
            clearInterval(this.timers.scoreBoardUpdate.id);
            this.gamePaused.show();
        }

        requestAnimationFrame(this.run.bind(this));

    }

    updateGameWindow() {
        if (this.rhino) {
            this.rhino.chase(this.skier);
        }
        this.skier.move();

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        this.skier.draw(this.canvas, this.assetManager);
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    unleashRhino() {
        this.rhino = new Rhino(this.gameWindow.right - 50, this.gameWindow.top + 20);
        this.rhino.assetManager = this.assetManager;
        this.obstacleManager.placeObstacle(this.gameWindow.left, this.gameWindow.right, this.gameWindow.top, this.gameWindow.top, this.rhino);

        setTimeout(() => {
            this.rhino.chase(this.skier);
        }, 1000);

        this.soundManager.unleashedRhino();
    }

    togglePause() {
        this.pause = !this.pause;
    }

    startTimers() {
        this.timers.gameDuration.id = this.startGameDurationTimer();
        this.timers.gameDuration.started = true;
        this.timers.unleashRhino.id = this.startUnleashRhinoTimer();
        this.timers.unleashRhino.started = true;
        this.timers.scoreBoardUpdate.id = this.startScoreBoardUpdateTimer();
        this.timers.scoreBoardUpdate.started = true;
        this.timers.score.id = this.startScoreTimer();
        this.timers.score.started = true;
    }

    startScoreTimer() {
        // Start increasing score periodically when the skier starts skiing
        return setInterval(() => {
            if (
                this.skier.lives > 0 && this.skier.direction !== Constants.SKIER_DIRECTIONS.LEFT &&
                this.skier.direction !== Constants.SKIER_DIRECTIONS.right
            ) {
                this.gameConfig.score += 30;
            }
        }, this.gameConfig.scoreIncrementInterval * 1000);
    }

    startUnleashRhinoTimer() {
        // Start the timer for the rhino to be unleashed after the skier starts skiing
        return setTimeout(() => {
            this.unleashRhino();
        }, this.gameConfig.rhinoTime * 1000);
    }

    startScoreBoardUpdateTimer() {
        return setInterval(() => {
            this.scoreBoard.updateScoreBoard(this.gameConfig.tick, this.gameConfig.score);
        }, 500);
    }

    startGameDurationTimer() {
        this.gameConfig.tickId = setInterval(() => {
            if (this.skier.lives > 0) {
                this.gameConfig.tick++;
                if (this.gameConfig.tick % 20 === 0 && this.rhino) {
                    this.gameConfig.rhinoSpeedBoost += 0.5;
                    console.log(new Date().toISOString(), this.rhino.speed)
                }
            } else {
                clearInterval(this.gameConfig.tickId);
            }
        }, 1000);

        return this.gameConfig.tickId;
    }

    checkGameOver() {
        if (this.skier.lives < 1 && this.skierIsAlive) {
            this.skierIsAlive = false;
            setTimeout(() => {
                alert(`Game over. You had a score of ${this.gameConfig.score}\nClick OK to restart`);
                window.location.reload();
            }, 2000);
        }
    }

    handleKeyDown(event) {
        switch (event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SPACE:
                this.skier.initJump();
                event.preventDefault();
                break;
            case Constants.KEYS.ESC:
                this.togglePause();
                event.preventDefault();
                break;
        }
    }
}