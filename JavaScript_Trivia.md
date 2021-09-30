# JavaScript Trivia

[https://www.toptal.com/javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)

####1. What is a potential pitfall with using `typeof bar === "object"` to determine if bar is an object? How can this pitfall be avoided?

`typeof bar === "object"` is reliable for checking if `bar` is an object, but `null` is also an object in JavaScript. 

If `let bar = null;` then `typeof bar === "object"` will be true when we actually want it to be false if we are looking to see if bar is an actual object.

We can avoid this issue by also checking if bar is null: `typeof bar === "object" && bar !== null`

####2. What will the code below output to the console and why?

	function(){
 	 var a = b = 3;
	})();

	console.log("a defined? " + (typeof a !== 'undefined'));
	console.log("b defined? " + (typeof b !== 'undefined'));

Under other circumstances these variables would be scoped to the function but because of how the variables are declared we get:

`a defined? false`
`b defined? true`

This happens because `var a = b = 3;` is shorthand for `b = 3;` and `var a = b;`. This makes `b` a global function because it is not declared with var, so it is still in scope outside the function. 

If you use `use strict` in your code, trying to run this code will throw `ReferenceError: b is not defined`.

####3. What will the code below output to the console and why?

	var myObject = {
	foo: "bar",
	func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        	(function() {
        		console.log("inner func:  this.foo = " + this.foo);
        		console.log("inner func:  self.foo = " + self.foo);
        		}()); 
    }
	};
	myObject.func();

`outer func:  this.foo = bar`
`outer func:  self.foo = bar`
`inner func:  this.foo = undefined`
`inner func:  self.foo = bar`

In the outer function, both `this` and `self` refer to `myObject` so they can access the value of `foo`. 

In the inner function, `this.foo` refers to the function it resides in rather than `myObject` so it cannot access the value of `foo`. `self.foo` can access foo through the local variable `self` that is still in scope.

####4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

Wrapping the entire content of a JavaScript file in a function block creates a closure around the file and creates a private namespace. This is a helpful technique to prevent any naming conflicts between JavaScript modules or libraries.

####5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

`use strict` places stricter requirements for parsing and error handling during runtime. With the use of `use strict` code errors that would normally not cause an error to throw will throw and error under the stricter requirements.

Using `use strict` is considered a good practice and can help make debugging code easier by throwing errors that would normally fail silently. An example is assigning a value to an undeclared variable - this would create a globally scoped variable and normally would not throw an error.

####6. Consider the two functions below. Will they both return the same thing? Why or why not?

	function foo1()
	{
  	return {
      bar: "hello"
  	};
	}

	function foo2()
	{
  	return
  	{
      bar: "hello"
  	};
	}

`foo1` will return `{ bar: "hello" }` but `foo2` will return `undefined` because JavaScript will insert a comma after the return statement on runtime and not return the object defined below the return statement (which is now just another block of code). This behavior reinforces why semicolons should be placed at the end of lines and not omitted, and why the first curly brace of a block should start at the end of the line above.

####7. What will the code below output? Explain your answer.

	console.log(0.1 + 0.2);
	console.log(0.1 + 0.2 == 0.3);

It seems like the first line should log 0.3 and the second line should log true, but because Numbers in JavaScript have floating point precision the results are unreliable. 

In JavaScript it is better practice/more common to compare the difference of floating numbers by comparing them to `Number.EPSILON`

`Math.abs( (0.1 + 0.2) - 0.3 ) < Number.EPSILON;` = true

####8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

	(function() {
    	console.log(1); 
    	setTimeout(function(){console.log(2)}, 1000); 
    	setTimeout(function(){console.log(3)}, 0); 
    	console.log(4);
	})();
	
1, 4, 3, 2. 1 and 4 will log first because they have no callback waiting to finish, then 3 because the timer is set to 0 seconds, and 2 becayse timer is set to 1 second. 

The reason 3 ends up logging after 4 even though 4 comes later is because the use of the callback in the line 3 timeout function puts the call onto an event queue to wait until it is time to call. It is taken off the queue right away because the timer is only 0 seconds but is still delayed long enough for line 4 to run first.

####9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

	function isPalindrome(str) {
		let reverse = '';
		for (let i = str.length - 1; i >= 0; i--) {
	    	reverse += str[i];
		}
		return reverse === str.split('').reverse().join('');
	}

####10. Write a sum method which will work properly when invoked using either syntax below.
	
	function sum(x, y) {
		if (y !== undefined) {
			return x + y;
		}
		return (y) => x + y
	}
	
	console.log(sum(2,3));   // Outputs 5
	console.log(sum(2)(3));  // Outputs 5

####11. Consider the following code snippet:
	for (var i = 0; i < 5; i++) {
  		var btn = document.createElement('button');
  		btn.appendChild(document.createTextNode('Button ' + i));
  		btn.addEventListener('click', function(){ console.log(i); });
  		document.body.appendChild(btn);
	}
