(function(){
	if (mn === undefined) {
		throw new ReferenceError("ModuleNinja is not defined. The Parse addon depends on moduleNinja.");
	}
	if (Parse === undefined) {
		throw new ReferenceError("Parse is not defined. The Parse addon depends on Parse.");
	}

	var codeForMakeMNObjectFromParseObject = ""

	ParseQuery = (function(){
		function ParseQuery() {
			this._skip = 0;
			this._limit = 100;
			this._conditions = [];
			this._order = {
				by: "id",
				ascending: true
			};
			this._className = "";
		}

		ParseQuery.prototype.addCondition = function (what, how, value){
			var self = this;
			if (typeof what !== "string") {
				throw new TypeError("The 'what' parameter of a query must be a string");
			}
			if (typeof how !== "string") {
				throw new TypeError("The 'how' parameter of a query must be a string");
			}
			self._conditions.push({
				what: what,
				how: how,
				value: value
			});
			return self;
		};

		ParseQuery.prototype.skip = function (count){
			if (typeof count === "number") {
				if (count < 0) {
					count = 0;
				}
				_skip = count;
			}
		};
		ParseQuery.prototype.limit = function (count){
			if (typeof count === "number") {
				if (count > 1000) {
					count = 1000;
				}
				_limit = count;
			}
		};
		ParseQuery.prototype.orderBy = function (propName, isAscending){
			if (typeof propName !== "string") {
				_order.by = propName;
			}
			if (typeof isAscending === "boolean") {
				_order.ascending = isAscending;
			}
		};
		ParseQuery.prototype.equalTo = function(what, value){
			return this.addCondition(what, "equalTo", value);
		};
		ParseQuery.prototype.notEqualTo = function(what, value){
			return this.addCondition(what, "notEqualTo", value);
		};
		ParseQuery.prototype.greaterThan = function(what, value){
			return this.addCondition(what, "greaterThan", value);
		};
		ParseQuery.prototype.lessThan = function(what, value){
			return this.addCondition(what, "lessThan", value);
		};
		ParseQuery.prototype.greaterThanOrEqualTo = function(what, value){
			return this.addCondition(what, "greaterThanOrEqualTo", value);
		};
		ParseQuery.prototype.lessThanOrEqualTo = function(what, value){
			return this.addCondition(what, "lessThanOrEqualTo", value);
		};
		ParseQuery.prototype.notContainedIn = function(what, value){
			return this.addCondition(what, "notContainedIn", value);
		};
		ParseQuery.prototype.exists = function(what){
			return this.addCondition(what, "exists");
		};
		ParseQuery.prototype.doesNotExist = function(what){
			return this.addCondition(what, "doesNotExist");
		};
		ParseQuery.prototype.containsAll = function(what, values){
			return this.addCondition(what, "containsAll", values);
		};
		ParseQuery.prototype.startsWith = function(what, value){
			return this.addCondition(what, "startsWith", value);
		};

		ParseQuery.prototype.parseConditions = function parseConditions (query){
			if (query === undefined) {
				throw new ReferenceError("query is null");
			}
			for (var i = 0; i < this._conditions.length; i++) {
				if (this._conditions[i].value !== undefined) {
					// EXAMPLE: query.greaterThan("valueName", 1.5);
					query[this._conditions[i].how](this._conditions[i].what, this._conditions[i].value);
				}
				else {
					// EXAMPLE: query.exists("valueName");
					query[this._conditions[i].how](this._conditions[i].what);
				}
			}

			query.skip(this._skip);
			if (this._limit){
				query.limit(this._limit);
			}

			if (this._order.ascending){
				query.ascending(this._order.by);
			}
			else{
				query.descending(this._order.by);
			}
		};

		ParseQuery.prototype.finalize = function(){
			var self = this;
			var Constructor = Parse.Object.extend(self._className);
			var query = new Parse.Query(Constructor);
			self.parseConditions(query);
			return query.find().then(function(results, a, b, c, d){
				var mnObjects = [];
				for (var i in results) {
					mnObjects.push(self.MakeMNObjectFromParseObject(results[i]));
				}
				return mnObjects;
			});
		};
		ParseQuery.prototype.find = ParseQuery.prototype.finalize;

		return ParseQuery;
	}());

	function validate(){
		var self = this;
		if (self._mnConstructorProps.id !== undefined) {
			throw new ReferenceError("The property name 'id' must be free. The parse obect will use that name.");
		}
		if (self._mnConstructorAccessors.parseSave !== undefined) {
			throw new ReferenceError("The property name 'parseSave' must be free. The parse obect will use that name.");
		}
		if (self._mnConstructorProps.parseDelete !== undefined) {
			throw new ReferenceError("The property name 'parseDelete' must be free. The parse obect will use that name.");
		}
		if (self._mnConstructorStatics.parseQuery !== undefined) {
			throw new ReferenceError("The static name 'parseQuery' must be free. The parse obect will use that name.");
		}
		if (self._mnConstructorKnownTypes.ParseQuery !== undefined) {
			throw new ReferenceError("The knownType name 'ParseQuery' must be free. The parse obect will use that name.");
		}
		if (self._mnConstructorPrivates.MakeMNObjectFromParseObject !== undefined) {
			throw new ReferenceError("The private name 'MakeMNObjectFromParseObject' must be free. The parse obect will use that name.");
		}

		try {
			var Constr = self.finalize();
			var obj = new Constr();
		}
		catch(err) {
			throw new Error(
				"The class must have an empty constructor\n" +
				"(an exception was thrown when attempting to create a test object)\n" +
				"Exception thrown:\n" +
				err);
		}
	}

	mn.addClassFunction("toParseClass", function(key){
		var self = this;

		validate.call(self);

		self.prop("id");
		self.knownType(mn.type("ParseQuery", ParseQuery));

		writeConvertionLogic.call(self);

		addSaveLogic.call(self);
		addQueryLogic.call(self);
		addDeleteLogic.call(self);

		return self;
	});


	function writeConvertionLogic()
	{
		var self = this;
		codeForMakeMNObjectFromParseObject = "" +
"			function MakeMNObjectFromParseObject(parseObject) {" + "\n" +
"				var obj = new " + self._mnConstructorName + " ();" + "\n" +
"				if (parseObject.attributes == undefined) {" + "\n" +
"					return;" + "\n" +
"				}" + "\n" +
"				for (var i in obj) {" + "\n" +
"					if (typeof i === 'string' && i[0] === '_' && i !== '_id') {" + "\n" +
"						var propName = i.substring(1);" + "\n" +
"						obj[propName](parseObject.get(propName));" + "\n" +
"					}" + "\n" +
"				}" + "\n" +
"				obj.id(parseObject.id);" + "\n" +
"				return obj;" + "\n" +
"			}";
	}

	function addSaveLogic(){
		var self = this;
		var parseSaveCode = [];

		var parsing = eval("(function() { return" + codeForMakeMNObjectFromParseObject + "}());");
		self.private("MakeMNObjectFromParseObject", parsing);

		parseSaveCode.push("(function(){");
		parseSaveCode.push("return function(){");
			parseSaveCode.push("var self = this;");
			parseSaveCode.push("var Constructor = Parse.Object.extend('" + self._mnConstructorName + "');");
			parseSaveCode.push("var parseObj = new Constructor();");

			parseSaveCode.push("var obj = new " + self._mnConstructorName + "();");
			parseSaveCode.push("for (var i in obj) {");
				parseSaveCode.push("if (typeof i === 'string' && i[0] === '_') {");
					parseSaveCode.push("var propName = i.substring(1);");
					parseSaveCode.push("parseObj.set(propName, self[propName]());");
				parseSaveCode.push("}");
			parseSaveCode.push("}");
		parseSaveCode.push("return parseObj.save().then(function(result){ return MakeMNObjectFromParseObject(result); });");
		parseSaveCode.push("};");
		parseSaveCode.push("}());");

		var parseSave = eval(parseSaveCode.join("\n"));
		self.function("parseSave", parseSave);
	}

	function addQueryLogic(){
		var self = this;

		var code = [];
		code.push("(function(){");
		code.push("return function () {");
			code.push("var query = new ParseQuery();");
			code.push("query._className = '" + self._mnConstructorName + "';");
			code.push("query.MakeMNObjectFromParseObject = " + codeForMakeMNObjectFromParseObject + ";");
			code.push("return query;");
		code.push("}\n}())");

		self.static("parseQuery", eval(code.join("\n")));
	}

	function addDeleteLogic(){
		var self = this;
		var parseDeleteCode = [];

		parseDeleteCode.push("(function(){");
		parseDeleteCode.push("return function(success, error){");
		parseDeleteCode.push("var self = this;");
		parseDeleteCode.push("var Constructor = Parse.Object.extend('" + self._mnConstructorName + "');");
		parseDeleteCode.push("var obj = new Constructor();");
		parseDeleteCode.push("obj.set('id', self.id());"); // or obj.id = self.id();
		parseDeleteCode.push("return obj.destroy({ success: success, error: error });");
		parseDeleteCode.push("};");
		parseDeleteCode.push("}());");

		var parseDelete = eval(parseDeleteCode.join("\n"));
		self.function("parseDelete", parseDelete);
	}
}());