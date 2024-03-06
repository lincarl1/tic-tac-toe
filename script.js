// Player Object
const createPlayer = (name, symbol) => {
    // Initialize Variables
    let score = 0;

    // Getter and Setter for Scores
    const getScore = () => score;
    const setScore = () => score++;

    return { 
        name, 
        symbol, 
        getScore, 
        setScore 
    };
};

// Game Board Object
const gameBoard = (function() {
    // Initialize Variables
    const rows = 3;
    const cols = 3;
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    // Return Current State of Board
    const getBoard = () => board;

    // Generate Player Move
    const playerMove = (row, col, symbol) => {
        if (board[row][col] !== "") return;
        board[row][col] = symbol;
    };

    // Log and Display the Current State of the Board
    const displayBoard = () => {
        console.log(`
            ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
            ------------------------------------------------
            ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
            ------------------------------------------------
            ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
        `);
    };

    // Reset Board
    const resetBoard = () => {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    };

    // Check for Win Conditions
    const checkWin = () => {
        // Return True if Win, Return "TIE" if No Moves, Else Return False

        // Check Horizontals
        for(let i = 0; i < rows; i++)
        {
            if (board[i][0] !== "" && board[i][1] === board[i][0] && board[i][2] === board[i][0])
            {
                return true;
            }
        }

        //Check Verticals
        for(let j = 0; i < cols; j++)
        {
            if(board[0][j] !== "" && board[1][j] === board[0][j] && board[2][j] === board[0][j])
            {
                return true;
            }
        }

        //Check Horizontals
        if((board[0][0] !== "" && board[1][1] === board[0][0] && board[2][2] == board[0][0]) || 
        (board[0][2] !== "" && board[1][1] === board[0][2] && board[2][0] == board[0][2]))
        {
            return true;
        }

        // Tie Condition
        if(board.some((row) => row.includes("")) === false) return "TIE";

        return false;

    };

    return {
        board,
        playerMove,
        getBoard,
        displayBoard,
        resetBoard,
        checkWin
    };
})();

// Important HTML Variables
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restartBtn");
const gameCellContainer = document.querySelector(".gameCellContainer");

// Game Function
function game() {
    // Initialize Variables
    const board = gameBoard;
    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');
    let currentPlayer = playerOne;

    // Play move
    const playTurn = (row, col) => {
        // Check Row Input
        if (row < 0 || row > 2) return;
        
        // Check Col Input
        if (col < 0 || col > 2) return;

        // Perform Player Move
        board.playerMove(row, col, currentPlayer.symbol);
        changePlayer(); // Change Player Turn
    }

    // Change Player Turn
    const changePlayer = () => {
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
    };

    // Change Player 1 Name
    const setPlayerOneName = (name) => playerOne.name = name;

    // Change Player 2 Name
    const setPlayerTwoName = (name) => playerTwo.name = name;

    // Reset Game Board
    const resetGameBoard = () => { 
        board.resetBoard;
        currentPlayer = playerOne;
    };

    // Get Player 1 Stats
    const getPlayerOneGameStats = () => {
        return `${playerOne.name}: ${playerOne.getScore()}`;
    };

    // Get Player 2 Stats
    const getPlayerTwoGameStats = () => {
        return `${playerTwo.name}: ${playerTwo.getScore()}`;
    };

    const getCurrentPlayer = () => {
        return currentPlayer.name;
    }

    return {
        playTurn,
        changePlayer,
        setPlayerOneName,
        setPlayerTwoName,
        resetGameBoard,
        getPlayerOneGameStats,
        getPlayerTwoGameStats,
        getCurrentPlayer
    }
};

function displayStats(game) {
    const gameStatus = document.querySelector(".statusText");
    const firstPlayerScore = document.querySelector(".firstPlayerScore");
    const secondPlayerScore = document.querySelector(".secondPlayerScore");

    gameStatus.textContent = `${game.getCurrentPlayer()}'s Turn`
    firstPlayerScore.textContent = game.getPlayerOneGameStats();
    secondPlayerScore.textContent = game.getPlayerTwoGameStats();
};

function intializeGame() {
    let gameObj = game();
    displayStats(gameObj);
};

intializeGame();