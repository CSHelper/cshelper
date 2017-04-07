'use strict';

var express = require('express');
var controller = require('./code.controller');

var router = express.Router();
import * as auth from '../../auth/auth.service';

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/student/:id', auth.hasRole('tutor'), controller.getStudentStats);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
