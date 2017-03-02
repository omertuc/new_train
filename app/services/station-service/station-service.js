'use strict';

angular.module('myApp.stationService', [])
    .factory('stationService', ['$http', function ($http) {
        return {
            getStations() {
                let me = this;

                return new Promise (function(resolve, reject) {
                    if (me.stations) {
                        return me.stations;
                    } else {
                        $http.get('stations/stations.json').then((data) => {
                            me.stations = data.data;
                            me.generateNameCache(me.stations);
                            resolve(me.stations);
                        });
                    }
                });
            },

            generateNameCache(stations) {
                this.nameCache = {};

                for (let station in stations) {
                    this.nameCache[stations[station].Id] =
                        stations[station].Heb[0];
                }
            },

            resolveName(stationId) {
                return this.nameCache[stationId];
            }
        };
    }]);