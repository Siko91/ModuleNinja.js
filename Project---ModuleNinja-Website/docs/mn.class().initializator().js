define(function(){
	return {
	"name" : " mn.class().initializator()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.initializator() function is used to add an initializator functions to the class." + "\n" +
	" The initializator functions are called only on a new object initialization" + "\n" +
	"" + "\n" +
	" The function accepts (initFuncName, initFuncBody)" + "\n" +
	"      initFuncName will be the name of the init function." + "\n" +
	"      initFuncBody will be the function that that should be called on initialization." + "\n" +
	"" + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // creates a class Rectangle with props 'sizeA' and 'sizeB' - both of type 'any',</span>" + "\n" +
	"<span class='comment'>      // and an initializator that sets sizeA to 10, and sizeB to 15.</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>initializator</span><span class='js-word'>(</span>'setSizes'<span class='js-word'>,</span> function <span class='js-word'>(</span><span class='js-word'>)</span> {" + "\n" +
	"              <span class='js-word'>this</span><span class='js-word'>.</span>sizeA<span class='js-word'>(</span>10<span class='js-word'>)</span>;" + "\n" +
	"              <span class='js-word'>this</span><span class='js-word'>.</span>sizeB<span class='js-word'>(</span>15<span class='js-word'>)</span>;" + "\n" +
	"          }<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;"
	};
});
