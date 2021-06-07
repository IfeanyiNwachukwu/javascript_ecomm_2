const layout = require('../layout');
module.exports = ({products}) => {
const renderedProducts = products.map((product) => {
    return `
    <div>
        <h3>${product.title}</h3>
    </div>
    
    `
}).join('');
return  layout({content: `
   
   <h1 class="title">Products</h1>
   ${renderedProducts}

`})

}