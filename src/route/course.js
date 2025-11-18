    const express = require('express');
    const router = express.Router();
    const coursesController = require('../app/controller/CousersController.Js'); 

    router.get('/create', coursesController.create);
    router.post('/store', coursesController.store);
    router.get('/:slug', coursesController.show);
    router.get('/', coursesController.index);


    module.exports = router;


