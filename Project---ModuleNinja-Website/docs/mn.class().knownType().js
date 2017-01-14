define(function(){
	return {
	"name" : " mn.class().knownType()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.knownType() function is used to add an Type (aka Class) definition to the class." + "\n" +
	" The knownTypes are functions that the class uses for validation, or for other purposes" + "\n" +
	" The function accepts a single instance of the moduleNinja Type class." + "\n" +
	"" + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // creates an empty class Figure.</span>" + "\n" +
	"<span class='comment'>      // creates a class FigureDuo with props 'figure1' and 'figure2' - both of type Figure.</span>" + "\n" +
	"      <span class='js-word'>var</span> Figure<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"      <span class='js-word'>var</span> FigureDuo<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'FigureDuo'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>knownType</span><span class='js-word'>(</span>mn<span class='js-word'>.</span><span class='ninja-word'>type</span><span class='js-word'>(</span>'Figure'<span class='js-word'>,</span> Figure<span class='js-word'>)</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'figure1'<span class='js-word'>,</span> 'type Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'figure2'<span class='js-word'>,</span> 'type Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates an empty class Figure.</span>" + "\n" +
	"<span class='comment'>      // creates a class FigureDuo with props 'figure1' and 'figure2' - both of type Figure</span>" + "\n" +
	"<span class='comment'>      // and an initializator function that sets both of the props to a new instance of the Figure class.</span>" + "\n" +
	"<span class='comment'>      // notice that the 'types' object is referenced. It is a private object that stores all the known types.</span>" + "\n" +
	"      <span class='js-word'>var</span> Figure<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"      <span class='js-word'>var</span> FigureDuo<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'FigureDuo'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>knownType</span><span class='js-word'>(</span>mn<span class='js-word'>.</span><span class='ninja-word'>type</span><span class='js-word'>(</span>'Figure'<span class='js-word'>,</span> Figure<span class='js-word'>)</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'figure1'<span class='js-word'>,</span> 'type Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'figure2'<span class='js-word'>,</span> 'type Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>init</span><span class='js-word'>(</span>'setFigures'<span class='js-word'>,</span> function <span class='js-word'>(</span><span class='js-word'>)</span> {" + "\n" +
	"<span class='comment'>              // the chaining makes it possible to write code like that</span>" + "\n" +
	"              <span class='js-word'>return </span><span class='js-word'>this</span><span class='js-word'>.</span>figure1<span class='js-word'>(</span><span class='js-word'>new </span>types<span class='js-word'>.</span>Figure<span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>)</span><span class='js-word'>.</span>figure2<span class='js-word'>(</span><span class='js-word'>new </span>types<span class='js-word'>.</span>Figure<span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>)</span>;" + "\n" +
	"          }<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;"
	};
});
