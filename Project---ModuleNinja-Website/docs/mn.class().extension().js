define(function(){
	return {
	"name" : " mn.class().extension()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.extension() function is used to add an extension functions to the class." + "\n" +
	" The extension functions are functions added to the class's prototype that can NOT access the class privates." + "\n" +
	"" + "\n" +
	" The function accepts (functionName, functionBody)" + "\n" +
	"      functionName will be the name of the accessor function." + "\n" +
	"      functionBody will be the function itself" + "\n" +
	"" + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type 'positiveNumber',</span>" + "\n" +
	"<span class='comment'>      // and a function called 'resetSizes' that sets sizeA and sizeB to 1.</span>" + "\n" +
	"<span class='comment'>      // the function will return the object itself, for chaining.</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>extension</span><span class='js-word'>(</span>'resetSizes'<span class='js-word'>,</span> function <span class='js-word'>(</span><span class='js-word'>)</span> {" + "\n" +
	"              <span class='js-word'>this</span><span class='js-word'>.</span>sizeA<span class='js-word'>(</span>1<span class='js-word'>)</span>;" + "\n" +
	"              <span class='js-word'>this</span><span class='js-word'>.</span>sizeB<span class='js-word'>(</span>1<span class='js-word'>)</span>;" + "\n" +
	"              <span class='js-word'>return </span><span class='js-word'>this</span>;" + "\n" +
	"          }<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type 'positiveNumber',</span>" + "\n" +
	"<span class='comment'>      // and a function called 'getArea' that returns the rect's area.</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>extension</span><span class='js-word'>(</span>'resetSizes'<span class='js-word'>,</span> function <span class='js-word'>(</span><span class='js-word'>)</span> {" + "\n" +
	"              <span class='js-word'>var</span> area<span class='js-word'> = </span><span class='js-word'>this</span><span class='js-word'>.</span>sizeA<span class='js-word'>(</span><span class='js-word'>)</span> * <span class='js-word'>this</span><span class='js-word'>.</span>sizeB<span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"              <span class='js-word'>return </span>area;" + "\n" +
	"          }<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;"
	};
});
