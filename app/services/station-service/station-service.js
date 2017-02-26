'use strict';

angular.module('myApp.stationService', [])
    .factory('stationService', ['$http', function ($http) {
        return {
            getStations() {
                return $http.get('stations/stations.json');
            },

            generateNameCache(stations) {
                this.nameCache = {};

                for (let station in stations) {
                    this.nameCache[station.Id] = station.Heb[0];
                }
            },

            resolveName(stationId) {
                return this.nameCache[stationId];
            }
        };
    }]);