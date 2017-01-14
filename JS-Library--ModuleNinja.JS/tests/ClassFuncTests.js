(function () {
    var defaultName = "defArgName";
    var alternativeName = "altName";
    var validValues = {
        any: { array: [1, 2, 3, false, "carrot"] },
        string: "",
        char: "c",
        nonEmptyString: "nonEmptyString",
        bool: true,
        number: -123.222,
        int: -250,
        positiveNumber: 250.2504,
        positiveInt: 45,
        array: [1, 2, 3, true, "cabage"],
        object: { foobar: "baz" },
        type: Object
    }

    describe('#ClassFunc', function () {
        it('Function of class can be created (v1)', function () {
            var unnamedClass = mn.class()
                .accessor(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") })
                .finalize();
            var test = new unnamedClass();
            var value = test[defaultName]();
            var expectedvalue = "altName";
            expect(value).to.equal(expectedvalue);

            var value2 = test[defaultName]("v2");
            var expectedvalue2 = "v2";
            expect(value2).to.equal(expectedvalue2);
        });
        it('Function of class can be created (v2)', function () {
            var unnamedClass = mn.class()
                .accessor(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") })
                .finalize();
            var test = new unnamedClass();
            var value = test[defaultName]();
            var expectedvalue = "altName";
            expect(value).to.equal(expectedvalue);

            var value2 = test[defaultName]("v2");
            var expectedvalue2 = "v2";
            expect(value2).to.equal(expectedvalue2);
        });
        it('----------------------------------------------------', function () { });
        it('Function name ca\'t be used again (v1)', function () {
            var unnamedClass = mn.class()
                .function(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            function fn() {
                unnamedClass.function(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Function name ca\'t be used again (v2)', function () {
            var unnamedClass = mn.class()
                .accessor(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            function fn() {
                unnamedClass.accessor(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Function name ca\'t be used again (v3)', function () {
            var unnamedClass = mn.class()
                .function(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            function fn() {
                unnamedClass.accessor(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Function name ca\'t be used again (v4)', function () {
            var unnamedClass = mn.class()
                .accessor(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            function fn() {
                unnamedClass.function(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('----------------------------------------------------', function () { });
        it('Functions can access privates (v1)', function () {
            var unnamedClass = mn.class()
                .private("theAnswerToEverything", 42)
                .accessor("getTheAnswer", function () { return theAnswerToEverything; })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal(42);
        });
        it('Functions can access privates (v2)', function () {
            var unnamedClass = mn.class()
                .private("theAnswerToEverything", 42)
                .function("getTheAnswer", function () { return theAnswerToEverything; })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal(42);
        });
        it('Functions can access privates (v3)', function () {
            var unnamedClass = mn.class()
                .private("theAnswerToEverything", "I dont know")
                .accessor("getTheAnswer", function () { return theAnswerToEverything; })
                .accessor("setTheAnswer", function (answer) { theAnswerToEverything = answer; return this; })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal("I dont know");
            expect(test.setTheAnswer(42).getTheAnswer()).to.equal(42);
        });
        it('Functions can access privates (v4)', function () {
            var unnamedClass = mn.class()
                .private("theAnswerToEverything", "I dont know")
                .function("getTheAnswer", function () { return theAnswerToEverything; })
                .function("setTheAnswer", function (answer) { theAnswerToEverything = answer; return this; })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal("I dont know");
            expect(test.setTheAnswer(42).getTheAnswer()).to.equal(42);
        });
        it('----------------------------------------------------', function () { });
        it('Functions can access properties (v1)', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", 42)
                .accessor("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal(42);
        });
        it('Functions can access properties (v2)', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", 42)
                .function("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal(42);
        });
        it('Functions can access properties (v3)', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", "I dont know")
                .accessor("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .accessor("setTheAnswer", function (answer) { this.theAnswerToEverything(answer); return this; })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal("I dont know");
            expect(test.setTheAnswer(42).getTheAnswer()).to.equal(42);
        });
        it('Functions can access properties (v4)', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", "I dont know")
                .function("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .function("setTheAnswer", function (answer) { this.theAnswerToEverything(answer); return this; })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal("I dont know");
            expect(test.setTheAnswer(42).getTheAnswer()).to.equal(42);
        });
        it('----------------------------------------------------', function () { });
        for (var i in validValues) {
            if (i === "type") {
                continue;
            }
            createTestForNotAcceptableArgument.call(this, i)
        }
        function createTestForNotAcceptableArgument(valueType) {
            it("Can not use '" + valueType + "' as a function body", function () {
                var unnamedClass = mn.class();
                function fn() {
                    unnamedClass.function("theNameDoesntReallyMatter", validValues[valueType]);
                }
                var fn2 = fn;
                expect(fn).to.throw(TypeError);
                expect(fn2).to.throw(TypeError);
            });
        }
        it('----------------------------------------------------', function () { });

        it('Class with invalid functionName must throw error (1)', function () {
            var fn = function fn() {
                return mn.class()
                    .function("1" + defaultName, function () { return 1; });
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid functionName must throw error (2)', function () {
            var fn = function fn() {
                return mn.class()
                    .function(defaultName + "%", function () { return 1; });
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid functionName must throw error (3)', function () {
            var fn = function fn() {
                return mn.class()
                    .function([defaultName], function () { return 1; });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid functionName must throw error (4)', function () {
            var fn = function fn() {
                return mn.class()
                    .function({ name: defaultName }, function () { return 1; });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid functionName must throw error (5)', function () {
            var fn = function fn() {
                return mn.class()
                .function("", function () { return 1; });
            }
            expect(fn).to.throw(SyntaxError);
        });
    });
}());