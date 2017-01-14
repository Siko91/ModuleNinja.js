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

    function create3VersionsOfTestThatNameCanNotBeUsedTwice(ArgOrAttr, nameToCheck, typeOfError) {
        it('Can not use same argName twice (' + ArgOrAttr + '.v1)', function () {
            var test = mn.class(defaultName);
            function fn() {
                test[ArgOrAttr](nameToCheck);
            }
            expect(fn).to.throw(typeOfError);
        })
        it('Can not use same argName twice (' + ArgOrAttr + '.v2)', function () {
            var test = mn.class().arg(defaultName);
            function fn() {
                test[ArgOrAttr](nameToCheck);
            }
            expect(fn).to.throw(typeOfError);
        })
        it('Can not use same argName twice (' + ArgOrAttr + '.v3)', function () {
            var test = mn.class().attr(defaultName);
            function fn() {
                test[ArgOrAttr](nameToCheck);
            }
            expect(fn).to.throw(typeOfError);
        })
    }

    function create3VersionsOfTypeTestsAboutWhatIsValidAndWhatIsNot(validationName, usedTypeName) {
        if (acceptenceCombinations[validationName].indexOf(usedTypeName) === -1) {
            it('[' + validationName + '] validation test: try to use "' + usedTypeName + '" type (v1)', function () {
                //this test is generated automaticaly
                var initObj = {};
                initObj[defaultName] = validationName;
                var unnamedClass = mn.class(initObj).finalize();
                var test = new unnamedClass(validValues[validationName]);
                function fn() {
                    test[defaultName](validValues[usedTypeName]);
                }
                expect(fn).to.throw(TypeError);
            });
            it('[' + validationName + '] validation test: try to use "' + usedTypeName + '" type (v2)', function () {
                //this test is generated automaticaly
                var unnamedClass = mn.class().arg(defaultName, validationName).finalize();
                var test = new unnamedClass(validValues[validationName]);
                function fn() {
                    test[defaultName](validValues[usedTypeName]);
                }
                expect(fn).to.throw(TypeError);
            });
            it('[' + validationName + '] validation test: try to use "' + usedTypeName + '" type (v3)', function () {
                //this test is generated automaticaly
                var unnamedClass = mn.class().attr(defaultName, validationName).finalize();
                var test = new unnamedClass(validValues[validationName]);
                function fn() {
                    test[defaultName](validValues[usedTypeName]);
                }
                expect(fn).to.throw(TypeError);
            });
        }
        else {
            it('[' + validationName + '] validation test: try to use "' + usedTypeName + '" type (v1) -------------- <[VALID]>', function () {
                //this test is generated automaticaly
                var initObj = {};
                initObj[defaultName] = validationName;
                var unnamedClass = mn.class(initObj).finalize();
                var test = new unnamedClass(validValues[validationName]);
                function fn() {
                    test[defaultName](validValues[usedTypeName]);
                }
                expect(fn).to.not.throw(Error);
            });
            it('[' + validationName + '] validation test: try to use "' + usedTypeName + '" type (v2) -------------- <[VALID]>', function () {
                //this test is generated automaticaly
                var unnamedClass = mn.class().arg(defaultName, validationName).finalize();
                var test = new unnamedClass(validValues[validationName]);
                function fn() {
                    test[defaultName](validValues[usedTypeName]);
                }
                expect(fn).to.not.throw(Error);
            });
            it('[' + validationName + '] validation test: try to use "' + usedTypeName + '" type (v3) -------------- <[VALID]>', function () {
                //this test is generated automaticaly
                var unnamedClass = mn.class().attr(defaultName, validationName).finalize();
                var test = new unnamedClass(validValues[validationName]);
                function fn() {
                    test[defaultName](validValues[usedTypeName]);
                }
                expect(fn).to.not.throw(Error);
            });
        }
    }
    function create3VersionsTestsAboutTypeUsePossibility(nameOfTpe) {
        it('Argument of  class can be created with validation type "' + nameOfTpe + '" - (v1)', function () {
            // this test is automaticaly generated
            var initObj = {};
            initObj[defaultName] = nameOfTpe;
            var unnamedClass = mn.class(initObj).finalize();
            var test = new unnamedClass(validValues[nameOfTpe]);
            var expectedvalue = alternativeValue[nameOfTpe];
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
        it('Argument of  class can be created with validation type "' + nameOfTpe + '" - (v2)', function () {
            // this test is automaticaly generated
            var unnamedClass = mn.class().attr(defaultName, nameOfTpe).finalize();
            var test = new unnamedClass(validValues[nameOfTpe]);
            var expectedvalue = alternativeValue[nameOfTpe];
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
        it('Argument of  class can be created with validation type "' + nameOfTpe + '" - (v3)', function () {
            // this test is automaticaly generated
            var unnamedClass = mn.class().attr(defaultName, nameOfTpe).finalize();
            var test = new unnamedClass(validValues[nameOfTpe]);
            var expectedvalue = alternativeValue[nameOfTpe];
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
    }

    describe('#ClassArg', function () {
        it('Can create multiple args/attrs at once (v1)', function () {
            var arr = []
            for (var i = 0; i < 3; i++) {
                arr.push(defaultName + i);
            }
            var unnamedClass = mn.class(arr[0], arr[1], arr[2]).finalize();
            var test = new unnamedClass(0, 1, 2);
            for (var i = 0; i < 3; i++) {
                expect(test[defaultName + i]()).to.equal(i);
            }
        });
        it('Can create multiple args/attrs at once (v2)', function () {
            var obj = {}
            for (var i = 0; i < 3; i++) {
                obj[defaultName + i] = "any";
            }
            var unnamedClass = mn.class(obj).finalize();
            var test = new unnamedClass(0, 1, 2);
            for (var i = 0; i < 3; i++) {
                expect(test[defaultName + i]()).to.equal(i);
            }
        });
        it('Can create multiple args/attrs at once (v3)', function () {
            var arr = []
            for (var i = 0; i < 3; i++) {
                arr.push(defaultName + i);
            }
            var unnamedClass = mn.class(arr[0], arr[1]).arg(arr[2]).finalize();
            var test = new unnamedClass(0, 1, 2);
            for (var i = 0; i < 3; i++) {
                expect(test[defaultName + i]()).to.equal(i);
            }
        });
        it('Can create multiple args/attrs at once (v4)', function () {
            var arr = []
            for (var i = 0; i < 3; i++) {
                arr.push(defaultName + i);
            }
            var unnamedClass = mn.class(arr[0]).arg(arr[1]).arg(arr[2]).finalize();
            var test = new unnamedClass(0, 1, 2);
            for (var i = 0; i < 3; i++) {
                expect(test[defaultName + i]()).to.equal(i);
            }
        });
        it('Can create multiple args/attrs at once (v5)', function () {
            var arr = []
            for (var i = 0; i < 3; i++) {
                arr.push(defaultName + i);
            }
            var unnamedClass = mn.class().arg(arr[0]).arg(arr[1]).arg(arr[2]).finalize();
            var test = new unnamedClass(0, 1, 2);
            for (var i = 0; i < 3; i++) {
                expect(test[defaultName + i]()).to.equal(i);
            }
        });
        it('Can create multiple args/attrs at once (v6)', function () {
            var arr = []
            for (var i = 0; i < 3; i++) {
                arr.push(defaultName + i);
            }
            var unnamedClass = mn.class(arr[0], arr[1]).attr(arr[2]).finalize();
            var test = new unnamedClass(0, 1, 2);
            for (var i = 0; i < 3; i++) {
                expect(test[defaultName + i]()).to.equal(i);
            }
        });
        it('Can create multiple args/attrs at once (v7)', function () {
            var arr = []
            for (var i = 0; i < 3; i++) {
                arr.push(defaultName + i);
            }
            var unnamedClass = mn.class(arr[0]).attr(arr[1]).arg(arr[2]).finalize();
            var test = new unnamedClass(0, 1, 2);
            for (var i = 0; i < 3; i++) {
                expect(test[defaultName + i]()).to.equal(i);
            }
        });
        it('Can create multiple args/attrs at once (v8)', function () {
            var arr = []
            for (var i = 0; i < 3; i++) {
                arr.push(defaultName + i);
            }
            var unnamedClass = mn.class().arg(arr[0]).attr(arr[1]).arg(arr[2]).finalize();
            var test = new unnamedClass(0, 1, 2);
            for (var i = 0; i < 3; i++) {
                expect(test[defaultName + i]()).to.equal(i);
            }
        });

        it('----------------------------------------------------', function () {
        });

        it('Can set default value of arg/attr (v1.1)', function () {
            var unnamedClass = mn.class().arg(defaultName, "any", "default").finalize();

            var test = new unnamedClass();
            expect(test[defaultName]()).to.equal("default");

            test = new unnamedClass("setOnInitialization");
            expect(test[defaultName]()).to.equal("setOnInitialization");
        });

        it('Can set default value of arg/attr (v1.2)', function () {
            var unnamedClass = mn.class().attr(defaultName, "any", "default").finalize();

            var test = new unnamedClass();
            expect(test[defaultName]()).to.equal("default");

            test = new unnamedClass("setOnInitialization");
            expect(test[defaultName]()).to.equal("setOnInitialization");
        });

        it('Can set default value of arg/attr (v2.1)', function () {
            var unnamedClass = mn.class().arg(defaultName, undefined, "default").finalize();

            var test = new unnamedClass();
            expect(test[defaultName]()).to.equal("default");

            test = new unnamedClass("setOnInitialization");
            expect(test[defaultName]()).to.equal("setOnInitialization");
        });

        it('Can set default value of arg/attr (v2.2)', function () {
            var unnamedClass = mn.class().attr(defaultName, undefined, "default").finalize();

            var test = new unnamedClass();
            expect(test[defaultName]()).to.equal("default");

            test = new unnamedClass("setOnInitialization");
            expect(test[defaultName]()).to.equal("setOnInitialization");
        });

        it('Can set default value of arg/attr (v3.1)', function () {
            var defaultArr = [1, 2, 3];
            var unnamedClass = mn.class().arg(defaultName, "array", mn.literal(JSON.stringify(defaultArr))).finalize();

            var test = new unnamedClass();
            for (var i = 0; i < defaultArr.length; i++) {
                expect(test[defaultName]()[i]).to.equal(defaultArr[i]);
            }

            var arr = [12, 13, 14];
            test = new unnamedClass(arr);
            for (var i = 0; i < arr.length; i++) {
                expect(test[defaultName]()[i]).to.equal(arr[i]);
            }
        });

        it('Can set default value of arg/attr (v3.2)', function () {
            var defaultArr = [1, 2, 3];
            var unnamedClass = mn.class().attr(defaultName, "array", mn.literal(JSON.stringify(defaultArr))).finalize();

            var test = new unnamedClass();
            for (var i = 0; i < defaultArr.length; i++) {
                expect(test[defaultName]()[i]).to.equal(defaultArr[i]);
            }

            var arr = [12, 13, 14];
            test = new unnamedClass(arr);
            for (var i = 0; i < arr.length; i++) {
                expect(test[defaultName]()[i]).to.equal(arr[i]);
            }
        });

        it('----------------------------------------------------', function () {
        });

        it('Argument of  class can be created without validation type (type "any" is used as default) - (v1)', function () {
            var unnamedClass = mn.class(defaultName).finalize();
            var test = new unnamedClass(validValues.any);
            var expectedvalue = alternativeValue.any;
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
        it('Argument of  class can be created without validation type (type "any" is used as default) - (v2)', function () {
            var unnamedClass = mn.class().arg(defaultName).finalize();
            var test = new unnamedClass(validValues.any);
            var expectedvalue = alternativeValue.any;
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
        it('Argument of  class can be created without validation type (type "any" is used as default) - (v3)', function () {
            var unnamedClass = mn.class().attr(defaultName).finalize();
            var test = new unnamedClass(validValues.any);
            var expectedvalue = alternativeValue.any;
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });

        for (var i in validValues) {
            if (i !== "type") {
                create3VersionsTestsAboutTypeUsePossibility.call(this, i);
            }
        }

        it('Argument of  class can be created with validation type "type" and agiven type - (v1)', function () {
            var initObj = {};
            initObj[defaultName] = mn.type(alternativeValue.type.name, alternativeValue.type);
            var unnamedClass = mn.class(initObj).finalize();
            var test = new unnamedClass(new alternativeValue.type());
            var expectedvalue = new alternativeValue.type();
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
        it('Argument of  class can be created with validation type "type" and agiven type - (v2.1)', function () {
            var unnamedClass = mn.class()
                .arg(
                    defaultName,
                    mn.type(alternativeValue.type.name, alternativeValue.type))
                .finalize();
            var test = new unnamedClass(new alternativeValue.type());
            var expectedvalue = new alternativeValue.type();
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
        it('Argument of  class can be created with validation type "type" and agiven type - (v2.2)', function () {
            var unnamedClass = mn.class()
                .attr(
                    defaultName,
                    mn.type(alternativeValue.type.name, alternativeValue.type))
                .finalize();
            var test = new unnamedClass(new alternativeValue.type());
            var expectedvalue = new alternativeValue.type();
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
        it('Argument of  class can be created with validation type "type" and agiven type - (v3.1)', function () {
            var unnamedClass = mn.class()
                .knownType(mn.type(alternativeValue.type.name, alternativeValue.type))
                .arg(defaultName, "type " + alternativeValue.type.name)
                .finalize();
            var test = new unnamedClass(new alternativeValue.type());
            var expectedvalue = new alternativeValue.type();
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });
        it('Argument of  class can be created with validation type "type" and agiven type - (v3.2)', function () {
            var unnamedClass = mn.class()
                .knownType(mn.type(alternativeValue.type.name, alternativeValue.type))
                .attr(defaultName, "type " + alternativeValue.type.name)
                .finalize();
            var test = new unnamedClass(new alternativeValue.type());
            var expectedvalue = new alternativeValue.type();
            var value = test[defaultName](expectedvalue)[defaultName]();
            expect(value).to.equal(expectedvalue);
        });

        it('----------------------------------------------------', function () {
        });

        for (var validatorName in validValues) {
            if (validatorName !== "type" &&
                validatorName !== "any") {
                for (var usedType in validValues) {
                    if (usedType !== "type" &&
                        usedType !== "any") {
                        create3VersionsOfTypeTestsAboutWhatIsValidAndWhatIsNot.call(this, validatorName, usedType);
                    }
                }

                it('----------------------------------------------------', function () {
                });
            }
        }

        create3VersionsOfTestThatNameCanNotBeUsedTwice("arg", defaultName, ReferenceError);
        create3VersionsOfTestThatNameCanNotBeUsedTwice("attr", defaultName, ReferenceError);
        create3VersionsOfTestThatNameCanNotBeUsedTwice("arg", "_" + defaultName, SyntaxError);
        create3VersionsOfTestThatNameCanNotBeUsedTwice("attr", "_" + defaultName, SyntaxError);

        it('----------------------------------------------------', function () {
        });

        it('Class with invalid arg/attr name must throw error (0.2)', function () {
            var fn = function myfunction() {
                return mn.class().arg();
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid arg/attr name must throw error (0.3)', function () {
            var fn = function myfunction() {
                return mn.class().attr();
            }
            expect(fn).to.throw(TypeError);
        });

        it('Class with invalid arg/attr name must throw error (1.1)', function () {
            var fn = function myfunction() {
                return mn.class("1" + defaultName);
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid arg/attr name must throw error (1.2)', function () {
            var fn = function myfunction() {
                return mn.class().arg("1" + defaultName);
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid arg/attr name must throw error (1.3)', function () {
            var fn = function myfunction() {
                return mn.class().attr("1" + defaultName);
            }
            expect(fn).to.throw(SyntaxError);
        });

        it('Class with invalid arg/attr name must throw error (2.1)', function () {
            var fn = function myfunction() {
                return mn.class(defaultName + "%");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid arg/attr name must throw error (2.2)', function () {
            var fn = function myfunction() {
                return mn.class().arg(defaultName + "%");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid arg/attr name must throw error (2.3)', function () {
            var fn = function myfunction() {
                return mn.class().attr(defaultName + "%");
            }
            expect(fn).to.throw(SyntaxError);
        });

        it('Class with invalid arg/attr name must throw error (3.1)', function () {
            var fn = function myfunction() {
                return mn.class(["1" + defaultName]);
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid arg/attr name must throw error (3.2)', function () {
            var fn = function myfunction() {
                return mn.class().arg(["1" + defaultName]);
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid arg/attr name must throw error (3.3)', function () {
            var fn = function myfunction() {
                return mn.class().attr(["1" + defaultName]);
            }
            expect(fn).to.throw(TypeError);
        });

        it('Class with invalid arg/attr name must throw error (4.1)', function () {
            var fn = function myfunction() {
                return mn.class({ "1": "any" });
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid arg/attr name must throw error (4.2)', function () {
            var fn = function myfunction() {
                return mn.class().arg({ "1": "any" });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid arg/attr name must throw error (4.3)', function () {
            var fn = function myfunction() {
                return mn.class().attr({ "1": "any" });
            }
            expect(fn).to.throw(TypeError);
        });

        it('Class with invalid arg/attr name must throw error (5.1)', function () {
            var fn = function myfunction() {
                return mn.class("");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid arg/attr name must throw error (5.2)', function () {
            var fn = function myfunction() {
                return mn.class().arg("");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid arg/attr name must throw error (5.3)', function () {
            var fn = function myfunction() {
                return mn.class().attr("");
            }
            expect(fn).to.throw(SyntaxError);
        });
    });
}());