### 1️⃣ What is the difference between var, let, and const?
- var, let and const are used to declare variables in JavaScript. However, there are some differences between them.
- If we declare a varible using var, we can redeclare the variable with the same name. var allows reassignment of value. var is hoisted and it has function scope. On the other hand, if we declare a variable using let or const, we cannot redeclare the variable with the same name. let allows reassignment of value but const does not allow reassignment. let and const are block scope. let and const are also hoisted but they are in the Temporal Dead Zone (TDZ).

```JavaScript
var a = 10;
var a = 20; // ✅ redeclare allowed
a = 30 // ✅ reassign allowed

let b = 10;
let b = 20; // ❌ redeclare not allowed
b = 30; // ✅ reassign allowed

const c = 10;
const c = 20; // ❌ redeclare not allowed
c = 30; // ❌ reassign not allowed
```

### 2️⃣ What is the spread operator (...)?
- Spread operator is a feature of JavaScript ES6. The Spread Operator is used to spread or expand the elements of an array or properties of an object.

```JavaScript
const arr = [1, 2, 3, 4];
const newArr = [...arr, 5, 6];
console.log(newArr); // Output: [1, 2, 3, 4, 5, 6];
```

```JavaScript
const person = {
  name: "Prottoy",
  age: 20
};
const newPerson = {...person, isStudent: true};
console.log(newPerson); // Output: {name: "Prottoy", age: 20, isStudent: true}
```

### 3️⃣ What is the difference between map(), filter(), and forEach()?
- map(), filter() and forEach() are Javascript array methods used to iterate over arrays. 
- map() performs an operation on each element and return a new array.

```JavaScript
const arr = [1, 2, 3, 4];
const newArr = arr.map(elem => elem * 2);
console.log(newArr); // Output: [2, 4, 6, 8]
```

- filter() return an new array containing elements that fulfilled a condition.

```JavaScript
const arr = [1, 2, 3, 4];
const filteredArr = arr.filter(elem => elem % 2 === 0);
console.log(filteredArr); // Output: [2, 4];
```
- forEach() used for looping through elements but does not return a new array.

```JavaScript
const arr = [1, 2, 3, 4];
arr.forEach(elem => elem * 2);
console.log(arr); // Output: [2, 4, 6, 8]
```

### 4️⃣ What is an arrow function?
- An arrow function is an another way to write a function in JavaScript. It is a feature of modern JavaScript. we use arrow (=>) to decrale an arrow function. We don't need to use the function keyword to declare an arrow function. It makes the code shorter and more readable. For instance-

```JavaScript
let getSum = (a, b) => a + b;
let sum = getSum(10, 20);
console.log(sum); // Output: 30
```

### 5️⃣ What are template literals?
- Template literals is a feature of JavaScript ES6. We can easily use it using backticks(``). By using template literals, we can easily inject varible and expressions into strings by using ${} syntax. For instance-

```JavaScript
let name = "Prottoy";
let message = `Hello, ${name}!`;
console.log(message); // Output: Hello, Prottoy!
```