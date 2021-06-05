const layout = require('../layout');
const {getError} = require('../../helpers');

module.exports = ({errors}) => {
    return layout({
        content : `
            <form action="" method="post">
            <input type="text" name="title" placeholder="Title">
            <input type="text" name="price" placeholder="Price">
            <input type="file" name="image" id="">
            <button>Submit</button>
            </form>
        `
    })
}