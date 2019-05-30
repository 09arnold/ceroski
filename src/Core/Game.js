import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect, secondsToDuraion } from './Utils';
import { Rhino } from "../Entities/Rhino";
import { ScoreBoard } from "./ScoreBoard";

export class Game {
    gameWindow = null;

    rhino = null;
    startRhinoTimer = false;
    rhinoTimerStarted = false;
    pause = false;
    skierIsAlive = true;

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
        }

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

        this.checkGameOver();

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
        console.log('Enter rhirhi');
        this.rhino = new Rhino(this.gameWindow.right - 50, this.gameWindow.top + 20);
        this.rhino.assetManager = this.assetManager;
        this.obstacleManager.placeObstacle(this.gameWindow.left, this.gameWindow.right, this.gameWindow.top, this.gameWindow.top, this.rhino);
        setTimeout(() => {
            this.rhino.chase(this.skier);
        }, 1000);
    }

    togglePause() {
        this.pause = !this.pause;
    }

    startTimers() {
        // Start increasing score periodically when the skier starts skiing
        setInterval(() => {
            if (
                this.skier.lives > 0 && this.skier.direction !== Constants.SKIER_DIRECTIONS.LEFT &&
                this.skier.direction !== Constants.SKIER_DIRECTIONS.right
            ) {
                this.gameConfig.score += 30;
            }
        }, this.gameConfig.scoreIncrementInterval * 1000);

        // Start the timer for the rhino to be unleashed after the skier starts skiing
        setTimeout(() => {
            this.unleashRhino();
        }, this.gameConfig.rhinoTime * 1000);

        setInterval(() => {
            this.scoreBoard.updateScoreBoard(this.gameConfig.tick, this.gameConfig.score);
        }, 500);

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

    }

    checkGameOver() {
        if (this.skier.lives < 1 && this.skierIsAlive) {
            this.skierIsAlive = false;
            setTimeout(() => {
                alert(`Game over. You had a score of ${this.gameConfig.score}\nClick OK to restart`);
                window.location.reload();
            }, 3000);
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