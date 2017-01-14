define(function(){
	return {
	"name" : " mn.class().private()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.private() function is used to add a private value to the class." + "\n" +
	" The private value is like the 'private static' values in other languages." + "\n" +
	" It is shared between all the instances of the class, and can not be accessed from outside." + "\n" +
	"" + "\n" +
	" The function accepts (privateName, privateValue)" + "\n" +
	"      privateName is the name of the private variable" + "\n" +
	"      privateValue is the value of that variable. Any value is valid." + "\n" +
	"" + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // creates a class Circle with prop 'radius' and private 'pi'.</span>" + "\n" +
	"<span class='comment'>      // it also has a function that returns the area, using the private 'pi'.</span>" + "\n" +
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
