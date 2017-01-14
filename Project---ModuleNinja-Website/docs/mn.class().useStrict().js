define(function(){
	return {
	"name" : " mn.class().useStrict()",
	"text" : "" +
	"" + "\n" +
	" The ClassConstructor.useStrict() function is used" + "\n" +
	" to set the useStrict setting of the class." + "\n" +
	"" + "\n" +
	" It only accepts boolean values." + "\n" +
	" It's default value is 'true'." + "\n" +
	"" + "\n" +
	" If it's value is true during a finalization, an <'use strict';> command will be added to the class's code." + "\n" +
	" This function returns the ClassConstructor instance (for chaining)." + "\n" +
	"",
	"example" : "" +
	"<span class='comment'>      // sets the useStrict setting of a new class 'Figure' to 'false' and finalizes it.</span>" + "\n" +
	"      <span class='js-word'>var</span> Figure<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Figure'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>useStrict</span><span class='js-word'>(</span>false<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;"
	};
});
