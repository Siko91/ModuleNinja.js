define(function(){
	return {
	"name" : " mn.class().accessor()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.accessor() function is used to add an accessor functions to the class." + "\n" +
	" The accessor functions are functions added to the class's prototype that can also access the class privates." + "\n" +
	"" + "\n" +
	" The function accepts (accessorName, accessorFunction)" + "\n" +
	"      accessorName will be the name of the accessor function." + "\n" +
	"      accessorFunction will be the function itself" + "\n" +
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
	"          <span class='js-word'>.</span><span class='ninja-word'>accessor</span><span class='js-word'>(</span>'resetSizes'<span class='js-word'>,</span> function <span class='js-word'>(</span><span class='js-word'>)</span> {" + "\n" +
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
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'getArea'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>accessor</span><span class='js-word'>(</span>'resetSizes'<span class='js-word'>,</span> function <span class='js-word'>(</span><span class='js-word'>)</span> {" + "\n" +
	"              <span class='js-word'>var</span> area<span class='js-word'> = </span><span class='js-word'>this</span><span class='js-word'>.</span>sizeA<span class='js-word'>(</span><span class='js-word'>)</span> * <span class='js-word'>this</span><span class='js-word'>.</span>sizeB<span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"              <span class='js-word'>return </span>area;" + "\n" +
	"          }<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // creates a class Circle with prop 'radius', a privateValue 'pi',</span>" + "\n" +
	"<span class='comment'>      // and a function called 'getArea' that returns the rect's area.</span>" + "\n" +
	"<span class='comment'>      // notice that the accessor function can access private values.</span>" + "\n" +
	"      <span class='js-word'>var</span> Circle<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"            <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Circle'<span class='js-word'>)</span>" + "\n" +
	"            <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'radius'<span class='js-word'>,</span> 'positiveNumber'<span class='js-word'>)</span>" + "\n" +
	"            <span class='js-word'>.</span><span class='ninja-word'>private</span><span class='js-word'>(</span>'pi'<span class='js-word'>,</span> Math<span class='js-word'>.</span>PI<span class='js-word'>)</span>" + "\n" +
	"            <span class='js-word'>.</span><span class='ninja-word'>accessor</span><span class='js-word'>(</span>'getArea'<span class='js-word'>,</span> function <span class='js-word'>(</span><span class='js-word'>)</span> {" + "\n" +
	"                <span class='js-word'>var</span> area<span class='js-word'> = </span>pi * <span class='js-word'>this</span><span class='js-word'>.</span>radius<span class='js-word'>(</span><span class='js-word'>)</span> * <span class='js-word'>this</span><span class='js-word'>.</span>radius<span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"                <span class='js-word'>return </span>area;" + "\n" +
	"            }<span class='js-word'>)</span>" + "\n" +
	"            <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;"
	};
});