#### (a) What gets logged to the console when the user clicks on “Button 4” and why? 
No matter which button gets clicked, the console will log 5. This is because i is declared with the var keyword which is not scoped to code blocks (it gets scoped globally). The loop ends when i reaches 5, so the console can access and log the value of i.

#### (b) Provide one or more alternate implementations that will work as expected.

Replace `var` with `let`:

	for (let i = 0; i < 5; i++) {
  		var btn = document.createElement('button');
  		btn.appendChild(document.createTextNode('Button ' + i));
  		btn.addEventListener('click', function(){ console.log(i); });
 	   document.body.appendChild(btn);
	}

####12. Assuming d is an “empty” object in scope, say:

	var d = {};
####…what is accomplished using the following code?

	[ 'zebra', 'horse' ].forEach(function(k) {
		d[k] = undefined;
	});
	
This sets `'zebra'` and `'horse'` as keys on d, while setting the values as `undefined`.

####13. What will the code below output to the console and why?
	var arr1 = "john".split(''); // ['j', 'o', 'h', 'n']
	var arr2 = arr1.reverse(); // ['n', 'h', 'o', 'j']
	var arr3 = "jones".split(''); // ['j', 'o', 'n', 'e', 's']
	arr2.push(arr3); // ['n', 'h', 'o', 'j', ['j', 'o', 'n', 'e', 's']]
	console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
	console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

	array 1: length= 5 last= ['j', 'o', 'n', 'e', 's']
	array 2: length= 5 last= ['j', 'o', 'n', 'e', 's']

Using Array.reverse() modifies the original array in place (it does not return a copy) `arr1 & arr2 = ['n', 'h', 'o', 'j']` . `arr2` is a reference to `arr1` so any changes to `arr2` affect `arr1`.

Array.push will push `['j', 'o', 'n', 'e', 's']` into a single space on arr2/arr1 `['n', 'h', 'o', 'j', ['j', 'o', 'n', 'e', 's']]`

Array.slice(-1) gets the last element in the array (backwards from the end with negative indicies) - `['j', 'o', 'n', 'e', 's']`.

####14. What will the code below output to the console and why?

	console.log(1 +  "2" + "2");
	// 122 
JavaScript coerces types to be the same, adding string types together coerces all values to a string and the values are concatenated together.
	
	console.log(1 +  +"2" + "2");
	// 32
The + symbol converts "2" to 2, then the sum of 1 + 2 is concatenated with the string "2".
	
	console.log(1 +  -"1" + "2");
	// 02
The - symbol converts "1" to -1. The sum of 1 + -1 is concatenated with 2.

	console.log(+"1" +  "1" + "2");
	// 112
	
"1" is converted to 1 but is then concatenated with the remaining strings.	
	console.log( "A" - "B" + "2");
	//"NaN2"
JavaScript can't do math with strings so NaN is returned then contatenated with "2",  thus converted back to a string.
	
	console.log( "A" - "B" + 2);
	// NaN
JavaScript can't do math with strings so NaN" is returned, you can't add 2 to NaN its still NaN.

####15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

	var list = readHugeList();

	var nextListItem = function() {
    	var item = list.pop();

    	if (item) {
        	// process the list item...
        nextListItem();
    	}
	};

You can avoid a stack overflow by calling nextListItem(); as a callback in setTimeout: `setTimeout( nextListItem, 0);`
This places each call in the event loop, rather than the call stack so we can avoid overloading the call stack with recursive requests.

####16. What is a “closure” in JavaScript? Provide an example.

Closure is the ability of an inner function to access/remember variables scoped in the outer (enclosing) function. The inner function has the ability to remember and modify the variable long after the outer function finishes executing both functions. The inner function has access to variabled in its own scope, variables in the outer function, and global variables.

	let global = 'global variable';

	function doStuff(command) {
		let outer = 'outer variable';
		(function nums(count) {
			let inner = 'inner variable';
			
			console.log(count);
			console.log(inner);
			console.log(command);
			console.log(outer);
			console.log(global);
		})(10);
	}
		
	doStuff('get er done!');
		
		// 10
		// 'inner variable'
		// 'get er done!'
		// 'outer variable'
		// global variable'

####17. What would the following lines of code output to the console?

	console.log("0 || 1 = "+(0 || 1));
0 || 1 = 1 returns 1 because 0 is falsey

	console.log("1 || 2 = "+(1 || 2));
1 || 2 = 1 returns 1 because both values are true but 1 is the first true value

	console.log("0 && 1 = "+(0 && 1));
0 && 1 = 0 The first value is false, so the remainer of the expression isn't checked and 0 is returned.

	console.log("1 && 2 = "+(1 && 2));
