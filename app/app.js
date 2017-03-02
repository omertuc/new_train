'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
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

            $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('green').dark();

            $mdDateLocaleProvider.formatDate = function (date) {
                let day = date.getDate();
                let monthIndex = date.getMonth();
                let year = date.getFullYear();
                return day + '/' + (monthIndex + 1) + '/' + year;
            };
        }]).controller("IndexController", ['stationService', '$scope', '$location', function ($scope, $location) {
    this.redirect = function (url) {
        $location.path(url);
    };

}]);