var mn = moduleNinja = (function dg() {
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
        self._dgConstructorPrivates = {};
        self._dgConstructorPublics = {};
    }

    ModuleConstructor.prototype.public = function (publicName, publicValue) {
        var self = this;
        runSyntaxNameCheck(publicName);
        if (publicValue === undefined) {
            return self.public(publicName, "");
        }
        self._dgConstructorPublics[publicName] = publicValue;
        return self;
    }
    ModuleConstructor.prototype.private = function (privateName, privateValue) {
        var self = this;
        runSyntaxNameCheck(privateName);
        if (privateName === undefined) {
            return self.public(publicName, "");
        }
        self._dgConstructorPrivates[privateName] = privateValue;
        return self;
    }

    ModuleConstructor.prototype.finalize = function () {
        var self = this;
        var stringToEval = "";
        var publics = [];
        var privates = [];
        var returns = [];
        var i;

        for (i in self._dgConstructorPublics) {
            if (typeof self._dgConstructorPublics[i] === "string") {
                publics.push("var " + i + " = '" + self._dgConstructorPublics[i] + "'");
            }
            else if (self._dgConstructorPublics[i] instanceof Function) {
                publics.push("var " + i + " = " + self._dgConstructorPublics[i]);
            }
            else {
                publics.push("var " + i + " = self._dgConstructorPublics['" + i + "'];");
            }
            returns.push(i + " : " + i);
        }
        for (i in self._dgConstructorPrivates) {
            if (typeof self._dgConstructorPrivates[i] === "string") {
                privates.push("var " + i + " = '" + self._dgConstructorPrivates[i] + "'");
            }
            else if (self._dgConstructorPrivates[i] instanceof Function) {
                privates.push("var " + i + " = " + self._dgConstructorPrivates[i]);
            }
            else {
                privates.push("var " + i + " = self._dgConstructorPrivates['" + i + "'];");
            }
        }

        stringToEval = "(function () {\n" +
        privates.join("\n") +
        "\n\n" +
        publics.join("\n") +
        "\n\n" +
        "return {\n" + returns.join(",\n") + "\n};\n" +
        "} ());";

        var result = eval(stringToEval);
        return result;
    }

    function ClassConstructor() {
        var self = this;
        "use strict";

        self._forbiddenNames = [];
        self._forbiddenPrivateNames = [];
        self._forbiddenValidationNames = [];
        self._forbiddenInitNames = [];
        self._forbiddenTypeNames = ["Parent"];
        for (var i in builtInValidators) {
            self._forbiddenValidationNames.push(i);
        }

        self._dgConstructorName = "UnnamedClass";
        self._dgConstructorAccepts = {};
        self._dgConstructorProps = {};
        self._dgConstructorKnownTypes = {};
        self._dgConstructorInitializators = {};
        self._dgConstructorAccessors = {};
        self._dgConstructorValidators = {};
        self._dgConstructorExtensions = {};
        self._dgConstructorConstants = {};
        self._dgConstructorPrivates = {};
    }

    ClassConstructor.prototype.className = function (className) {
        var self = this;
        runSyntaxNameCheck(className);
        self._dgConstructorName = className;
        return self;
    }

    ClassConstructor.prototype.childOf = function (parent) {
        var self = this;
        if (!(parent instanceof Function)) {
            throw new TypeError("The given parent is not a function.");
        }

        self._dgConstructorKnownTypes.Parent = parent;
        return self;
    }

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
    ClassConstructor.prototype.attr = function (attrName, attrValidation, defaultValue) {
        return this.arg(attrName, attrValidation, defaultValue);
    }

    ClassConstructor.prototype.accepts = function (acceptName, defaultValue) {
        var self = this;
        runSyntaxNameCheck(acceptName);
        if (self._dgConstructorAccepts[acceptName]) {
            throw new ReferenceError("Name " + acceptName + " is already being used.")
        }

        if (defaultValue === undefined) {
            return self.accepts(acceptName, new Required())
        }

        self._dgConstructorAccepts[acceptName] = defaultValue;
        return self;
    }

    ClassConstructor.prototype.prop = function (propName, propValidation, propInitialValue) {
        var self = this;

        if (propValidation === undefined) {
            return self.prop(propName, "any", propInitialValue);
        }

        runSyntaxNameCheck(propName);

        if (self._forbiddenNames.indexOf(propName) !== -1) {
            throw new ReferenceError("Name " + propName + " is already being used.");
        }
        self._dgConstructorProps[propName] = propInitialValue;
        if (typeof propValidation === "string") {
            if (propValidation.substr(0, 4) === "type") {
                propValidationSplit = propValidation.split(" ");
                if (propValidationSplit.length !== 2) {
                    throw new SyntaxError("invalid type validation command string: " + propValidation);
                }
                if (self._dgConstructorKnownTypes[propValidationSplit[1]]) {
                    return self.prop(
                        propName,
                        new Type(propValidationSplit[1], self._dgConstructorKnownTypes[propValidationSplit[1]]),
                        propInitialValue);
                }
                else {
                    throw new ReferenceError("invalid type validation command string: " + propValidation);
                }
            }
            else if (builtInValidators[propValidation]) {
                self._dgConstructorValidators[propValidation] = builtInValidators[propValidation];
            }
        }
        else if (propValidation instanceof Type) {
            if (!(self._dgConstructorKnownTypes[propValidation.name] !== undefined)) {
                self.knownType(propValidation);
            }
            self._dgConstructorValidators.type = builtInValidators.type;
        }

        self._dgConstructorAccessors[propName] = propValidation;

        self._forbiddenNames.push("_" + propName);
        self._forbiddenNames.push(propName);

        return self;
    }
    ClassConstructor.prototype.initializator = function (initFuncName, initFuncBody) {
        var self = this;
        runSyntaxNameCheck(initFuncName);
        if (self._forbiddenInitNames.indexOf(initFuncName) !== -1) {
            throw new ReferenceError("Initializator name " + initFuncName + " is already being used.");
        }
        if (!(initFuncBody instanceof Function)) {
            throw new TypeError("Initializator " + initFuncName + " is not a function.");
        }
        self._dgConstructorInitializators[initFuncName] = initFuncBody;
        self._forbiddenInitNames.push(initFuncName);
        return self;
    }
    ClassConstructor.prototype.onInit = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    }
    ClassConstructor.prototype.init = function (initFuncName, initFuncBody) {
        return this.initializator(initFuncName, initFuncBody);
    }

    ClassConstructor.prototype.accessor = function (accessorName, accessorFunction) {
        var self = this;
        runSyntaxNameCheck(accessorName);
        if (self._forbiddenNames.indexOf(accessorName) !== -1) {
            throw new ReferenceError("Accessor name " + accessorName + " is already being used.");
        }
        if (!(accessorFunction instanceof Function)) {
            throw new TypeError("Accessor " + accessorName + " is not a function.");
        }
        self._dgConstructorAccessors[accessorName] = accessorFunction;
        self._forbiddenNames.push(accessorName);
        return self;
    }

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
        self._dgConstructorExtensions[functionName] = functionBody;
        self._forbiddenNames.push(functionName);
        return self;
    }

    ClassConstructor.prototype.knownType = function (type) {
        var self = this;
        if (type instanceof Type) {
            if (self._forbiddenTypeNames.indexOf(type.name) !== -1) {
                throw new ReferenceError("Type name " + type.name + " is already being used");
            }
            self._dgConstructorKnownTypes[type.name] = type.type;
            self._forbiddenTypeNames.push(type.name);
        }
        else {
            throw new TypeError("Unrecognised type. Use moduleNinja's .type() to wrap and name the type you want to be known in the program.")
        }
        return self;
    }

    ClassConstructor.prototype.const = function (constantName, constantValue) {
        var self = this;
        return self.private(constantName, constantValue);
    }

    ClassConstructor.prototype.private = function (privateName, privateValue) {
        var self = this;
        runSyntaxNameCheck(privateName);
        if (self._forbiddenPrivateNames.indexOf(privateName) !== -1) {
            throw new ReferenceError("Private name " + privateName + " is already being used.");
        }
        self._dgConstructorPrivates[privateName] = privateValue;
        self._forbiddenPrivateNames.push(privateName);
        return self;
    }

    ClassConstructor.prototype.validator = function (validatorName, validatorBody) {
        var self = this;
        runSyntaxNameCheck(validatorName);
        if (self._forbiddenValidationNames.indexOf(validatorName) !== -1) {
            throw new ReferenceError("Validator name '" + validatorName + "' is already being used.");
        }
        if (!(validatorBody instanceof Function)) {
            throw new TypeError("Validator " + validatorName + " is not a function");
        }
        self._dgConstructorValidators[validatorName] = validatorBody;
        self._forbiddenValidationNames.push(validatorName);
        return self;
    }

    function makeTypesObject() {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        code.push("{")
        for (var i in self._dgConstructorKnownTypes) {
            list.push(i);
            code.push(i + ": " + i + ",")
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
        for (var i in self._dgConstructorValidators) {
            list.push(i);
            code.push(i + ": " + self._dgConstructorValidators[i] + ",")
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
        for (var i in self._dgConstructorPrivates) {
            list.push(i);
            if (typeof self._dgConstructorPrivates[i] === "string") {
                privates.push("var " + i + " = '" + self._dgConstructorPrivates[i] + "';");
            }
            else if (self._dgConstructorPrivates[i] instanceof Function) {
                privates.push("var " + i + " = " + self._dgConstructorPrivates[i] + ";");
            }
            else if (self._dgConstructorPrivates[i] instanceof Object) {
                privates.push("var " + i + " = " + JSON.stringify(self._dgConstructorPrivates[i]) + ";");
            }
            else {
                privates.push("var " + i + " = " + self._dgConstructorPrivates[i] + ";");
            }
        }
        result.list = list;
        result.code = privates.join("\n");
        result.isUsed = list.length > 0;

        return result;
    }

    function makeInitObject() {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        code.push("{")
        for (var i in self._dgConstructorInitializators) {
            list.push("initializator['" + i + "'].call(this);")
            code.push(i + " : " + self._dgConstructorInitializators[i] + ",");
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

        for (var i in self._dgConstructorAccepts) {
            list.push(i);
            if (self._dgConstructorAccepts[i] instanceof Required) {
                code.push("if(" + i + " === undefined){\nthrow new ReferenceError('" + i + " is not defined on object initialization');\n}");
            }
            else if (self._dgConstructorAccepts[i] instanceof Accept) {
                code.push("if(" + i + " === undefined){\n" + i + " = " + self._dgConstructorAccepts[i].value + ";\n}");
            }
            else if (typeof self._dgConstructorAccepts[i] === "string") {
                code.push("if(" + i + " === undefined){\n" + i + " = '" + self._dgConstructorAccepts[i] + "';\n}");
            }
            else {
                code.push("if(" + i + " === undefined){\n" + i + " = " + JSON.stringify(self._dgConstructorAccepts[i]) + ";\n}");
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

        for (var i in self._dgConstructorProps) {
            list.push(i);
            codeDefine.push("this._" + i + " = undefined;");
            if (typeof self._dgConstructorProps[i] === "string") {
                codeInit.push("this." + i + "('" + self._dgConstructorProps[i] + "')");
            }
            else if (self._dgConstructorProps[i] instanceof Accept) {
                codeInit.push("this." + i + "(" + self._dgConstructorProps[i].value + ")");
            }
            else if (self._dgConstructorProps[i] instanceof Function) {
                codeInit.push("this." + i + "(" + self._dgConstructorProps[i] + ")");
            }
            else if (self._dgConstructorProps[i] !== undefined) {
                codeInit.push("this." + i + "(" + JSON.stringify(self._dgConstructorProps[i]) + ")");
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

        if (self._dgConstructorKnownTypes.Parent !== undefined) {
            list.push("Parent")
        }

        result.list = list;
        result.code = self._dgConstructorName + ".prototype = new types.Parent();";
        result.isUsed = list.length > 0;

        return result;
    }

    function makeAccessorsObject() {
        var self = this;
        var result = {};
        var list = [];
        var code = [];

        for (var i in self._dgConstructorAccessors) {
            list.push(i);
            if (typeof self._dgConstructorAccessors[i] === "string") {
                accessorsString = self._dgConstructorName + ".prototype." + i + " = function " + i + "(value) {\n"
                    + "return validate." + self._dgConstructorAccessors[i] + ".call(this, \"_" + i + "\", value);\n"
                    + "}";
                code.push(accessorsString);
            }
            else if (self._dgConstructorAccessors[i] instanceof Type) {
                accessorsString = self._dgConstructorName + ".prototype." + i + " = function " + i + "(value) {\n"
                    + "return validate.type.call(this, \"_" + i + "\", value, types." + self._dgConstructorAccessors[i].name + ");\n"
                    + "}";
                code.push(accessorsString);
            }
            else {
                code.push(self._dgConstructorName + ".prototype." + i + " = " + self._dgConstructorAccessors[i]);
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

        for (var i in self._dgConstructorExtensions) {
            list.push(i);
            code.push(self._dgConstructorName + ".prototype." + i + " = " + self._dgConstructorExtensions[i]);
        }

        result.list = list;
        result.code = code.join("\n");
        result.isUsed = list.length > 0;

        return result;
    }

    function makeFuncString() {
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

        result.push((extensions.isUsed ? "var " + self._dgConstructorName + " = " : "") +
            "(function(" + (types.isUsed ? types.list.join(", ") : "") + ") {");

        if (types.isUsed) {
            result.push("//types\n" + "var types = " + types.code);
        }
        if (validation.isUsed) {
            result.push("//validators\n" + "var validate = " + validation.code);
        }
        if (privates.isUsed) {
            result.push("//private variables\n" + privates.code);
        }
        if (init.isUsed) {
            result.push("//call on class initialization\n" + "var initializator = " + init.code);
        }

        result.push("//the class\n" + "function " + self._dgConstructorName + "(" + (accept.isUsed ? accept.list.join(", ") : "") + ") {");

        if (accept.isUsed) {
            result.push("//accept checks\n" + accept.code);
        }
        if (props.isUsed) {
            result.push("//props\n" + props.code);
        }
        if (init.isUsed) {
            result.push("//do on initialization\n" + init.list.join("\n"));
        }

        result.push("}");

        if (parent.isUsed) {
            result.push("//inheratnece\n" + parent.code);
        }
        if (accessors.isUsed) {
            result.push("//accessor/inner functions\n" + accessors.code);
        }

        result.push("return " + self._dgConstructorName + ";");
        result.push("}(" + (types.isUsed ? types.list.join(", ") : "") + "));");

        if (extensions.isUsed) {
            result.push("//extending functions\n" + extensions.code);
            result.push("return " + self._dgConstructorName + ";");
            result.push("}(" + (types.isUsed ? types.list.join(", ") : "") + "));");
        }

        return result.join("\n\n");
    }

    ClassConstructor.prototype.finalize = function () {
        var self = this;
        var i;
        var Result
        var _finalizedString = makeFuncString.call(self);
        for (i in self._dgConstructorKnownTypes) {
            var _nextVariavleString = "var " + i + " = self._dgConstructorKnownTypes." + i + ";"
            eval(_nextVariavleString);
        }
        Result = eval(_finalizedString);
        return Result;
    }

    ClassConstructor.prototype.extractCode = function () {
        return makeFuncString.call(this);
    }

    ClassConstructor.prototype.toString = ClassConstructor.prototype.extractCode;
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

    function classCreator(publicArguments) {
        var newClass = new ClassConstructor();
        forAllPublicArguments.call(classCreator, publicArguments, newClass.arg, newClass);
        return newClass;
    }

    function moduleCreator(publicArguments) {
        var newModule = new ModuleConstructor();
        forAllPublicArguments.call(moduleCreator, publicArguments, newModule.public, newModule);
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