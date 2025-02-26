// // //drag function
// function drag(event){
//     event.dataTransfer.setData('text', event.target.id);
// }

// function allowDrop(event){
//     event.preventDefault();
// }

// function drop(event){
//     // event.preventDefault();
//     // let data = event.dataTransfer.getData('text');
//     // event.target.appendChild(document.getElementById(data))
//     event.preventDefault();
//     let data = event.dataTransfer.getData('text');
//     let target = event.target;

//     // Check if dropBox already contains an image
//     if (!target.hasChildNodes()) {
//         target.appendChild(document.getElementById(data));
//     }
// }

// //onload function
// function shufflePieces() {
    
//    let parentElement = document.getElementById('drag');
//     let fragment = document.createDocumentFragment();
//     while(parentElement.children.length){
//         fragment.appendChild(parentElement.children[Math.floor(Math.random() * parentElement.children.length)])
//     }

//     parentElement.appendChild(fragment)
// }

// function checkWin() {
//     const boxes = document.querySelectorAll('.dropBox');
//     let correct = 0;

//     boxes.forEach((box, index) => {
//         if (box.firstChild && box.firstChild.id === `block${index + 1}`) {
//             correct++;
//         }
//     });

//     if (correct === 9) {
//         alert('Congratulations! You solved the puzzle!');
//     }
// }

// Updated sliding puzzle game with timer, move counter, and win condition

let timer;
let seconds = 0;
let moves = 0;
let isPaused = false;

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (!isPaused) {
            seconds++;
            document.getElementById('timer').innerText = `Time: ${seconds}s`;
        }
    }, 1000);
}

function toggleTimer() {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').innerText = isPaused ? 'Continue' : 'Pause';
}

function shufflePieces() {
    let parentElement = document.getElementById('drag');
    let fragment = document.createDocumentFragment();
    let pieces = Array.from(parentElement.children);
    
    while (pieces.length) {
        let randomIndex = Math.floor(Math.random() * pieces.length);
        fragment.appendChild(pieces.splice(randomIndex, 1)[0]);
    }
    parentElement.appendChild(fragment);

    resetGame(true);
}

function resetGame(keepShuffle = false) {
    let parentElement = document.getElementById('drag');
    let pieces = Array.from(parentElement.children);
    if (!keepShuffle) {
        pieces.sort((a, b) => a.id.localeCompare(b.id));
        pieces.forEach(piece => parentElement.appendChild(piece));
    }

    document.querySelectorAll('.dropBox').forEach(box => box.innerHTML = '');
    seconds = 0;
    moves = 0;
    isPaused = false;
    clearInterval(timer);
    document.getElementById('timer').innerText = 'Time: 0s';
    document.getElementById('moves').innerText = 'Moves: 0';
    document.getElementById('pauseBtn').innerText = 'Pause';
    startTimer();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    let target = event.target;

    if (!target.hasChildNodes()) {
        target.appendChild(document.getElementById(data));
        moves++;
        document.getElementById('moves').innerText = `Moves: ${moves}`;
        checkWin();
    }
}

function checkWin() {
    const boxes = document.querySelectorAll('.dropBox');
    let correct = 0;
    boxes.forEach((box, index) => {
        if (box.firstChild && box.firstChild.id === `block${index + 1}`) {
            correct++;
        }
    });

    if (correct === 9) {
        clearInterval(timer);
        setTimeout(() => alert(`Congratulations! You solved the puzzle in ${moves} moves and ${seconds} seconds!`), 100);
    }
}

window.onload = () => {
    shufflePieces();
};