const data = require('./file.json');
console.log(data.prop1);

const {demo, hello}  = require('./demo');
console.log(demo());
console.log(hello());

const os = require('node:os');
console.log(os.tmpdir());