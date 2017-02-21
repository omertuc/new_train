'use strict';

angular.
module('myApp.stationList').
component('stationList', {
    templateUrl: 'station-list/station-list.template.html',
    controller: ['$http', function StationListController($http) {
        var self = this;
        $http.get('stations/stations.json').then(function(response) {
            self.stations = response.data;
        });
    }]
});
