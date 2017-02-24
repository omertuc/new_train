'use strict';

angular.module('myApp.stationList').component('stationList', {
    templateUrl: 'components/station-list/station-list.template.html',
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function ($scope, $element) {
        $scope.searchTerm;

        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };

        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        $element.find('input').on('keydown', function(ev) {
            ev.stopPropagation();
        });

        this.orderProp = 'Heb[0]';
    }],
    bindings: {
        stationList: '<',
        selectId: '=',
        selectLabel: '<'
    }
});