1 && 2 = 2 The first and second values are true, but the second value is returned because it is the most recently checked expression.

####18. What will be the output when the following code is executed? Explain.
	console.log(false == '0')
This returns true because the values are compared after coercion. JavaScript coerces different types to check the values. Since 0 is a falsey value and we are comparing false, the result is true.

	console.log(false === '0')
This returns false because we are comparing value and reference type. This returns false because '0' is not a boolean type.

####19. What is the output out of the following code? Explain your answer.
	var a={},
    	b={key:'b'},
    	c={key:'c'};

	a[b]=123;
	a[c]=456;

	console.log(a[b]);

This logs 465. Because b and c are both objects, JavaScript will automatically stringify any non string keys into strings. The key for both gets set to `"[object Object]"` and since these are not unique keys, c overrides the value of b.

####20. What will the following code output to the console:

	console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));
	
The function f(n) calls itself recursively until n == 1. This results in a call stack that looks like this:

f(1): returns 1 (n=1)
f(2): returns 2 (2 * 1)
f(3): returns 6 (3 * 2)
f(4): returns 24 (4 * 6)
f(5): returns 120 (5 * 24)
f(6): returns 720 (6 * 120)
f(7): returns 5,040 (7 * 720)
f(8): returns 40,320 (8 * 5040)
f(9): returns 362,880 (9 * 40,320)
f(10): returns 3,628,800 (10 * 362,880)

####21. Consider the code snippet below. What will the console output be and why?

	(function(x) {
    	return (function(y) {
        	console.log(x);
    	})(2)
	})(1);

We invoke the function passing in 1 as x. X is wihin the scope of the inner function, and because x is not declared in the inner function, it looks outward for the value of x in the outer function and so 1 is logged.

####22. What will the following code output to the console and why:
	var hero = {
   		_name: 'John Doe',
    	getSecretIdentity: function (){
        	return this._name;
    	}
	};

	var stoleSecretIdentity = hero.getSecretIdentity;

	console.log(stoleSecretIdentity()); // undefined
stoleSecretIdentity is a reference to the hero object's function getSecretIdentity. If we try to call stoleSecretIdentity with the way the code currently is, it will not know the context of this._name because we are invoking getSecretIdentity which is now scoped globally. _name doesn't exist in the global window scope so we get undefined.

	console.log(hero.getSecretIdentity()); // 'John Doe'
We can access and call the getSecretIdentity() function directly through the hero object. This logs 'John Doe' because this._name references the object hero.
	
#### What is the issue with this code and how can it be fixed?

We need to bind our reference stoleSecretIdentity with the hero object so when we invoke the function it knows where to find the value for _name. `var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);`

####23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

####The arguments to the function should be:
####a DOM element
####a callback function (that takes a DOM element as its argument)

	function visitAllElements(element, callback) {
		callback(element);
		let children = element.children;
		for (let i = 0; i < children.length; i++) {
			visitAllElements(children[i], callback);
		}
	}
	
####24. Testing your this knowledge in JavaScript: What is the output of the following code?

	var length = 10;
	
	function fn() {
		console.log(this.length);
	}

	var obj = {
  		length: 5,
  		method: function(fn) {
    		fn();
    		arguments[0]();
  		}
	};

	obj.method(fn, 1);
	
Output logs 10 first (for the globally scoped `var length = 10;`). fn() is called inside of obj.method as a passed in parameter. fn() is not declared inside method so it is only aware of the globally scoped `length` (which is `window.length` or `this.length`).

The second output 2 is the result of accessing the arguments object for the parameters passed into method. `arguments[0]();` is calling the first argument `fn()` and because the arguments object is calling the function, `fn()` is scoped to the arguments object in this context. The `this.length` becomes the length of the arguments object which is 2 in this context.

####25. Consider the following code. What will the output be, and why?
	(function () {
    	try {
        	throw new Error();
    	} catch (x) {
       	var x = 1, y = 2;
        	console.log(x); //1
    	}
    	console.log(x); //undefined
    	console.log(y); //2
	})();
	
At runtime, both variables x & y are hoisted to the top of the function scope as global variables (without initilized values). The catch block creates a second variable x within the inner scope of the catch block so the first output is 1.

Outside of the catch block, the outer x variable is never initilized a value so the second output is undefined.

There is only 1 y variable globally scoped to the function so 2 is logged in the third output.

####26. What will be the output of this code?

	var x = 21;
	
	var girl = function () {
    	console.log(x);
    	var x = 20;
	};
	
	girl ();

The output is undefined because JavaScript does not hoist initialization. The reason 21 is not output is because on runtime JavaScript checks for a variable x locally first, but because x variable is hoisted but no defined locally until after the statement x is undefined. 

If `var x = 20;` was removed from the code, JavaScript would look in the local scope for x, then look globally and output 21.

