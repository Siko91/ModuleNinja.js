define(["jquery", "user", "order", "registerPages", "product"], function ($, User, Order, app, Product) {
    function showLoginPage($container) {
        $container.append($("<div>")
            .append($("<label>").attr("for", "username-input").append("Username: "))
            .append($("<input>").attr("id", "username-input"))
            .append($("<br/>"))
            .append($("<label>").attr("for", "password-input").append("Password: "))
            .append($("<input>").attr("id", "password-input").attr("type", "password"))
            .append($("<br/>"))
            .append($("<button>").append("Login").on("click", onLoginClick))
            .append($("<button>").append("Register").on("click", onRegisterClick))
            );
    }

    function onLoginClick() {
        var username = $("#username-input").val();
        var pass = $("#password-input").val();
        User.parseQuery()
            .equalTo("username", username)
            .equalTo("password", pass)
            .find().then(function (result) {
                if (!result[0]) {
                    return;
                }

                result[0].logKey("" + Math.random()).parseSave().then(function () {
                    localStorage.user = JSON.stringify(result[0]);
                    window.location.reload();
                });
            });
    }
    function onRegisterClick() {
        var username = $("#username-input").val();
        var pass = $("#password-input").val();

        if (username.length < 3) {
            alert("username must be longer than 3 symbols");
            return;
        }
        if (pass.length < 3) {
            alert("password must be longer than 3 symbols");
            return;
        }

        User.parseQuery()
            .equalTo("username", username)
            .find().then(function (result) {
                if (result[0]) {
                    alert("username is already taken");
                    return;
                }

                try {
                    var u = new User().username(username).password(pass).logKey("" + Math.random());
                    u.parseSave();
                    localStorage.user = JSON.stringify(u);
                    window.location.reload();
                } catch (e) {
                    alert("an error occured while creating user");
                }
            });
    }
    function onLogautClick() {
        if (localStorage.user) {
            getCurrentUser(localStorage.user).then(function (result) {
                if (!result[0]) {
                    return;
                }
                result[0].logKey("" + Math.random())
                    .parseSave()
                    .then(function () {
                        localStorage.removeItem("user");
                        window.location.reload();
                    });
            })
        }
    }

    function showUserPage($container, user) {
        $container.append($("<h1>").append("wellcome, " + user.username()));
        $container.append($("<button>").append("logout").on("click", onLogautClick));

        Order.parseQuery()
            .equalTo("clientID", user.id())
            .equalTo("finalized", false)
            .find().then(function (orders) {
                if (!orders[0]) {
                    return;
                }
                else {
                    var $ordersWindow = $("<div>")
                        .append($("<h2>").append("Order started on " + orders[0].date()))
                        .append($("<hr>"))
                        .appendTo($container);
                    var $list = $("<ol>").appendTo($ordersWindow);
                    var sum = 0;
                    for (var i in orders[0].products()) {
                        var productItem = orders[0].products()[i];
                        var $li = $("<li>").appendTo($list);
                        $li.append($("<a>").append("" + productItem.product)
                                .attr("href", "#/product/" + productItem.productID));
                        $li.append($("<span>").addClass("hasMargin").append("x" + productItem.count));
                        $li.append($("<span>").addClass("hasMargin").append("$" + productItem.price));

                        $li.append($("<hr>"))
                        sum += productItem.price * productItem.count;
                    }
                    $ordersWindow
                        .append($("<h3>").addClass("hasMargin").append("Total : $" + sum))
                        .append($("<hr>"))
                        .append($("<button>").append("Accept").on("click", onOrderAcceptClick))
                        .append($("<button>").append("Deny").on("click", onOrderDenyClick))
                }
            })
    }

    function onOrderAcceptClick() {
        getCurrentUser().then(function (users) {
            Order.parseQuery()
               .equalTo("clientID", users[0].id())
               .equalTo("finalized", false)
               .find().then(function (orders) {
                   if (orders[0]) {
                       orders[0].finalized(true).parseSave().then(function () {
                           alert("order was finalized");
                           // some code to notify the shop ceeper
                           window.location.reload();
                       });
                   }
               });
        });
    }
    function onOrderDenyClick() {
        getCurrentUser().then(function (users) {
            Order.parseQuery()
               .equalTo("clientID", users[0].id())
               .equalTo("finalized", false)
               .find().then(function (orders) {
                   if (orders[0]) {
                       var products = orders[0].products();

                       orders[0].parseDelete(function () {
                           Product.parseQuery().find().then(function myfunction(result) {
                               for (var pr in products) {
                                   var id = products[pr].productID;
                                   var count = products[pr].count;
                                   for (var res in result) {
                                       if (result[res].id() === id) {
                                           result[res].count(result[res].count() + count).parseSave();
                                       }
                                   }
                               }
                           });
                           alert("order is deleted");
                           window.location.reload();
                       }, function () {
                           alert("failed to delete order");
                       });
                   }
               });
        });
    }
    function addToOrder(prod, count) {
        var productToAdd = {
            productID: prod.id(),
            product: prod.name(),
            count: count,
            price: prod.price()
        };

        getCurrentUser().then(function (users) {
            if (prod.count() - count < 0) {
                alert("Can not order more than the shop has in stock");
                return;
            }

            Order.parseQuery()
               .equalTo("clientID", users[0].id())
               .equalTo("finalized", false)
               .find().then(function (orders) {
                   if (orders[0]) {
                       orders[0].products().push(productToAdd);
                       orders[0].parseSave().then(function () {
                           prod.count(prod.count() - count).parseSave().then(function () {
                               window.location.reload();
                               alert("[" + prod.name() + "] x" + count + " has been added to your order");
                           });
                       });
                   }
                   else {
                       var order = new Order().clientID(users[0].id()).date(new Date()).products([productToAdd])
                       order.parseSave().then(function () {
                           prod.count(prod.count() - count).parseSave().then(function () {
                               window.location.reload();
                               alert("[" + prod.name() + "] x" + count + " has been added to your order");
                           });
                       });
                   }
               });
        });
    }

    function getCurrentUser(userCookie) {
        if (!userCookie) {
            userCookie = localStorage.user;
        }

        userCookie = JSON.parse(userCookie);
        return User.parseQuery()
            .equalTo("username", userCookie._username)
            .equalTo("logKey", userCookie._logKey)
            .find();
    }

    return {
        getCurrentUser: getCurrentUser,
        showLoginPage: showLoginPage,
        showUserPage: showUserPage,
        addToOrder: addToOrder
    }
});