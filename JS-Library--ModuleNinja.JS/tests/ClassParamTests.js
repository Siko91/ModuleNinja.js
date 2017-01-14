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
    var alternativeValue = {
        any: { a: ["1", 2, true], b: { c: function () { return false; } } },

        string: "string2",
        char: "a",
        nonEmptyString: "nonEmptyString2",

        bool: false,

        number: 123.222,
        int: 250,
        positiveNumber: 50.2504,
        positiveInt: 450,

        array: [1, 2, 3, false, "carrot"],
        object: { baz: "foobar" },
        type: String
    }
    var acceptenceCombinations = {
        any: ["any", "string", "char", "nonEmptyString", "bool", "number", "int", "positiveNumber", "positiveInt", "array", "object", "type"],

        string: ["string", "char", "nonEmptyString"],
        char: ["char"],
        nonEmptyString: ["char", "nonEmptyString"],

        bool: ["bool"],

        number: ["number", "int", "positiveNumber", "positiveInt"],
        int: ["number", "int", "positiveNumber", "positiveInt"],
        positiveNumber: ["positiveNumber", "positiveInt"],
        positiveInt: ["positiveNumber", "positiveInt"],

        array: ["array"],
        object: ["object", "array"],
        type: ["type"]
    }
    function createTestThatNameCanNotBeUsedTwice(nameToCheck, typeOfError) {
        it('Can not use same paramName twice - "' + nameToCheck + '"', function () {
            var test = mn.class().prop(defaultName);
            function fn() {
                test.prop(nameToCheck);
            }
            expect(fn).to.throw(typeOfError);
        })
    }
    function createTestAboutWhatIsValidAndWhatIsNot(validationName, usedTypeName) {
        if (acceptenceCombinations[validationName].indexOf(usedTypeName) === -1) {
            it(validationName.toUpperCase() + ' validation test: try to use "' + usedTypeName + '" type', function () {
                //this test is generated automaticaly
                var unnamedClass = mn.class().prop(defaultName, validationName).finalize();
                var test = new unnamedClass(validValues[validationName]);
                function fn() {
                    test[defaultName](validValues[usedTypeName]);
                }
                expect(fn).to.throw(TypeError);
            });
        }
        else {
            it(validationName.toUpperCase() + ' validation test: try to use ' + usedTypeName + ' type <[VALID]>', function () {
                //this test is generated automaticaly
                var unnamedClass = mn.class().prop(defaultName, validationName).finalize();
                var test = new unnamedClass(validValues[validationName]);
                function fn() {
                    test[defaultName](validValues[usedTypeName]);
                }
                expect(fn).to.not.throw(Error);
            });
        }
    }
    function createTestAboutTypeUsePossibility(nameOfType) {
        it('Param of class can be created with validation type "' + nameOfType, function () {
            // this test is automaticaly generated
            var unnamedClass = mn.class().prop(defaultName, nameOfType).finalize();
            var test = new unnamedClass(validValues[nameOfType]);
            var expectedvalue = alternativeValue[nameOfType];
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
    }

    describe('#ClassProp', function () {
        it('Can create multiple props at once ', function () {
            var arr = []
            for (var i = 0; i < 3; i++) {
                arr.push(defaultName + i);
            }
            var unnamedClass = mn.class().prop(arr[0]).prop(arr[1]).prop(arr[2]).finalize();
            var test = new unnamedClass();
            for (var i = 0; i < 3; i++) {
                var paramName = defaultName + i;
                var expected = test[paramName](i)[paramName]();
                expect(expected).to.equal(i);
            }
        });

        it('----------------------------------------------------', function () {
        });

        it('Can set default value of prop (v1)', function () {
            var unnamedClass = mn.class().prop(defaultName, "any", "default").finalize();
            var test = new unnamedClass();
            expect(test[defaultName]()).to.equal("default");

            test = new unnamedClass();
            test[defaultName]("newName");
            expect(test[defaultName]()).to.equal("newName");
        });

        it('Can set default value of prop (v2)', function () {
            var unnamedClass = mn.class().prop(defaultName, undefined, "default").finalize();

            var test = new unnamedClass();
            expect(test[defaultName]()).to.equal("default");

            test = new unnamedClass();
            test[defaultName]("newName");
            expect(test[defaultName]()).to.equal("newName");
        });

        it('Can set default value of prop (v3)', function () {
            var defaultArr = [1, 2, 3];
            var unnamedClass = mn.class().prop(defaultName, "array", mn.literal(JSON.stringify(defaultArr))).finalize();

            var test = new unnamedClass();
            for (var i = 0; i < defaultArr.length; i++) {
                expect(test[defaultName]()[i]).to.equal(defaultArr[i]);
            }

            var arr = [12, 13, 14];
            test = new unnamedClass();
            test[defaultName](arr);
            for (var i = 0; i < arr.length; i++) {
                expect(test[defaultName]()[i]).to.equal(arr[i]);
            }
        });

        it('----------------------------------------------------', function () {
        });

        it('Param of class can be created without validation type (type "any" is used as default)', function () {
            var unnamedClass = mn.class().prop(defaultName).finalize();
            var test = new unnamedClass(validValues.any);
            var expectedvalue = alternativeValue.any;
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });

        for (var i in validValues) {
            if (i !== "type") {
                createTestAboutTypeUsePossibility.call(this, i);
            }
        }

        it('Param of class can be created with validation type "type" and agiven type - (v1)', function () {
            var unnamedClass = mn.class()
                .prop(defaultName, mn.type(alternativeValue.type.name, alternativeValue.type))
                .finalize();
            var test = new unnamedClass();
            var expectedvalue = new alternativeValue.type();
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
        it('Param of class can be created with validation type "type" and agiven type - (v2)', function () {
            var unnamedClass = mn.class()
                .knownType(mn.type(alternativeValue.type.name, alternativeValue.type))
                .prop(defaultName, "type " + alternativeValue.type.name)
                .finalize();
            var test = new unnamedClass();
            var expectedvalue = new alternativeValue.type();
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });

        it('----------------------------------------------------', function () { });

        for (var validatorName in validValues) {
            if (validatorName !== "type" &&
                validatorName !== "any") {
                for (var usedType in validValues) {
                    if (usedType !== "type" &&
                        usedType !== "any") {
                        createTestAboutWhatIsValidAndWhatIsNot.call(this, validatorName, usedType);
                    }
                }

                it('----------------------------------------------------', function () {
                });
            }
        }

        createTestThatNameCanNotBeUsedTwice(defaultName, ReferenceError);
        createTestThatNameCanNotBeUsedTwice(defaultName, ReferenceError);
        createTestThatNameCanNotBeUsedTwice("_" + defaultName, SyntaxError);
        createTestThatNameCanNotBeUsedTwice("_" + defaultName, SyntaxError);

        it('----------------------------------------------------', function () {
        });

        it('Class with invalid prop name must throw error (v0)', function () {
            var fn = function myfunction() {
                return mn.class().prop();
            }
            expect(fn).to.throw(TypeError);
        });

        it('Class with invalid prop name must throw error (v1)', function () {
            var fn = function myfunction() {
                return mn.class().prop("1" + defaultName);
            }
            expect(fn).to.throw(SyntaxError);
        });

        it('Class with invalid prop name must throw error (v2)', function () {
            var fn = function myfunction() {
                return mn.class().prop(defaultName + "%");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid prop name must throw error (v3)', function () {
            var fn = function myfunction() {
                return mn.class().prop("_" + defaultName);
            }
            expect(fn).to.throw(SyntaxError);
        });

        it('Class with invalid prop name must throw error (v4)', function () {
            var fn = function myfunction() {
                return mn.class().prop("#", "any");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid prop name must throw error (v5)', function () {
            var fn = function myfunction() {
                return mn.class().prop("");
            }
            expect(fn).to.throw(SyntaxError);
        });
    });
}());