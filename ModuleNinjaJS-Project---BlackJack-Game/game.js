function LoadGameModule() {
    blackJack.Game = moduleNinja.class() 
        .className("Game")
        .knownType(moduleNinja.type("Player", blackJack.Player))
        .knownType(moduleNinja.type("Dealer", blackJack.Dealer))
        .attr("ui", "any", moduleNinja.required())
        .prop("thePlayer", "type Player", moduleNinja.accept("new types.Player()"))
        .prop("theDealer", "type Dealer", moduleNinja.accept("new types.Dealer()"))
        .function("processPlayerChoices", function () {
            var self = this;
            var wadgerInrease = self.ui().getPlayerChoice();
            if (wadgerInrease === 0) {
                return 0
            }
            if (wadgerInrease > 0) {
                wadgerInrease = self.thePlayer().wadger(wadgerInrease);
                self.thePlayer().recieveCard(self.theDealer().takeCard());

                self.ui().drawGame(self);

                if (self.thePlayer().points() < 21) {
                    wadgerInrease += self.processPlayerChoices();
                }
                else {
                    return 0;
                }
            }

            return wadgerInrease;
        })
        .function("startRoundWithMinWadger", function (minWadger) {
            if (!minWadger ||
                typeof minWadger !== "number" ||
                minWadger < 0) {
                throw new Error("Invalid wadger! Can't be less than 0!");
            }

            var self = this;
            var dealerWon = false;
            var totalAmmount = 0;

            self.ui().init();

            self.thePlayer().wadger(minWadger);

            self.thePlayer().recieveCard(self.theDealer().takeCard());
            self.thePlayer().recieveCard(self.theDealer().takeCard());
            self.theDealer().secretCard(self.theDealer().takeCard());
            self.theDealer().recieveCard(self.theDealer().takeCard());

            self.ui().drawGame(self);

            if (self.thePlayer().points() < 21) {
                self.processPlayerChoices();
            }

            self.theDealer().revealSecretCard();
            self.ui().drawGame(self);

            if (self.thePlayer().points() === 21) {
                dealerWon = false;
            }
            else if (self.thePlayer().points() > 21) {
                dealerWon = true;
            }
            else {
                while (self.theDealer().points() <= 21 &&
                        self.theDealer().points() <= self.thePlayer().points()) {
                    self.theDealer().recieveCard(self.theDealer().takeCard());
                }
                if (self.theDealer().points() <= 21) {
                    dealerWon = true;
                }
                else {
                    dealerWon = false;
                }
            }

            // returns the result of the round - +/- ammount
            if (dealerWon) {
                totalAmmount = self.thePlayer().loseRound();
                self.ui().drawGame(self);
                self.ui().showMessage("You lost " + (-totalAmmount) + " $");
            }
            else {
                totalAmmount = self.thePlayer().winRound();
                self.ui().drawGame(self);
                self.ui().showMessage("You won " + totalAmmount + " $")
            }

            self.thePlayer().hand().empty();
            self.theDealer().hand().empty();

            self.ui().drawGame(self);
            return totalAmmount;
        })
    blackJack.Game = blackJack.Game.finalize();
}