####27. What will this code print?

	for (let i = 0; i < 5; i++) {
  		setTimeout(function() { console.log(i); }, i * 1000 );
	}
	
The event loop will add each settimeout call and remove from the loop based on the set time. Because each second time is multipled by i, the output will still run in order: 0, 1, 2, 3, 4. 

`i` is locally scoped to the for loop block so the settimeout callback can access the current value of `i` on each iteration.

####28. What do the following lines output, and why?

	console.log(1 < 2 < 3);
	console.log(3 > 2 > 1);

JavaScript evaluate < > operands from left to right and remembers the previous value as a boolean true=1, or false=0.

The first output is true because `1 < 2 is 1 and 1 < 3 is 1` which results in true.
The second output is false because `3 > 2 is 1 and 1 > 1 is 0` which results in the whole expression false.

####29. How do you add an element at the begining of an array? How do you add one at the end?

Using built in JavaSript Array methods, you can add an element to the beginning of an array with `Array.unshift()`, and add an element to the end of the array with `Array.push()`.

You can add to the beginning/end with the use of the spread operator:

start
`let elements = [newElement, ...elements];`

end
`let elements = [...elements, newElement];`

or both
`let elements = [newElement1, ...elements, newElement2];`

####30. Imagine you have this code:
	var a = [1, 2, 3];
	
#### (a) Will this result in a crash?
	a[10] = 99;
	
No it won't crash. JavaScript will just make the slots in between [2] and [10] empty spaces.

#### (B) What will this output?
	console.log(a[6]);
	
Undefined. The slot is technically empty (it is not filled with anything). This is an important distinction because a method like map will not replaces slots that have empty values with anything. But slots with undefined, or null, ect can be replaced with map.

This behavior is kind of like more traditional Arrays where the container size must be defined (it cannot change) so when initilized all containers are empty until values are placed in them.

####31. What is the value of `typeof undefined == typeof NULL`?

The expression is true because the variable `NULL` is undefined. JavaScript is case sensitive so `typeof undefined == typeof null` would be false because null is an object in JavaScript.

####32. What would following code return?

	console.log(typeof typeof 1);

Elements are evaluated right to left against the type. typeof 1 returns "number" and then typeof "number" returns "string".

####33. What will be the output of the following code:

	for (var i = 0; i < 5; i++) {
		setTimeout(function() { console.log(i); }, i * 1000 );
	}

The output of this code will be 5,5,5,5,5, Because var i is globally scoped and we are waiting for the callbacks of settimeout to execute from the event loop, by the time the loop finishes the value of i is now 5.

####Explain your answer. How could the use of closures help here?

Closure can be used to pass the value of `i` to an inner function where `i` will be correctly scoped to the current value of `i` for that execution:

	for (var i = 0; i < 5; i++) {
			(function(n) {
				setTimeout(function() { console.log(n); }, i * 1000 );
			})(i);
		}
		
Or the declaration `var` can be replaced with `let` to scope i to the code block and not globally.

####34. What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

NaN is a global JavaScript property that represents a value that is "not a number". This
value results from operation results that are not numeric, or the inability to perform numeric operations on the value.

A variable can be passed into Number.isNaN() but coersion can still happen with this method ("4" coerces to 4). A better solution is to check if the resulting value of an operation is NaN.

####35. What will the following code output and why?

	var b = 1;
	function outer(){
   		var b = 2
    	function inner(){
       	b++;
        	var b = 3;
        	console.log(b)
    	}
    	inner();
	}
	outer();
	
Outer function is called, then the inner() function is called inside the outer() function. The inner function will look for a locally scoped variable first which is `var b = 3;` and so 3 is output to the console.

####36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

You can pass x into Number.isInteger() and return true if it is an integer.

	Number.isInteger(x)

You can check the typeof and perform a modulus operand to see if x can be operated upon itself:

	function isInteger(x) {
		if (typeof x === 'integer' && x % 1 === 0) return true;
		return false;
	}

The most accepted approach is to use a bitwise XOR operand comparing to 0:

	function isInteger(x) {
		return (x ^ 0) === x;
	}
	
####37. How do you clone an object?

A slow way to clone an Object is to iterate over the object entries, adding all key value pairs to a new object. The benefit of this approach is you can check for nested objects and add those to the new object as well (a deep copy).

ES2018 allows for the use of the spread operator to clone an object literal: `let newObj = {...oldObj};`
This approach makes a deep copy of the object, but only a shallow copy of the nested object. The biggest different between deep/shallow is that deep creates new space in memory while shallow only creates a bitwise copy that is a reference to the original object in memory. Changes to nested objects will therefore modify both objects that were shallow copied.

Using Object.assign() can create a shallow copy of an object, but any nested objects will still refer to the nested object of the original object. This will result in changes to both nested objects if the new object makes any changes.