export class GamePaused {

    gamePausedStyle = {
        opacity: 0,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5rem',
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgba(60, 100, 25, 0.85)',
        borderRadius: '5px',
        textAlign: 'center',
        transition: 'opacity .3s'
    };

    paused = false;

    constructor() {
        this.gamePaused = document.createElement('div');

        this.pauseMessageConatiner = document.createElement('span');
        this.pauseMessageConatiner.innerHTML = `<h1>Game Paused</h1> <p>Press ESC to continue</p>`;


        this.gamePaused.appendChild(this.pauseMessageConatiner);

        Object.assign(this.gamePaused.style, this.gamePausedStyle);

        document.body.appendChild(this.gamePaused);
    }

    show() {
        this.gamePaused.style.opacity = 1;
    }
    
    hide() {
        this.gamePaused.style.opacity = 0;
    }
}