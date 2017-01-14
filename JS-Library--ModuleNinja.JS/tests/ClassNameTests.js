(function () {
    var defaultName = "defName";
    var alternativeName = "altName";

    describe('#ClassName', function () {
        it('Name of class must equal the specifyed name', function () {
            var test = mn.class().className(defaultName).finalize();
            expect(test.name).to.equal(defaultName);
        });
        it('Name of class must equal the last specifyed name. Other names shouldn\'t count.', function () {
            var test = mn.class().className(alternativeName).className(defaultName).finalize();
            expect(test.name).to.equal(defaultName);
        });
        it('Class with invalid name must throw error (0)', function () {
            var fn = function myfunction() {
                return mn.class().className();
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid name must throw error (1)', function () {
            var fn = function myfunction() {
                return mn.class().className("1" + defaultName);
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid name must throw error (2)', function () {
            var fn = function myfunction() {
                return mn.class().className(defaultName + "%");
            }
            expect(fn).to.throw(SyntaxError);
        });
        it('Class with invalid name must throw error (3)', function () {
            var fn = function myfunction() {
                return mn.class().className([defaultName]);
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid name must throw error (4)', function () {
            var fn = function myfunction() {
                return mn.class().className({ name: defaultName });
            }
            expect(fn).to.throw(TypeError);
        });
        it('Class with invalid name must throw error (5)', function () {
            var fn = function myfunction() {
                return mn.class().className("");
            }
            expect(fn).to.throw(SyntaxError);
        });
    });
}());