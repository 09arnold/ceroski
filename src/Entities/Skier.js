import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_RIGHT;

    direction = Constants.SKIER_DIRECTIONS.RIGHT;
    lastDirection = this.direction;
    speed = Constants.SKIER_STARTING_SPEED;
    isJumping = false;
    jumpStage = Constants.SKIER_JUMP_STAGE.TAXI;
    jumpInited = false;
    lives = 3;

    constructor(x, y, lives = 3) {
        super(x, y);
        this.lives = lives;
    }

    setDirection(direction) {
        if (Object.values(Constants.SKIER_DIRECTIONS).includes(direction)) {
            this.direction = direction; //Set direction if it's not out of range
        } else {
            if (this.assetName === Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.CRASH]) {
                this.move();
            }
        }
        this.updateAsset();
    }

    updateAsset() {
        if (this.isJumping) {
            this.assetName = Constants.SKIER_JUMP_ASSET[this.jumpStage];
        } else {
            this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
        }
    }

    move() {
        if (this.lives < 1) {
            return false;
        }
        if (this.isJumping && !this.jumpInited) {
            this.jumpInited = true;
            this.jumpAsync();
        }
        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
            this.moveSkierLeft();
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT || this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    initJump() {
        this.lastDirection = this.direction;
        this.isJumping = true;
    }

    jumpAsync() {
        this.updateAsset();
        if (Object.values(Constants.SKIER_JUMP_STAGE).includes(this.jumpStage++) && this.jumpStage > 5) {
            this.resetJumpState();
        } else {
            setTimeout(() => { this.jumpAsync() }, 1000 / 5);
        }
        console.log(`Skier State: ${this.assetName}, ${new Date().toJSON()}, Jump Stage: ${this.jumpStage}`);
    }

    resetJumpState() {
        this.jumpStage = Constants.SKIER_JUMP_STAGE.TAXI;
        this.isJumping = false;
        this.jumpInited = false;
        this.setDirection(this.lastDirection);
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if (this.checkActualCollision(collision)) {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        }
    };

    checkActualCollision(obstacle) {
        if (obstacle) {
            if (obstacle.assetName.indexOf('rhino') !== -1) {
                this.lives = 0;
            }
            if (obstacle.assetName === Constants.JUMP_RAMP && !this.isJumping) {
                this.initJump();
            }
            if (
                !this.isJumping ||
                this.isJumping && !obstacle.isJumpable) {
                return true;
            }
        }

        return false;
    }
}