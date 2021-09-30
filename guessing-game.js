/**
 * Write a function called guessingGame which returns a function that allows you to guess a random whole number between 0 and 99. Every time you create a new game, it should select a new random number, and keep it secret from the player.

Once the game has started, you can guess the number. The game should tell you whether your guess is too high, too low, or correct.

After a correct guess, the game ends.

 * @param {*} guess 
 * @returns message
 */

function guessingGame() {
    const number = Math.random() * 100;
    let winner = false;
    let guessCount = 0;

    function incrementGuessCount() {
        guessCount = guessCount + 1;
    }

    function declareWinner() {
        winner = true;
    }

    return function guess(num) {

        if (winner) return 'The game is over, you already won!';

        incrementGuessCount();

        if (num === number) {
            declareWinner();
            return `You win! You found ${number} in ${guessCount} guesses.`;
        }

        if (num > number) return `${num} is too high!`;
        if (num < number) return `${num} is too low!`;
    }
}

module.exports = { guessingGame };
