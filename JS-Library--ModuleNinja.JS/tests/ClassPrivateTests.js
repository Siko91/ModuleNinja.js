(function () {
    var defaultName = "defArgName";
    var alternativeName = "altName";

    describe('#ClassPrivate', function () {
        it('Can create multiple privates at once ', function () {
            var arr = []
            for (var i = 0; i < 3; i++) {
                arr.push(defaultName + i);
            }
            var unnamedClass = mn.class()
                .private(arr[0], 0)
                .private(arr[1], 1)
                .private(arr[2], 2)
                .function("getAPrivate", function (varName) {
                    return eval("(function () { return " + varName + "; } ())");
                })
                .finalize();
            var test = new unnamedClass();
            for (var i = 0; i < 3; i++) {
                expect(test.getAPrivate(arr[i])).to.equal(i);
            }
        });

        it('----------------------------------------------------', function () {
        });

        it('Can not use same private name twice (v1)', function () {
            var test = mn.class().private(defaultName, "someValue");
            function fn() {
                test.private(defaultName, "someValue2");
            }
            expect(fn).to.throw(ReferenceError);
        })
        it('Can not use same private name twice (v2)', function () {
            var test = mn.class().const(defaultName, "someValue");
            function fn() {
                test.const(defaultName, "someValue2");
            }
            expect(fn).to.throw(ReferenceError);
        })
        it('Can not use same private name twice, but can use it on a property (v1)', function () {
            var test = mn.class().private(defaultName, "someValue");
            function fn() {
                test.private(defaultName, "someValue2");
            }
            function fn2() {
                test.prop(defaultName, "any", "someValue2");
            }
            expect(fn).to.throw(ReferenceError);
            expect(fn2).not.to.throw(Error);
        })
        it('Can not use same private name twice, but can use it on a property (v2)', function () {
            var test = mn.class().const(defaultName, "someValue");
            function fn() {
                test.const(defaultName, "someValue2");
            }
            function fn2() {
                test.prop(defaultName, "any", "someValue2");
            }
            expect(fn).to.throw(ReferenceError);
            expect(fn2).not.to.throw(Error);
        })
        it('Can not use same private name twice, but can use it on a function (v1)', function () {
            var test = mn.class().private(defaultName, "someValue");
            function fn() {
                test.private(defaultName, "someValue2");
            }
            function fn3() {
                test.function(defaultName, function () {
                    return 42;
                });
            }
            expect(fn).to.throw(ReferenceError);
            expect(fn3).not.to.throw(Error);
        })

        it('Can not use same private name twice, but can use it on a function (v2)', function () {
            var test = mn.class().const(defaultName, "someValue");
            function fn() {
                test.const(defaultName, "someValue2");
            }
            function fn3() {
                test.function(defaultName, function () {
                    return 42;
                });
            }
            expect(fn).to.throw(ReferenceError);
            expect(fn3).not.to.throw(Error);
        })

        it('----------------------------------------------------', function () {
        });

        it('Class with invalid private name must throw error (v0.1)', function () {
            var fn = function myfunction() {
                return mn.class().private(undefined, "val");
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid private name must throw error (v0.2)', function () {
            var fn = function myfunction() {
                return mn.class().const(undefined, "val");
            }
            expect(fn).to.throw(TypeError);
        });

        it('Class with invalid private name must throw error (v1.1)', function () {
            var fn = function myfunction() {
                return mn.class().private("1" + defaultName, "val");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid private name must throw error (v1.2)', function () {
            var fn = function myfunction() {
                return mn.class().const("1" + defaultName, "val");
            }
            expect(fn).to.throw(SyntaxError);
        });

        it('Class with invalid private name must throw error (v2.1)', function () {
            var fn = function myfunction() {
                return mn.class().private(defaultName + "%", "val");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid private name must throw error (v2.2)', function () {
            var fn = function myfunction() {
                return mn.class().const(defaultName + "%", "val");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid private name must throw error (v3.1)', function () {
            var fn = function myfunction() {
                return mn.class().private("_" + defaultName, "val");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid private name must throw error (v3.2)', function () {
            var fn = function myfunction() {
                return mn.class().const("_" + defaultName, "val");
            }
            expect(fn).to.throw(SyntaxError);
        });

        it('Class with invalid private name must throw error (v4.1)', function () {
            var fn = function myfunction() {
                return mn.class().private("#", "any");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid private name must throw error (v4.2)', function () {
            var fn = function myfunction() {
                return mn.class().const("#", "any");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid private name must throw error (v5.1)', function () {
            var fn = function myfunction() {
                return mn.class().private("", "aa");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid private name must throw error (v5.2)', function () {
            var fn = function myfunction() {
                return mn.class().const("", "aa");
            }
            expect(fn).to.throw(SyntaxError);
        });
    });
}());