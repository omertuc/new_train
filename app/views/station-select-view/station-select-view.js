'use strict';

angular.module('myApp.stationSelectView', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/station-select', {
            templateUrl: 'views/station-select-view/station-select-view.html',
            controller: 'StationSelectViewCtrl'
        });
    }])

    .controller('StationSelectViewCtrl', [function () {
    }]);