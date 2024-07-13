/*

// Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
//     Create a Tic-Tac-Toe game grid using your HTML element of choice.
//     When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
//     A heading should say whether it is X's or O's turn and change with each move made.
//     A button should be available to clear the grid and restart the game.
//     When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.

*/

// Initialize variables
var currentPlayer = 'X'; // Starting player
var moves = ['', '', '', '', '', '', '', '', '']; // Array to track moves


document.addEventListener('DOMContentLoaded', function () {

    // Styling for headings
    $("h1").css({
        "color": "navy",
        "text-align": "center"
    });

    // Styling for player turn indicator
    $("#player-turn").css({
        "color": "red",
        "text-align": "center",
        "font-weight": "bold"
    });

    // Styling for grid buttons (squares)
    $(".square-btn").css({
        "width": "150px",
        "height": "150px",
        "line-height": "150px",
        "text-align": "center",
        "font-size": "100px",
        "font-weight": "bold"
    });

    // Styling for restart button
    $('#restart-btn').css({
        "color": "navy",
        "width": "200px",
        "height": "30px",
        "font-size": "15px",
        "text-align": "center"
    });

    // Dynamically define custom alert styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .custom-alert {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%; /* Adjust width as needed */
                max-width: 600px; /* Set maximum width */
                height: 33vh; /* 33% of viewport height */
                background-color: #dc3545; /* Custom background color */
                color: #fff; /* Text color */
                padding: 20px;
                border: 2px solid #761b25; /* Border color */
                box-sizing: border-box; /* Include padding and border in width */
                border-radius: 10px; /* Optional: Add border radius */
                z-index: 1050; /* Ensure it's above other content */
                text-align: center; /* Center text */
            }

            .custom-alert .alert-message {
                font-size: 60px; /* Adjust font size */
                font-weight: bold; /* Optional: Make font bold */
                margin-bottom: 10px; /* Optional: Add space below message */
                flex: 1; /* Take up remaining space */
                height: 33vh; /* Adjust height */
                line-height: 26vh; /* Center text vertically */
                text-align: center; /* Center text */
            }

            .custom-alert .btn-close {
                position: absolute;
                top: 10px;
                right: 10px;
                color: #fff; /* Text color */
                font-size: 24px;
                background: none;
                border: none;
                cursor: pointer;
            }
        `)
        .appendTo('head');

    // Event handler for grid buttons (squares) click
    $('.btn').click(function () {
        var index = $('.btn').index(this); // Get index of clicked button
        if (moves[index] === '') { // Check if button is not already clicked
            moves[index] = currentPlayer; // Mark the move in array
            $(this).css('color', (currentPlayer === 'X') ? "#B34700" : "green"); // Change text color based on player
            $(this).text(currentPlayer); // Display 'X' or 'O' on the button
            if (checkWin()) { // Check if there's a winner or a draw
                return;
            };
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // Switch players
            $('#player-turn').text('Current Turn: ' + currentPlayer); // Update current player turn
        }
    });

    // Function to check for a winner
    function checkWin() {
        // Winning combinations (indices)
        var winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        // Check each winning combination
        for (var i = 0; i < winningCombinations.length; i++) {
            var [a, b, c] = winningCombinations[i];

            if (moves[a] !== '' && moves[a] === moves[b] && moves[a] === moves[c]) {
                let winner = currentPlayer;
                // Display winner message with alert dialog
                setTimeout(function () {
                    var message = `${winner} wins`;
                    var alertType = "warning"; // Use "primary", "success", "warning", "danger", etc.
                    showAlert(message, alertType); // Show alert message
                    resetGame(); // Reset game after alert is closed
                }, 250); // Delay to ensure button click is registered first
                return true; // Return true if there's a winner
            }
        }

        // Check if all moves are filled (draw)
        if (moves.every(move => move !== '')) {
            setTimeout(function () {
                var message = "It's a draw."; // Draw message
                var alertType = "info"; // Use "primary", "success", "warning", "danger", etc.
                showAlert(message, alertType); // Show alert message
                resetGame(); // Reset game after alert is closed
            }, 250); // Delay to ensure button click is registered first
            return true; // Return true for draw condition
        }

        return false; // Return false if game is still ongoing
    }

    // Event handler for restart button click
    $('#restart-btn').click(function () {
        resetGame(); // Reset game
    });

    // Function to show custom Bootstrap-like alert message
    function showAlert(message, alertType) {
        // Create a new alert element using jQuery
        var alertDiv = $('<div class="custom-alert alert alert-' + alertType + ' alert-dismissible fade show" role="alert">' +
            '<div class="alert-message">' + message + '</div>' +
            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '</div>');

        // Append the alert to the body
        $('body').append(alertDiv);
    }

    // Function to reset the game state
    function resetGame() {
        moves = ['', '', '', '', '', '', '', '', '']; // Clear moves array
        $('.square-btn').text(''); // Clear button texts
        currentPlayer = 'X'; // Reset starting player
        $('#player-turn').text('Current Turn: ' + currentPlayer); // Update current player turn
    }

});
