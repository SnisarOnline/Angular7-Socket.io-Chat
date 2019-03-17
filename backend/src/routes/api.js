const express = require('express');
const router = express.Router();

const productRequest = require('../../controllers/product');
const checkAuth = require('../../middleware/checkAuth');


//================================================================//
//********** API Server ******************************************//
//================================================================//
//************ Product ************//
router.get( '/products',   productRequest.getAll); // req.body.id
router.get( '/products/:id', productRequest.getOne); // req.params.id
router.post('/products', checkAuth, productRequest.create);
router.put( '/products/:id', checkAuth, productRequest.update);
router.delete('/products/:id', checkAuth, productRequest.remove);

//************ 404 ****************//
router.use(function(req, res, next){
    console.log( 'req.path = ', req.path );
    console.log( 'req.patch = ', req.patch );
    const err = new Error('Not Found Api'); // сгенерируем ошибку с сообщением
    err.status = 404;
    next(err); // передаем в обший обработчик ошибок
});

module.exports = router;
