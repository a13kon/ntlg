const obj = {
    param1: []
};

const {param1} = obj;


param1.push('elem 1');
param1.push('elem 2');

param1.splice(1, 1);

console.log(obj);
console.log(param1);