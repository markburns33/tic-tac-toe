/*
I have it working in the console
Next:
code up html
make the player by getting their name and symbol
make the ai
use an object to control the flow of the game -> game.turn() to alternate turns

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

        return {
            getBoard,
            setCell,
            resetBoard
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

const gameboard = Gameboard.createGameboard();
const player1 = Player.createPlayer('Mark', 'X');
const player2 = Player.createPlayer('CPU', 'O');

gameboard.setCell(4, 'X');
gameboard.setCell(5,'O');

console.log(gameboard.getBoard());