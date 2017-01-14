define(function(){
	return {
	"name" : " mn.class().arg()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.arg() function is used to add" + "\n" +
	" both a property and an accept to the class." + "\n" +
	"" + "\n" +
	" The function accepts (argName, argValidation, defaultValue)" + "\n" +
	"      argName will be both the name of the property and the accept." + "\n" +
	"      argValidation will be the property's validation type." + "\n" +
	"      defaultValue will be the accept's default value" + "\n" +
	"          (while the prop's default value will be 'new Accept(argName)')" + "\n" +
	"" + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // creates a class Rectangle with arguments 'sizeA' and 'sizeB'</span>" + "\n" +
	"<span class='comment'>      //       both of type 'any'</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>,</span> 'sizeB'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Rectangle with arguments 'sizeA' and 'sizeB'</span>" + "\n" +
	"<span class='comment'>      //       both of type 'positiveNumber'</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span>{" + "\n" +
	"          'sizeA': 'positiveNumber'<span class='js-word'>,</span>" + "\n" +
	"          'sizeB': 'positiveNumber'" + "\n" +
	"          }<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Rectangle with arguments 'sizeA' and 'sizeB'</span>" + "\n" +
	"<span class='comment'>      //       both of type 'any'</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Rectangle with arguments 'sizeA' and 'sizeB'</span>" + "\n" +
	"<span class='comment'>      //       both of type 'positiveNumber'</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Rectangle with arguments 'sizeA' and 'sizeB'</span>" + "\n" +
	"<span class='comment'>      //       both of type 'any'.</span>" + "\n" +
	"<span class='comment'>      // If their accepts are not defined, the accept's value will be set to 1.</span>" + "\n" +
	"      <span class='js-word'>var</span> Rectangle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'sizeA'<span class='js-word'>,</span> 'any'<span class='js-word'>,</span> 1<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'sizeB'<span class='js-word'>,</span> 'any'<span class='js-word'>,</span> 1<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Rectangle'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;"
	};
});
