define(["moduleNinja", "parse", "moduleNinjaParse"], function () {
    User = mn.class().className("Customer")
        .prop("username", "nonEmptyString")
        .prop("password", "nonEmptyString")
        .prop("logKey", "nonEmptyString")
        .toParseClass().finalize();

    //new User()
    //    .username("User" + Math.floor(Math.random() * 1000000000))
    //    .password("123456")
    //    .logKey("" + Math.random() + Math.random())
    //    .parseSave();

    //window.User = User;
    return User;
});