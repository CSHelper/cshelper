'use strict';
import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./problem.controller');

var router = express.Router();

router.get('/', auth.hasRole('tutor'), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('tutor'), controller.create);
router.put('/:id', auth.hasRole('tutor'), controller.upsert);
router.patch('/:id', auth.hasRole('tutor'), controller.patch);
router.delete('/:id', auth.hasRole('tutor'), controller.destroy);

module.exports = router;
