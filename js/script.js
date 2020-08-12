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
    const polishWord = document.querySelector('#polishWord');
    const englishWord = document.querySelector('#englishWord');
    const description = document.querySelector('#description');
    let dataWords = document.querySelectorAll('[data-word]');
    for(let dataWord of dataWords) {
        console.dir(dataWord);
    }

    const displayWords = () => {
        polishWord.innerHTML = learningWords.currentWord.request;
        englishWord.innerHTML = learningWords.currentWord.response;
        description.innerHTML = learningWords.currentWord.description;
    }

    const activeButton = (enabledElement, disabledElement) => {
        enabledElement.disabled = !learningWords.isButtonActiveVisibility;
        disabledElement.disabled = learningWords.isButtonActiveVisibility;
    }

    // const activeWords = (enabledWords, disabledWords) {
    //     // englishWord.style.display = "block";
    //     // description.style.display = "block";
    // }

    const showBtn = document.querySelector('#showBtn');
    const nextQuestion = document.querySelector('#next');

    const { allWords, chooseWords } = learningWords;
    lastNumberQuestion.innerHTML = allWords.length;
    numberQuestion.innerHTML = chooseWords.length;

    activeButton(showBtn, nextQuestion);

    showBtn.addEventListener('click', () => {
        englishWord.style.display = "block";
        description.style.display = "block";
        displayWords();
        activeButton(nextQuestion, showBtn);
    });

    nextQuestion.addEventListener('click', () => {
        englishWord.style.display = "none";
        description.style.display = "none";
        learningWords.drawWord();
        displayWords();
        numberQuestion.innerHTML = chooseWords.length;
        activeButton(showBtn, nextQuestion);
    });

     displayWords();

})();
