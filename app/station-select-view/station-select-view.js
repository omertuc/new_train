'use strict';

angular.module('myApp.stationSelectView', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/station-select', {
            templateUrl: 'station-select-view/station-select-view.html',
            controller: 'StationSelectViewCtrl'
        });
    }])

    .controller('StationSelectViewCtrl', [function() {

    }]);