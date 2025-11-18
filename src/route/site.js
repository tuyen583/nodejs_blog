const express = require('express');
const router = express.Router();
const SiteControllers = require('../app/controller/SiteControllers');

router.get('/search', SiteControllers.search);
router.get('/', SiteControllers.index);

module.exports = router;
