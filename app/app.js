'use strict';

// Angular deps
import angular from 'angular';
import 'angular/material';
import 'angular/angular-route';
import 'angular/angular-sanitize';
import 'angular/angular-messages';

// Global stylesheet
import './app.css!';

// Services
import './services/station-service/station-service';

// Views
import './views/route-results-view/route-results-view';
import './views/station-select-view/station-select-view';

// Components
import './components/route-form/route-form.component';
import './components/route-results-list/route-results-list.component';
import './components/station-list/station-list.component';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'ngSanitize',
    'myApp.stationService',
    'myApp.routeResultsList',
    'myApp.routeResultsView',
    'myApp.stationSelectView',
    'myApp.stationList',
    'myApp.routeForm'
])
.config([
  '$locationProvider', '$routeProvider', '$mdThemingProvider', '$mdDateLocaleProvider',
  function ($locationProvider, $routeProvider, $mdThemingProvider, $mdDateLocaleProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/station-select'});

    $mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('green').dark();

    $mdDateLocaleProvider.formatDate = function (date) {
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
        return day + '/' + (monthIndex + 1) + '/' + year;
    };
  }])
.controller("IndexController", ['stationService', '$scope', '$location', function ($scope, $location) {
    this.redirect = function (url) {
      $location.path(url);
    };
}]);

// Manually bootstrap the app after loading all deps and declaring app level module
angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp'], {strictDi: true});
});