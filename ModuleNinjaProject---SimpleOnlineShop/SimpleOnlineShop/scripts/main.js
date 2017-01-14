require.config({
    paths: {
        "jquery": "../node_modules/jquery/dist/jquery",
        "parse": "../node_modules/moduleninja/plugins/parse/dependances/parse-1.3.2",
        "moduleNinjaParse": "../node_modules/moduleninja/plugins/parse/moduleNinja-Parse",
        "moduleNinja": "../node_modules/moduleninja/moduleNinja",
        "sammy": "../node_modules/shimney-sammy/main",
        "underscore": "../node_modules/underscore/underscore",

        "registerPages": "sammyPagesRegister",
        "userPageLoader": "userPageLoader",
        //"": "",
        //"": "",

        "product": "classes/product",
        "order": "classes/order",
        "user": "classes/user"
    }
});

require(["registerPages"]);

require(["parse"], function () {
    Parse.initialize("mLRlf5kaLHVrWyTnasR33BSfCSUZGKVAQCOFt18B", "fTxaQsRjiQAILdqDMPxxJxEqTWnME9x7GXspF32N");
    a = ["mLRlf5kaLHVrWyTnasR33BSfCSUZGKVAQCOFt18B", "fTxaQsRjiQAILdqDMPxxJxEqTWnME9x7GXspF32N"];
    require(["product", "order", "user"]);
});