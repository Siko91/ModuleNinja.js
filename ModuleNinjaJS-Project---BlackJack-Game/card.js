function LoadCardModule() {
    blackJack.Card = moduleNinja.class(
    {
        "power": "positiveInt",
        "suit": "positiveInt"
    })
    .className("Card")
    .private("cardNames",
        ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Ace", "Jack", "Queen", "King"])
    .private("cardSuits",
        ["Clubs", "Diamonds", "Hearts", "Spades"])
    .accessor("cardName", function () {
        return cardNames[this.power() - 1];
    })
    .accessor("cardSuit", function () {
        return cardSuits[this.suit() - 1];
    })
    .function("toString", function toString() {
        return this.cardName() + " of " + this.cardSuit();
    })
    .function("pointsInBlackJack", function toString() {
        if (this.power() === 11) {
            return this.power();
        }
        else if (this.power() >= 10) {
            return 10;
        }
        else {
            return this.power();
        }
    })
    .finalize();
}