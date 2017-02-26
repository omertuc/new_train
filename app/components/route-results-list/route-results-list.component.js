'use strict';

angular.module('myApp.routeResultsList').component('routeResultsList', {
    templateUrl: 'components/route-results-list/route-results-list.template.html',
    controllerAs: '$ctrl',
    controller: ['$scope', 'resultsService', 'stationService',
        function ($scope, resultsService, stationService) {
        this.parseResults = function(results) {
            let data = results.Data;
            let details = data.Details;

            let parsedResults = {};

            // Extract the date from the date-time string.
            parsedResults.date = details.Date.split(' ')[0];

            parsedResults.originName =
                stationService.resolveName(details.Origin);

            parsedResults.destinationName =
                stationService.resolveName(details.Destination);

            parsedResults.routes = [];

            for (let route in details.Routes)
            {
                let parsedRoute = {};

                parsedRoute.tripLength = route.EstTime;
                parsedRoute.requiresExchange = route.IsExchange;

                parsedResults.routes.push(parsedRoute);
            }

            return parsedResults;
        };

        $scope.parsedResults =
            this.parseResults(resultsService.getResults());

        $scope.date = parsedResults.date;
        $scope.originName = parsedResults.originName;
        $scope.destinationName = parsedResults.destinationName;
        $scope.routes = parsedResults.routes;
    }]
});
