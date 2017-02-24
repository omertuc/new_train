'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'myApp.stationService',
    'myApp.stationSelectView',
    'myApp.stationList',
    'myApp.routeForm'
]).config([
    '$locationProvider',
    '$routeProvider',
    '$mdThemingProvider',
    function ($locationProvider, $routeProvider, $mdThemingProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/station-select'});

        $mdThemingProvider.theme('default').
            primaryPalette('blue').accentPalette('green').dark();

    }]);
