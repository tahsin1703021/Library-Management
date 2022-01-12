// Accessing v8 module
const v8 = require('v8');

// Calling v8.cachedDataVersionTag()
tag = v8.cachedDataVersionTag();
// console.log(tag);
//information about the heap
heap = v8.getHeapCodeStatistics();
// console.log("cache data version tag is " + tag);
// console.log(heap);


// serialized_data = v8.serialize("acbdefg");
// console.log("\nSerialized data is ");
// console.log(serialized_data);
// serialized = Buffer.from(serialized_data);
// console.log(typeof(serialized));

// Calling v8.deserialize()
// console.log(v8.deserialize(v8.serialize("geeksforgeeks")));
