'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import toastr from 'angular-toastr';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import ProblemsComponent from './problems/problems.component';
import ProblemAddComponent from './problems/add/problems.add.component';
import StatsticComponent from './statstic/statstic.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import ManageStudentsComponent from './manageStudents/manageStudents.component';
import TeacherComponent from './teacher/teacher.component';
import './app.css';

angular.module('firstPresentationApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', toastr, 
    uiRouter, uiBootstrap, _Auth, account, admin, navbar, footer, main, constants, socket, util,
    ProblemsComponent, StatsticComponent, ManageStudentsComponent, TeacherComponent, 
    ProblemAddComponent
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['firstPresentationApp'], {
      strictDi: true
    });
  });
