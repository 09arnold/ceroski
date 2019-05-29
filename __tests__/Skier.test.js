import "babel-polyfill";
import { Skier } from '../src/Entities/Skier';
import * as Constants from '../src/Constants';

describe('Test skier movement', () => {
    let skier;

    beforeEach(() => {
        skier = new Skier(0, 0);
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    });

    beforeEach(() => {
        skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    });

    describe('Turning tests', () => {

        it('should initialize a skier', () => {
            expect(skier).not.toBe(null);
        });

        it('should turn the skier left-down', () => {
            skier.turnLeft();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
        });

        it('should turn the skier left', () => {
            skier.turnLeft();
            skier.turnLeft();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
        });

        it('should turn the skier left after a crash', () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            skier.turnLeft();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
        });

        it('should turn the skier right-down', () => {
            skier.turnRight();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
        });

        it('should turn the skier righr', () => {
            skier.turnRight();
            skier.turnRight();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
        });

        it('should turn the skier right after a crash', () => {
            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            skier.turnRight();
            expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
        });
    });

    describe('Movement tests', () => {
        it('should initialize a skier', () => {
            expect(skier).not.toBe(null);
        });

        it('should move the skier left', () => {
            const initialXPosition = skier.x;
            skier.moveSkierLeft();
            expect(skier.x).toBeLessThan(initialXPosition);
        });

        it('should move the skier right', () => {
            const initialXPosition = skier.x;
            skier.moveSkierRight();
            expect(skier.x).toBeGreaterThan(initialXPosition);
        });

        it('should move the skier up', () => {
            const initialYPosition = skier.y;
            skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
            skier.moveSkierUp();
            expect(skier.y).toBeLessThan(initialYPosition);
        });

        it('should move the skier down', () => {
            const initialYPosition = skier.y;
            skier.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
            skier.moveSkierDown();
            expect(skier.y).toBeGreaterThan(initialYPosition);
        });
    });

    // describe('Jumping tests', () => {

    //     jest.useFakeTimers();

    //     let numberOfJumpStages;

    //     beforeEach(() => {
    //         skier.jumpStage = Constants.SKIER_JUMP_STAGE.TAXI;
    //         numberOfJumpStages = Object.values(Constants.SKIER_JUMP_STAGE).length;
    //     });

    //     it('should set the skier isJumping to true', () => {
    //         skier.initJump();
    //         expect(skier.isJumping).toBe(true);
    //     });

    //     it('should set the skier jumpStage to TAKE_OFF', () => {
    //         skier.jumpAsync();
    //         expect(skier.jumpStage).toBe(Constants.SKIER_JUMP_STAGE.TAKE_OFF);
    //     });

    //     it('should set the skier jumpStage to CRUISE', () => {
    //         skier.jumpAsync();
    //         jest.advanceTimersByTime((1000 / numberOfJumpStages));
    //         expect(skier.jumpStage).toBe(Constants.SKIER_JUMP_STAGE.CRUISE);
    //     });

    //     it('should set the skier jumpStage to GEAR_DOWN', () => {
    //         jest.advanceTimersByTime((1000 / numberOfJumpStages) * (Constants.SKIER_JUMP_STAGE.GEAR_DOWN));
    //         skier.jumpAsync();
    //         expect(skier.jumpStage).toBe(Constants.SKIER_JUMP_STAGE.GEAR_DOWN);
    //     });
    // });

});
