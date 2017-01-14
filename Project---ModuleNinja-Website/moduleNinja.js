var mn, moduleNinja;
/*
* moduleNinja
*
* `moduleNinja` (also aliased as 'mn') is a JavaScript framework that makes the
* creation of dynamic classes in JavaScript possible and easy. A 'dynamic class'
* is a dynamicli generated and runned JS code that returns a function witch can
* be used as a class (simularly to other languages). This means that the 'class'
* will be put together in the runtime of the application, and not on it initialization.
*
* Another moduleNinja feature of moduleNinja is getting the code of the created
* module (the class) as a string. It can be used as a development tool (since
* moduleNinja provides code with good quality).
*
* moduleNinja can also create more complex modules, witch can contain multiple classes.
* Althrough they are more complex, their creation is actually a lot simpler, since there
* aren't a lot of options about creating them.
*
* Last but not least - moduleNinja has a side feature that allows the user to easily
* clone any kind of bojects. The clones are deep, and include references to the
* functions of the original object. There's also a less sequre version of the cloner,
* which will try to create a new instance of the constructor of the given object,
* but it's use is not reccomended.
*
* ### Examples
*
*      // returns a new dynamic class (which is empty).
*      // The finalized version can no longer be changed by moduleNinja.
*      var newClass = mn.class()
*          .finalize();
*
*      // returns a new dynamic class (with a single property, named 'prop').
*      // The finalized version can no longer be changed by moduleNinja.
*      var newClass = mn.class()
*          .prop('prop')
*          .finalize();
*
*      // returns the code of the exampleAbove.
*      var jsCode = mn.class()
*          .prop('prop')
*          .toString();
*
*      // returns a new complex module (which is empty)
*      // The finalized version can no longer be changed by moduleNinja.
*      var module = mn.module()
*          .finalize();
*
*      // returns a new complex module ( with a single public property named 'prop'
*      // having an empty moduleNinja class as it's value )
*      // The finalized version can no longer be changed by moduleNinja.
*      var module = mn.module()
*          .public("prop", mn.class().finalize())
*          .finalize();
*
*      // returns a cloned object by the default moduleNinja cloner
*      var oldObject = { prop: "value" }
*      var newObject = mn.clone(oldObject);
*
*      // returns a cloned object by the complete moduleNinja cloner
*      // this cloner is not as sequre.
*      var oldObject = new Date()
*      var newObject = mn.clone(oldObject, true);
*      var success = newObject instanceof Date; // true
*/
mn = moduleNinja = (function dg() {
    /*
    * mn.validatorTypes
    *
    * moduleNinja has a set of predefined type validators. Althrough there aren't such types,
    * the validators create an abstraction about their existance.
    *
    * The types are:
    *      "any" - any value is good, exept undefined. No exceptions raised.
    *      "string" - accepts only string values. Any other value will raice an exception.
    *      "char" - accepts only string values with an exact length of 1. Any other value
    *                  will raice an exception.
    *      "nonEmptyString" - accepts only string values with length bigger than 0.
    *                  Any other value will raice an exception.
    *      "bool" - accepts only boolean values. Any other value will raice an exception.
    *      "number" - accepts only numeric values. Any other value will raice an exception.
    *      "int" - accepts only numeric values and converts them to a simple number (using Math.floor()).
    *                  Any other value will raice an exception.
    *      "positiveNumber" - accepts only positive numeric values (0 or greater).
    *                  Any other value will raice an exception.
    *      "positiveInt" - accepts only positive numeric values (0 or greater) and converts them to a
    *                  simple number (using Math.floor()). Any other value will raice an exception.
    *      "array" - accepts only arrays. Any other value will raice an exception.
    *      "object" - accepts only objects. Any other value will raice an exception.
    *      "type" - accepts only objects of the specifyed type. Any other value will raice an exception.
    */
    var builtInValidators = {
        "any": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                self[target] = value;
                return self;
            }
            else {
                return self[target];
            }
        },
        "string": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (typeof value === "string") {
                    self[target] = value;
                    return self;
                }
                else {
                    throw new TypeError(target + " expected a value of type 'string'. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "char": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (typeof value === "string" && value.length === 1) {
                    self[target] = value;
                    return self;
                }
                else {
                    throw new TypeError(target + " expected a value of type 'string' with length of 1. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "nonEmptyString": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (typeof value === "string" && value.length > 0) {
                    self[target] = value;
                    return self;
                }
                else {
                    throw new TypeError(target + " expected a value of type 'string' with length bigger than 0. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "bool": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not a valid target, or is not defined");
            }

            if (value !== undefined) {
                if (value === false || value === true) {
                    self[target] = value;
                    return self;
                }
                else {
                    throw new TypeError(target + " expected a value of type 'string' with length of 1. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "number": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (typeof value === "number") {
                    self[target] = value;
                    return self;
                }
                else {
                    throw new TypeError(target + " expected a value of type 'number'. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "int": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (typeof value === "number") {
                    self[target] = Math.floor(value);
                    return self;
                }
                else {
                    throw new TypeError(target + " expected a value of type 'number'. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "positiveNumber": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (typeof value === "number" && value >= 0) {
                    self[target] = value;
                    return self;
                }
                else {
                    throw new TypeError(target + " expected a value of type 'number'. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "positiveInt": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (typeof value === "number" && value >= 0) {
                    self[target] = Math.floor(value);
                    return self;
                }
                else {
                    throw new TypeError(target + " expected a value of type 'number'. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "array": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (value instanceof Array) {
                    self[target] = value;
                    return self;
                }
                else {
                    throw new TypeError(target + " expected instance of 'Array'. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "object": function (target, value) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (value instanceof Object) {
                    self[target] = value;
                    return self;
                }
                else {
                    throw new TypeError(target + " expected instance of 'Object'. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        },
        "type": function (target, value, Type) {
            var self = this;
            if (!target || !self.hasOwnProperty(target)) {
                throw new ReferenceError(target + " is not defined");
            }

            if (value !== undefined) {
                if (value instanceof Type) {
                    self[target] = value;
                    return self;
                }
                else {
                    throw new TypeError(target + " expected instance of '" + Type.name + "'. Got type '" + typeof value + "'");
                }
            }
            else {
                return self[target];
            }
        }
    };

    /*
    * Required Class
    *
    * The moduleNinja Required class is used to indicate that an error
    * should be thrown if a given accept value is not defined on initialization.
    * It is used by default, so it's not necesery to use it.
    */
    function Required() {
    }
    /*
    * mn.required()
    *
    * returns a new instance of the moduleNinja Required class.
    */
    function required() {
        return new Required();
    }

    /*
    * Accept Class
    *
    * The moduleNinja Accept class is used to indicate that a given string
    * should be treated as a javaScript code.
    * It is not sequre to use it, so only advanced developers should concider it as an option.
    */
    function Accept(value) {
        var self = this;
        "use strict";
        if (typeof !value === "string") {
            throw new TypeError("Can not register a type with a name that is not a string.");
        }
        self.value = value;
    }
    /*
    * mn.accept()
    *
    * returns a new instance of the moduleNinja Accept class.
    */
    function accept(value) {
        return new Accept(value);
    }
    /*
    * Type Class
    *
    * The moduleNinja Type class is used to indicate that a given function
    * should be treated as a Type (aka Class).
    * It allows the use of more advanced validators - the Type validators.
    */
    function Type(constructorName, constructorBody) {
        var self = this;
        "use strict";
        if (!typeof constructorName === "string") {
            throw new TypeError("Can not register a type with a name that is not a string.");
        }
        runSyntaxNameCheck(constructorName);
        if (!(constructorBody instanceof Function)) {
            throw new TypeError("Can not register a type that is not a function.");
        }
        self.name = constructorName;
        self.type = constructorBody;
    }
    /*
    * mn.type()
    *
    * returns a new instance of the moduleNinja Type class.
    */
    function type(name, constructor) {
        return new Type(name, constructor);
    }
    /*
    * Syntax Check
    *
    * This function contains all the syntax rules about the variable and function names
    * that can be used in the modules or in the classes.
    * It throws an exception if the given name doesn't match the rules, or returns void if it does.
    *
    * The rules are simple:
    *       - the name must be of string type
    *       - name's lenght must be bigger than 0
    *       - name must start with a latin letter
    *       - name can only contain latin letters and numbers
    *
    */
    function runSyntaxNameCheck(name) {
        if (typeof name !== "string") {
            throw new TypeError("Name must be of type string. '" + typeof name + "' was used instead.");
        }
        if (name.length === 0) {
            throw new SyntaxError("Name can not be an empty string");
        }

        if (("A" > name[0] || name[0] > "Z") &&
            ("a" > name[0] || name[0] > "z")) {
            throw new SyntaxError("Name must start with a latin letter. '" + name + "' is not valid.");
        }
        for (var i = 1; i < name.length; i++) {
            if (("A" > name[i] || name[i] > "Z") &&
                ("a" > name[i] || name[i] > "z") &&
                ("1" !== name[i] &&
                "2" !== name[i] &&
                "3" !== name[i] &&
                "4" !== name[i] &&
                "5" !== name[i] &&
                "6" !== name[i] &&
                "7" !== name[i] &&
                "8" !== name[i] &&
                "9" !== name[i] &&
                "0" !== name[i])) {
                throw new SyntaxError("Name can contain only Latin letters and numbers. '" + name + "' is not valid.");
            }
        }
    }
    /*
    * ModuleConstructor Class
    *
    * The ModuleConstructor class. It is used in the creation of complex modules.
    */
    function ModuleConstructor() {
        var self = this;
        "use strict";

        self._forbiddenNames = [];
        self._forbiddenInitNames = [];

        self._mnConstructorPrivates = {};
        self._mnConstructorPublics = {};
        self._mnConstructorInitializators = {};
    }

    /*
    * mn.module().public()
    *
    * The ModuleConstructor.public() function is used to add a
    * new public variable to the ModuleConstructor instance.
    * Public variables will also be returned as the module's result.
    * This function returns the ModuleConstructor instance (for chaining).
    */
    ModuleConstructor.prototype.public = function (publicName, publicValue) {
        var self = this;
        runSyntaxNameCheck(publicName);
        if (this._forbiddenNames.indexOf(publicName) !== -1) {
            throw new ReferenceError("Public name '" + type.name + "' is already being used, or is a reserved word");
        }
        self._mnConstructorPublics[publicName] = publicValue;
        return self;
    }

    /*
    * mn.module().private()
    *
    * The ModuleConstructor.private() function is used to add a
    * new public variable to the ModuleConstructor instance.
    * Private variables will NOT be returned as the module's result.
    * This function returns the ModuleConstructor instance (for chaining).
    */
    ModuleConstructor.prototype.private = function (privateName, privateValue) {
        var self = this;
        runSyntaxNameCheck(privateName);
        if (this._forbiddenNames.indexOf(privateName) !== -1) {
            throw new ReferenceError("Private name '" + type.name + "' is already being used, or is a reserved word");
        }
        self._mnConstructorPrivates[privateName] = privateValue;
        return self;
    }

    /*
    * mn.module().initializator()
    *
    * The ModuleConstructor.private() function is used to add a
    * new public variable to the ModuleConstructor instance.
    * Private variables will NOT be returned as the module's result.
    * This function returns the ModuleConstructor instance (for chaining).
    */
    ModuleConstructor.prototype.initializator = function (initFuncName, initFuncBody) {
        var self = this;
        runSyntaxNameCheck(initFuncName);
        if (self._forbiddenInitNames.indexOf(initFuncName) !== -1) {
            throw new ReferenceError("Initializator name " + initFuncName + " is already being used.");
        }
        if (!(initFuncBody instanceof Function)) {
            throw new TypeError("Initializator " + initFuncName + " is not a function.");
        }
        self._mnConstructorInitializators[initFuncName] = initFuncBody;
        self._forbiddenInitNames.push(initFuncName);
        return self;
    }

    /*
    * mn.module().onInit()
    *
    * The ModuleConstructor.onInit() function is used to add an initializator functions to the class.
    * It redirects to the ModuleConstructor.initializator() function.
    */
    ModuleConstructor.prototype.onInit = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    }

    /*
    * mn.module().init()
    *
    * The ModuleConstructor.init() function is used to add an initializator functions to the class.
    * It redirects to the ModuleConstructor.initializator() function.
    */
    ModuleConstructor.prototype.init = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    }

    function generateModuleCode() {
        var self = this;
        var privates = makePrivatesObject.call(self);
        var publics = makePublicsObject.call(self);
        var initsialization = makeInitObject.call(self, true);
        var code = [];

        code.push("(function () {")

        if (privates.isUsed) {
            code.push("//privates\n" + privates.code);
        }
        if (publics.isUsed) {
            code.push("//publics\n" + publics.code);
        }
        if (initsialization.isUsed) {
            code.push("//initialization logic\n" + "var initializator = " + initsialization.code);
            code.push("//initialization calls\n" + initsialization.list.join("\n"))
        }
        if (publics.isUsed) {
            code.push("//retuned object\n" + publics.list.join("\n"));
        }

        code.push("} ());");

        return code.join("\n\n")
    }

    /*
    * mn.module().finalize()
    *
    * Evaluates the stringifyed ModuleConstructor instance
    * and returns the result (the public variables).
    */
    ModuleConstructor.prototype.finalize = function () {
        var self = this;
        var code = generateModuleCode.call(self)
        var result = eval(code);
        return result;
    }

    /*
    * mn.module().extractCode()
    *
    * Converts the ModuleConstructor to string (javascript code) and returns it.
    */
    ModuleConstructor.prototype.extractCode = function () {
        return generateModuleCode.call(this);
    }

    /*
    * mn.module().toString()
    *
    * Converts the ModuleConstructor to string (javascript code)
    * redirects to ModuleConstructor.extractCode();
    */
    ModuleConstructor.prototype.toString = ModuleConstructor.prototype.extractCode;

    /*
    * mn.module().stringify()
    *
    * Converts the ModuleConstructor to string (javascript code)
    * redirects to ModuleConstructor.extractCode();
    */
    ModuleConstructor.prototype.stringify = ModuleConstructor.prototype.extractCode;

    /*
    * ClassConstructor Class
    *
    * The ClassConstructor class. It is used in the creation of class modules.
    */
    function ClassConstructor() {
        var self = this;
        "use strict";

        self._forbiddenNames = [];
        self._forbiddenPrivateNames = ["types", "validate", "initializator"];
        self._forbiddenValidationNames = [];
        self._forbiddenInitNames = [];
        self._forbiddenTypeNames = ["Parent"];
        for (var i in builtInValidators) {
            self._forbiddenValidationNames.push(i);
        }

        self._mnConstructorName = "UnnamedClass";
        self._mnConstructorAccepts = {};
        self._mnConstructorProps = {};
        self._mnConstructorKnownTypes = {};
        self._mnConstructorInitializators = {};
        self._mnConstructorAccessors = {};
        self._mnConstructorValidators = {};
        self._mnConstructorExtensions = {};
        self._mnConstructorConstants = {};
        self._mnConstructorPrivates = {};

        self._dgConstuctorSettings = {
            useStrict: true
        }
    }

    /*
    * mn.class().className()
    *
    * The ClassConstructor.className() function is used to set the name of the class.
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Example
    *      // sets the name of a new class to 'Figure' and finalizes it.
    *      var Figure = mn.class()
    *          .className('Figure')
    *          .finalize();
    */
    ClassConstructor.prototype.className = function (className) {
        var self = this;
        runSyntaxNameCheck(className);
        self._mnConstructorName = className;
        return self;
    }

    /*
    * mn.class().useStrict()
    *
    * The ClassConstructor.useStrict() function is used
    * to set the useStrict setting of the class.
    *
    * It only accepts boolean values.
    * It's default value is 'true'.
    *
    * If it's value is true during a finalization, an <"use strict";> command will be added to the class's code.
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Example
    *      // sets the useStrict setting of a new class 'Figure' to 'false' and finalizes it.
    *      var Figure = mn.class()
    *          .className('Figure')
    *          .useStrict(false)
    *          .finalize();
    */
    ClassConstructor.prototype.useStrict = function (useStrict) {
        var self = this;
        if (useStrict === undefined) {
            throw new ReferenceError("Can not use undefined to set class setting 'useStrict'")
        }
        if (typeof useStrict !== "boolean") {
            throw new TypeError("Can not use " + typeof useStrict + " to set class setting 'useStrict'")
        }
        self._dgConstuctorSettings.useStrict = useStrict;
        return self;
    }

    /*
    * mn.class().childOf()
    *
    * The ClassConstructor.childOf() function is used to set the parent class
    * of the mn.class() that is being constructed.
    *
    * It only accepts a single function value - the parent class.
    * The created class's prototype will be set to a new instance of the parent class.
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * Warning! Not sequre! If the parent requires arguments on initializations,
    * and throws errors if they are undefined, then it will throw errors here too.
    *
    * TODO: Make this more flexable;
    *
    * ### Example
    *      // creates a class Figure.
    *      // creates a class Square and sets it's parent to Figure
    *      var Figure = mn.class()
    *          .className('Figure')
    *          .finalize();
    *      var Square = mn.class()
    *          .className('Square')
    *          .childOf(Figure)
    *          .finalize();
    */
    ClassConstructor.prototype.childOf = function (parent) {
        var self = this;
        if (!(parent instanceof Function)) {
            throw new TypeError("The given parent is not a function.");
        }

        self._mnConstructorKnownTypes.Parent = parent;
        return self;
    }

    /*
    * mn.class().arg()
    *
    * The ClassConstructor.arg() function is used to add
    * both a property and an accept to the class.
    *
    * The function accepts (argName, argValidation, defaultValue)
    *      argName will be both the name of the property and the accept.
    *      argValidation will be the property's validation type.
    *      defaultValue will be the accept's default value
    *          (while the prop's default value will be "new Accept(argName)")
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Examples
    *      // creates a class Rectangle with arguments "sizeA" and "sizeB"
    *      //       both of type "any"
    *      var Rectangle = mn.class("sizeA", "sizeB")
    *          .className('Rectangle')
    *          .finalize();
    *
    *      // creates a class Rectangle with arguments "sizeA" and "sizeB"
    *      //       both of type "positiveNumber"
    *      var Rectangle = mn.class({
    *          "sizeA": "positiveNumber",
    *          "sizeB": "positiveNumber"
    *          })
    *          .className('Rectangle')
    *          .finalize();
    *
    *      // creates a class Rectangle with arguments "sizeA" and "sizeB"
    *      //       both of type "any"
    *      var Rectangle = mn.class()
    *          .arg("sizeA")
    *          .arg("sizeB")
    *          .className('Rectangle')
    *          .finalize();
    *
    *      // creates a class Rectangle with arguments "sizeA" and "sizeB"
    *      //       both of type "positiveNumber"
    *      var Rectangle = mn.class()
    *          .arg("sizeA", "positiveNumber")
    *          .arg("sizeB", "positiveNumber")
    *          .className('Rectangle')
    *          .finalize();
    *
    *      // creates a class Rectangle with arguments "sizeA" and "sizeB"
    *      //       both of type "any".
    *      // If their accepts are not defined, the accept's value will be set to 1.
    *      var Rectangle = mn.class()
    *          .arg("sizeA", "any", 1)
    *          .arg("sizeB", "any", 1)
    *          .className('Rectangle')
    *          .finalize();
    */
    ClassConstructor.prototype.arg = function (argName, argValidation, defaultValue) {
        var self = this;
        if (!argValidation) {
            return self.arg(argName, "any", defaultValue);
        }

        runSyntaxNameCheck(argName);
        self.accepts(argName, defaultValue);
        self.prop(argName, argValidation, new Accept(argName));
        return self;
    }

    /*
    * mn.class().attr()
    *
    * The ClassConstructor.attr() function is used to add
    * both a property and an accept to the class.
    * It redirects to the ClassConstructor.arg() function.
    */
    ClassConstructor.prototype.attr = function (attrName, attrValidation, defaultValue) {
        return this.arg(attrName, attrValidation, defaultValue);
    }

    /*
    * mn.class().accepts()
    *
    * The ClassConstructor.accepts() function is used to add an accept to the class.
    *
    * The function accepts (acceptName, defaultValue)
    *      acceptName will be the name of the accept.
    *      defaultValue will be the accept's default value. If not defined,
    *          the class will treat the accept as a required and will throw errors if it is not defined.
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Examples
    *      // creates a class Rectangle with accepts 'sizeA' and 'sizeB' - both required
    *      // in this form the accepts are useless, but combined with an Accept object as
    *      // a property's default value, they can be pretty neat.
    *      var Rectangle = mn.class()
    *          .className('Rectangle')
    *          .accept('sizeA')
    *          .accept('sizeB')
    *          .finalize();
    *
    *      // creates a class Rectangle with accepts 'sizeA' and 'sizeB'
    *      //       both with default value of 1.
    *      var Rectangle = mn.class()
    *          .className('Rectangle')
    *          .accept('sizeA', 1)
    *          .accept('sizeB', 1)
    *          .finalize();
    *
    *      // creates a class Circle with a single accept 'diameter' which
    *      // is used by the 'radius' property via an Accept class.
    *      // the Accept class's value will be treated as a JavaScript code.
    *      var Circle = mn.class()
    *          .className('Circle')
    *          .accept('diameter')
    *          .prop('radius', 'positiveNumber', mn.accept('diameter/2'))
    *          .finalize();
    */
    ClassConstructor.prototype.accepts = function (acceptName, defaultValue) {
        var self = this;
        runSyntaxNameCheck(acceptName);
        if (self._mnConstructorAccepts[acceptName]) {
            throw new ReferenceError("Name " + acceptName + " is already being used.")
        }

        if (defaultValue === undefined) {
            return self.accepts(acceptName, new Required())
        }

        self._mnConstructorAccepts[acceptName] = defaultValue;
        return self;
    }

    /*
    * mn.class().accept()
    *
    * The ClassConstructor.accept() function is used to add an accept to the class.
    * It redirects to the ClassConstructor.accepts() function.
    */
    ClassConstructor.prototype.accept = function (acceptName, defaultValue) {
        return this.accepts(acceptName, defaultValue);
    }
    /*
    * mn.class().prop()
    *
    * The ClassConstructor.prop() function is used to add an property to the class.
    *
    * The function accepts (propName, propValidation, propInitialValue)
    *      propName will be the name of the property.
    *      propValidation will be the type of validation that the property will use.
    *              If not defined, the property will use type "any".
    *      defaultValue will be the property's default value.
    *              If not defined, the property will have no default value.
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Examples
    *      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type "any"
    *      var Rectangle = mn.class()
    *          .className('Rectangle')
    *          .prop('sizeA')
    *          .prop('sizeB')
    *          .finalize();
    *
    *      // creates a class Rectangle with props 'sizeA' and 'sizeB' of type 'positiveNumber'
    *      //       both with default value of 1.
    *      var Rectangle = mn.class()
    *          .className('Rectangle')
    *          .prop('sizeA', 'positiveNumber', 1)
    *          .prop('sizeB', 'positiveNumber', 1)
    *          .finalize();
    *
    *      // creates an empty class Figure
    *      // creates a class FigureDuo with props 'figure1' and 'figure2' of type 'Figure'.
    *      // (once a type is used, it's added to the known types of the class. From there on,
    *      //       it's possible to reference it in a string, as shown.)
    *      var Figure = mn.class()
    *          .className('Figure')
    *          .finalize();
    *      var FigureDuo = mn.class()
    *          .className('FigureDuo')
    *          .prop('figure1', mn.type('Figure', Figure))
    *          .prop('figure2', 'type Figure')
    *          .finalize();
    *
    *      // creates a class Circle with an arg 'area' of type 'positiveNumber', that is required
    *      // creates a class FigureSolo with prop 'figure' of type 'Figure'.
    *      // The prop will have a default value of a moduleNinja literal
    *      //       (which is the same as moduleNinja's Accept class).
    *      var Figure = mn.class()
    *          .className('Figure')
    *          .arg('area', 'positiveNumber')
    *          .finalize();
    *      var FigureSolo = mn.class()
    *          .className('FigureSolo')
    *          .prop('figure', mn.type('Figure', Figure), mn.literal("new types.Figure(10)"))
    *          .finalize();
    *
    *      // creates a new class Square with a prop 'size' that has a custom validator function,
    *      // that accepts only numbers and rounds them to a base of 10
    *      // notice that in the validator function the property that is being referenced (_size)
    *      //       has an underscore at the begining. This is important.
    *      // the function is named "size", but the property itself is named "_size".
    *      var Square = mn.class()
    *          .className('Square')
    *          .prop('size', function(value){
    *              if (value === undefined) {
    *                  // property setter
    *                  if (typeof value === "number") {
    *                      var leftTo10 = value % 10;
    *                      if (leftTo10 >= 5) {
    *                          value += (10-leftTo10);
    *                      }
    *                      else {
    *                          value -= leftTo10;
    *                      }
    *
    *                      this._size = value; // set's the property
    *                      return this; // return self for chaining
    *                  }
    *                  else {
    *                      throw new TypeError("size value must be a number")
    *                  }
    *              }
    *              else {
    *                  // property getter
    *                  return this._size;
    *              }
    *          })
    *
    */
    ClassConstructor.prototype.prop = function (propName, propValidation, propInitialValue) {
        var self = this;

        if (propValidation === undefined) {
            return self.prop(propName, "any", propInitialValue);
        }

        runSyntaxNameCheck(propName);

        if (self._forbiddenNames.indexOf(propName) !== -1) {
            throw new ReferenceError("Name " + propName + " is already being used.");
        }
        self._mnConstructorProps[propName] = propInitialValue;
        if (typeof propValidation === "string") {
            if (propValidation.substr(0, 4) === "type") {
                propValidationSplit = propValidation.split(" ");
                if (propValidationSplit.length !== 2) {
                    throw new SyntaxError("Invalid type validation command string: " + propValidation);
                }
                if (self._mnConstructorKnownTypes[propValidationSplit[1]]) {
                    return self.prop(
                        propName,
                        new Type(propValidationSplit[1], self._mnConstructorKnownTypes[propValidationSplit[1]]),
                        propInitialValue);
                }
                else {
                    throw new ReferenceError("Invalid type validation command string: " + propValidation);
                }
            }
            else if (self._mnConstructorValidators[propValidation]) {
                // do nothing
            }
            else if (builtInValidators[propValidation]) {
                self._mnConstructorValidators[propValidation] = builtInValidators[propValidation];
            }
            else {
                throw new ReferenceError("Invalid validation command string: " + propValidation);
            }
        }
        else if (propValidation instanceof Type) {
            if (!(self._mnConstructorKnownTypes[propValidation.name] !== undefined)) {
                self.knownType(propValidation);
            }
            self._mnConstructorValidators.type = builtInValidators.type;
        }

        self._mnConstructorAccessors[propName] = propValidation;

        self._forbiddenNames.push("_" + propName);
        self._forbiddenNames.push(propName);

        return self;
    }

    /*
    * mn.class().initializator()
    *
    * The ClassConstructor.initializator() function is used to add an initializator functions to the class.
    * The initializator functions are called only on a new object initialization
    *
    * The function accepts (initFuncName, initFuncBody)
    *      initFuncName will be the name of the init function.
    *      initFuncBody will be the function that that should be called on initialization.
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Examples
    *      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type "any",
    *      // and an initializator that sets sizeA to 10, and sizeB to 15.
    *      var Rectangle = mn.class()
    *          .className('Rectangle')
    *          .prop('sizeA')
    *          .prop('sizeB')
    *          .initializator("setSizes", function () {
    *              this.sizeA(10);
    *              this.sizeB(15);
    *          })
    *          .finalize();
    */
    ClassConstructor.prototype.initializator = function (initFuncName, initFuncBody) {
        var self = this;
        runSyntaxNameCheck(initFuncName);
        if (self._forbiddenInitNames.indexOf(initFuncName) !== -1) {
            throw new ReferenceError("Initializator name " + initFuncName + " is already being used.");
        }
        if (!(initFuncBody instanceof Function)) {
            throw new TypeError("Initializator " + initFuncName + " is not a function.");
        }
        self._mnConstructorInitializators[initFuncName] = initFuncBody;
        self._forbiddenInitNames.push(initFuncName);
        return self;
    }

    /*
    * mn.class().onInit()
    *
    * The ClassConstructor.onInit() function is used to add an initializator functions to the class.
    * It redirects to the ClassConstructor.initializator() function.
    */
    ClassConstructor.prototype.onInit = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    }

    /*
    * mn.class().init()
    *
    * The ClassConstructor.init() function is used to add an initializator functions to the class.
    * It redirects to the ClassConstructor.initializator() function.
    */
    ClassConstructor.prototype.init = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    }

    /*
    * mn.class().accessor()
    *
    * The ClassConstructor.accessor() function is used to add an accessor functions to the class.
    * The accessor functions are functions added to the class's prototype that can also access the class privates.
    *
    * The function accepts (accessorName, accessorFunction)
    *      accessorName will be the name of the accessor function.
    *      accessorFunction will be the function itself
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Examples
    *      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type "positiveNumber",
    *      // and a function called 'resetSizes' that sets sizeA and sizeB to 1.
    *      // the function will return the object itself, for chaining.
    *      var Rectangle = mn.class()
    *          .className('Rectangle')
    *          .prop('sizeA', 'positiveNumber')
    *          .prop('sizeB', 'positiveNumber')
    *          .accessor("resetSizes", function () {
    *              this.sizeA(1);
    *              this.sizeB(1);
    *              return this;
    *          })
    *          .finalize();
    *
    *      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type "positiveNumber",
    *      // and a function called 'getArea' that returns the rect's area.
    *      var Rectangle = mn.class()
    *          .className('Rectangle')
    *          .prop('sizeA', 'positiveNumber')
    *          .prop('getArea', 'positiveNumber')
    *          .accessor("resetSizes", function () {
    *              var area = this.sizeA() * this.sizeB();
    *              return area;
    *          })
    *          .finalize();
    *
    *      // creates a class Circle with prop 'radius', a privateValue 'pi',
    *      // and a function called 'getArea' that returns the rect's area.
    *      // notice that the accessor function can access private values.
    *      var Circle = mn.class()
    *            .className('Circle')
    *            .prop('radius', 'positiveNumber')
    *            .private('pi', Math.PI)
    *            .accessor("getArea", function () {
    *                var area = pi * this.radius() * this.radius();
    *                return area;
    *            })
    *            .finalize();
    */
    ClassConstructor.prototype.accessor = function (accessorName, accessorFunction) {
        var self = this;
        runSyntaxNameCheck(accessorName);
        if (self._forbiddenNames.indexOf(accessorName) !== -1) {
            throw new ReferenceError("Accessor name " + accessorName + " is already being used.");
        }
        if (!(accessorFunction instanceof Function)) {
            throw new TypeError("Accessor " + accessorName + " is not a function.");
        }
        self._mnConstructorAccessors[accessorName] = accessorFunction;
        self._forbiddenNames.push(accessorName);
        return self;
    }
    /*
    * mn.class().function()
    *
    * The ClassConstructor.function() function is used to add an accessor functions to the class.
    * It redirects to the ClassConstructor.accessor() function.
    */
    ClassConstructor.prototype.function = function (functionName, functionBody) {
        return this.accessor(functionName, functionBody);
    };
    /*
    * mn.class().extension()
    *
    * The ClassConstructor.extension() function is used to add an extension functions to the class.
    * The extension functions are functions added to the class's prototype that can NOT access the class privates.
    *
    * The function accepts (functionName, functionBody)
    *      functionName will be the name of the accessor function.
    *      functionBody will be the function itself
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Examples
    *      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type "positiveNumber",
    *      // and a function called 'resetSizes' that sets sizeA and sizeB to 1.
    *      // the function will return the object itself, for chaining.
    *      var Rectangle = mn.class()
    *          .className('Rectangle')
    *          .prop('sizeA', 'positiveNumber')
    *          .prop('sizeB', 'positiveNumber')
    *          .extension("resetSizes", function () {
    *              this.sizeA(1);
    *              this.sizeB(1);
    *              return this;
    *          })
    *          .finalize();
    *
    *      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type "positiveNumber",
    *      // and a function called 'getArea' that returns the rect's area.
    *      var Rectangle = mn.class()
    *          .className('Rectangle')
    *          .prop('sizeA', 'positiveNumber')
    *          .prop('sizeB', 'positiveNumber')
    *          .extension("resetSizes", function () {
    *              var area = this.sizeA() * this.sizeB();
    *              return area;
    *          })
    *          .finalize();
    */
    ClassConstructor.prototype.extension = function (functionName, functionBody) {
        var self = this;
        runSyntaxNameCheck(functionName);
        if (self._forbiddenNames.indexOf(functionName) !== -1) {
            throw new ReferenceError("Function name " + functionName + " is already being used.");
        }
        if (!(functionBody instanceof Function)) {
            throw new TypeError("Extension " + functionName + " is not a function.");
        }
        self._mnConstructorExtensions[functionName] = functionBody;
        self._forbiddenNames.push(functionName);
        return self;
    }
    /*
    * mn.class().knownType()
    *
    * The ClassConstructor.knownType() function is used to add an Type (aka Class) definition to the class.
    * The knownTypes are functions that the class uses for validation, or for other purposes
    * The function accepts a single instance of the moduleNinja Type class.
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Examples
    *      // creates an empty class Figure.
    *      // creates a class FigureDuo with props "figure1" and "figure2" - both of type Figure.
    *      var Figure = mn.class().className('Figure')
    *          .finalize();
    *      var FigureDuo = mn.class().className('FigureDuo')
    *          .knownType(mn.type('Figure', Figure))
    *          .prop('figure1', 'type Figure')
    *          .prop('figure2', 'type Figure')
    *          .finalize();
    *
    *      // creates an empty class Figure.
    *      // creates a class FigureDuo with props "figure1" and "figure2" - both of type Figure
    *      // and an initializator function that sets both of the props to a new instance of the Figure class.
    *      // notice that the "types" object is referenced. It is a private object that stores all the known types.
    *      var Figure = mn.class().className('Figure')
    *          .finalize();
    *      var FigureDuo = mn.class().className('FigureDuo')
    *          .knownType(mn.type('Figure', Figure))
    *          .prop('figure1', 'type Figure')
    *          .prop('figure2', 'type Figure')
    *          .init('setFigures', function () {
    *              // the chaining makes it possible to write code like that
    *              return this.figure1(new types.Figure()).figure2(new types.Figure());
    *          })
    *          .finalize();
    */
    ClassConstructor.prototype.knownType = function (type) {
        var self = this;
        if (type instanceof Type) {
            if (self._forbiddenTypeNames.indexOf(type.name) !== -1) {
                throw new ReferenceError("Type name " + type.name + " is already being used, or is a reserved word");
            }
            self._mnConstructorKnownTypes[type.name] = type.type;
            self._forbiddenTypeNames.push(type.name);
        }
        else {
            throw new TypeError("Unrecognised type. Use moduleNinja's .type() to wrap and name the type you want to be known in the program.")
        }
        return self;
    }
    /*
    * mn.class().private()
    *
    * The ClassConstructor.private() function is used to add a private value to the class.
    * The private value is like the "private static" values in other languages.
    * It is shared between all the instances of the class, and can not be accessed from outside.
    *
    * The function accepts (privateName, privateValue)
    *      privateName is the name of the private variable
    *      privateValue is the value of that variable. Any value is valid.
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Examples
    *      // creates a class Circle with prop "radius" and private "pi".
    *      // it also has a function that returns the area, using the private 'pi'.
    *      var Circle = mn.class()
    *            .className('Circle')
    *            .prop('radius', 'positiveNumber')
    *            .private('pi', Math.PI)
    *            .accessor("getArea", function () {
    *                var area = pi * this.radius() * this.radius();
    *                return area;
    *            })
    *            .finalize();
    */
    ClassConstructor.prototype.private = function (privateName, privateValue) {
        var self = this;
        runSyntaxNameCheck(privateName);
        if (self._forbiddenPrivateNames.indexOf(privateName) !== -1) {
            throw new ReferenceError("Private name " + privateName + " is already being used, or is a reserved word.");
        }
        self._mnConstructorPrivates[privateName] = privateValue;
        self._forbiddenPrivateNames.push(privateName);
        return self;
    }
    /*
    * mn.class().const()
    *
    * The ClassConstructor.const() function is used to add a private value to the class.
    * It redirects to the ClassConstructor.private() function.
    */
    ClassConstructor.prototype.const = function (constantName, constantValue) {
        return this.private(constantName, constantValue);
    }
    /*
    * mn.class().validator()
    *
    * The ClassConstructor.validator() function is used to add a custom reusable validator to the class.
    * The new validatr will act as a type, in the same way that the basic validators do
    * (same as : "any", "string", "char", "int" etc...)
    *
    * The function accepts (validatorName, validatorBody)
    *      validatorName is the name of the validator
    *      validatorBody is the validation function. It must accept 2 values - target and value.
    *              target is the name of the property that that uses the validator.
    *              value is the value that the validator should set to the targeted property.
    *                      If value is undefined, the validator should return the value of the targeted property.
    *
    * This function returns the ClassConstructor instance (for chaining).
    *
    * ### Examples
    *      // creates a class Line with prop 'lineLength' (positiveNumber, default=0)
    *      // creates a class Lines with prop 'lines' with validation 'linesArray'
    *      var Line = mn.class().className("Line")
    *          .arg('lineLength', 'positiveNumber', 0)
    *          .finalize();
    *      var Lines = mn.class().className("Lines")
    *          .knownType(mn.type("Line", Line))
    *          .validator("linesArray", function (target, value) {
    *              if (value !== undefined) {
    *                  if (value instanceof Array) {
    *                      for (var i = 0; i < value.length; i++) {
    *                          if (!(value[i] instanceof types.Line)) {
    *                              throw new TypeError("array contains value that is not a Line");
    *                          }
    *                      }
    *                      this[target] = value;
    *                  }
    *                  else {
    *                      throw new TypeError("value is not an array");
    *                  }
    *              }
    *              else {
    *                  return this[target];
    *              }
    *          })
    *          .prop('lines', 'linesArray')
    *          .finalize();
    */
    ClassConstructor.prototype.validator = function (validatorName, validatorBody) {
        var self = this;
        runSyntaxNameCheck(validatorName);
        if (self._forbiddenValidationNames.indexOf(validatorName) !== -1) {
            throw new ReferenceError("Validator name '" + validatorName + "' is already being used, or is a reserved word.");
        }
        if (!(validatorBody instanceof Function)) {
            throw new TypeError("Validator " + validatorName + " is not a function");
        }
        self._mnConstructorValidators[validatorName] = validatorBody;
        self._forbiddenValidationNames.push(validatorName);
        return self;
    }

    function makeTypesObject() {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        code.push("{")
        for (var i in self._mnConstructorKnownTypes) {
            list.push(i);
            code.push("\t" + i + ": " + i + ",")
        }
        code[code.length - 1] = code[code.length - 1].substr(0, code[code.length - 1].length - 1); // removing the last comma
        code.push("}")

        result.code = code.join("\n");
        result.list = list;
        result.isUsed = list.length > 0;

        return result;
    }

    function makeValidatorObject() {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        code.push("{")
        for (var i in self._mnConstructorValidators) {
            list.push(i);
            code.push("\t" + i + ": " + self._mnConstructorValidators[i] + ",")
        }
        code[code.length - 1] = code[code.length - 1].substr(0, code[code.length - 1].length - 1); // removing the last comma
        code.push("}")

        result.code = code.join("\n");
        result.list = list;
        result.isUsed = list.length > 0;
        return result;
    }

    function makePrivatesObject() {
        var self = this;
        var result = {};
        var list = [];
        var privates = [];
        for (var i in self._mnConstructorPrivates) {
            list.push(i);
            if (typeof self._mnConstructorPrivates[i] === "string") {
                privates.push("\t" + "var " + i + " = '" + self._mnConstructorPrivates[i] + "';");
            }
            else if (self._mnConstructorPrivates[i] instanceof Function) {
                privates.push("\t" + "var " + i + " = " + self._mnConstructorPrivates[i] + ";");
            }
            else if (self._mnConstructorPrivates[i] instanceof Object) {
                privates.push("\t" + "var " + i + " = " + JSON.stringify(self._mnConstructorPrivates[i]) + ";");
            }
            else {
                privates.push("\t" + "var " + i + " = " + self._mnConstructorPrivates[i] + ";");
            }
        }
        result.list = list;
        result.code = privates.join("\n");
        result.isUsed = list.length > 0;

        return result;
    }

    function makePublicsObject() {
        var self = this;
        var result = {};
        var list = [];
        var publics = [];

        list.push("\treturn {")
        for (var i in self._mnConstructorPublics) {
            list.push("\t\t" + i + ": " + i + ',');
            if (typeof self._mnConstructorPublics[i] === "string") {
                publics.push("\t" + "var " + i + " = '" + self._mnConstructorPublics[i] + "';");
            }
            else if (self._mnConstructorPublics[i] instanceof Function) {
                publics.push("\t" + "var " + i + " = " + self._mnConstructorPublics[i] + ";");
            }
            else if (self._mnConstructorPublics[i] instanceof Object) {
                publics.push("\t" + "var " + i + " = " + JSON.stringify(self._mnConstructorPublics[i]) + ";");
            }
            else {
                publics.push("\t" + "var " + i + " = " + self._mnConstructorPublics[i] + ";");
            }
        }
        list[list.length - 1] = list[list.length - 1].substr(0, list[list.length - 1].length - 1); // removing the last comma
        list.push("\t};");

        result.list = list;
        result.code = publics.join("\n");
        result.isUsed = publics.length > 0;

        return result;
    }
    function makeInitObject(doNotCallSelf) {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        code.push("{")
        for (var i in self._mnConstructorInitializators) {
            list.push("\t" + "initializator['" + i + "']" + (doNotCallSelf === true ? "()" : ".call(this)") + ";")
            code.push("\t" + i + " : " + self._mnConstructorInitializators[i] + ",");
        }
        code[code.length - 1] = code[code.length - 1].substr(0, code[code.length - 1].length - 1); // removing the last comma
        code.push("}")

        result.list = list;
        result.code = code.join("\n");
        result.isUsed = list.length > 0;

        return result;
    }

    function makeAcceptObject() {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        for (var i in self._mnConstructorAccepts) {
            list.push(i);
            if (self._mnConstructorAccepts[i] instanceof Required) {
                code.push("\t" + "if(" + i + " === undefined){\n" + "\t\t" + "throw new ReferenceError('" + i + " is not defined on object initialization');\n" + "\t\t" + "}");
            }
            else if (self._mnConstructorAccepts[i] instanceof Accept) {
                code.push("\t" + "if(" + i + " === undefined){\n" + "\t\t" + i + " = " + self._mnConstructorAccepts[i].value + ";\n" + "\t\t" + "}");
            }
            else if (typeof self._mnConstructorAccepts[i] === "string") {
                code.push("\t" + "if(" + i + " === undefined){\n" + "\t\t" + i + " = '" + self._mnConstructorAccepts[i] + "';\n" + "\t\t" + "}");
            }
            else {
                code.push("\t" + "if(" + i + " === undefined){\n" + "\t\t" + i + " = " + JSON.stringify(self._mnConstructorAccepts[i]) + ";\n" + "\t\t" + "}");
            }
        }

        result.list = list;
        result.code = code.join("\n");
        result.isUsed = list.length > 0;

        return result;
    }

    function makePropObject() {
        var self = this;
        var result = {};
        var list = [];
        var codeDefine = [];
        var codeInit = [];

        for (var i in self._mnConstructorProps) {
            list.push(i);
            codeDefine.push("\t" + "this._" + i + " = undefined;");
            if (typeof self._mnConstructorProps[i] === "string") {
                codeInit.push("\t" + "this." + i + "('" + self._mnConstructorProps[i] + "')");
            }
            else if (self._mnConstructorProps[i] instanceof Accept) {
                codeInit.push("\t" + "this." + i + "(" + self._mnConstructorProps[i].value + ")");
            }
            else if (self._mnConstructorProps[i] instanceof Function) {
                codeInit.push("\t" + "this." + i + "(" + self._mnConstructorProps[i] + ")");
            }
            else if (self._mnConstructorProps[i] !== undefined) {
                codeInit.push("\t" + "this." + i + "(" + JSON.stringify(self._mnConstructorProps[i]) + ")");
            }
        }

        result.list = list;
        result.code = codeDefine.join("\n") + (codeInit.length > 0 ? "\n\n" + codeInit.join("\n") : "");
        result.isUsed = list.length > 0;

        return result;
    }

    function makeParentObject() {
        var self = this;
        var result = {};
        var list = [];

        if (self._mnConstructorKnownTypes.Parent !== undefined) {
            list.push("Parent")
        }

        result.list = list;
        result.code = self._mnConstructorName + ".prototype = new types.Parent();";
        result.isUsed = list.length > 0;

        return result;
    }

    function makeAccessorsObject() {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        for (var i in self._mnConstructorAccessors) {
            list.push(i);
            if (typeof self._mnConstructorAccessors[i] === "string") {
                accessorsString = self._mnConstructorName + ".prototype." + i + " = function " + i + "(value) {\n" +
                    "\t" + "return validate." + self._mnConstructorAccessors[i] + ".call(this, \"_" + i + "\", value);\n" +
                    "}";
                code.push(accessorsString);
            }
            else if (self._mnConstructorAccessors[i] instanceof Type) {
                accessorsString = self._mnConstructorName + ".prototype." + i + " = function " + i + "(value) {\n" +
                "\t" + "return validate.type.call(this, \"_" + i + "\", value, types." + self._mnConstructorAccessors[i].name + ");\n" +
                "}";
                code.push(accessorsString);
            }
            else {
                code.push(self._mnConstructorName + ".prototype." + i + " = " + self._mnConstructorAccessors[i]);
            }
        }

        result.list = list;
        result.code = code.join("\n");
        result.isUsed = list.length > 0;

        return result;
    }

    function makeExtensionsObject() {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        for (var i in self._mnConstructorExtensions) {
            list.push(i);
            code.push("\t" + self._mnConstructorName + ".prototype." + i + " = " + self._mnConstructorExtensions[i]);
        }

        result.list = list;
        result.code = code.join("\n");
        result.isUsed = list.length > 0;

        return result;
    }

    function generateClassCode() {
        var self = this;

        var types = makeTypesObject.call(self);
        var validation = makeValidatorObject.call(self)
        var privates = makePrivatesObject.call(self);
        var init = makeInitObject.call(self);
        var accept = makeAcceptObject.call(self);
        var props = makePropObject.call(self);
        var parent = makeParentObject.call(self);
        var accessors = makeAccessorsObject.call(self);
        var extensions = makeExtensionsObject.call(self);

        var result = [];

        if (extensions.isUsed) {
            result.push("(function(" + (types.isUsed ? types.list.join(", ") : "") + ") {");
        }

        result.push((extensions.isUsed ? "var " + self._mnConstructorName + " = " : "") +
            "(function(" + (types.isUsed ? types.list.join(", ") : "") + ") {");

        if (types.isUsed) {
            result.push("//types\n" + "var types = " + types.code);
        }
        if (validation.isUsed) {
            result.push("//validation\n" + "var validate = " + validation.code);
        }
        if (privates.isUsed) {
            result.push(privates.code);
        }
        if (init.isUsed) {
            result.push("//init\n" + "var initializator = " + init.code);
        }

        result.push("function " + self._mnConstructorName + "(" + (accept.isUsed ? accept.list.join(", ") : "") + ") {");

        if (self._dgConstuctorSettings.useStrict) {
            result.push("\t" + "'use strict';");
        }

        if (accept.isUsed) {
            result.push("\t" + "//accept checks\n" + accept.code);
        }
        if (props.isUsed) {
            result.push("\t" + "//props\n" + props.code);
        }
        if (init.isUsed) {
            result.push("\t" + "//initialization\n" + init.list.join("\n"));
        }

        result.push("}");

        if (parent.isUsed) {
            result.push("//inheratnece\n" + parent.code);
        }
        if (accessors.isUsed) {
            result.push("//accessor functions\n" + accessors.code);
        }

        result.push("return " + self._mnConstructorName + ";");
        result.push("}(" + (types.isUsed ? types.list.join(", ") : "") + "));");

        if (extensions.isUsed) {
            result.push("//extending function\n" + extensions.code);
            result.push("return " + self._mnConstructorName + ";");
            result.push("}(" + (types.isUsed ? types.list.join(", ") : "") + "));");
        }

        return result.join("\n\n");
    }

    /*
    * mn.class().finalize()
    *
    * Converts the ClassConstructor to string (javascript code) and evaluates it.
    * returns the result of the evaluation.
    */
    ClassConstructor.prototype.finalize = function () {
        var self = this;
        var i;
        var Result
        var _finalizedString = generateClassCode.call(self);
        for (i in self._mnConstructorKnownTypes) {
            var _nextVariavleString = "var " + i + " = self._mnConstructorKnownTypes." + i + ";"
            eval(_nextVariavleString);
        }
        Result = eval(_finalizedString);
        return Result;
    }

    /*
    * mn.class().extractCode()
    *
    * Converts the ClassConstructor to string (javascript code) and returns it.
    */
    ClassConstructor.prototype.extractCode = function () {
        return generateClassCode.call(this);
    }

    /*
    * mn.class().toString()
    *
    * Converts the ClassConstructor to string (javascript code)
    * redirects to ClassConstructor.extractCode();
    */
    ClassConstructor.prototype.toString = ClassConstructor.prototype.extractCode;

    /*
    * mn.class().stringify()
    *
    * Converts the ClassConstructor's to string (javascript code)
    * redirects to ClassConstructor.extractCode();
    */
    ClassConstructor.prototype.stringify = ClassConstructor.prototype.extractCode;

    function forAllPublicArguments(publicArguments, sendParsed, self) {
        var caller = this
        var i;
        var argsToPass = [];
        if (publicArguments instanceof Object) {
            for (i in publicArguments) {
                var currentProp = {
                    name: i,
                    validation: publicArguments[i]
                }
                argsToPass.push(currentProp);
            }
        }
        else {
            for (i = 0; i < caller.arguments.length; i++) {
                argsToPass.push(caller.arguments[i]);
            }
        }

        for (i = 0; i < argsToPass.length; i++) {
            if (typeof argsToPass[i] === "string") {
                sendParsed.call(self, argsToPass[i]);
            }
            else {
                sendParsed.call(self, argsToPass[i].name, argsToPass[i].validation);
            }
        }
    }

    /*
    * mn.class()
    *
    * returns a new instance of the moduleNinja's ClassConstructor class
    */
    function classCreator(publicArguments) {
        var newClass = new ClassConstructor();
        forAllPublicArguments.call(classCreator, publicArguments, newClass.arg, newClass);
        return newClass;
    }
    /*
    * mn.module()
    *
    * returns a new instance of the moduleNinja's ModuleConstructor class
    */
    function moduleCreator(publicArguments) {
        var newModule = new ModuleConstructor();
        forAllPublicArguments.call(moduleCreator, publicArguments, newModule.public, newModule);
        return newModule;
    }
    /*
    * mn.clone()
    *
    * returns a deep clone of the given object. Functions are cloned too.
    */
    function cloneCreator(oldObject, completeClone) {
        var result;
        var i;

        if (oldObject === undefined) {
            return oldObject;
        }

        else if (typeof oldObject === "string" ||
            typeof oldObject === "number" ||
            typeof oldObject === "boolean" ||
            typeof oldObject === "null") {
            return oldObject;
        }
        else if (oldObject instanceof Array) {
            result = [];
            for (var i = 0; i < oldObject.length; i++) {
                result[i] = cloneCreator(oldObject[i], completeClone);
            }
        }
        else if (oldObject instanceof Function) {
            return oldObject;
        }
        else if (oldObject instanceof Object) {
            if (completeClone === true) {
                result = new oldObject.constructor();
            }
            else {
                result = {};
            }

            for (i in oldObject) {
                result[i] = cloneCreator(oldObject[i], completeClone);
            }
        }
        else {
            throw new Error("Something unexpected happened")
        }
        return result;
    }

    return {
        module: moduleCreator,
        class: classCreator,
        clone: cloneCreator,

        type: type,
        accept: accept,
        literal: accept,
        required: required
    }
}());