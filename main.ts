/**
 * Main js file
 */

const furnater = require("./furnater");

const myFurnater = new furnater();

myFurnater.catch(anyExc=>{
    console.error(anyExc);
});

console.log(furnater);

