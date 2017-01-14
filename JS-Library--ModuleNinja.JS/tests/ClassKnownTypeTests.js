(function () {
    var defaultName = "defName";
    var alternativeName = "altName";
    var alternativeValues = {
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

    function makeTestWithInvalidType(typeName) {
        it('Type with invalid body must throw error (' + typeName + ')', function () {
            var fn = function myfunction() {
                return mn.type("aName", alternativeValues[typeName]);
            }
            expect(fn).to.throw(TypeError);
        });
    }

    describe('#ClassKnownType', function () {
        it('Can add a known type', function () {
            var unnamedClass = mn.class()
                .knownType(mn.type("TypeName", Array))
                .function("Arr", function () {
                    return new types.TypeName();
                })
                .finalize();
            var test = new unnamedClass();
            var arr = test.Arr();
            expect(arr).to.be.instanceof(Array);
        });
        it('Can use known type as a prop validator', function () {
            var unnamedClass = mn.class()
                .knownType(mn.type("TypeName", Array))
                .prop("myArr", "type TypeName")
                .finalize();
            var test = new unnamedClass();
            expect(test.myArr([11]).myArr()).to.eql([11]);
        });
        it('Can add known type through a prop validator', function () {
            var unnamedClass = mn.class()
                .prop("myArr", mn.type("TypeName", Array))
                .function("Arr", function () {
                    return new types.TypeName();
                })
                .finalize();
            var test = new unnamedClass();
            var arr = test.Arr();
            expect(arr).to.be.instanceof(Array);
            expect(test.myArr([11]).myArr()).to.eql([11]);
        });

        it('----------------------------------------------------', function () {
        });

        it('Can not use same name for known type twice (v1)', function () {
            var unnamedClass = mn.class()
                .knownType(mn.type("TypeName", Array));
            function fn() {
                unnamedClass.knownType(mn.type("TypeName", Object));
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Can not use same name for known type twice (v1)', function () {
            var unnamedClass = mn.class()
                .prop("myArr", mn.type("TypeName", Array));
            function fn() {
                unnamedClass.knownType(mn.type("TypeName", Array));
            }
            expect(fn).to.throw(ReferenceError);
        });

        it('----------------------------------------------------', function () {
        });

        it('Type with invalid name must throw error (0)', function () {
            var fn = function myfunction() {
                return mn.type(undefined, Object);
            }
            expect(fn).to.throw(TypeError);
        });
        it('Type with invalid name must throw error (1)', function () {
            var fn = function myfunction() {
                return mn.type("1" + defaultName, Object);
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Type with invalid name must throw error (2)', function () {
            var fn = function myfunction() {
                return mn.type(defaultName + "%", Object);
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Type with invalid name must throw error (3)', function () {
            var fn = function myfunction() {
                return mn.type([defaultName], Object);
            }
            expect(fn).to.throw(TypeError);
        });
        it('Type with invalid name must throw error (4)', function () {
            var fn = function myfunction() {
                return mn.type({ name: defaultName }, Object);
            }
            expect(fn).to.throw(TypeError);
        });
        it('Type with invalid name must throw error (5)', function () {
            var fn = function myfunction() {
                return mn.type("", Object);
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('----------------------------------------------------', function () {
        });
        for (var i in alternativeValues) {
            if (i !== "type") {
                makeTestWithInvalidType.call(this, i);
            }
        }
    });
}());