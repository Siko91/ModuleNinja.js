
	define(function(){
	return {
	"name" : " Why use moduleNinja",
	"text" : "" +
	"" + "\n" +
	" <strong>Classes</strong> - With this library you can easly create classes inside javascript." + "\n" +
	"" + "\n" +
	" <strong>Types</strong> - 'int', 'char', 'nonEmptyString', 'positiveNumber', etc... there are several predefined validators, witch serve as types. It's also very easy to define your own validators." + "\n" +
	"" + "\n" +
	" <strong>Dynamical loading</strong> - the moduleNinja code is a valid javascript code. The classes you write with moduleNinja will be created in the aplication's run time. Tha class itself can depend on the application, instead of being predefined." + "\n" +
	"" + "\n" +
	" <strong>Result quality</strong> - The result of a moduleNinja class is a javascript code. It is readable, works well and is very effective. It also enforces a certain style of code, which (as the author believes) is a good one. Every function uses chaining if possible. Every property has a getter/setter function. Etc..." + "\n" +
	"" + "\n" +
	" <strong>Code readability</strong> - The code that you write with moduleNinja would also be readable and compact. For example, the code bellol will create a simple class 'Human', with two names and age - every of them with it's apropriate type. The two names are to be passed as arguments on every object initialization and are required. The age has a defoult value of 18. Also, the human can say hallo, saying his first name and his age." + "\n" +
	"" +
	"" + "\n" +
	"	<span class='js-word'>var</span> Human<span class='js-word'> = </span>mn<span class='js-word'>.</span><span class='ninja-word'>class</span><span class='js-word'>(</span><span class='js-word'>)</span>" + "\n" +
	"  		<span class='js-word'>.</span><span class='ninja-word'>className</span><span class='js-word'>(</span>'Human'<span class='js-word'>)</span>" + "\n" +
	"    	<span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'fName'<span class='js-word'>,</span> 'nonEmptyString'<span class='js-word'>)</span>" + "\n" +
	"     	<span class='js-word'>.</span><span class='ninja-word'>arg</span><span class='js-word'>(</span>'fName'<span class='js-word'>,</span> 'nonEmptyString'<span class='js-word'>)</span>" + "\n" +
	"      	<span class='js-word'>.</span><span class='ninja-word'>prop</span><span class='js-word'>(</span>'age'<span class='js-word'>,</span> 'positiveInt'<span class='js-word'>,</span> 18<span class='js-word'>)</span>" + "\n" +
	"       <span class='js-word'>.</span><span class='ninja-word'>function</span><span class='js-word'>(</span>'sayHallo'<span class='js-word'>,</span> function<span class='js-word'>(</span><span class='js-word'>)</span>{" + "\n" +
	"          <span class='js-word'>return </span>'Hallo! My name is ' + <span class='js-word'>this</span><span class='js-word'>.</span>fName<span class='js-word'>(</span><span class='js-word'>)</span> + ' and I am ' + <span class='js-word'>this</span><span class='js-word'>.</span>age<span class='js-word'>(</span><span class='js-word'>)</span> + ' years old<span class='js-word'>.</span>'" + "\n" +
	"       }<span class='js-word'>)</span>" + "\n" +
	"" + "\n" +
	"		<span class='js-word'>var</span> alex<span class='js-word'> = </span><span class='js-word'>new </span>Human<span class='js-word'>(</span>'Alexander'<span class='js-word'>,</span> 'Dinkov'<span class='js-word'>)</span>;" + "\n" +
	"" + "\n" +
	"		console<span class='js-word'>.</span>log<span class='js-word'>(</span>alex<span class='js-word'>.</span>sayHallo<span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>)</span>;" + "\n" +
	"<span class='comment'>  		// 'Hallo! My name is Alexander and I am 18 years old.'</span>" + "\n" +
	"" + "\n" +
	"		console<span class='js-word'>.</span>log<span class='js-word'>(</span>alex<span class='js-word'>.</span>age<span class='js-word'>(</span>22<span class='js-word'>)</span><span class='js-word'>.</span>sayHallo<span class='js-word'>(</span><span class='js-word'>)</span><span class='js-word'>)</span>;" + "\n" +
	"<span class='comment'>  		// 'Hallo! My name is Alexander and I am 22 years old.'</span>" + "\n" +
	"" + "\n" +
	" <strong>Fast file transfer</strong> - If you write 10 rows of code, instead of 100, then it's only natural to expect your files to transfer faster through the internet." + "\n" +
	"" + "\n" +
	" <strong>Usable as a dev. tool</strong> - Even in>the main idea is different, you can still use moduleNinja only as a developer tool. Simply use the '.toString()' function instead of '.finalize()' which will return the code as string, without evaluating it. Then place it in a file and use it dyrectly." + "\n" +
	"",
	"example" : ""
	};
});
