'use strict';

angular.module('myApp.routeResultsList').component('routeResultsList', {
    templateUrl: 'components/route-results-list/route-results-list.template.html',
    controllerAs: '$ctrl',
    controller: ['$scope', '$location', '$mdToast', '$sanitize', '$routeParams', '$http', 'stationService',
        function ($scope, $location, $mdToast, $sanitize, $routeParams, $http, stationService) {
            this.constructApiString = function (origin, destination, searchDate) {
                let requestString = 'https://www.rail.co.il/apiinfo/api/Plan/GetRoutes?';

                requestString += `OId=${origin}&TId=${destination}&Date=${searchDate}&Hour=0000`;

                return requestString;
            };

            $scope.showSpinner = true;

            this.bold = function (text) {
                return `<b>${text}</b>`;
            };

            this.handleResults = function (results) {
                $scope.parsedResults =
                    this.parseResults(results);

                $scope.titleString = `תוצאות לתאריך `;
                $scope.titleString += this.bold(`${$scope.parsedResults.date}`) + " ";
                $scope.titleString += `מ-`;
                $scope.titleString += this.bold(`${$scope.parsedResults.originName}` + " ");
                $scope.titleString += `ל-`;
                $scope.titleString += this.bold(`${$scope.parsedResults.destinationName}`);
            };

            this.extractTime = function (dateTime) {
                return dateTime.split(' ')[1].split(':').splice(0, 2).join(':');
            };

            this.fetchResults = function (origin, destination, date) {
                $http.get(this.constructApiString(origin, destination, date))
                    .then(({data}) => {
                        $scope.showSpinner = false;
                        this.handleResults(data);
                    }).catch(({data}) => {
                        $scope.showSpinner = false;
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('API error :(')
                                .hideDelay(0)
                                .theme('failure-toast')
                        )
                    }
                );
            };

            $scope.toggleDetails = function (routeIndex) {
                this.parsedResults.routes[routeIndex].hideDetails = !this.parsedResults.routes[routeIndex].hideDetails;
            };

            this.parseTrain = function (train) {
                let parsedTrain = {};

                parsedTrain.originName =
                    stationService.resolveName(String(train.OrignStation));

                parsedTrain.destinationName =
                    stationService.resolveName(String(train.DestinationStation));

                parsedTrain.originPlatform = train.Platform;

                parsedTrain.destinationPlatform = train.DestPlatform;

                parsedTrain.departure =
                    this.extractTime(train.DepartureTime);

                parsedTrain.arrival =
                    this.extractTime(train.ArrivalTime);

                parsedTrain.string = 'יוצאת בשעה ';
                parsedTrain.string += `${parsedTrain.departure}`;
                parsedTrain.string += ' מתחנת ';
                parsedTrain.string += `${parsedTrain.originName}`;
                parsedTrain.string += ` ברציף `;
                parsedTrain.string += `${parsedTrain.originPlatform}`;
                parsedTrain.string += ` ומגיעה בשעה `;
                parsedTrain.string += `${parsedTrain.arrival}`;
                parsedTrain.string += ` לתחנת `;
                parsedTrain.string += `${parsedTrain.destinationName}`;
                parsedTrain.string += ` ברציף `;
                parsedTrain.string += `${parsedTrain.destinationPlatform}`;


                return parsedTrain;
            };

            this.parseRoute = function (route) {
                let parsedRoute = {};

                parsedRoute.tripLength = route.EstTime;
                parsedRoute.requiresExchange = route.IsExchange;

                let firstTrain = route.Train[0];
                let lastTrain = route.Train.slice(-1)[0];

                parsedRoute.departure =
                    this.extractTime(firstTrain.DepartureTime);

                parsedRoute.arrival =
                    this.extractTime(lastTrain.ArrivalTime);

                parsedRoute.initialPlatform =
                    firstTrain.Platform;

                parsedRoute.trains = [];

                for (let [index, train] of route.Train.entries()) {
                    parsedRoute.trains.push(this.parseTrain(train));
                }

                parsedRoute.requiresComplexExchange = parsedRoute.trains.length > 2;

                if (parsedRoute.requiresComplexExchange) {
                    parsedRoute.exchangeString = "כולל מספר החלפות";
                } else if (parsedRoute.requiresExchange) {
                    parsedRoute.exchangeString = "החלפה: לרדת ב";
                    parsedRoute.exchangeString += parsedRoute.trains[0].destinationName;
                    parsedRoute.exchangeString += " (";
                    parsedRoute.exchangeString += parsedRoute.trains[0].arrival;
                    parsedRoute.exchangeString += ") ולעלות לרכבת ברציף ";
                    parsedRoute.exchangeString += parsedRoute.trains[1].originPlatform;
                    parsedRoute.exchangeString += " (";
                    parsedRoute.exchangeString += parsedRoute.trains[1].departure;
                    parsedRoute.exchangeString += ")";

                } else {
                    parsedRoute.exchangeString = "ללא החלפות";
                }

                parsedRoute.hideDetails = !parsedRoute.requiresComplexExchange;

                return parsedRoute;
            };

            this.parseResults = function (results) {
                let data = results.Data;

                let details = data.Details;

                let parsedResults = {};

                // Extract the date from the date-time string.
                parsedResults.date = $sanitize(details.Date.split(' ')[0]);

                parsedResults.originName =
                    stationService.resolveName(String(details.Origin));

                parsedResults.destinationName =
                    stationService.resolveName(String(details.Destination));

                parsedResults.routes = [];

                for (let route of data.Routes) {
                    parsedResults.routes.push(this.parseRoute(route));
                }

                parsedResults.noResults =
                    (parsedResults.routes.length == 0);

                return parsedResults;
            };

            stationService.getStations().then((stations) => {
                this.stations = stations;

                this.fetchResults($routeParams.origin,
                    $routeParams.destination, $routeParams.date);
            });

        }]
});

