const playground = $('.playground'); // jQuery shortcut
const message = $('.message');
const wordDisplay = $('.word');
const winCount = $('#wins-count');
const lossCount = $('#losses-count');
const totalGame = $('#total-games-count');

let wins = 0;
let losses = 0;
let totalGames = 0;

$(document).ready(function () {
    // Function to create the word display
    function Word(word) {
        this.word = word;
        this.length = word.length;

        this.createLetterDivs = function () {
            for (let i = 0; i < this.length; i++) {
                wordDisplay.append('<div class="letter-' + i + '">' + '*' + '</div>');
            }
        };

        this.showLetterIfIsRight = function (letter) {
            let letterFound = false;
            for (let i = 0; i < this.length; i++) {
                if (letter === this.word[i]) {
                    $('.letter-' + i).text(this.word[i]);
                    letterFound = true;
                }
            }
            return letterFound;
        };
    }

    // Country array
    const countries = ['spain', 'uganda', 'sweden', 'norway', 'denmark', 'usa', 'poland', 'england'];

    // Creating buttons with letters
    for (let i = 97; i < 123; i++) {
        let char = String.fromCharCode(i);
        $('.letters').append('<button class="letter-for-click">' + char + '</button>');
    }

    $('.start-button').click(startGame);

    function startGame() {
        $('.start-game').hide();
        playground.show();

        let randomCountry = Math.floor(Math.random() * countries.length);
        const wordToGuess = new Word(countries[randomCountry]);

        wordToGuess.createLetterDivs();
        const lettersArrayForClick = $('.letter-for-click');
        let counter = 0;

        lettersArrayForClick.each(function (index) {
            $(this).off('click').click(function () {
                let letterVal = $(this).text();
                let guessedCorrectly = wordToGuess.showLetterIfIsRight(letterVal);
                const displayedWord = wordDisplay.html();

                // Player wins
                if (!displayedWord.includes('*')) {
                    displayEndGameMessage('Congrats, You win!', true);
                    return;
                }

                // Check if letter is correct
                if (guessedCorrectly) {
                    $(this).css({ 'background': '#2AFF8E', 'color': '#000000' });
                } else {
                    $(this).css({ 'background': '#FF5F49', 'color': '#000000' });
                    counter++;
                    updateHangman(counter);

                    // Player loses
                    if (counter === 7) {
                        displayEndGameMessage('End of Game!', false);
                    }
                }
            });
        });
    }

    /*function updateHangman(counter) {
        switch (counter) {
            case 1: $('.basis').show(); break;
            case 2: $('.gibbet').show(); break;
            case 3: $('.rope').show(); break;
            case 4: $('.head').show(); break;
            case 5: $('.body').show(); break;
            case 6: $('.hands').show(); break;
            case 7: $('.legs').show(); break;
        }
    }*/

    function updateHangman(counter) {
        switch (counter) {
            case 1: $('.basis').fadeIn(700); break;
            case 2: $('.gibbet').fadeIn(700); break;
            case 3: $('.rope').fadeIn(700); break;
            case 4: $('.head').fadeIn(700); break;
            case 5: $('.body').fadeIn(700); break;
            case 6: $('.hands').fadeIn(700); break;
            case 7: $('.legs').fadeIn(700); break;
        }
    }

    function displayEndGameMessage(msg, isWin) {
        $('.new-game').css('display', 'block');
        message.css('display', 'block').text(msg);
        if (isWin) {
            wins++;
        } else {
            losses++;
        }
        totalGames++;
        updateStats();
        setupNewGameCallbacks();
    }

    function setupNewGameCallbacks() {
        $("#yes").off('click').click(function () {
            resetGame();
            startGame();
        });

        $("#no").off('click').click(function () {
            playground.css('display', 'none');
            $('.end-game').css('display', 'block');
        });

    }

    function resetGame() {
        wordDisplay.empty(); // Clear displayed word
        $('.letters').find('.letter-for-click').css({ 'background': '', 'color': '' }); // Reset styles of buttons
        $('.basis, .gibbet, .rope, .head, .body, .hands, .legs').hide(); // Hide hangman
        $('.new-game').hide(); // Hide new game message
    }

    function updateStats() {
        winCount.text(wins);
        lossCount.text(losses);
        totalGame.text(totalGames);
    }
});