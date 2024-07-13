
/*

Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
    Create a Tic-Tac-Toe game grid using your HTML element of choice.
    When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
    A heading should say whether it is X's or O's turn and change with each move made.
    A button should be available to clear the grid and restart the game.
    When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.

*/


// Initialize variables
var currentPlayer = 'X'; // Starting player
var moves = ['', '', '', '', '', '', '', '', '']; // Array to track moves


document.addEventListener('DOMContentLoaded', function () {

  $("h1 , h2").css({
    "color": "navy",
    "text-align": "center"
  });

  $("#player-turn").css({
    "color": "blue",
    "text-align": "center"
  });

  /* Height is equal to width for square shape and vertical height is aligned at the center */

  $(".square-btn").css({
    "width": "150px",
    "height": "150px",
    "line-height": "150px",
    "text-align": "center",
    "font-size": "100px",
    "font-weight": "bold"

  });

  $('#restart-btn').css({
    "color": "navy",
    "width": "200px",
    "height": "30px",
    "font-size": "15px",
    "text-align": "center"

  })

  // Button Click event handler for the nine buttons to handle player moves, update grid display, switch players, and check for win/draw conditions.
  $('.btn').click(function () {
    var index = $('.btn').index(this); // Get index of clicked button
    if (moves[index] === '') { // Check if button is not already clicked
      moves[index] = currentPlayer; // Mark the move in array
      $(this).css('color', (currentPlayer === 'X') ? "#B34700" : "green"); // Depending on the player, text color on the button is changed
      $(this).text(currentPlayer); // Display 'X' or 'O' on the button
      if (checkWin()) { // Check if there's a winner or a draw, exit the function.
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
          alert(winner + ' wins!');
          // Reset game after user clicks OK
          resetGame();
        }, 250); // 250 milliseconds = 0.25 second delay
        return true; // Return true if there's a winner
      }
    }

    // Check if all moves are filled (draw)
    if (moves.every(move => move !== '')) {
      // Display draw message with alert dialog
      setTimeout(function () {
        alert("It's a draw!");
        // Reset game after user clicks OK
        resetGame();
      }, 250); // 250 milliseconds = 0.25 second delay
      return true; // Return true for draw condition
    }

    return false; // Return false if game is still ongoing
  }

  // Restart button click event handler
  $('#restart-btn').click(function () {
    resetGame();
  });

  // Function to reset the game state
  function resetGame() {
    moves = ['', '', '', '', '', '', '', '', '']; // Clear moves array
    $('.square-btn').text(''); // Clear button texts
    $('#winner-info').hide(); // Hide winner info
    currentPlayer = 'X'; // Reset starting player
    $('#player-turn').text('Current Turn: ' + currentPlayer); // Update current player turn
  }
});
