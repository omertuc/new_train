'use strict';

angular.module('myApp.stationList').component('stationList', {
    templateUrl: 'components/station-list/station-list.template.html',
    controllerAs: '$ctrl',
    controller: ['$scope', function ($scope) {
        this.orderProp = 'Heb[0]';

        $scope.$watch('$ctrl.stationList', () => {
            if (this.stationList) {
                // Voodoo given to us by the gods
                this.selectId = this.stationList[0].Id;
            }
        });
    }],
    bindings: {
        stationList: '<',
        selectId: '='
    }
});
