'use strict';

var express = require('express');
var controller = require('./service.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('planner'), controller.create);
router.put('/:id', auth.hasRole('planner'), controller.update);
router.patch('/:id', auth.hasRole('planner'), controller.update);
router.delete('/:id', auth.hasRole('planner'), controller.destroy);

module.exports = router;