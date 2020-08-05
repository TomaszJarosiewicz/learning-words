import { words } from './words.js';

class LearningWords {
    constructor(words) {
        this.allWords = Object.assign(words);
        this.chooseWords = [];
        this.enableChoose = false;
        this.currentWord = {};
        this.showNextWord = [];
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



// const displayWords = (() => {
//     const numberQuestion = document.querySelector('#numberQuestion');
//     const lastNumberQuestion = document.querySelector('#lastNumberQuestion');
//     const returnWord = learningWords.drawWord();
//     const lengthWords = words.length;
//     let lengthWord = returnWord.length;
//     numberQuestion.innerText = lengthWord;
//     lastNumberQuestion.innerText = lengthWords;

//     const polishWord = document.querySelector('#polishWord');
//     const englishWord = document.querySelector('#englishWord');
//     const description = document.querySelector('#description');
//     const test = document.querySelector('#test');

//     const displayWords = () => {
//         description.style.display = "none";
//         returnWord.forEach(words => {
//             polishWord.innerText = words.request;
//             englishWord.innerText = words.response;
//             description.innerText = words.description;
//         });
//     }

//     const displayNextQuestion = () => {
//         const showBtn = document.querySelector('#showBtn');
//         const next = document.querySelector('#next');
//         // const totallengthWords = lengthWords + 1;

//         showBtn.addEventListener('click', (e) => {
//             englishWord.style.display = "block";
//             description.style.display = "block";
//             if(e.isTrusted) {
//                 next.addEventListener('click', () => {
//                     numberQuestion.innerText = lengthWord++;
//                 });
//             }
//         });
//     }

//     const displayPrevQuestion = () => {
//         if(lengthWord > 1) {
//             numberQuestion.innerText = lengthWord-- - 1;
//         }
//     }

//     return {
//         showWord: () => {
//             displayWords();
//         },

//         btnEvent: () => {
//             displayNextQuestion();
//         },

//         showPrevQuestion: () => {
//             const prev = document.querySelector('#prev');
//             prev.addEventListener('click', () => {
//                 displayPrevQuestion();
//             });
//         }
//     }

// })();

// displayWords.showWord();
// displayWords.btnEvent();
// displayWords.showPrevQuestion();
















