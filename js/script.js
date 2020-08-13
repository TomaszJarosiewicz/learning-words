import { words } from './words.js';

class LearningWords {
    constructor(words) {
        this.allWords = Object.assign(words);
        this.chooseWords = [];
        this.enableChoose = false;
        this.isButtonActiveVisibility = true;
        this.currentWord = {};
        this.nextCurrentWord = [];
    }

    random() {
        this.currentWord = this.allWords[Math.floor(Math.random() * this.allWords.length)];
    }

    drawWord() {
        if(this.chooseWords.length === this.allWords.length) {
            this.enableChoose = true;
            return;
        }
        if(this.chooseWords.length === 0) {
            this.random();
            this.chooseWords.push(this.currentWord);
        } else {
            do {
                this.random();
            } while (this.chooseWords.find(word => this.currentWord.id === word.id));
            this.chooseWords.push(this.currentWord);
        }
    }
}

const learningWords = new LearningWords(words);
learningWords.drawWord();

(() => {
    const numberQuestion = document.querySelector('#numberQuestion');
    const lastNumberQuestion = document.querySelector('#lastNumberQuestion');
    let dataWords = document.querySelectorAll('[data-word]');

    // const activeWords = (enabledWords, disabledWords) => {
    //     enabledWords.display = "block";
    //     enabledWords.display = "block";
    //     disabledWords.style.display = "none";
    //     disabledWords.style.display = "none";
    // }

    const displayWords = () => {
        for(let dataWord of dataWords) {
            if(dataWord.dataset.word === 'polishWord') {
                dataWord.innerHTML = learningWords.currentWord.request;
            }
            if(dataWord.dataset.word === 'englishWord') {
                dataWord.innerHTML = learningWords.currentWord.response;
            }
            if(dataWord.dataset.word === 'description') {
                dataWord.innerHTML = learningWords.currentWord.description;
            }
        }
    }

    const activeButton = (enabledElement, disabledElement) => {
        enabledElement.disabled = !learningWords.isButtonActiveVisibility;
        disabledElement.disabled = learningWords.isButtonActiveVisibility;
    }

    const showBtn = document.querySelector('#showBtn');
    const nextQuestion = document.querySelector('#next');

    const { allWords, chooseWords } = learningWords;
    lastNumberQuestion.innerHTML = allWords.length;
    numberQuestion.innerHTML = chooseWords.length;

    activeButton(showBtn, nextQuestion);

    showBtn.addEventListener('click', () => {
        // englishWord.style.display = "block";
        // description.style.display = "block";
        displayWords();
        activeButton(nextQuestion, showBtn);
    });

    nextQuestion.addEventListener('click', () => {
        // englishWord.style.display = "none";
        // description.style.display = "none";
        learningWords.drawWord();
        displayWords();
        numberQuestion.innerHTML = chooseWords.length;
        activeButton(showBtn, nextQuestion);
    });

     displayWords();

})();
