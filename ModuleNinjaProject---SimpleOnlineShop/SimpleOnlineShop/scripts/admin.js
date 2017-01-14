define(["registerPages", "jquery", "sammy", "product"], function (app, $, Sammy, Product) {
    var currentProduct;
    app.get("#/admin", function () {
        var $wrapper = $("#changing-content").empty();
        $wrapper.append($("<button>").append("ADD NEW PRODUCT").on("click", onAddNewProductClick));

        $wrapper.append($("<div>")
            .attr("id", "new-product-window")
            .append("Name : ").append($("<input>")
                        .attr("id", "new-product-name")).append("<br>")
            .append("Price : ").append($("<input>")
                        .attr("id", "new-product-price")
                        .attr("type", "number")
                        .attr("min", "0")
                        .attr("step", 0.05)).append("<br>")
            .append("Count : ").append($("<input>")
                        .attr("id", "new-product-count")
                        .attr("type", "number")
                        .attr("min", "0")
                        .attr("step", 1)).append("<br>")
            .append("Short description : ").append($("<textarea>")
                        .attr("id", "new-product-short")
                        .attr("rows", 4)
                        .attr("cols", 60)).append("<br>")
            .append("Long description : ").append($("<textarea>")
                        .attr("id", "new-product-long")
                        .attr("rows", 10)
                        .attr("cols", 60)).append("<br>")
            .append("image URL : ").append($("<input>")
                        .attr("id", "new-product-url")).append("<br>")
            .append($("<button>").append("Save").on("click", onNewProductSaveClick))
            .append($("<button>").append("Clear").on("click", onNewProductClearClick))
            .append($("<button>").append("Hide").on("click", onNewProductHideClick))
            .hide());

        Product.parseQuery().find().then(function (products) {
            var $tableBody = $("<tbody>");
            var $table = $("<table>").addClass("pricing-table")
             .append($("<thead>").append($("<tr>")
               .append($("<th>").append("Product Name:"))
               .append($("<th>").append("Price"))
               .append($("<th>").append("Count"))
               .append($("<th>").append("Options"))))
             .append($tableBody);
            for (var i = products.length - 1; i >= 0; i--) {
                var prod = products[i];
                $("<tr>")
                  .append($("<td>").append($("<a>").attr("href", "#/product/" + prod.id()).append(prod.name())))
                  .append($("<td>")
                    .append($("<input>")
                        .attr("id", "price-for-" + prod.id())
                        .attr("type", "number")
                        .attr("min", "0")
                        .attr("step", 0.05)
                        .val(prod.price()))
                    .append($("<button>").append("Save").on("click", function () {
                        onPriceUpdateClick(prod, parseFloat($("#price-for-" + prod.id()).val()));
                    })))
                  .append($("<td>")
                    .append($("<input>")
                        .attr("id", "count-for-" + prod.id())
                        .attr("type", "number")
                        .attr("min", "0")
                        .val(prod.count()))
                    .append($("<button>").append("Save").on("click", function () {
                        onCountUpdateClick(prod, parseInt($("#count-for-" + prod.id()).val()));
                    })))
                  .append($("<td>")
                    .append($("<button>").append("Delete").on("click", function () {
                        onDeleteClick(prod);
                    }))
                    .append($("<button>").append("Edit").on("click", function () {
                        onEditClick(prod);
                    })))
                  .appendTo($tableBody);
            }
            $table.appendTo($wrapper);
        })
    });

    function onPriceUpdateClick(product, price) {
        product.price(price).parseSave().then(function () {
            alert("price saved");
        });
    }
    function onCountUpdateClick(product, count) {
        product.count(count).parseSave().then(function () {
            alert("count saved");
        });
    }
    function onDeleteClick(product) {
        if (confirm('Are you sure you want to delete this product?')) {
            product.parseDelete(function () {
                alert("product deleted");
            }, function () {
                alert("ERROR. Failed to delete product.");
            })
        }
    }

    function onEditClick(product) {
        newProductWindowPrepare(product);
    }
    function onAddNewProductClick() {
        newProductWindowPrepare(
            new Product()
                .name("New Product")
                .count(1)
                .price(1)
                .shortDescription("-")
                .longDescription("- - - -")
                .pictureURL("http://upload.wikimedia.org/wikipedia/commons/2/2d/Tox_Unknown_icon.svg"));
    }

    function newProductWindowPrepare(product) {
        var $container = $("#new-product-window");
        $container.show();
        $container.find("#new-product-name").val(product.name());
        $container.find("#new-product-price").val(product.price());
        $container.find("#new-product-count").val(product.count());
        $container.find("#new-product-short").val(product.shortDescription());
        $container.find("#new-product-long").val(product.longDescription());
        $container.find("#new-product-url").val(product.pictureURL());
        currentProduct = product;
    }
    function onNewProductSaveClick() {
        if (currentProduct === undefined) {
            return;
        }
        var $container = $("#new-product-window");

        try {
            currentProduct.name($container.find("#new-product-name").val());
            currentProduct.price(parseFloat($container.find("#new-product-price").val()));
            currentProduct.count(parseInt($container.find("#new-product-count").val()));
            currentProduct.shortDescription($container.find("#new-product-short").val());
            currentProduct.longDescription($container.find("#new-product-long").val());
            currentProduct.pictureURL($container.find("#new-product-url").val());
        } catch (e) {
            alert("Error. Make sure all inputs have correct values\n" + e.message);
            return;
        }

        currentProduct.parseSave().then(function () {
            $container.hide();
            alert("Product saved successfuly");
            window.location.reload();
        });
    }
    function onNewProductClearClick() {
        var $container = $("#new-product-window");
        $container.show();
        $container.find("#new-product-name").val("");
        $container.find("#new-product-price").val(1);
        $container.find("#new-product-count").val(1);
        $container.find("#new-product-short").val("");
        $container.find("#new-product-long").val("");
        $container.find("#new-product-url").val("");
    }
    function onNewProductHideClick() {
        var $container = $("#new-product-window");
        $container.hide();
        currentProduct = undefined;
    }
});