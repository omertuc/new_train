'use strict';

angular.module('myApp.routeResultsList').component('routeResultsList', {
    templateUrl: 'components/route-results-list/route-results-list.template.html',
    controllerAs: '$ctrl',
    controller: ['$scope', '$routeParams', '$http', 'stationService',
        function ($scope, $routeParams, $http, stationService) {
            this.constructApiString = function (origin, destination, searchDate) {
                let requestString = 'https://www.rail.co.il/apiinfo/api/Plan/GetRoutes?';

                requestString += `OId=${origin}&TId=${destination}&Date=${searchDate}&Hour=0000`;

                return requestString;
            };


            this.handleResults = function (results) {
                $scope.parsedResults =
                    this.parseResults(results);

                $scope.titleString = `תוצאות לתאריך ${$scope.parsedResults.date} מ${$scope.parsedResults.originName} ל${$scope.parsedResults.destinationName}`
            };

            this.fetchResults = function (origin, destination, date) {
                $http.get(this.constructApiString(origin, destination, date))
                    .then(({data}) => {
                        this.handleResults(data);
                    });
            };

            this.parseResults = function (results) {
                console.log(results);

                let data = results.Data;

                let details = data.Details;

                let parsedResults = {};

                // Extract the date from the date-time string.
                parsedResults.date = details.Date.split(' ')[0];

                parsedResults.originName =
                    stationService.resolveName(String(details.Origin));

                parsedResults.destinationName =
                    stationService.resolveName(String(details.Destination));

                parsedResults.routes = [];

                for (let routeIndex in data.Routes) {
                    let route = data.Routes[routeIndex];

                    let parsedRoute = {};

                    parsedRoute.tripLength = route.EstTime;
                    parsedRoute.requiresExchange = route.IsExchange;

                    let firstTrain = route.Train[0];
                    let lastTrain = route.Train.slice(-1)[0];

                    parsedRoute.departure =
                        firstTrain.DepartureTime.split(' ')[1];

                    parsedRoute.arrival =
                        lastTrain.ArrivalTime.split(' ')[1];

                    parsedRoute.trains = route.Train;

                    parsedResults.routes.push(parsedRoute);
                }

                return parsedResults;
            };

            stationService.getStations().then((stations) => {
                this.stations = stations;

                this.fetchResults($routeParams.origin,
                    $routeParams.destination, $routeParams.date);
            });

        }]
});
