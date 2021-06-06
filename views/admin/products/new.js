const layout = require('../layout');
const {getError} = require('../../helpers');

module.exports = ({errors}) => {
    return layout({
        content : `
            <form action="" method="post" enctype="multipart/form-data">
            <input type="text" name="title" placeholder="Title">
            ${getError(errors,'title')}
            <input type="text" name="price" placeholder="Price">
            ${getError(errors,'price')}
            <input type="file" name="image" id="">
            <button>Submit</button>
            </form>
        `
    })
}