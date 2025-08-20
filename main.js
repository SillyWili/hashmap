import HashMap from "./hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test.length()); // 12
console.log(test.entries());

console.log("overwrite: ");

test.set("apple", "yellow");
test.set("dog", "white");

console.log(test.length()); // same number: 12
console.log(test.entries());

console.log("Grow functionality test:");
console.log(test.growFactor());

test.set("moon", "silver");
console.log(test.visualizeBucketsStatus());
console.log(test.length()); // 13
console.log(test.entries());
console.log(test.capacity);

test.set("moon", "white");
test.set("dog", "red");
console.log(test.visualizeBucketsStatus());
console.log(test.length()); // 13
console.log(test.entries());
console.log(test.capacity);

console.log("Other methods test");
console.log(test.get("dog"));
console.log(test.has("moon"));
console.log(test.remove("lion"));
console.log(test.entries());
console.log(test.values());
console.log(test.keys());
test.clear();
console.log(test.entries());
