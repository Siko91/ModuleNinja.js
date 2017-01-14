(function () {
    var defaultName = "defName";
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
    }

    function createTestForInvalidValidatorBodyType(type) {
        it('Validator with invalid function body must throw error - test with ' + type, function () {
            var fn = function myfunction() {
                return mn.class().validator("nameOfType", validValues[type]);
            }
            expect(fn).to.throw(TypeError);
        });
    }
    describe('#ClassValidators', function () {
        it('Can create a custom validator on arg (v1)', function () {
            var unnamedClass = mn.class({
                "argName": function (value) {
                    if (value !== undefined) {
                        this["_argName"] = value;
                        return this;
                    }
                    else {
                        return this["_argName"];
                    }
                }
            })
            .finalize();
            var test = new unnamedClass("à");
            test["argName"](alternativeName);
            expect(test["argName"]()).to.equal(alternativeName);
        });
        it('Can create a custom validator on arg (v2)', function () {
            var unnamedClass = mn.class().arg("argName", function (value) {
                if (value !== undefined) {
                    this["_argName"] = value;
                    return this;
                }
                else {
                    return this["_argName"];
                }
            }, "a")
            .finalize();
            var test = new unnamedClass("à");
            test["argName"](alternativeName);
            expect(test["argName"]()).to.equal(alternativeName);
        });
        it('Can create a custom validator on arg (v3)', function () {
            var unnamedClass = mn.class().attr("argName", function (value) {
                if (value !== undefined) {
                    this["_argName"] = value;
                    return this;
                }
                else {
                    return this["_argName"];
                }
            })
            .finalize();
            var test = new unnamedClass("à");
            test["argName"](alternativeName);
            expect(test["argName"]()).to.equal(alternativeName);
        });
        it('Can create a custom validator on prop', function () {
            var unnamedClass = mn.class().prop("argName", function (value) {
                if (value !== undefined) {
                    this["_argName"] = value;
                    return this;
                }
                else {
                    return this["_argName"];
                }
            })
            .finalize();
            var test = new unnamedClass();
            test["argName"](alternativeName);
            expect(test["argName"]()).to.equal(alternativeName);
        });
        it('Can use chaining with custom validators', function () {
            var unnamedClass = mn.class().prop("argName", function (value) {
                if (value !== undefined) {
                    this["_argName"] = value;
                    return this;
                }
                else {
                    return this["_argName"];
                }
            })
            .finalize();
            var test = new unnamedClass();

            function fn() {
                test.argName(alternativeName + "1")
                    .argName(alternativeName + "2")
                    .argName(alternativeName + "3")
                    .argName(alternativeName + "4")
                    .argName(alternativeName + "5")
                    .argName(alternativeName + "6")
                    .argName(alternativeName + "7")
                    .argName(alternativeName + "8")
                    .argName(alternativeName + "9")
                    .argName(alternativeName + "0")
                    .argName(alternativeName);
            }

            expect(fn).to.not.throw(Error);
            expect(test.argName()).to.equal(alternativeName);
        });

        it('----------------------------------------------------', function () {
        });

        it('Can create a custom validator by itself, as it were a type', function () {
            var unnamedClass = mn.class()
                .validator("anyAndPlus", function (target, value) {
                    if (target === undefined) {
                        throw new ReferenceError("Couldn't find the targeted property");
                    }

                    if (value !== undefined) {
                        this[target] = value + "+";
                        return this;
                    }
                    else {
                        return this[target];
                    }
                })
            .prop("argName", "anyAndPlus", "Plus")
            .finalize();

            var test = new unnamedClass();

            expect(test.argName()).to.equal("Plus+");
            test.argName(alternativeName);
            expect(test.argName()).to.equal(alternativeName + "+");
        });

        it('----------------------------------------------------', function () {
        });

        it('Validator with invalid name must throw error (0)', function () {
            var fn = function myfunction() {
                return mn.class().validator(undefined, function () { });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Validator with invalid name must throw error (1)', function () {
            var fn = function myfunction() {
                return mn.class().validator("1" + defaultName, function () { });
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Validator with invalid name must throw error (2)', function () {
            var fn = function myfunction() {
                return mn.class().validator(defaultName + "%", function () { });
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Validator with invalid name must throw error (3)', function () {
            var fn = function myfunction() {
                return mn.class().validator([defaultName], function () { });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Validator with invalid name must throw error (4)', function () {
            var fn = function myfunction() {
                return mn.class().validator({ name: defaultName }, function () { });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Validator with invalid name must throw error (5)', function () {
            var fn = function myfunction() {
                return mn.class().validator("", function () { });
            }
            expect(fn).to.throw(SyntaxError);
        });

        it('----------------------------------------------------', function () {
        });
        for (var i in validValues) {
            createTestForInvalidValidatorBodyType.call(this, i);
        }
    });
}());