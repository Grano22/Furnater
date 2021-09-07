const path = require("path/posix");
const furnater = require("../../Furnater");

const myFurnater = new furnater();

myFurnater.catch(anyExc=>{
    console.error(anyExc);
});

describe('Generate style definition from given classes', () => {
    myFurnater.autoProcess({
        htmlFile:path.join(__dirname, 'generation.test.html'),
        cssFile:path.join(__dirname, 'generation.test.css')
    });

});