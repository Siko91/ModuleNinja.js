define(function(){
	return {
	"name" : " moduleNinja",
	"text" : "" +
	"" + "\n" +
	" `moduleNinja` (also aliased as 'mn') is a JavaScript framework that makes the" + "\n" +
	" creation of dynamic classes in JavaScript possible and easy. A 'dynamic class'" + "\n" +
	" is a dynamicli generated and runned JS code that returns a function witch can" + "\n" +
	" be used as a class (simularly to other languages). This means that the 'class'" + "\n" +
	" will be put together in the runtime of the application, and not on it initialization." + "\n" +
	"" + "\n" +
	" Another moduleNinja feature of moduleNinja is getting the code of the created" + "\n" +
	" module (the class) as a string. It can be used as a development tool (since" + "\n" +
	" moduleNinja provides code with good quality)." + "\n" +
	"" + "\n" +
	" moduleNinja can also create more complex modules, witch can contain multiple classes." + "\n" +
	" Althrough they are more complex, their creation is actually a lot simpler, since there" + "\n" +
	" aren't a lot of options about creating them." + "\n" +
	"" + "\n" +
	" Last but not least - moduleNinja has a side feature that allows the user to easily" + "\n" +
	" clone any kind of bojects. The clones are deep, and include references to the" + "\n" +
	" functions of the original object. There's also a less sequre version of the cloner," + "\n" +
	" which will try to create a new instance of the constructor of the given object," + "\n" +
	" but it's use is not reccomended." + "\n" +
	"",
	"example" : "" +
	"" + "\n" +
	"<span class='comment'>      // returns a new dynamic class (which is empty).</span>" + "\n" +
	"<span class='comment'>      // The finalized version can no longer be changed by moduleNinja.</span>" + "\n" +
	"      <span class='js-word'>var</span> newClass<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // returns a new dynamic class (with a single property, named 'prop').</span>" + "\n" +
	"<span class='comment'>      // The finalized version can no longer be changed by moduleNinja.</span>" + "\n" +
	"      <span class='js-word'>var</span> newClass<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'prop'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // returns the code of the exampleAbove.</span>" + "\n" +
	"      <span class='js-word'>var</span> jsCode<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'prop'<span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>toString</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // returns a new complex module (which is empty)</span>" + "\n" +
	"<span class='comment'>      // The finalized version can no longer be changed by moduleNinja.</span>" + "\n" +
	"      <span class='js-word'>var</span> module<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>module</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // returns a new complex module ( with a single public property named 'prop'</span>" + "\n" +
	"<span class='comment'>      // having an empty moduleNinja class as it's value )</span>" + "\n" +
	"<span class='comment'>      // The finalized version can no longer be changed by moduleNinja.</span>" + "\n" +
	"      <span class='js-word'>var</span> module<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>module</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>public</span><span class='js-word'>(</span>'prop'<span class='js-word'>,</span> mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>)</span>" + "\n" +
	"          <span class='js-word'>.</span><span class='ninja-word'>finalize</span><span class='js-word'>(</span><span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // returns a cloned object by the default moduleNinja cloner</span>" + "\n" +
	"      <span class='js-word'>var</span> oldObject<span class='js-word'> = </span>{ prop: 'value' }" + "\n" +
	"      <span class='js-word'>var</span> newObject<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>clone</span><span class='js-word'>(</span>oldObject<span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"<span class='comment'>      // returns a cloned object by the complete moduleNinja cloner</span>" + "\n" +
	"<span class='comment'>      // this cloner is not as sequre.</span>" + "\n" +
	"      <span class='js-word'>var</span> oldObject<span class='js-word'> = </span><span class='js-word'>new </span>Date<span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"      <span class='js-word'>var</span> newObject<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>clone</span><span class='js-word'>(</span>oldObject<span class='js-word'>,</span> true<span class='js-word'>)</span>;" + "\n" +
	"      <span class='js-word'>var</span> success<span class='js-word'> = </span>newObject <span class='js-word'>instanceof </span>Date; // true"
	};
});
