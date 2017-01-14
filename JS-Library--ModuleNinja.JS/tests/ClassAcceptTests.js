(function () {
    var defaultName = "defName";
    var alternativeName = "altName";

    describe('#ClassAccepts', function () {
        it('Class with arg - use required accept as default', function () {
            var unnamedClass = mn.class(defaultName).finalize();
            function fn() {
                return new unnamedClass();
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Class with arg - use required accept at will', function () {
            var unnamedClass = mn.class().arg(defaultName, "any", mn.required()).finalize();
            function fn() {
                return new unnamedClass();
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Class with arg - use accept with default value', function () {
            var unnamedClass = mn.class().arg(defaultName, "any", "foo").finalize();

            var test = new unnamedClass();
            expect(test[defaultName]()).to.equal("foo");
        });
        it('Class with arg - use accept with invalid default value', function () {
            var unnamedClass = mn.class().arg(defaultName, "number", "foo").finalize();

            function fn() {
                return new unnamedClass();
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with arg - use accept with literal default value', function () {
            var unnamedClass = mn.class().arg(defaultName, "number", mn.literal("(5-2)*3")).finalize();

            var test = new unnamedClass();
            expect(test[defaultName]()).to.equal(9);
        });

        it('----------------------------------------------------', function () {
        });

        it('Class with accept  - use required accept as default', function () {
            var unnamedClass = mn.class().accepts(defaultName).finalize();
            function fn() {
                return new unnamedClass();
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Class with accept - use required accept at will', function () {
            var unnamedClass = mn.class().accepts(defaultName, mn.required()).finalize();
            function fn() {
                return new unnamedClass();
            }
            expect(fn).to.throw(ReferenceError);
        });
        it('Class with accept - use accept with default value', function () {
            var unnamedClass = mn.class().accepts(defaultName, "foo").prop(defaultName, "any", mn.accept(defaultName + ' + "!"'));
            unnamedClass = unnamedClass.finalize();
            var test = new unnamedClass();
            expect(test[defaultName]()).to.equal("foo!");
        });
        it('Class with accept - use accept with invalid default value', function () {
            var unnamedClass = mn.class().accepts(defaultName, "foo").prop(defaultName, "number", mn.accept(defaultName)).finalize();

            function fn() {
                return new unnamedClass();
            }
            expect(fn).to.throw(TypeError);
        });

        it('----------------------------------------------------', function () {
        });

        it('Class with invalid accept name must throw error (1)', function () {
            var fn = function myfunction() {
                return mn.class().accepts("1" + defaultName);
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid accept name must throw error (2)', function () {
            var fn = function myfunction() {
                return mn.class().accepts(defaultName + "%");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid accept name must throw error (3)', function () {
            var fn = function myfunction() {
                return mn.class().accepts([defaultName]);
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid accept name must throw error (4)', function () {
            var fn = function myfunction() {
                return mn.class().accepts({ name: defaultName });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid accept name must throw error (5)', function () {
            var fn = function myfunction() {
                return mn.class().accepts("");
            }
            expect(fn).to.throw(SyntaxError);
        });
    });
}());