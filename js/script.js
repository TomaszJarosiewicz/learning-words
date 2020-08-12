import { words } from './words.js';

class LearningWords {
    constructor(words) {
        this.allWords = Object.assign(words);
        this.chooseWords = [];
        this.enableChoose = false;
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
    nextDrawWord() {
        this.nextCurrentWord.push(this.currentWord);
        return this.drawWord();
    }
}

const learningWords = new LearningWords(words);
learningWords.drawWord();
learningWords.nextDrawWord();
// method playsWord -> innerHTML

const displayWords = (() => {
    const numberQuestion = document.querySelector('#numberQuestion');
    const lastNumberQuestion = document.querySelector('#lastNumberQuestion');
    const polishWord = document.querySelector('#polishWord');
    const englishWord = document.querySelector('#englishWord');
    const description = document.querySelector('#description');
    englishWord.style.display = "none";
    description.style.display = "none";

    let returnWord = [learningWords.currentWord];
    let returnNextWord = learningWords.nextCurrentWord;
    const lengthWords = learningWords.allWords.length;
    let returnNumberQuestion = [returnWord].length;

    lastNumberQuestion.innerHTML = lengthWords;
    numberQuestion.innerHTML = returnNumberQuestion;

    const displayWords = () => {
        returnWord.forEach(word => {
            polishWord.innerHTML = word.request;
            englishWord.innerHTML = word.response;
            description.innerHTML = word.description;
        });
    }

    const displayNextWords = () => {
        returnNextWord.forEach(word => {
            polishWord.innerHTML = word.request;
            englishWord.innerHTML = word.response;
            description.innerHTML = word.description;
        });
    }

    const displayNextQuestion = () => {
    const showBtn = document.querySelector('#showBtn');
    const next = document.querySelector('#next');

        showBtn.addEventListener('click', (e) => {
            englishWord.style.display = "block";
            description.style.display = "block";
            if(e.isTrusted) {
                next.addEventListener('click', () => {
                    if(lengthWords >= returnNumberQuestion) {
                        numberQuestion.innerHTML = returnNumberQuestion++;
                    }
                    displayNextWords();
                });
            }
        });
    }

    return {
        showWord: () => {
            displayWords();
            displayNextQuestion();
        },
    }

})();

displayWords.showWord();