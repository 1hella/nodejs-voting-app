'use strict';

var express = require('express');
var controller = require('./poll.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/user/:name', auth.isOwner(), controller.find);
router.post('/', controller.create);
router.post('/:id/:option', auth.isAuthenticated(), controller.addVote);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', controller.update);
/** todo: delete authorization */
router.delete('/:id', controller.destroy);

module.exports = router;
