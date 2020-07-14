import { words } from './words.js';

class LearningWords {
    constructor(words) {
        this.allWords = Object.assign(words);
        this.chooseWords = [];
        this.enableChoose;
    }

    random() {
        return this.allWords[Math.floor(Math.random() * this.allWords.length)];
    }

    drawWord() {
        if(this.chooseWords.length === this.allWords.length) {
            this.enableChoose = true;
            return;
        }
        if(this.chooseWords.length === 0) {
            this.chooseWords.push(this.random());
            return this.chooseWords;
        } else {
            do {
                this.random();
            } while (this.chooseWords.find(word => this.chooseWords.id === word.id));
        }
    }
}


const learningWords = new LearningWords(words);
console.log(learningWords.drawWord());












