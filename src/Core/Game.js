import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { Rhino } from "../Entities/Rhino";

export class Game {
    gameWindow = null;
    rhino = null;
    pause = false;
    gameConfig = {
        rhinoTime: 20,
        skerLives: 1
    };

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0, this.gameConfig.skerLives);
        this.obstacleManager = new ObstacleManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        setTimeout(() => {
            this.unleashRhino();
        }, this.gameConfig.rhinoTime * 1000);
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