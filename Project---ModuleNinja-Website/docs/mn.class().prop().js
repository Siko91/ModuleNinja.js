define(function(){
	return {
	"name" : " mn.class().prop()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.prop() function is used to add an property to the class." + "\n" +
	"" + "\n" +
	" The function accepts (propName, propValidation, propInitialValue)" + "\n" +
	"      propName will be the name of the property." + "\n" +
	"      propValidation will be the type of validation that the property will use." + "\n" +
	"              If not defined, the property will use type 'any'." + "\n" +
	"      defaultValue will be the property's default value." + "\n" +
	"              If not defined, the property will have no default value." + "\n" +
	"" + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type 'any'</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Rectangle with props 'sizeA' and 'sizeB' of type 'positiveNumber'</span>" + "\n" +
	"<span class='comment'>      //       both with default value of 1.</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>,</span> 1<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>,</span> 1<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates an empty class Figure</span>" + "\n" +
	"<span class='comment'>      // creates a class FigureDuo with props 'figure1' and 'figure2' of type 'Figure'.</span>" + "\n" +
	"<span class='comment'>      // (once a type is used, it's added to the known types of the class. From there on,</span>" + "\n" +
	"<span class='comment'>      //       it's possible to reference it in a string, as shown.)</span>" + "\n" +
	"      <span class='js-word'>var</span> Figure<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"      <span class='js-word'>var</span> FigureDuo<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'FigureDuo'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'figure1'<span class='js-word'>,</span> mn<span class='js-word'>.</span><span class='ninja-word'>type</span><span class='js-word'>(</span>'Figure'<span class='js-word'>,</span> Figure<span class='js-word'>)</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'figure2'<span class='js-word'>,</span> 'type Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Circle with an arg 'area' of type 'positiveNumber', that is required</span>" + "\n" +
	"<span class='comment'>      // creates a class FigureSolo with prop 'figure' of type 'Figure'.</span>" + "\n" +
	"<span class='comment'>      // The prop will have a default value of a moduleNinja literal</span>" + "\n" +
	"<span class='comment'>      //       (which is the same as moduleNinja's Accept class).</span>" + "\n" +
	"      <span class='js-word'>var</span> Figure<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'area'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"      <span class='js-word'>var</span> FigureSolo<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'FigureSolo'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'figure'<span class='js-word'>,</span> mn<span class='js-word'>.</span><span class='ninja-word'>type</span><span class='js-word'>(</span>'Figure'<span class='js-word'>,</span> Figure<span class='js-word'>)</span><span class='js-word'>,</span> mn<span class='js-word'>.</span>literal<span class='js-word'>(</span>'<span class='js-word'>new </span>types<span class='js-word'>.</span>Figure<span class='js-word'>(</span>10<span class='js-word'>)</span>'<span class='js-word'>)</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a new class Square with a prop 'size' that has a custom validator function,</span>" + "\n" +
	"<span class='comment'>      // that accepts only numbers and rounds them to a base of 10</span>" + "\n" +
	"<span class='comment'>      // notice that in the validator function the property that is being referenced (_size)</span>" + "\n" +
	"<span class='comment'>      //       has an underscore at the begining. This is important.</span>" + "\n" +
	"<span class='comment'>      // the function is named 'size', but the property itself is named '_size'.</span>" + "\n" +
	"      <span class='js-word'>var</span> Square<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Square'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'size'<span class='js-word'>,</span> function<span class='js-word'>(</span>value<span class='js-word'>)</span>{" + "\n" +
	"              <span class='js-word'>if </span><span class='js-word'>(</span>value<span class='js-word'> === </span>undefined<span class='js-word'>)</span> {" + "\n" +
	"<span class='comment'>                  // property setter</span>" + "\n" +
	"                  <span class='js-word'>if </span><span class='js-word'>(</span>typeof value<span class='js-word'> === </span>'number'<span class='js-word'>)</span> {" + "\n" +
	"                      <span class='js-word'>var</span> leftTo10<span class='js-word'> = </span>value % 10;" + "\n" +
	"                      <span class='js-word'>if </span><span class='js-word'>(</span>leftTo10 >= 5<span class='js-word'>)</span> {" + "\n" +
	"                          value += <span class='js-word'>(</span>10-leftTo10<span class='js-word'>)</span>;" + "\n" +
	"                      }" + "\n" +
	"                      <span class='js-word'>else </span>{" + "\n" +
	"                          value -= leftTo10;" + "\n" +
	"                      }" + "\n" +
	"" + "\n" +
	"                      <span class='js-word'>this</span><span class='js-word'>.</span>_size<span class='js-word'> = </span>value; // set's the property" + "\n" +
	"                      <span class='js-word'>return </span><span class='js-word'>this</span>; // <span class='js-word'>return </span>self <span class='js-word'>for </span>chaining" + "\n" +
	"                  }" + "\n" +
	"                  <span class='js-word'>else </span>{" + "\n" +
	"                      <span class='js-word'>throw </span><span class='js-word'>new </span>TypeError<span class='js-word'>(</span>'size value must be a number'<span class='js-word'>)</span>" + "\n" +
	"                  }" + "\n" +
	"              }" + "\n" +
	"              <span class='js-word'>else </span>{" + "\n" +
	"<span class='comment'>                  // property getter</span>" + "\n" +
	"                  <span class='js-word'>return </span><span class='js-word'>this</span><span class='js-word'>.</span>_size;" + "\n" +
	"              }" + "\n" +
	"          }<span class='js-word'>)</span>" + "\n" +
	""
	};
});
