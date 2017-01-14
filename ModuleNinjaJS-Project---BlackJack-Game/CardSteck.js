function LoadCardStekModule() {
    blackJack.CardSteck = moduleNinja.class()
    .className("CardSteck")
    .knownType(moduleNinja.type("Card", blackJack.Card))
    .validator("cardsArray", function (target, value) {
        if (!target || !this.hasOwnProperty(target)) {
            throw new ReferenceError(target + " is not defined");
        }
        if (value !== undefined) {
            if (value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    if (!value[i] instanceof types.Card) {
                        throw { message: "Array contains value that is not a Card" }
                    }
                }

                this[target] = value;
                return this;
            }
            else {
                throw new TypeError(target + " expected instance of 'Array'. Got type '" + typeof value + "'");
            }
        }
        else {
            return this[target];
        }
    })
    .arg("cards", "cardsArray", [])
    .function("totalPoints", function () {
        var self = this;
        var totalPoints = 0;
        var countOfAces = 0;

        for (var card in this.cards()) {
            totalPoints += self.cards()[card].pointsInBlackJack();
            if (self.cards()[card].pointsInBlackJack() === 11) {
                countOfAces++;
            }
        }

        while (totalPoints > 21 && countOfAces > 0) {
            countOfAces--;
            totalPoints -= 10;
        }

        return totalPoints;
    })
    .function("length", function () {
        return this.cards().length;
    })
    .function("empty", function () {
        return this.cards([]);
    })
    .function("addCard", function (card) {
        var self = this;
        if (!card) {
            throw { message: "can not add undefined" };
        }
        if (!card instanceof types.Card) {
            throw { message: "argument is not a card" };
        }
        self.cards().push(card);
        return self;
    })
    .function("takeCard", function () {
        var self = this;
        var cards = self.cards();
        var len = cards.length;
        if (len === 0) {
            return null;
        }
        return cards.pop();
    })
    .finalize();
}