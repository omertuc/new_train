'use strict';

angular.
module('myApp.stationList').
component('stationList', {
    templateUrl: 'components/station-list/station-list.template.html',
    controllerAs: '$ctrl',
    controller: ['$http', function ($http) {
        this.orderProp = 'Heb[0]';
        $http.get('stations/stations.json')
            .then(({data}) => this.stations = data);
    }],
    bindings: {
        selectId: '<'
    }



});
