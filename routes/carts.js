const express = require('express');
const router = express.Router();
const CartsRepository = require('../repositories/carts');
const ProductsRepository = require('../repositories/products');
const cartTemplate = require('../views/carts/show');

router.post('/cart/products', async (req,res) => {

    let cart;
    if(!req.session.cartId){
        cart = await CartsRepository.Create({items : []});
        req.session.cartId = cart.Id;

    }
    else{
        cart = await CartsRepository.GetOne(req.session.cartId);
    }
    console.log(req.body);
    const existingItem = await  cart.items.find(item => item.productId === req.body.productId);

   if(existingItem){
        existingItem.quantity++;
    }
    else{
        cart.items.push({productId : req.body.productId, quantity : 1});
    }

    await CartsRepository.Update(cart.Id, {items: cart.items});
    res.redirect('/cart');

});

router.get('/cart', async (req,res) => {
    if(!req.session.cartId){
        return res.redirect('/');
    }
   
    const cart = await CartsRepository.GetOne(req.session.cartId);
    
    for(let item of cart.items){

        const product = await ProductsRepository.GetOne(item.productId);
        item.product = product;
    }
    

    res.send(cartTemplate({items : cart.items}));
});

router.post('/cart/products/delete',async (req,res) => {
    const {itemId} = req.body;
    const cart = await CartsRepository.GetOne(req.session.cartId)
 
    const items = cart.items.filter(item => item.productId !== itemId);
 
    await CartsRepository.Update(req.session.cartId,{items});
    res.redirect('/cart');
 });
 
module.exports = router;














module.exports = router;