const obj = {
    param1: [],
    param2: []
};

const {param1} = obj;


param1.push('elem 1');
param1.push('elem 2');

param1.splice(1, 1);
obj.param1.push(2000);

console.log(obj);
console.log(param1);