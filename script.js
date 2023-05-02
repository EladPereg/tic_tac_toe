let playerText = document.getElementById('playerText');
let resrartBtn = document.getElementById('reastartBtn');
let playerTurn = document.getElementById('playerTurn');
let boxes = Array.from(document.getElementsByClassName('box')); /*גורמים לכל אחד מהתיבות להיות בתוך מערך אחד שיכיל את כולם */
let x_wins = document.getElementById('x_wins');
let o_wins = document.getElementById('o_wins');
let xWins = 0;
let oWins = 0;

const O_text = 'o';
const X_text = 'x';
let currentPlayer = X_text;
let spaces = Array(9).fill(null); /*יוצרים מערך ריק על מנת שנוכל לדחוף לתוכו כל איבר פעם אחת ללא חזרות */


let clickSound = new Audio("sounds/click.wav")
let gameOverSound = new Audio("sounds/gameOver.wav")
const startGame = () => {
    boxes.forEach(val => val.addEventListener('click', boxClicked)) /*פונקציה שנותנת אפשרות ללחוץ על כל איבר בפני עצמו ,לבצע פעולה עצמאית ולהתייחס בנפרד לכל תיבה */
}

function hoverText() {            /*יצירת אפקט של ריחוף */
    boxes.forEach((val) => {
        val.classList.remove("x-hover")               /*מסירים מכל איבר את הקלאס,ואז רק תיבה שהיא ריקה יהיה אפשר לעשות עליה את הריחוף וככה מונעים כפילויות בריחוף */
        val.classList.remove("o-hover")
    });
    const hoverClass = `${currentPlayer.toLowerCase()}-hover`;

    boxes.forEach((val) => {
        if (val.innerText == "") {
            val.classList.add(hoverClass)
        }
    })

}
hoverText()

let flag = true  /*דגל למניעת לחיצה לאחר ניצחון */
function boxClicked(e) {
    if (flag) {
        const id = e.target.id;
        if (!spaces[id]) {   /*בודקים אם המערך הריק מכיל את אותו איבר */
            spaces[id] = currentPlayer; /*מכניסים לתוכו את השחקן הנוכחי */
            e.target.innerText = currentPlayer;

            if (playerHasWon() !== false) {
                flag = false
                gameOverSound.play()
                playerText.innerText = `${currentPlayer.toLocaleUpperCase()} wins!`
                let wining_blacks = playerHasWon()
                currentPlayer = currentPlayer == X_text ? xWins++ : oWins++
                x_wins.innerHTML = xWins
                o_wins.innerHTML = oWins
                playerTurn.style.display = 'none'
                wining_blacks.map(val => boxes[val].style.backgroundColor = '#4557cc')
            }
            let checkIfEqualToNull = spaces.every((val) => {
                return val != null
            })
            if(checkIfEqualToNull===true){
                playerText.innerText=`it's a Draw !`
                playerTurn.style.display = 'none'
            }

            currentPlayer = currentPlayer == X_text ? O_text : X_text;
            playerTurn.innerHTML = `${currentPlayer.toLocaleUpperCase()}'s turn`
        }
    }
    clickSound.play()
    hoverText()
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

function playerHasWon() {
    for (const condition of winningCombos) {    /*בדיקה של כל אובייקט במערך מול מערך מסויים */
        let [a, b, c] = condition
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

resrartBtn.addEventListener('click', reastart);

function reastart() {
    spaces.fill(null);
    boxes.forEach(val => {
        val.innerText = ''
        val.style.backgroundColor = ''
    })
    playerText.innerText = 'Tic Tac Toe'
    flag = true
    playerTurn.innerHTML = `X's turn`
    playerTurn.style.display = 'block'
    currentPlayer = X_text;
    hoverText()
}
startGame()
