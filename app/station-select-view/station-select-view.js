'use strict';

angular.module('myApp.stationSelectView', ['ngRoute', 'myApp.stationList'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/station-select', {
            templateUrl: 'station-select-view/station-select-view.html',
            controller: 'StationSelectViewCtrl'
        });
    }])

    .controller('StationSelectViewCtrl', [function () {

    }]);