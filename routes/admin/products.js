const express = require('express');
const multer = require('multer');

const productsRepository = require('../../repositories/products');
const newProductTemplate = require('../../views/admin/products/new');
const productListTemplate = require('../../views/admin/products/index');
const {requireTitle,requirePrice} = require('./validators');
const {handleErrors,requireAuth}  = require('./middlewares');


const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});


router.get('/admin/products',requireAuth,async (req,res) => {
    const products = await productsRepository.GetAll();
    res.send(productListTemplate({products}));
});


router.get('/admin/products/new',requireAuth,(req,res) => {
    res.send(newProductTemplate({}));
});

router.post('/admin/products/new',requireAuth, upload.single('image'),[requireTitle,requirePrice],handleErrors(newProductTemplate), async (req,res) => {
    
    const image = req.file.buffer.toString('base64');
    const {title,price} = req.body;
    await productsRepository.Create({title,price,image});

    res.redirect('/admin/products');
})


module.exports = router;
