'use strict';

var express = require('express');
var controller = require('./poll.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/user/:name', auth.isOwner(), controller.find);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
/** todo: delete authorization */
router.delete('/:id', controller.destroy);

module.exports = router;
