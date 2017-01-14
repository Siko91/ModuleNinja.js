function LoadDealerModule() {
    blackJack.Dealer = moduleNinja.class()
    .className("Dealer");

    blackJack.Dealer
        .prop(
            "deck",
            moduleNinja.type("CardSteck", blackJack.CardSteck),
            moduleNinja.literal("new types.CardSteck()"))
        .prop(
            "hand",
            moduleNinja.type("CardSteck", blackJack.CardSteck),
            moduleNinja.literal("new types.CardSteck()"))
        .prop("secretCard", "any", null);

    blackJack.Dealer
        .knownType(moduleNinja.type("Card", blackJack.Card))
        .function("resetCards", function () {
            var self = this;
            var combinations = [];
            var randomIndex;
            var cardInfo;
            var card;

            while (self.deck().length() > 0) {
                self.deck().takeCard();
            }

            for (var p = 2; p <= 14; p++) {
                for (var s = 1; s <= 4; s++) {
                    combinations.push({ pow: p, suit: s });
                }
            }

            while (combinations.length > 0) {
                randomIndex = Math.floor(Math.random() * combinations.length);
                cardInfo = combinations.splice(randomIndex, 1)[0];
                card = new types.Card(cardInfo.pow, cardInfo.suit);
                self.deck().addCard(card);
            }

            return self;
        })
        .function("takeCard", function () {
            var card = this.deck().takeCard();
            if (this.cardsLeft() === 0) {
                this.resetCards();
            }
            return card;
        })
        .function("cardsLeft", function () {
            return this.deck().length();
        })
        .function("recieveCard", function (card) {
            var self = this;
            if (!card instanceof types.Card) {
                throw { message: "Dealer can only recieve cards" };
            }
            self.hand().addCard(card);
            return self;
        })
        .function("revealSecretCard", function () {
            var self = this;
            self.recieveCard(self.secretCard());
            self.secretCard(null);
            return self;
        })
        .function("points", function () {
            var self = this;
            return self.hand().totalPoints();
        })

    blackJack.Dealer = blackJack.Dealer.finalize();
}