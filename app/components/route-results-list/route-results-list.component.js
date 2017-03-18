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
                $scope.showSpinner = false;

                $scope.titleString = '';

                if (results) {
                    $scope.parsedResults = this.parseResults(results);
                    $scope.titleString += `תוצאות `;
                    $scope.titleString += 'לתאריך ';
                    $scope.titleString += this.bold(`${$scope.parsedResults.date}`) + " ";
                    $scope.titleString += `מ-`;
                    $scope.titleString += this.bold(`${$scope.parsedResults.originName}` + " ");
                    $scope.titleString += `ל-`;
                    $scope.titleString += this.bold(`${$scope.parsedResults.destinationName}`);
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('שגיאת API :(')
                            .hideDelay(5000)
                            .theme('failure-toast'));

                    $scope.titleString += `שגיאה בחיפוש תוצאות מתחנת `;
                    $scope.titleString += stationService.resolveName(String($routeParams.origin));
                    $scope.titleString += " לתחנת ";
                    $scope.titleString += stationService.resolveName(String($routeParams.destination));
                    $scope.titleString += " בתאריך ";
                    $scope.titleString += this.formatDate(String($routeParams.date));
                }
            };

            this.extractTime = function (dateTime) {
                return dateTime.split(' ')[1].split(':').splice(0, 2).join(':');
            };

            this.fetchResults = function (origin, destination, date) {
                $http.get(this.constructApiString(origin, destination, date))
                    .then(({data}) => {
                        this.handleResults(data);
                    }).catch(({data}) => {
                        this.handleResults(null);
                    });
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
                parsedTrain.string += ` מרציף `;
                parsedTrain.string += `${parsedTrain.originPlatform}`;
                parsedTrain.string += ` ומגיעה בשעה `;
                parsedTrain.string += `${parsedTrain.arrival}`;
                parsedTrain.string += ` לתחנת `;
                parsedTrain.string += `${parsedTrain.destinationName}`;
                parsedTrain.string += ` לרציף `;
                parsedTrain.string += `${parsedTrain.destinationPlatform}`;


                return parsedTrain;
            };

            this.breakDate = function (dateString) {
                let yearLength = 4;
                let monthLength = 2;
                let dayLength = monthLength;

                if (dateString.length != yearLength + monthLength + dayLength) {
                        console.log("Invalid date string", dateString);
                        return [null, null, null];
                }

                let yearStart = 0;
                let monthStart = yearStart + yearLength;
                let dayStart = monthStart + monthLength;
                let dayEnd = dayStart + dayLength;

                return [dateString.slice(yearStart, monthStart),
                        dateString.slice(monthStart, dayStart),
                        dateString.slice(dayStart, dayEnd)];
            };

            this.zeroesLead = function(num, len) {
                let numStr = String(num);
                while (numStr.length < len) {
                    numStr = '0' + numStr;
                }

                return numStr;
            };

            this.assembleDate = function (year, month, day) {  
                return `${this.zeroesLead(year, 4)}${this.zeroesLead(month, 2)}${this.zeroesLead(day, 2)}`;
            };

            this.formatDate = function (dateString) {
                // Example: 20170318 -> 18/03/2017
                let [year, month, day] = this.breakDate(dateString);

                return `${day}/${month}/${year}`;
            };

            this.modifyDate = function(date, dayDiff = 0) {
                let [year, month, day] = this.breakDate(date).map(Number);

                // Create zero-based month javascript date object
                let modified = new Date(year,  month - 1, day);

                // Advance it's day by 1
                modified.setDate(modified.getDate() + dayDiff);

                // Reassemble into date string
                return this.assembleDate(modified.getFullYear(), modified.getMonth() + 1, modified.getDate());
            };

            this.getTomorrow = function(today) {
                return this.modifyDate(today, 1);
            };

            this.getYesterday = function(today) {
                return this.modifyDate(today, -1);
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

                for (let train of route.Train) {
                    parsedRoute.trains.push(this.parseTrain(train));
                }

                parsedRoute.requiresComplexExchange = parsedRoute.trains.length > 2;

                if (parsedRoute.requiresComplexExchange) {
                    parsedRoute.exchangeString = "יותר מהחלפה אחת, לחץ לפירוט";
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

                parsedRoute.hideDetails = true;

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

                if (parsedResults.noResults) {
                    parsedResults.noResultsString = "לא נמצאו תוצאות מתחנת ";
                    parsedResults.noResultsString += stationService.resolveName(String($routeParams.origin));
                    parsedResults.noResultsString += " לתחנת ";
                    parsedResults.noResultsString += stationService.resolveName(String($routeParams.destination));
                    parsedResults.noResultsString += " בתאריך ";
                    parsedResults.noResultsString += this.formatDate(String($routeParams.date));
                }

                return parsedResults;
            };

            this.navTo = function (link){
                $location.path(link);
            };

            stationService.getStations().then((stations) => {
                this.stations = stations;

                let yesterday = this.getYesterday($routeParams.date);
                let tomorrow = this.getTomorrow($routeParams.date)


                // let [yesterday, tomorrow] =
                //     [this.getYesterday($routeParams.date), this.getTomorrow($routeParams.date)];

                let baseLink = `/routes-result/${$routeParams.origin}/${$routeParams.destination}`;

                $scope.yesterdayLink = `${baseLink}/${yesterday}`;
                $scope.tomorrowLink = `${baseLink}/${tomorrow}`;

                $scope.yesterdayLabel = 'יום לפני';

                $scope.tomorrowLabel = 'יום אחרי';

                this.fetchResults($routeParams.origin,
                    $routeParams.destination, $routeParams.date);
            });

            this.swapStations = function () {
                $location.path(`/routes-result/${$routeParams.destination}/${$routeParams.origin}/${$routeParams.date}`);
            };

        }]
});

