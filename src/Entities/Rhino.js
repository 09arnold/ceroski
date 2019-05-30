import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect, horizontallyInline, verticallyInline } from "../Core/Utils";

export class Rhino extends Entity {
    assetName = Constants.RHINO_RUNLEFT;
    assetManager;

    direction = Constants.RHINO_DIRECTIONS.DOWN;
    speed = Constants.RHINO_STARTING_SPEED;

    isEating = false;
    eatInited = false;
    eatStage = 1;


    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        if (Object.values(Constants.RHINO_DIRECTIONS).includes(direction)) {
            this.direction = direction;
        } else {
            this.move();
        }
        this.updateAsset();
    }

    updateAsset() {
        if (this.isEating) {
            this.assetName = Constants.RHINO_EAT_ASSET[this.eatStage];
        } else {
            this.assetName = Constants.RHINO_DIRECTION_ASSET[this.direction];
        }
    }

    move() {
        switch (this.direction) {
            case Constants.RHINO_DIRECTIONS.LEFT_DOWN:
                this.moveRhinoLeftDown();
                break;
            case Constants.RHINO_DIRECTIONS.DOWN:
                this.moveRhinoDown();
                break;
            case Constants.RHINO_DIRECTIONS.RIGHT_DOWN:
                this.moveRhinoRightDown();
                break;
            case Constants.RHINO_DIRECTIONS.RIGHT:
                this.moveRhinoRight();
                break;
            case Constants.RHINO_DIRECTIONS.LEFT:
                this.moveRhinoLeft();
                break;
        }
    }

    moveRhinoLeft() {
        this.x -= Constants.RHINO_STARTING_SPEED;
    }

    moveRhinoLeftDown() {
        this.x -= this.speed / Constants.RHINO_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.RHINO_DIAGONAL_SPEED_REDUCER;
    }

    moveRhinoDown() {
        this.y += this.speed;
    }

    moveRhinoRightDown() {
        this.x += this.speed / Constants.RHINO_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.RHINO_DIAGONAL_SPEED_REDUCER;
    }

    moveRhinoRight() {
        this.x += Constants.RHINO_STARTING_SPEED;
    }

    chase(target) {
        const rhinoBounds = this.getBounds(this);
        const targetBounds = this.getBounds(target);

        if (targetBounds.right < rhinoBounds.left && targetBounds.top >= rhinoBounds.bottom) {
            if (verticallyInline(targetBounds, rhinoBounds)) {
                this.setDirection(Constants.RHINO_DIRECTIONS.DOWN);
            } else if (horizontallyInline(targetBounds, rhinoBounds)) {
                this.setDirection(Constants.RHINO_DIRECTIONS.LEFT);
            }
            else {
                this.setDirection(Constants.RHINO_DIRECTIONS.LEFT_DOWN);
            }
        }
        if (targetBounds.right > rhinoBounds.left && targetBounds.top > rhinoBounds.top) {
            this.setDirection(Constants.RHINO_DIRECTIONS.RIGHT_DOWN);
            if (horizontallyInline(targetBounds, rhinoBounds)) {
                this.setDirection(Constants.RHINO_DIRECTIONS.RIGHT);
            }
        }
        if (horizontallyInline(targetBounds, rhinoBounds)) {
            this.setDirection(Constants.RHINO_DIRECTIONS.LEFT);
        } else if (verticallyInline(targetBounds, rhinoBounds)) {
            this.setDirection(Constants.RHINO_DIRECTIONS.DOWN);
        }

        if (intersectTwoRects(rhinoBounds, targetBounds)) {
            this.eat();
        } else {
            this.move();
        }
    }

    eat() {
        if (!this.isEating && !this.eatInited) {
            this.setDirection(Constants.RHINO_DIRECTIONS.CAUGHT_SKIER);
            this.isEating = true;
            this.eatInited = true;
            this.eatAsync();
        }
        console.log("Winner winner chicken dinner");
    }

    eatAsync() {
        this.updateAsset();
        if (Object.values(Constants.RHINO_EAT_STAGE).includes(this.eatStage++) && this.eatStage > 4) {
            this.isEating = false;
            this.eatInited = false;
            this.eatStage = Constants.RHINO_EAT_STAGE.EAT_1;
        } else {
            setTimeout(() => { this.eatAsync() }, 2000 / 4);
        }
        // console.log(`Rhino State: ${this.assetName}, ${new Date().toJSON()}, Eat Stage: ${this.eatStage}`);
    }

    getBounds(target) {
        const asset = this.assetManager.getAsset(target.assetName);
        const targetBounds = new Rect(
            target.x - asset.width / 2,
            target.y - asset.height / 2,
            target.x + asset.width / 2,
            target.y - asset.height / 4
        );
        return targetBounds;
    }    
}