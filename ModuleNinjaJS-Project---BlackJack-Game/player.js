function LoadPlayerModule() {
    blackJack.Player = moduleNinja.class()
    .className("Player");

    blackJack.Player
        .prop(
            "hand",
            moduleNinja.type("CardSteck", blackJack.CardSteck),
            moduleNinja.literal("new types.CardSteck()"))
        .prop("money", "int", 1000)
        .prop("currentWadger", "int", 0)
        .function("wadger", function (ammount) {
            var currentMoney = this.money();
            if (currentMoney > ammount) {
                this.money(currentMoney - ammount);
                this.currentWadger(this.currentWadger() + ammount);
                return ammount;
            }
            else {
                this.money(0);
                this.currentWadger(this.currentWadger() + currentMoney);
                return currentMoney;
            }
        })
        .function("winRound", function () {
            var currentMoney = this.money();
            var wadger = earnings = this.currentWadger();
            this.money(currentMoney + wadger + earnings);
            this.currentWadger(0);
            return earnings;
        })
        .function("loseRound", function () {
            var lostMoney = -this.currentWadger();
            this.currentWadger(0);
            return lostMoney;
        })
        .knownType(moduleNinja.type("Card", blackJack.Card))
        .function("recieveCard", function (card) {
            var self = this;
            if (!card instanceof types.Card) {
                throw { message: "croupier can only recieve cards" };
            }
            self.hand().addCard(card);
            return self;
        })
        .function("points", function () {
            return this.hand().totalPoints();
        })

    blackJack.Player = blackJack.Player.finalize();
}