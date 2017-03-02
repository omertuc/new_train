'use strict';

angular.module('myApp.routeResultsView', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/routes-result/:origin/:destination/:date', {
            templateUrl: 'views/route-results-view/route-results-view.html',
            controller: 'RouteResultsViewCtrl'
        });
    }])

    .controller('RouteResultsViewCtrl', ['$rootScope', function ($rootScope) {
        $rootScope.titleString = "תוצאות חיפוש מסלולים";
    }]);