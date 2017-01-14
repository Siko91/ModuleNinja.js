define(function(){
	return {
	"name" : " mn.class().accepts()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.accepts() function is used to add an accept to the class." + "\n" +
	"" + "\n" +
	" The function accepts (acceptName, defaultValue)" + "\n" +
	"      acceptName will be the name of the accept." + "\n" +
	"      defaultValue will be the accept's default value. If not defined," + "\n" +
	"          the class will treat the accept as a required and will throw errors if it is not defined." + "\n" +
	"" + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // creates a class Rectangle with accepts 'sizeA' and 'sizeB' - both required</span>" + "\n" +
	"<span class='comment'>      // in this form the accepts are useless, but combined with an Accept object as</span>" + "\n" +
	"<span class='comment'>      // a property's default value, they can be pretty neat.</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>accept</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>accept</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Rectangle with accepts 'sizeA' and 'sizeB'</span>" + "\n" +
	"<span class='comment'>      //       both with default value of 1.</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>accept</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>,</span> 1<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>accept</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>,</span> 1<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Circle with a single accept 'diameter' which</span>" + "\n" +
	"<span class='comment'>      // is used by the 'radius' property via an Accept class.</span>" + "\n" +
	"<span class='comment'>      // the Accept class's value will be treated as a JavaScript code.</span>" + "\n" +
	"      <span class='js-word'>var</span> Circle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Circle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>accept</span><span class='js-word'>(</span>'diameter'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'radius'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>,</span> mn<span class='js-word'>.</span><span class='ninja-word'>accept</span><span class='js-word'>(</span>'diameter/2'<span class='js-word'>)</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;"
	};
});
