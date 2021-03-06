var mn, moduleNinja;

mn = moduleNinja = (function dg() {

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

    function Required() {
    }

    function required() {
        return new Required();
    }

    function Accept(value) {
        var self = this;
        "use strict";
        if (typeof !value === "string") {
            throw new TypeError("Can not register a type with a name that is not a string.");
        }
        self.value = value;
    }

    function accept(value) {
        return new Accept(value);
    }

    function Type(constructorName, constructorBody) {
        var self = this;
        "use strict";
        if (typeof constructorName !== "string") {
            throw new TypeError("Can not register a type with a name that is not a string.");
        }
        runSyntaxNameCheck(constructorName);
        if (!(constructorBody instanceof Function)) {
            throw new TypeError("Can not register a type that is not a function.");
        }
        self.name = constructorName;
        self.type = constructorBody;
    }

    function type(name, constructor) {
        return new Type(name, constructor);
    }

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

    function ModuleConstructor() {
        var self = this;
        "use strict";

        self._forbiddenNames = [];
        self._forbiddenInitNames = [];

        self._mnConstructorPrivates = {};
        self._mnConstructorPublics = {};
        self._mnConstructorInitializators = {};
    }

    ModuleConstructor.prototype.public = function (publicName, publicValue) {
        var self = this;
        runSyntaxNameCheck(publicName);
        if (this._forbiddenNames.indexOf(publicName) !== -1) {
            throw new ReferenceError("Public name '" + type.name + "' is already being used, or is a reserved word");
        }
        self._mnConstructorPublics[publicName] = publicValue;
        return self;
    };

    ModuleConstructor.prototype.private = function (privateName, privateValue) {
        var self = this;
        runSyntaxNameCheck(privateName);
        if (this._forbiddenNames.indexOf(privateName) !== -1) {
            throw new ReferenceError("Private name '" + type.name + "' is already being used, or is a reserved word");
        }
        self._mnConstructorPrivates[privateName] = privateValue;
        return self;
    };

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
    };

    ModuleConstructor.prototype.onInit = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    };

    ModuleConstructor.prototype.init = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    };

    function generateModuleCode() {
        var self = this;
        var privates = makePrivatesObject.call(self);
        var publics = makePublicsObject.call(self);
        var initsialization = makeInitObject.call(self, true);
        var code = [];

        code.push("(function () {");

        if (privates.isUsed) {
            code.push("//privates\n" + privates.code);
        }
        if (publics.isUsed) {
            code.push("//publics\n" + publics.code);
        }
        if (initsialization.isUsed) {
            code.push("//initialization logic\n" + "var initializator = " + initsialization.code);
            code.push("//initialization calls\n" + initsialization.list.join("\n"));
        }
        if (publics.isUsed) {
            code.push("//retuned object\n" + publics.list.join("\n"));
        }

        code.push("} ());");

        return code.join("\n\n");
    }

    ModuleConstructor.prototype.finalize = function () {
        var self = this;
        var code = generateModuleCode.call(self);
        var result = eval(code);
        return result;
    };

    ModuleConstructor.prototype.extractCode = function () {
        return generateModuleCode.call(this);
    };

    ModuleConstructor.prototype.toString = ModuleConstructor.prototype.extractCode;

    ModuleConstructor.prototype.stringify = ModuleConstructor.prototype.extractCode;

    function ClassConstructor() {
        var self = this;
        "use strict";

        self._forbiddenNames = [];
        self._forbiddenPrivateNames = ["types", "validate", "initializator"];
        self._forbiddenValidationNames = [];
        self._forbiddenInitNames = [];
        self._forbiddenStaticNames = [];
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
        self._mnConstructorStatics = {};

        self._dgConstuctorSettings = {
            useStrict: true
        };
    }

    ClassConstructor.prototype.className = function (className) {
        var self = this;
        runSyntaxNameCheck(className);
        self._mnConstructorName = className;
        return self;
    };

    ClassConstructor.prototype.useStrict = function (useStrict) {
        var self = this;
        if (useStrict === undefined) {
            useStrict = true;
        }
        if (typeof useStrict !== "boolean") {
            throw new TypeError("Can not use " + typeof useStrict + " to set class setting 'useStrict'");
        }
        self._dgConstuctorSettings.useStrict = useStrict;
        return self;
    };

    ClassConstructor.prototype.childOf = function (parent) {
        var self = this;
        if (!(parent instanceof Function)) {
            throw new TypeError("The given parent is not a function.");
        }

        self._mnConstructorKnownTypes.Parent = parent;
        return self;
    };

    ClassConstructor.prototype.arg = function (argName, argValidation, defaultValue) {
        var self = this;
        if (!argValidation) {
            return self.arg(argName, "any", defaultValue);
        }

        runSyntaxNameCheck(argName);
        self.accepts(argName, defaultValue);
        self.prop(argName, argValidation, new Accept(argName));
        return self;
    };

    ClassConstructor.prototype.attr = function (attrName, attrValidation, defaultValue) {
        return this.arg(attrName, attrValidation, defaultValue);
    };

    ClassConstructor.prototype.accepts = function (acceptName, defaultValue) {
        var self = this;
        runSyntaxNameCheck(acceptName);
        if (self._mnConstructorAccepts[acceptName]) {
            throw new ReferenceError("Name " + acceptName + " is already being used.");
        }

        if (defaultValue === undefined) {
            return self.accepts(acceptName, new Required());
        }

        self._mnConstructorAccepts[acceptName] = defaultValue;
        return self;
    };

    ClassConstructor.prototype.accept = function (acceptName, defaultValue) {
        return this.accepts(acceptName, defaultValue);
    };

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
            if (self._mnConstructorKnownTypes[propValidation.name] === undefined) {
                self.knownType(propValidation);
            }
            self._mnConstructorValidators.type = builtInValidators.type;
        }

        self._mnConstructorAccessors[propName] = propValidation;

        self._forbiddenNames.push("_" + propName);
        self._forbiddenNames.push(propName);

        return self;
    };

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
    };

    ClassConstructor.prototype.onInit = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    };

    ClassConstructor.prototype.init = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    };

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
    };

    ClassConstructor.prototype.function = function (functionName, functionBody) {
        return this.accessor(functionName, functionBody);
    };

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
    };

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
            throw new TypeError("Unrecognised type. Use moduleNinja's .type() to wrap and name the type you want to be known in the program.");
        }
        return self;
    };

    ClassConstructor.prototype.private = function (privateName, privateValue) {
        var self = this;
        runSyntaxNameCheck(privateName);
        if (self._forbiddenPrivateNames.indexOf(privateName) !== -1) {
            throw new ReferenceError("Private name " + privateName + " is already being used, or is a reserved word.");
        }
        self._mnConstructorPrivates[privateName] = privateValue;
        self._forbiddenPrivateNames.push(privateName);
        return self;
    };

    ClassConstructor.prototype.const = function (constantName, constantValue) {
        return this.private(constantName, constantValue);
    };

    ClassConstructor.prototype.static = function (staticName, staticValue) {
        var self = this;
        runSyntaxNameCheck(staticName);
        if (self._forbiddenStaticNames.indexOf(staticName) !== -1) {
            throw new ReferenceError("Static name " + staticName + " is already being used, or is a reserved word.");
        }
        self._mnConstructorStatics[staticName] = staticValue;
        self._forbiddenPrivateNames.push(staticName);
        return self;
    };

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
    };

    function makeTypesObject() {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        code.push("{");
        for (var i in self._mnConstructorKnownTypes) {
            list.push(i);
            code.push("\t" + i + ": " + i + ",");
        }
        code[code.length - 1] = code[code.length - 1].substr(0, code[code.length - 1].length - 1); // removing the last comma
        code.push("}");

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

        code.push("{");
        for (var i in self._mnConstructorValidators) {
            list.push(i);
            code.push("\t" + i + ": " + self._mnConstructorValidators[i] + ",");
        }
        code[code.length - 1] = code[code.length - 1].substr(0, code[code.length - 1].length - 1); // removing the last comma
        code.push("}");

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

    function makeStaticsObject() {
        var self = this;
        var result = {};
        var list = [];
        var statics = [];
        for (var i in self._mnConstructorStatics) {
            list.push(i);
            if (typeof self._mnConstructorStatics[i] === "string") {
                statics.push("\t" + self._mnConstructorName + "['" + i + "'] = '" + self._mnConstructorStatics[i] + "';");
            }
            else if (self._mnConstructorStatics[i] instanceof Function) {
                statics.push("\t" + self._mnConstructorName + "['" + i + "'] = " + self._mnConstructorStatics[i] + ";");
            }
            else if (self._mnConstructorStatics[i] instanceof Object) {
                statics.push("\t" + self._mnConstructorName + "['" + i + "'] = " + JSON.stringify(self._mnConstructorStatics[i]) + ";");
            }
            else {
                statics.push("\t" + self._mnConstructorName + "['" + i + "'] = " + self._mnConstructorStatics[i] + ";");
            }
        }
        result.list = list;
        result.code = statics.join("\n");
        result.isUsed = list.length > 0;

        return result;
    }

    function makePublicsObject() {
        var self = this;
        var result = {};
        var list = [];
        var publics = [];

        list.push("\treturn {");
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

        code.push("{");
        for (var i in self._mnConstructorInitializators) {
            list.push("\t" + "initializator['" + i + "']" + (doNotCallSelf === true ? "()" : ".call(this)") + ";");
            code.push("\t" + i + " : " + self._mnConstructorInitializators[i] + ",");
        }
        code[code.length - 1] = code[code.length - 1].substr(0, code[code.length - 1].length - 1); // removing the last comma
        code.push("}");

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
            list.push("Parent");
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
        var validation = makeValidatorObject.call(self);
        var privates = makePrivatesObject.call(self);
        var init = makeInitObject.call(self);
        var accept = makeAcceptObject.call(self);
        var props = makePropObject.call(self);
        var parent = makeParentObject.call(self);
        var accessors = makeAccessorsObject.call(self);
        var extensions = makeExtensionsObject.call(self);
        var statics = makeStaticsObject.call(self);

        var result = [];

        if (extensions.isUsed) {
            result.push("(function(" + (types.isUsed ? types.list.join(", ") : "") + ") {");
        }

        result.push((extensions.isUsed ? "var " + self._mnConstructorName + " = " : "") +
            "(function(" + (types.isUsed ? types.list.join(", ") : "") + ") {");

        if (types.isUsed) {
            for (var i = 0; i < types.list.length; i++) {
                var typeName = types.list[i];
                result.push("if (" + typeName + " === undefined) { throw new ReferenceError('Known type \"" + typeName + "\" is undefined. \"" + self._mnConstructorName + "\" depends on that type.'); }");
            }
            result.push("//types\n" + "var types = " + types.code);
        }
        if (validation.isUsed) {
            result.push("//validation\n" + "var validate = " + validation.code);
        }
        if (privates.isUsed) {
            result.push("//privates\n" + privates.code);
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

        if (statics.isUsed) {
            result.push("//static members\n" + statics.code);
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

    ClassConstructor.prototype.finalize = function () {
        var self = this;
        var i;
        var Result;
        var _finalizedString = generateClassCode.call(self);
        for (i in self._mnConstructorKnownTypes) {
            var _nextVariavleString = "var " + i + " = self._mnConstructorKnownTypes." + i + ";";
            eval(_nextVariavleString);
        }
        Result = eval(_finalizedString);
        return Result;
    };

    ClassConstructor.prototype.extractCode = function () {
        return generateClassCode.call(this);
    };

    ClassConstructor.prototype.toString = ClassConstructor.prototype.extractCode;

    ClassConstructor.prototype.stringify = ClassConstructor.prototype.extractCode;

    function classCreator() {
        var newClass = new ClassConstructor();
        return newClass;
    }

    function moduleCreator(publicArguments) {
        var newModule = new ModuleConstructor();
        return newModule;
    }

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
            throw new Error("Something unexpected happened");
        }
        return result;
    }

    function addFunction(functionName, functionBody) {
        var self = basicModuleNinjaStructure;
        runSyntaxNameCheck(functionName);
        if (self[functionName] !== undefined) {
            throw new ReferenceError("Name " + functionName + " is already being used.");
        }
        if (!(functionBody instanceof Function)) {
            throw new TypeError("Function " + functionName + " is not a function.");
        }

        self[functionName] = functionBody;
    }

    function addClassFunction(functionName, functionBody) {
        var self = new ClassConstructor();
        runSyntaxNameCheck(functionName);
        if (self[functionName] !== undefined) {
            throw new ReferenceError("Name " + functionName + " is already being used.");
        }
        if (!(functionBody instanceof Function)) {
            throw new TypeError("Function " + functionName + " is not a function.");
        }

        ClassConstructor.prototype[functionName] = functionBody;
    }

    function addModuleFunction(functionName, functionBody) {
        var self = new ModuleConstructor();
        runSyntaxNameCheck(functionName);
        if (self[functionName] !== undefined) {
            throw new ReferenceError("Name " + functionName + " is already being used.");
        }
        if (!(functionBody instanceof Function)) {
            throw new TypeError("Function " + functionName + " is not a function.");
        }

        ModuleConstructor.prototype[functionName] = functionBody;
    }

    function addType(typeName, typeBody) {
        var self = builtInValidators;

        runSyntaxNameCheck(typeName);
        if (self[typeName] !== undefined) {
            throw new ReferenceError("Name " + typeName + " is already being used.");
        }
        if (!(typeBody instanceof Function)) {
            throw new TypeError("Function " + typeName + " is not a function.");
        }

        self[typeName] = typeBody;
    }

    addFunction.unsafe = function(functionName, functionBody){
        basicModuleNinjaStructure[functionName] = functionBody;
    };

    addClassFunction.unsafe = function(functionName, functionBody){
        ClassConstructor.prototype[functionName] = functionBody;
    };

    addModuleFunction.unsafe = function(functionName, functionBody){
        ModuleConstructor.prototype[functionName] = functionBody;
    };

    addType.unsafe = function(typeName, typeBody){
        builtInValidators[functionName] = functionBody;
    };

    var basicModuleNinjaStructure = {
        module: moduleCreator,
        class: classCreator,
        clone: cloneCreator,

        type: type,
        accept: accept,
        literal: accept,
        required: required,

        addFunction: addFunction,
        addClassFunction: addClassFunction,
        addModuleFunction: addModuleFunction,
        addType: addType
    };

    return basicModuleNinjaStructure;
}());