$(document).ready(function () {
    const words = ["hangman", "javascript", "jquery", "web"];
    let selectedWord = "";
    let guessedWord = [];
    let penaltyCount = 0;

    function startGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
        guessedWord = Array(selectedWord.length).fill('_');
        penaltyCount = 0;

        displayWord();

        // Clear the input field and enable it
        $("#guess-word").val("").prop("disabled", false);

        // Enable the guess button
        $("#guess-btn").prop("disabled", false);
    }

    function displayWord() {
        $("#word-display").text(guessedWord.join(' '));
    }

    function checkLetter(letter) {
        if (selectedWord.includes(letter)) {
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    guessedWord[i] = letter;
                }
            }

            if (!guessedWord.includes('_')) {
                alert("You win! The word was: " + selectedWord);
                startGame();
            }
        } else {
            penaltyCount++;
            $("#penalty-count").text(penaltyCount);

            if (penaltyCount === 6) {
                animateHangman();
                alert("Game over! The word was: " + selectedWord);
                endGame();
            }
        }

        displayWord();
    }

    function animateHangman() {
        // Your animation code here using Velocity.js
        // For example:
        $("#door1").velocity({ rotateZ: 90 }, 1000);
        $("#door2").velocity({ rotateZ: -90 }, 1000);
        $("#armL, #armR").velocity({ y2: "+=70px", x2: "+=10px" }, 500);
        $("#body, #rope").velocity({ translateY: "+=200px" }, { duration: 500, delay: 1000 });
    }

    // Event handler for the start button
    $("#start-btn").click(function () {
        startGame();
        resetAnimation();
        // Reset the animation when starting a new game
    });

    // Event handler for the guess button
    $("#guess-btn").click(function () {
        const guessInput = $("#guess-word").val().toLowerCase();
        checkLetter(guessInput);
    });

    // Event handler for the Enter key press on the input field
    $("#guess-word").keypress(function (event) {
        if (event.which === 13) {
            const guessInput = $("#guess-word").val().toLowerCase();
            checkLetter(guessInput);
        }
    });

    function disableInteraction(disable = true) {
        $(".key, #guess-btn, #guess-word").prop("disabled", disable);
    }

    function endGame() {
        disableInteraction();
        resetGuessElements();
    }

    function resetGuessElements() {
        $("#guess-word").val(""); // Clear the input field
        $("#guess-btn").prop("disabled", false); // Enable the guess button
    }

    function resetAnimation() {
        // Reset the animation properties to their initial state
        $("#door1, #door2, #armL, #armR, #body, #rope").velocity("stop", true);
        $("#door1, #door2").velocity({ rotateZ: 0 }, 0);
        $("#armL, #armR").velocity({ y2: "-=70px", x2: "-=10px" }, 0);
        $("#body, #rope").velocity({ translateY: "-=200px" }, 0);
    }

    // Start the game initially
    startGame();
});
