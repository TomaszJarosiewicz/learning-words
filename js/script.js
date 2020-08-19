import { words } from './words.js';

class LearningWords {
    constructor(words) {
        this.allWords = Object.assign(words);
        this.chooseWords = [];
        this.enableChoose = false;
        this.isButtonActiveVisibility = true;
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
    const addForm = document.querySelector('#add-form');
    const btnForm = document.querySelector('#btn-form');
    let counter = 0;
    btnForm.style.display = "none";

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
    disableDisplay(repeatWords, addForm);

    const showBtn = document.querySelector('#showBtn');
    const nextQuestion = document.querySelector('#next');
    const repeatBtn = document.querySelector('#repeat');
    const addWords = document.querySelector('.add-word');
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

    displayWords(btnForm.children[0], btnForm.children[1]);

    repeatBtn.addEventListener('click', () => {
        location.reload();
    });

    addWords.addEventListener('click', () => {
        activeElement(btnForm, showBtn);
        addForm.style.display = "block";
    });

    btnForm.children[0].addEventListener('click', () => {
        disableDisplay(btnForm, addForm);
        showBtn.style.display = "block";
    });

    const inputs = document.querySelectorAll('#add-form > input');

    btnForm.children[1].addEventListener('click', () => {
        for(let input of inputs) {
            if(input.value === '') {
                input.style.border = "1px solid #b14506";
            } else {
                input.style.border = "1px solid #706f6f";
            }
        }
    });

})();
