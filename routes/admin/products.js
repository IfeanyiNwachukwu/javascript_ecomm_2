const express = require('express');
const router = express.Router();
const productsRepository = require('../../repositories/products');
const newProductTemplate = require('../../views/admin/products/new');
const {requireTitle,requirePrice} = require('./validators');
const {validationResult} = require('express-validator');

router.get('/admin/products',(req,res) => {

});


router.get('/admin/product/new',(req,res) => {
    res.send(newProductTemplate({}));
});

router.post('/admin/product/new',[requireTitle,requirePrice],(req,res) => {
    const errors = validationResult(req);
    console.log(errors);
    res.send('submitted');
})


module.exports = router;
