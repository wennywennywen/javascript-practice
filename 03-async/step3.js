//### A1. Objects are not text
const item = { id: 1, text: "milk", done: false };
console.log(String(item));
console.log(JSON.stringify(item)); 
//return [object Object]

//### A2. Round trip
const items = [{ id: 1, text: "milk", done: false }];
const text = JSON.stringify(items);
const back = JSON.parse(text);

console.log(typeof text, typeof back); //return string object
console.log(back[0].text); //return milk
console.log(text === JSON.stringify(back)); //return true

//UNDERSTAND `stringify` object → string. `parse` string → object. 

//### A3. What survives the trip
const weird = {
  num: 1,
  str: "hi",
  bool: true,
  arr: [1, 2],
  nested: { a: 1 },
  fn: () => "hello",
  undef: undefined,
  date: new Date(),
};
console.log(JSON.parse(JSON.stringify(weird)));
//JSON has no concept of functions, `undefined`, or dates — it's text, and only understands
//strings, numbers, booleans, null, arrays and objects.

//### A4. Broken input
//console.log(JSON.parse("not json"));

//### A5. Pretty-printing
console.log(JSON.stringify(items, null, 2));