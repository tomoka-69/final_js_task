"use strict";

const words = ["apple", "banana", "cherry", "elderberry", "respberry", "starfluit", "lychee", "pomegranate", "currant", "sapodilla"];
const words2 = ["diamond", "ruby", "sapphire", "alexandrite", "paraidatourmaline", "tanzanite", "benitoite", "jasper", "peridot", "chrysoberyl cats eye"];
const words3 = ["aquarius", "virgo", "gemini", "big dipper", "cygnus", "ursa minor", "lepus", "triangulum australe", "puppis", "pyxis"];
const timerDisplay = document.createElement('div');
let usewords = [];
let currentWord = "";
let isPlaying = false;
let timer;
let timeleft;

document.getElementById('easy').addEventListener('click', function() {
    enterKeyPrompt('easy');
});
document.getElementById('normal').addEventListener('click', function() {
    enterKeyPrompt('normal');
});
document.getElementById('hard').addEventListener('click', function() {
    enterKeyPrompt('hard');
});

function enterKeyPrompt(difficulty) {

    const outbox = document.getElementById('outbox');
    outbox.textContent = 'Enterキーを押してゲームを開始します';

    document.addEventListener('keydown', function onEnterPress(event) {
        if (event.key === 'Enter') {
            document.removeEventListener('keydown', onEnterPress);
            startCount(difficulty);
        }
    });
}

function startCount(difficulty) {
    let count = 5;
    const outbox = document.getElementById('outbox');
    const countInterval = setInterval(() => {
        outbox.textContent = count;
        count--;
        if (count < 0) {
            clearInterval(countInterval);
            startGame(difficulty);
        }
    }, 1000);
}

function TextBox(){
    const outbox = document.getElementById('outbox');

    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.id = 'inputBox';
    inputBox.placeholder = 'ここに入力してください';
    inputBox.style.width = '800px';
    inputBox.style.height = '50px';
    inputBox.style.fontSize = '50px';
    inputBox.style.marginTop = '30px';
    inputBox.style.marginLeft = '10px';
    inputBox.style.padding = '5px';

    const currentWordDisplay = document.createElement('div')
    currentWordDisplay.textContent = currentWord;

    outbox.appendChild(currentWordDisplay);
    outbox.appendChild(inputBox);
}

function startGame(difficulty){
    const outbox = document.getElementById('outbox');
    outbox.innerHTML = '';

    if (words.length === 0){
        outbox.innerHTML = `ゲームクリア！<br>クリアタイム: ${60 - timeleft}秒`;
        clearInterval(timer);
        
        return;
    }

    isPlaying = true;
    updateWord(difficulty);
    TextBox();
    outbox.appendChild(timerDisplay);

    const inputBox = document.getElementById('inputBox');
    inputBox.value = "";
    inputBox.focus();

    if (!timer){
        timeleft = 60;
        timerDisplay.textContent = `残り${timeleft}秒`;

        clearInterval(timer);
        timerDisplay.textContent = `残り${timeleft}秒`;
        timer = setInterval(() => {
            timeleft -= 1;
            timerDisplay.textContent = `残り${timeleft}秒`;
            if (timeleft <= 0) {
                clearInterval(timer);
                timer = null;
                outbox.textContent = "時間切れ!";
                isPlaying = false;
            }
        }, 1000);
    } else {
        timerDisplay.textContent = `残り${timeleft}秒`;
    }

    inputBox.addEventListener('input', function oninput(){
        if (inputBox.value === currentWord){
            isPlaying = false
            inputBox.removeEventListener('input', oninput)
            setTimeout(() => {
                startGame(difficulty);
            }, 500);
        }
    });
}

function updateWord(difficulty) {
    if (difficulty === 'easy'){
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words.splice(randomIndex, 1)[0];
    } else if (difficulty === 'normal'){
        const outbox = document.getElementById('outbox');
        outbox.innerHTML = '';

        if (words2.length === 0){
            outbox.innerHTML = `ゲームクリア！<br>クリアタイム: ${60 - timeleft}秒`;
            clearInterval(timer);

            isPlaying = true;
            updateWord(difficulty);
            TextBox();
            outbox.appendChild(timerDisplay);

            const inputBox = document.getElementById('inputBox');
            inputBox.value = "";
            inputBox.focus();
            
            return;
        }

        const randomIndex = Math.floor(Math.random() * words2.length);
        currentWord = words2.splice(randomIndex, 1)[0];
        usewords.push(currentWord);
    } else {
        if (words3.length === 0){
            outbox.textContent = '';
            outbox.innerHTML = `ゲームクリア！<br>クリアタイム: ${60 - timeleft}秒`;
            clearInterval(timer);
            
            isPlaying = true;
            updateWord(difficulty);
            TextBox();
            outbox.appendChild(timerDisplay);

            const inputBox = document.getElementById('inputBox');
            inputBox.value = "";
            inputBox.focus();
            
            return;
        }

        const randomIndex = Math.floor(Math.random() * words3.length);
        currentWord = words3.splice(randomIndex, 1)[0];
        usewords.push(currentWord);
    }
    usewords.push(currentWord);
}