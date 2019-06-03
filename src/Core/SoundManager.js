export class SoundManager {

    SOUNDS = {
        RHINO_UNLEASHED: 'audio/rhinoEnter.m4a'
    }

    constructor() {
        this.defaultPlayer = new Audio();
        this.defaultPlayer.onerror = this.soundError;
    }

    playSound(soundPath) {
        this.defaultPlayer.src = soundPath;
        this.defaultPlayer.play();
    }

    soundError(e) {
        console.warn(e);
    }

    unleashedRhino() {
        this.playSound(this.SOUNDS.RHINO_UNLEASHED)
    }

}