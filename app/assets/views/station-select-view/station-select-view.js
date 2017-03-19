'use strict';

import stationSelectViewTemplate from './station-select-view.html!ng-template';

angular.module('myApp.stationSelectView', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/station-select', {
            templateUrl: stationSelectViewTemplate.templateUrl,
            controller: 'StationSelectViewCtrl'
        });
    }])

    .controller('StationSelectViewCtrl', ['$rootScope', function ($rootScope) {
        $rootScope.titleString = "בחירת מסלול רכבת";
    }]);