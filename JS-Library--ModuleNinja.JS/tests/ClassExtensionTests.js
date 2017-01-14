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

    describe('#ClassExtension', function () {
        it('Extending function of class can be created', function () {
            var unnamedClass = mn.class()
                .extension(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") })
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
        it('Extending function name can\'t be used again', function () {
            var unnamedClass = mn.class()
                .extension(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            function fn() {
                unnamedClass.extension(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Extending function name can\'t be used again (v2)', function () {
            var unnamedClass = mn.class()
                .accessor(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            function fn() {
                unnamedClass.extension(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('----------------------------------------------------', function () { });
        it('Extending function can access props', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", 42)
                .extension("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal(42);
        });
        it('Extending function can access args', function () {
            var unnamedClass = mn.class()
                .arg("theAnswerToEverything", "any", 42)
                .extension("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .finalize();

            var test = new unnamedClass(5);
            expect(test.getTheAnswer()).to.equal(5);
        });
        it('Extending function can set props', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", "I dont know")
                .extension("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .extension("setTheAnswer", function (answer) { this.theAnswerToEverything(answer); return this; })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal("I dont know");
            expect(test.setTheAnswer(42).getTheAnswer()).to.equal(42);
        });
        it('Extending function can set args', function () {
            var unnamedClass = mn.class()
                .arg("theAnswerToEverything", "any", "I dont know")
                .extension("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .extension("setTheAnswer", function (answer) { this.theAnswerToEverything(answer); return this; })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal("I dont know");
            expect(test.setTheAnswer(42).getTheAnswer()).to.equal(42);
        });
        it('----------------------------------------------------', function () { });
        it('Extending function can access properties (v1)', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", 42)
                .extension("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal(42);
        });
        it('Extending function can access properties (v2)', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", 42)
                .extension("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal(42);
        });
        it('Extending function can access properties (v3)', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", "I dont know")
                .extension("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .extension("setTheAnswer", function (answer) { this.theAnswerToEverything(answer); return this; })
                .finalize();

            var test = new unnamedClass();
            expect(test.getTheAnswer()).to.equal("I dont know");
            expect(test.setTheAnswer(42).getTheAnswer()).to.equal(42);
        });
        it('Extending function can access properties (v4)', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any", "I dont know")
                .extension("getTheAnswer", function () { return this.theAnswerToEverything(); })
                .extension("setTheAnswer", function (answer) { this.theAnswerToEverything(answer); return this; })
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
                    unnamedClass.extension("theNameDoesntReallyMatter", validValues[valueType]);
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
                    .extension("1" + defaultName, function () { return 1; });
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid functionName must throw error (2)', function () {
            var fn = function fn() {
                return mn.class()
                    .extension(defaultName + "%", function () { return 1; });
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid functionName must throw error (3)', function () {
            var fn = function fn() {
                return mn.class()
                    .extension([defaultName], function () { return 1; });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid functionName must throw error (4)', function () {
            var fn = function fn() {
                return mn.class()
                    .extension({ name: defaultName }, function () { return 1; });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid functionName must throw error (5)', function () {
            var fn = function fn() {
                return mn.class()
                    .extension("", function () { return 1; });
            }
            expect(fn).to.throw(SyntaxError);
        });
    });
}());