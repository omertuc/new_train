'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'myApp.focusService',
    'myApp.stationService',
    'myApp.stationSelectView',
    'myApp.stationList',
    'myApp.routeForm'
])
.config([
    '$locationProvider', '$routeProvider', '$mdThemingProvider', '$mdDateLocaleProvider',
    function ($locationProvider, $routeProvider, $mdThemingProvider, $mdDateLocaleProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/station-select'});

        $mdThemingProvider.theme('default').
            primaryPalette('blue').accentPalette('green').dark();

        $mdDateLocaleProvider.formatDate = function(date) {
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          return day + '/' + (monthIndex + 1) + '/' + year;
        };
    }]);