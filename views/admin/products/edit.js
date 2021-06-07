const layout = require('../layout');

module.exports = ({product}) => {
    return layout(
        {content: `
        <form action="" method="post">
            <input type="text" name="title" value="${product.title}" >
            <input type="text" name="price" value="${product.price}">
            <input type="file" name="image" >
        </form>
        `
        
        })
}