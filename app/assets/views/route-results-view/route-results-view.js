'use strict';

import routeResultsViewTemplate from './route-results-view.html!ng-template';

angular.module('myApp.routeResultsView', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/routes-result/:origin/:destination/:date', {
            templateUrl: routeResultsViewTemplate.templateUrl,
            controller: 'RouteResultsViewCtrl'
        });
    }])

    .controller('RouteResultsViewCtrl', ['$rootScope', function ($rootScope) {
        $rootScope.titleString = "תוצאות חיפוש מסלולים";
    }]);