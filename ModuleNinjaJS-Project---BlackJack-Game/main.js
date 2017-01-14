var blackJack = {};

window.onload = function main() {
    LoadCardModule();
    LoadCardStekModule();
    LoadDealerModule();
    LoadPlayerModule();
    LoadUIModule();

    LoadGameModule();

    var game = new blackJack.Game(new blackJack.Ui("wrapper"));
    game.theDealer().resetCards();

    while (game.thePlayer().money() > 100) {
        var input = confirm("Do you wish to start a new round with a wadger of 100 $ ?");

        if (input === true) {
            game.startRoundWithMinWadger(100);
        }
        else if (input === false) {
            break;
        }
    }
}