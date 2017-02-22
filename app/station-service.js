'use strict';

angular.module('myApp.stationService', [])
    .factory('stationService', ['$http', function ($http) {
        return {
            getStations() {
                return $http.get('stations/stations.json');
            }
        };
    }]);