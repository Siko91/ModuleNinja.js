define(["jquery", "sammy"], function ($, Sammy) {
    var app = Sammy('#changing-content', function () {
        this.get('#/', function () {
            $("#changing-content").empty()
             .append("This is the home page. Wellcome!");
        });

        this.get('#/about', function () {
            $("#changing-content").empty()
             .append("We sell stuff. Great, aint it?");
        });

        this.get('#/user', function () {
            var $container = $("#changing-content").empty();
            require(["user", "userPageLoader"], function (User, userPageLoader) {
                var userCookie = localStorage.user;
                if (userCookie) {
                    userPageLoader.getCurrentUser(userCookie)
                        .then(function (users) {
                            if (users[0]) {
                                userPageLoader.showUserPage($container, users[0]);
                                return;
                            }
                            userPageLoader.showLoginPage($container);
                        })
                }
                else {
                    userPageLoader.showLoginPage($container);
                }
            });
        });

        this.get('#/catalog', function () {
            require(["product"], function (Product) {
                var $wrapper = $("#changing-content").empty();

                Product.parseQuery().find().then(function (products) {
                    var fragment = document.createDocumentFragment();
                    for (var i = products.length - 1; i >= 0; i--) {
                        $("<article>")
                          .append($("<header>")
                            .append(products[i].name()))
                          .append(
                            $("<a>").attr("href", "#/product/" + products[i].id()).append(
                              $("<img>").attr("src", products[i].pictureURL())))
                          .addClass("product-item")
                          .appendTo(fragment);
                    }
                    $wrapper.append(fragment);
                })
            })
        });

        this.get('#/product/:id', function () {
            var $wrapper = $("#changing-content").empty();
            var id = this.params["id"];
            require(["product", "userPageLoader"], function (Product, userPageLoader) {
                Product.parseQuery()
                    .find().then(function (products) {
                        var prod;
                        for (var i = 0; i < products.length; i++) {
                            if (products[i].id() === id) {
                                prod = products[i];
                                break;
                            }
                        }

                        if (prod === undefined) {
                            var $prodArticle = $("<article>").addClass('product-article')
                                .append($("<h1>").append("No Such Product"))
                                .appendTo($wrapper);
                        }
                        else {
                            var $prodArticle = $("<article>").addClass('product-article')
                                .append($("<h1>").append(prod.name()))
                                .append($("<h4>").append("[ " + prod.count() + " in stock ]"))
                                .append($("<img>").attr("src", prod.pictureURL()))
                                .append($("<p>").append(prod.longDescription()))
                                .append($("<p>").append("Price: " + prod.price() + "$"))
                                .appendTo($wrapper);

                            var userCookie = localStorage.user;
                            if (userCookie) {
                                var $countInput = $("<input>")
                                        .attr("type", "number")
                                        .attr("min", 1)
                                        .attr("step", 1)
                                        .attr("max", prod.count())
                                        .val(1);

                                $prodArticle
                                    .append($countInput)
                                    .append($("<button>")
                                        .append("Add to order")
                                        .on("click", function (sender) {
                                            userPageLoader.addToOrder(prod, parseInt($countInput.val()));
                                        }));
                            }
                        }
                    });
            });
        });

        this.get('#/pricing', function () {
            require(["product"], function (Product) {
                var $wrapper = $("#changing-content").empty();
                Product.parseQuery().find().then(function (products) {
                    var $tableBody = $("<tbody>");
                    var $table = $("<table>").addClass("pricing-table")
                     .append($("<thead>").append($("<tr>")
                       .append($("<th>").append("Product Name:"))
                       .append($("<th>").append("Price"))
                       .append($("<th>").append("Description"))))
                     .append($tableBody);
                    for (var i = products.length - 1; i >= 0; i--) {
                        $("<tr>")
                          .append($("<td>").append($("<a>").attr("href", "#/product/" + products[i].id()).append(products[i].name())))
                          .append($("<td>").append(products[i].price() + " $"))
                          .append($("<td>").append(products[i].shortDescription()))
                          .appendTo($tableBody);
                    }
                    $table.appendTo($wrapper);
                })
            })
        });

        this.get('#/contact-us', function () {
            $("#changing-content").empty()
             .append("You can not contact us, becouse this site is a fake. Sorry...");
        });
    });

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    app.run('#/');
    return app;
});