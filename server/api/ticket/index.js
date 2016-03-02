'use strict';

var express = require('express');
var controller = require('./ticket.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', auth.hasRole('planner'), controller.update);
router.patch('/:id', auth.hasRole('planner'), controller.update);
router.delete('/:id', auth.hasRole('planner'), controller.destroy);

module.exports = router;