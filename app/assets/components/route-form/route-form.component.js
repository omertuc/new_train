'use strict';

import routeFormTemplate from './route-form.template.html!ng-template';
import './route-form.style.css!';

angular.module('myApp.routeForm', ['ngMaterial', 'ngMessages']).component('routeForm', {
    templateUrl: routeFormTemplate.templateUrl,
    bindings: {

    },
    controller: ['stationService', '$rootScope', '$scope', '$http', '$location',
        function (stationService, $rootScope, $scope, $http, $location) {

        $scope.global = $rootScope;

        if (!$rootScope.myDate) {
            $rootScope.myDate = new Date();
        }
        this.originLabel = "תחנת מוצא";
        this.destinationLabel = "תחנת יעד";

        this.isOpen = false;

        $scope.showSpinner = true;

        this.isValidStation = function (stationId) {
            return this.stations.map((stationObject) => Number(stationObject.Id))
                    .filter((mappedId) => stationId === mappedId).length > 0;
        };

        stationService.getStations().then((stations) => {
            this.stations = stations;
            $scope.showSpinner = false;

            $scope.$apply();
        });

        function pad(num, size) {
            let s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        }

        this.formatDate = function (dateObj) {
            let year = dateObj.getYear() + 1900;
            let month = dateObj.getMonth() + 1;
            let day = dateObj.getDate();

            return pad(year, 4) + pad(month, 2) + pad(day, 2);
        };

        this.submit = function () {
            this.origin = $rootScope.origin;
            this.destination = $rootScope.destination
            this.myDate = $rootScope.myDate;

            if (this.isValidStation(this.origin)) {
                alert("לא בחרת מוצא");
                return;
            }

            if (this.isValidStation(this.destination)) {
                alert("לא בחרת יעד");
                return;
            }

            if (this.origin === this.destination) {
                alert("אנא בחר מוצא ויעד שונים");
                return;
            }

            $location.path(`/routes-result/${this.origin}/${this.destination}/${this.formatDate(this.myDate)}`);
        };

        this.searchTimesHandler = function () {
          if ($scope.routeForm.$valid) {
            this.submit();
          } else {
            $scope.routeForm.$error.required.forEach((e) =>
                $scope.routeForm[e.$name].$setTouched());
          }
        };

        this.swapStations = function () {
            [$scope.global.origin, $scope.global.destination] =
                [$scope.global.destination, $scope.global.origin];
        };
    }]
})
;

