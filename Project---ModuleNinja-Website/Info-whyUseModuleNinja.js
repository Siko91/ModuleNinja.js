/*
* Why use moduleNinja
*
* <strong>Classes</strong> - With this library you can easly create classes inside javascript.
*
* <strong>Types</strong> - 'int', 'char', 'nonEmptyString', 'positiveNumber', etc... there are several predefined validators, witch serve as types. It's also very easy to define your own validators.
*
* <strong>Dynamical loading</strong> - the moduleNinja code is a valid javascript code. The classes you write with moduleNinja will be created in the aplication's run time. Tha class itself can depend on the application, instead of being predefined.
*
* <strong>Result quality</strong> - The result of a moduleNinja class is a javascript code. It is readable, works well and is very effective. It also enforces a certain style of code, which (as the author believes) is a good one. Every function uses chaining if possible. Every property has a getter/setter function. Etc...
*
* <strong>Code readability</strong> - The code that you write with moduleNinja would also be readable and compact. For example, the code bellol will create a simple class "Human", with two names and age - every of them with it's apropriate type. The two names are to be passed as arguments on every object initialization and are required. The age has a defoult value of 18. Also, the human can say hallo, saying his first name and his age.
*
*	var Human = mn.class()
*  		.className("Human")
*    	.arg("fName", "nonEmptyString")
*     	.arg("fName", "nonEmptyString")
*      	.prop("age", "positiveInt", 18)
*       .function("sayHallo", function(){
*          return "Hallo! My name is " + this.fName() + " and I am " + this.age() + " years old."
*       })
*
*		var alex = new Human("Alexander", "Dinkov");
*
*		console.log(alex.sayHallo());
*  		// "Hallo! My name is Alexander and I am 18 years old."
*
*		console.log(alex.age(22).sayHallo());
*  		// "Hallo! My name is Alexander and I am 22 years old."
*
* <strong>Fast file transfer</strong> - If you write 10 rows of code, instead of 100, then it's only natural to expect your files to transfer faster through the internet.
*
* <strong>Usable as a dev. tool</strong> - Even if the main idea is different, you can still use moduleNinja only as a developer tool. Simply use the ".toString()" function instead of ".finalize()" which will return the code as string, without evaluating it. Then place it in a file and use it dyrectly.
*
*/