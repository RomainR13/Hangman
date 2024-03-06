const wordList = ["marseille", "ambulance", "anthropologie", "peripateticienne", "developper"];
let keybord = [
    ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
    ["w", "x", "c", "v", "b", "n"]
]



let selectedWord = "";
let guessedWord = [];
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;

function startGame() {
    document.querySelector('#gameWin').classList.add('hidden');
    displayLetter()
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];

    guessedWord = Array(selectedWord.length).fill("_");
    guessedLetters = [];
    incorrectGuesses = 0;

    update();
}

function update() {
    document.querySelector("#word").innerHTML = guessedWord.join("");
    document.querySelector("#hangman").innerHTML = "Le Jeu du Pendu - Erreurs: " + incorrectGuesses + "/" + maxIncorrectGuesses;
    document.querySelector('#hangmanImg').src = "./assets/images/hangman" + incorrectGuesses + ".png"

    if (incorrectGuesses === maxIncorrectGuesses) {
        endGame(false);
    } else if (!guessedWord.includes("_")) {
        endGame(true);
    }
}

function submitGuess(letter) {

    if (guessedLetters.includes(letter)) {
        document.querySelector("#error").classList.remove('hidden');
        console.log(document.querySelector("#error"));
        return;
    }

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        document.querySelector("#error").classList.add('hidden');
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        document.querySelector("#error").classList.add('hidden');
        incorrectGuesses++;
        console.log(incorrectGuesses);
    }

    update();

}

function endGame(isWinner) {
    document.querySelector('#gameWin').classList.remove('hidden');
    if (isWinner) {
        document.querySelector('#gameWin p').innerHTML = "Félicitations ! Vous avez deviné le mot : "+ selectedWord
    } else {
        document.querySelector('#gameWin p').innerHTML = "Dommage tu n'as pas trouver le mot"
    }
}


function displayLetter() {
    document.querySelector("#letters").innerHTML = ""
    keybord.forEach((arr) => {
        let container = document.createElement('div')
        document.querySelector("#letters").appendChild(container)
        container.classList.add("row")
        arr.forEach((letter) => {
            let para = document.createElement('p')
            para.innerHTML = letter
            para.addEventListener('click', () => {
                choiceLetter(para.innerHTML)
            })
            container.appendChild(para)


        })
    })
}

function choiceLetter(letter) {
    submitGuess(letter)
    const guess = letter.toLowerCase();

    if (guessedLetters.includes(guess)) {
        return;
    }

    guessedLetters.push(guess);

    if (selectedWord.includes(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                guessedWord[i] = guess;
            }
        }
    } else {
        incorrectGuesses++;
    }

    update();
}

startGame();