'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/signup',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/signup',
    session: false
  }), setTokenCookie);

export default router;
