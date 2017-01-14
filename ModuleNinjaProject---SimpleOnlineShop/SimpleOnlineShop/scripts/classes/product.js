define(["moduleNinja", "parse", "moduleNinjaParse"], function () {
    Product = mn.class().className("Product")
        .attr("name", "string", "unnamed")
        .attr("price", "number", 0)
        .attr("count", "positiveInt", 0)
        .prop("shortDescription", "string", "-")
        .prop("longDescription", "string", "---")
        .prop("pictureURL", "string", "http://i.imgur.com/Q0XPxa3.jpg")
        .toParseClass().finalize();

    //new Product("Product" + Math.floor(Math.random() * 1000000000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000))
    //    .shortDescription("descr" + Math.floor(Math.random() * 10))
    //    .longDescription("DESCRIPTNION " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000) + " " +
    //                    (Math.random() * 1000000000) + " " + (Math.random() * 1000000000))
    //    .parseSave();

    //window.Product = Product;

    return Product;
});