define(["moduleNinja", "parse", "moduleNinjaParse"], function () {
    Order = mn.class().className("Order")
        .prop("date")
        .prop("clientID", "string")
        .prop("finalized", "bool", false)
        .prop("products", "array", []) // array of { productID: <string>, product: <string>, count: <number>, price: <number> }
        .toParseClass().finalize();

    //new Order()
    //.date(new Date())
    //.clientID("teeeest")
    //.products([
    //    { productID: "teest" + Math.floor(Math.random() * 10), count: Math.floor(Math.random() * 10), price: Math.floor(Math.random() * 10) },
    //    { productID: "teest" + Math.floor(Math.random() * 10), count: Math.floor(Math.random() * 10), price: Math.floor(Math.random() * 10) },
    //    { productID: "teest" + Math.floor(Math.random() * 10), count: Math.floor(Math.random() * 10), price: Math.floor(Math.random() * 10) },
    //    { productID: "teest" + Math.floor(Math.random() * 10), count: Math.floor(Math.random() * 10), price: Math.floor(Math.random() * 10) },
    //    { productID: "teest" + Math.floor(Math.random() * 10), count: Math.floor(Math.random() * 10), price: Math.floor(Math.random() * 10) }
    //])
    //.parseSave();

    //window.Order = Order;
    return Order;
});