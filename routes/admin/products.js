const express = require('express');
const multer = require('multer');

const productsRepository = require('../../repositories/products');
const newProductTemplate = require('../../views/admin/products/new');
const {requireTitle,requirePrice} = require('./validators');
const {validationResult} = require('express-validator');


const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});


router.get('/admin/products',(req,res) => {

});


router.get('/admin/product/new',(req,res) => {
    res.send(newProductTemplate({}));
});

router.post('/admin/product/new',upload.single('image'),[requireTitle,requirePrice],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.send(newProductTemplate({errors}))
    }
    const image = req.file.buffer.toString('base64');
    const {title,price} = req.body;
    await productsRepository.Create({title,price,image});

    res.send('submitted');
})


module.exports = router;
