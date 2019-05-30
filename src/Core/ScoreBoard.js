import { secondsToDuraion } from '../Core/Utils';
export class ScoreBoard {

    score = 0;
    duration = '00:00';

    scoreContainer = null;
    durationContainer = null;

    scoreBoardStyle = {
        position: 'fixed',
        top: '5%',
        right: '5%',
        padding: '.5rem 1rem',
        color: '#FFF',
        backgroundColor: 'rgba(0,0,0,.3)',
        borderRadius: '5px'
    };

    constructor() {
        this.scoreBoard = document.createElement('div');

        this.scoreContainer = document.createElement('span');
        this.scoreContainer.textContent = `Score: ${this.score}, `;

        this.durationContainer = document.createElement('span');
        this.durationContainer.textContent = ` Duration: ${this.duration}`;

        this.scoreBoard.appendChild(this.scoreContainer);
        this.scoreBoard.appendChild(this.durationContainer);

        Object.assign(this.scoreBoard.style, this.scoreBoardStyle);

        document.body.appendChild(this.scoreBoard);
    }

    updateScoreBoard(duration, score) {
        if (typeof duration === 'number') {
            duration = secondsToDuraion(duration);
        }

        this.scoreContainer.textContent = `Score: ${score}, `;

        this.durationContainer.textContent = ` Duration: ${duration}`;

        while (this.scoreBoard.firstChild) {
            this.scoreBoard.removeChild(this.scoreBoard.firstChild);
        }

        this.scoreBoard.appendChild(this.scoreContainer);
        this.scoreBoard.appendChild(this.durationContainer);

    }
}