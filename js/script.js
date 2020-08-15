import { words } from './words.js';

class LearningWords {
    constructor(words) {
        this.allWords = Object.assign(words);
        this.chooseWords = [];
        this.enableChoose = false;
        // this.isButtonActiveVisibility = true;
        this.currentWord = {};
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
    const boxWords = document.querySelector('#box-words');
    const repeatWords = document.querySelector('#repear-word');
    let counter = 0;
    repeatWords.style.display = "none";

    const enableDisplay = (firstElement, secondElement) => {
        firstElement.style.display = "block";
        secondElement.style.display = "block";
    }

    const disableDisplay = (firstElement, secondElement) => {
        firstElement.style.display = "none";
        secondElement.style.display = "none";
    }

    const activeElement = (enabledElement, disabledElement) => {
        // enabledElement.disabled = !learningWords.isButtonActiveVisibility;
        // disabledElement.disabled = learningWords.isButtonActiveVisibility;
        enabledElement.style.display = 'block';
        disabledElement.style.display = 'none';
    }

    const displayWords = () => {
        const { currentWord } = learningWords;
        boxWords.children[0].innerHTML = currentWord.request;
        boxWords.children[1].innerHTML = currentWord.response;
        boxWords.children[2].innerHTML = currentWord.description;
    }

    disableDisplay(boxWords.children[1], boxWords.children[2]);

    const showBtn = document.querySelector('#showBtn');
    const nextQuestion = document.querySelector('#next');
    const repeatBtn = document.querySelector('#repeat');
    repeatBtn.style.display = 'none';

    const { allWords, chooseWords } = learningWords;
    lastNumberQuestion.innerHTML = allWords.length;
    numberQuestion.innerHTML = chooseWords.length;

    activeElement(showBtn, nextQuestion);

    showBtn.addEventListener('click', () => {
        enableDisplay(boxWords.children[1], boxWords.children[2]);
        displayWords();
        activeElement(nextQuestion, showBtn);
    });

    nextQuestion.addEventListener('click', () => {
        counter++;
        disableDisplay(boxWords.children[1], boxWords.children[2]);
        learningWords.drawWord();
        displayWords();
        numberQuestion.innerHTML = chooseWords.length;
        // if(chooseWords.length === allWords.length) {
        //     nextQuestion.disabled = learningWords.isButtonActiveVisibility;
        // }
        if(counter < allWords.length) {
            activeElement(showBtn, nextQuestion);
        } else {
            disableDisplay(nextQuestion, showBtn);
            repeatBtn.style.display = 'block';
            activeElement(repeatWords, boxWords);
        }
    });

    repeatBtn.addEventListener('click', () => {
        location.reload();
    });

    displayWords();

})();
