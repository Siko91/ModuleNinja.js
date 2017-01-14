function LoadUIModule() {
    blackJack.Ui = moduleNinja.class({ "containerId": "string" })
        .className("Ui")
        .prop("initialized", "bool", false);

    blackJack.Ui
        .function("getPlayerChoice", function () {
            var choice = null;
            var input = confirm("Do you wish to wadger more and get another card?");

            if (input === true) {
                choice = parseInt(prompt("How much will you wadger?", "100"));
                while (isNaN(choice)) {
                    choice = parseInt(prompt("Invalid input. How much will you wadger?", "100"));
                }
            }
            else if (input === false) {
                choice = 0;
            }

            return choice;
        })
        .function("drawGame", function (game) {
            var self = this;

            var $container = $("#" + self.containerId());

            $container.find("#dealerArea").find(".points").empty().append(game.theDealer().points());
            $container.find("#dealerArea").find(".cards-in-deck").empty().append(game.theDealer().cardsLeft());

            $container.find("#playerArea").find(".points").empty().append(game.thePlayer().points());
            $container.find("#playerArea").find(".wadger").empty().append(game.thePlayer().currentWadger());
            $container.find("#playerArea").find(".money").empty().append(game.thePlayer().money());

            var dealerCards = game.theDealer().hand().cards();
            var playerCards = game.thePlayer().hand().cards();
            var $dealerCardsContainer = $container.find("#dealerArea").find(".cards-area").empty();
            var $playerCardsContainer = $container.find("#playerArea").find(".cards-area").empty();
            for (var i = 0; i < dealerCards.length; i++) {
                $dealerCardsContainer.append($("<div>")
                    .addClass("card")
                    .append(dealerCards[i].toString()));
            }

            if (game.theDealer().secretCard() !== null) {
                $dealerCardsContainer.append($("<div>")
                    .addClass("card")
                    .addClass("secret-card")
                    .append("SECRET CARD"));
            }

            for (var i = 0; i < playerCards.length; i++) {
                $playerCardsContainer.append($("<div>")
                    .addClass("card")
                    .append(playerCards[i].toString()));
            }
        })
        .function("showMessage", function (message) {
            alert(message);
        })
        .function("init", function () {
            var self = this;
            if (!self.initialized()) {
                self.initialized(true);

                var $container = $("#" + self.containerId());

                $("<div>")
                    .attr("id", "main")
                    .appendTo($container);
                $("<div>")
                    .attr("id", "dealerArea")
                    .append($("<h1>").append("Dealer"))
                    .append($("<div>").addClass("cards-area"))
                    .append($("<div>")
                        .addClass("statistics")
                        .append($("<span>").append("points : "))
                        .append($("<span>").addClass("points").append("0"))
                        .append($("<br>"))
                        .append($("<span>").append("cards left in deck : "))
                        .append($("<span>").addClass("cards-in-deck").append("0")))
                    .appendTo($container.find("#main"));
                $("<div>")
                    .attr("id", "playerArea")
                    .append($("<h1>").append("Player"))
                    .append($("<div>").addClass("cards-area"))
                    .append($("<div>")
                        .addClass("statistics")
                        .append($("<span>").append("points : "))
                        .append($("<span>").addClass("points").append("0"))
                        .append($("<br>"))
                        .append($("<span>").append("wadger : "))
                        .append($("<span>").addClass("wadger").append("0"))
                        .append($("<br>"))
                        .append($("<span>").append("money : "))
                        .append($("<span>").addClass("money").append("0")))
                    .appendTo($container.find("#main"));

                $("<div>")
                    .attr("id", "statistics")
                    .appendTo($container);
            }
        });

    blackJack.Ui = blackJack.Ui.finalize();
}