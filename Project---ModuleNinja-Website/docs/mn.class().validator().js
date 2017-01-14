define(function(){
	return {
	"name" : " mn.class().validator()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.validator() function is used to add a custom reusable validator to the class." + "\n" +
	" The new validatr will act as a type, in the same way that the basic validators do" + "\n" +
	" (same as : 'any', 'string', 'char', 'int' etc...)" + "\n" +
	"" + "\n" +
	" The function accepts (validatorName, validatorBody)" + "\n" +
	"      validatorName is the name of the validator" + "\n" +
	"      validatorBody is the validation function. It must accept 2 values - target and value." + "\n" +
	"              target is the name of the property that that uses the validator." + "\n" +
	"              value is the value that the validator should set to the targeted property." + "\n" +
	"                      If value is undefined, the validator should return the value of the targeted property." + "\n" +
	"" + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // creates a class Line with prop 'lineLength' (positiveNumber, default=0)</span>" + "\n" +
	"<span class='comment'>      // creates a class Lines with prop 'lines' with validation 'linesArray'</span>" + "\n" +
	"      <span class='js-word'>var</span> Line<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Line'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'lineLength'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>,</span> 0<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"      <span class='js-word'>var</span> Lines<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Lines'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>knownType</span><span class='js-word'>(</span>mn<span class='js-word'>.</span><span class='ninja-word'>type</span><span class='js-word'>(</span>'Line'<span class='js-word'>,</span> Line<span class='js-word'>)</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>validator</span><span class='js-word'>(</span>'linesArray'<span class='js-word'>,</span> function <span class='js-word'>(</span>target<span class='js-word'>,</span> value<span class='js-word'>)</span> {" + "\n" +
	"              <span class='js-word'>if </span><span class='js-word'>(</span>value<span class='js-word'> !== </span>undefined<span class='js-word'>)</span> {" + "\n" +
	"                  <span class='js-word'>if </span><span class='js-word'>(</span>value <span class='js-word'>instanceof </span>Array<span class='js-word'>)</span> {" + "\n" +
	"                      <span class='js-word'>for </span><span class='js-word'>(</span><span class='js-word'>var</span> i<span class='js-word'> = </span>0; i < value<span class='js-word'>.</span>length; i++<span class='js-word'>)</span> {" + "\n" +
	"                          <span class='js-word'>if </span><span class='js-word'>(</span>!<span class='js-word'>(</span>value[i] <span class='js-word'>instanceof </span>types<span class='js-word'>.</span>Line<span class='js-word'>)</span><span class='js-word'>)</span> {" + "\n" +
	"                              <span class='js-word'>throw </span><span class='js-word'>new </span>TypeError<span class='js-word'>(</span>'array contains value that is not a Line'<span class='js-word'>)</span>;" + "\n" +
	"                          }" + "\n" +
	"                      }" + "\n" +
	"                      <span class='js-word'>this</span>[target]<span class='js-word'> = </span>value;" + "\n" +
	"                  }" + "\n" +
	"                  <span class='js-word'>else </span>{" + "\n" +
	"                      <span class='js-word'>throw </span><span class='js-word'>new </span>TypeError<span class='js-word'>(</span>'value is not an array'<span class='js-word'>)</span>;" + "\n" +
	"                  }" + "\n" +
	"              }" + "\n" +
	"              <span class='js-word'>else </span>{" + "\n" +
	"                  <span class='js-word'>return </span><span class='js-word'>this</span>[target];" + "\n" +
	"              }" + "\n" +
	"          }<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'lines'<span class='js-word'>,</span> 'linesArray'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;"
	};
});
