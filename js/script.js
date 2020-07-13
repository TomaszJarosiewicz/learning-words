const words =
    [
        {
            id: 1,
            request: 'zabawny',
            response: 'funny',
            description: null
        },
        {
            id: 2,
            request: 'brzuch',
            response: 'stomach',
            description: null
        },
        {
            id: 3,
            request: 'twarz',
            response: 'face',
            description: null
        },
        {
            id: 4,
            request: 'Przepis',
            response: 'Recipe',
            description: null
        },
        {
            id: 5,
            request: 'przychodnia',
            response: 'clinic',
            description: null
        },
        {
            id: 6,
            request: 'samolot',
            response: 'plane',
            description: null
        },
        {
            id: 7,
            request: 'ciężar',
            response: 'weight',
            description: null
        },
        {
            id: 8,
            request: 'nosić',
            response: 'carry',
            description: 'Elephants carry weight loads.'
        },
        {
            id: 9,
            request: 'nosić',
            response: 'wear',
            description: 'She wear designer clothes.'
        },
        {
            id: 10,
            request: 'biurko',
            response: 'desk',
            description: null
        }
    ];

class LearningWords {
    constructor(words) {
        this.allWords = Object.assign(words);
        this.chooseWords = [];
        this.enableChoose;
    }

    random() {
        const wordRandom = this.allWords[Math.floor(Math.random() * this.allWords.length)];
        return wordRandom;
    }

    drawWord() {
        if(this.chooseWords.length === this.allWords.length) {
            this.enableChoose = true;
            return;
        } else {
            if(this.chooseWords.length === 0) {
                this.chooseWords.push(this.random());
                return this.chooseWords;
            } else {
                this.chooseWords.find(idx => {
                    return idx;
                });
            } while (this.chooseWords.find(word => this.chooseWords.id === word.id));
        }
    }

    currentWord() {

    }
}


const learningWords = new LearningWords(words);
learningWords.currentWord();












