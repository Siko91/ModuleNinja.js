define(function(){
	return {
	"name" : " mn.validatorTypes",
	"text" : "" +
	"" + "\n" +
	" moduleNinja has a set of predefined type validators. Althrough there aren't such types," + "\n" +
	" the validators create an abstraction about their existance." + "\n" +
	"" + "\n" +
	" The types are:" + "\n" +
	"      'any' - any value is good, exept undefined. No exceptions raised." + "\n" +
	"      'string' - accepts only string values. Any other value will raice an exception." + "\n" +
	"      'char' - accepts only string values with an exact length of 1. Any other value" + "\n" +
	"                  will raice an exception." + "\n" +
	"      'nonEmptyString' - accepts only string values with length bigger than 0." + "\n" +
	"                  Any other value will raice an exception." + "\n" +
	"      'bool' - accepts only boolean values. Any other value will raice an exception." + "\n" +
	"      'number' - accepts only numeric values. Any other value will raice an exception." + "\n" +
	"      'int' - accepts only numeric values and converts them to a simple number (using Math.floor())." + "\n" +
	"                  Any other value will raice an exception." + "\n" +
	"      'positiveNumber' - accepts only positive numeric values (0 or greater)." + "\n" +
	"                  Any other value will raice an exception." + "\n" +
	"      'positiveInt' - accepts only positive numeric values (0 or greater) and converts them to a" + "\n" +
	"                  simple number (using Math.floor()). Any other value will raice an exception." + "\n" +
	"      'array' - accepts only arrays. Any other value will raice an exception." + "\n" +
	"      'object' - accepts only objects. Any other value will raice an exception." + "\n" +
	"      'type' - accepts only objects of the specifyed type. Any other value will raice an exception.",
	"example" : ""
	};
});
