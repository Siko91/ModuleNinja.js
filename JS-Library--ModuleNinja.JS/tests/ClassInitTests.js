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

    describe('#ClassInit', function () {
        it('Initializator function of class can be created', function () {
            var unnamedClass = mn.class().prop("prop")
                .initializator(defaultName, function () { this.prop("changedOnInit") })
                .finalize();
            var test = new unnamedClass();
            expect(test["prop"]()).to.equal("changedOnInit");
        });

        it('----------------------------------------------------', function () {
        });

        it('Initializator function name can\'t be used again', function () {
            var unnamedClass = mn.class()
                .initializator(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            function fn() {
                unnamedClass.initializator(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Initializator function name can be the same as normal function\'s name', function () {
            var unnamedClass = mn.class()
                .accessor(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            function fn() {
                unnamedClass.initializator(defaultName, function (attr) { return (attr ? ("" + attr) : "altName") });
            }
            expect(fn).to.not.throw(ReferenceError);
        });

        it('----------------------------------------------------', function () {
        });

        it('Initializator function can access props', function () {
            var unnamedClass = mn.class()
                .prop("theAnswerToEverything", "any")
                .initializator("setTheAnswer", function () { this.theAnswerToEverything(42); })
                .finalize();

            var test = new unnamedClass();
            expect(test.theAnswerToEverything()).to.equal(42);
        });
        it('Initializator function can access args', function () {
            var unnamedClass = mn.class()
                .arg("theAnswerToEverything", "any")
                .initializator("setTheAnswer", function () { this.theAnswerToEverything(42); })
                .finalize();

            var test = new unnamedClass(5);
            expect(test.theAnswerToEverything()).to.equal(42);
        });

        it('----------------------------------------------------', function () {
        });

        for (var i in validValues) {
            if (i === "type") {
                continue;
            }
            createTestForNotAcceptableArgument.call(this, i)
        }
        function createTestForNotAcceptableArgument(valueType) {
            it("Can not use '" + valueType + "' as an initializator function body", function () {
                var unnamedClass = mn.class();
                function fn() {
                    unnamedClass.initializator("theNameDoesntReallyMatter", validValues[valueType]);
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
                    .initializator("1" + defaultName, function () { });
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid functionName must throw error (2)', function () {
            var fn = function fn() {
                return mn.class()
                    .initializator(defaultName + "%", function () { });
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid functionName must throw error (3)', function () {
            var fn = function fn() {
                return mn.class()
                    .initializator([defaultName], function () { });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid functionName must throw error (4)', function () {
            var fn = function fn() {
                return mn.class()
                    .initializator({ name: defaultName }, function () { });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid functionName must throw error (5)', function () {
            var fn = function fn() {
                return mn.class()
                    .initializator("", function () { });
            }
            expect(fn).to.throw(SyntaxError);
        });
    });
}());