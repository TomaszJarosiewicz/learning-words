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

const displayWords = (() => {
    const numberQuestion = document.querySelector('#numberQuestion');
    const lastNumberQuestion = document.querySelector('#lastNumberQuestion');
    const returnWord = learningWords.drawWord();
    const lengthWords = words.length;
    let lengthWord = returnWord.length;
    numberQuestion.innerText = lengthWord;
    lastNumberQuestion.innerText = lengthWords;


    const displayWords = () => {
        const polishWord = document.querySelector('#polishWord');
        const englishWord = document.querySelector('#englishWord');
        const description = document.querySelector('#description');
        description.style.display = "none";
        returnWord.forEach(words => {
            polishWord.innerText = words.request;
            englishWord.innerText = words.response;
            description.innerText = words.description;
        });
    }

    const displayNextQuestion = () => {
        const totallengthWords = lengthWords + 1;
        if(lengthWord <= totallengthWords){
            numberQuestion.innerText = lengthWord++;
        }
    }

    const displayPrevQuestion = () => {
        if(lengthWord > 1){
            numberQuestion.innerText = lengthWord-- - 1;
        }
    }

    return {
        showWord: () => {
            displayWords();
        },

        btnEvent: () => {
            const showBtn = document.querySelector('#showBtn');
            const next = document.querySelector('#next');
            showBtn.addEventListener('click', (e) => {
                if(e.isTrusted) {
                    englishWord.style.display = "block";
                    description.style.display = "block";
                    next.addEventListener('click', () => {
                        displayNextQuestion();
                    });
                }
            });
        },

        showPrevQuestion: () => {
            const prev = document.querySelector('#prev');
            prev.addEventListener('click', () => {
                displayPrevQuestion();
            });
        }
    }

})();

displayWords.showWord();
displayWords.btnEvent();
displayWords.showPrevQuestion();


showBtn.addEventListener('click', (e) => {
    englishWord.style.display = "block";
    description.style.display = "block";
    if(e.isTrusted) {
        next.addEventListener('click', (e) => {
            test.textContent = '';
            window.setTimeout(() => {
                window.location.reload(true);
            }, 100);
            if(e.isTrusted) {
                numberQuestion.innerText = lengthWord++;
            }
        });
        window.addEventListener('load', (e) => {
            test.textContent = test.textContent + 'load\n';
        });
    }
});
















