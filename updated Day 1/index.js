const {addToCart,quantity} = require("./cartModule");

let array = [4,35,345,34,53,45,34,53,45,3,45,35,34,5,345,34,5]

array.map((item,index)=>{
    console.log(item,index);
    
})
console.log(
    addToCart(),
    quantity()
);
