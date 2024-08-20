/*
Next:
implement the winning logic
finishing touches

*/

const Gameboard = (function() {
    function createGameboard() {
        const board = Array(9).fill('');

        function getBoard() {
            return board; 
        }

        function setCell(index, symbol) {
            if (index >=0 && index<9 && board[index] === '') {
                board[index] = symbol;
                return true;
            }
            return false
        }

        function resetBoard() {
            board.fill('');
        }

        function checkWin() {
            winningCombinations = [
                [0,1,2], [3,4,5], [6,7,8],
                [0,3,6], [1,4,7], [2,5,8],
                [0,4,8], [2,4,6]
            ];
            for (const combo of winningCombinations) {
                const [a,b,c] = combo;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return board[a]
                }
            }
            return null;
        }

        return {
            getBoard,
            setCell,
            resetBoard,
            checkWin
        };
        
    }

    return {
        createGameboard
    };
})();

const Player = (function() {
    function createPlayer(name, symbol) {

        return {
            name, symbol
        }
    }
    return {
        createPlayer
    };
})();

let currentPlayer;

const playerForm = document.getElementById('add-player-form');
playerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var symbol = document.querySelector('input[name="symbol"]:checked').value;

    const player1 = Player.createPlayer(name, symbol);
    currentPlayer = player1.symbol;
    let player2;
    if (player1.symbol ==='X') {
        player2 = Player.createPlayer('CPU', 'O');
    }
    else {
        player2 = Player.createPlayer('CPU', 'X')
    }
    
    document.getElementById('game-title').textContent = player1.name + ' (' + player1.symbol + ') ' + ' vs ' + player2.name + ' (' + player2.symbol + ') ';
});

const gameboard = Gameboard.createGameboard();

function updateDisplay() {
    const board = gameboard.getBoard();
    for (let i=0; i<9;i++) {
        document.getElementById(`cell-${i}`).textContent = board[i];
    }
    console.log(gameboard.getBoard());
}

function cellClick(event) {
    const cellIndex = parseInt(event.target.id.split('-')[1])
    if (gameboard.setCell(cellIndex, currentPlayer)) {
        updateDisplay();
        const winner = gameboard.checkWin();
        console.log(winner);
        if (winner) {
            updateDisplay();
            alert(`${winner} wins!`)
            gameboard.resetBoard();
            updateDisplay();
        }
        else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
        
    }
}

document.addEventListener('DOMContentLoaded', function() {
    for (let i=0;i<9;i++) {
        document.getElementById(`cell-${i}`).addEventListener('click', cellClick);
    }
})
