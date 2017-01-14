(function () {
    var defaultName = "defName";
    var alternativeName = "altName";

    describe('#ClassChildOf', function () {
        it('Can create child with given parent', function () {
            var unnamedClass = mn.class().childOf(Array).finalize();
            var test = new unnamedClass();
            test[0] = "hallo";
            test[1] = "world";
            test.length = 2;
            expect(test.join(" ")).to.equal("hallo world");
        });
    });
}());