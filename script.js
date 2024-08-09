let boxes = document.querySelectorAll(".box");
let turn = true;
let reset = document.querySelector(".reset");
let winnermsg = document.querySelector(".winnermsg");
let replay = document.querySelector(".replay");
let p1 = document.querySelector(".p1indicator");
let p2 = document.querySelector(".p2indicator");
let winner;
let winnerFound = false;
let count = 0;
p1.style.backgroundColor = "Green";
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turn == true) {
            count++;
            p1.style.backgroundColor = "white";
            p2.style.backgroundColor = "red";
            box.style.color = "green";
            box.innerText = ("O");
            turn = false;
            box.disabled = "true";
            checkWinner();
        }
        else {
            count++;
            p1.style.backgroundColor = "green";
            p2.style.backgroundColor = "white";
            box.style.color = "red";
            box.innerText = ("X");
            turn = true;
            box.disabled = "true";
            checkWinner();
        }
    });
});

let winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

let checkWinner = () => {
    winningPatterns.forEach(pattern => {
        if (boxes[pattern[0]].innerText == boxes[pattern[1]].innerText &&
            boxes[pattern[1]].innerText == boxes[pattern[2]].innerText &&
            boxes[pattern[0]].innerText != "") 
        {
            console.log(`Winner is ${boxes[pattern[0]].innerText};`);
            winner = `${boxes[pattern[0]].innerText}`;
            disable();
            announceWinner(winner);
        }
        else if (count == 9 && winnerFound == false) {
            winnermsg.innerText = ("Match Drawn");
            winnermsg.classList.remove("hide");
            replay.classList.remove("hide");
            reset.classList.add("hide");
        }
    });
};

const disable = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
//reset
reset.addEventListener("click", () => {
    turn = true;
    count = 0;
    enable();
})

let announceWinner = (winner) => {
    winnerFound = true;
    count = 0;
    winnermsg.innerText = (`Congratulations, ${winner} won`);
    winnermsg.classList.remove("hide");
    replay.classList.remove("hide");
    reset.classList.add("hide");
}

//replay
replay.addEventListener("click", () => {
    turn = true;
    winnerFound = false;
    reset.classList.remove("hide");
    winnermsg.classList.add("hide");
    replay.classList.add("hide");
    reset.disabled = false;
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
})
