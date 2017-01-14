define(function(){
	return {
	"name" : " mn.class().childOf()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.childOf() function is used to set the parent class" + "\n" +
	" of the mn.class() that is being constructed." + "\n" +
	"" + "\n" +
	" It only accepts a single function value - the parent class." + "\n" +
	" The created class's prototype will be set to a new instance of the parent class." + "\n" +
	"" + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"" + "\n" +
	" Warning! Not sequre! If the parent requires arguments on initializations," + "\n" +
	" and throws errors if they are undefined, then it will throw errors here too." + "\n" +
	"" + "\n" +
	" TODO: Make this more flexable;" + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // creates a class Figure.</span>" + "\n" +
	"<span class='comment'>      // creates a class Square and sets it's parent to Figure</span>" + "\n" +
	"      <span class='js-word'>var</span> Figure<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"      <span class='js-word'>var</span> Square<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Square'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>childOf</span><span class='js-word'>(</span>Figure<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;"
	};
});
