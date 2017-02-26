'use strict';

angular.module('myApp.routeForm', ['ngMaterial', 'ngMessages']).component('routeForm', {
    templateUrl: 'components/route-form/route-form.template.html',
    controller: ['resultsService', 'stationService', '$http', '$location', function (resultsService, stationService, $http, $location) {
        this.myDate = new Date();

        this.originLabel = "תחנת מוצא";
        this.destinationLabel = "תחנת יעד";

        this.constructApiString = function(origin, destination, searchDate) {
          let requestString = 'https://www.rail.co.il/apiinfo/api/Plan/GetRoutes?';

          requestString += `OId=${origin}&TId=${destination}&Date=${this.formatDate(searchDate)}&Hour=0000`;

          return requestString;
        };

        this.minDate = new Date(
            this.myDate.getFullYear(),
            this.myDate.getMonth(),
            this.myDate.getDate()
        );

        this.maxDate = new Date(
            this.myDate.getFullYear(),
            this.myDate.getMonth() + 2,
            this.myDate.getDate()
        );

        this.isOpen = false;

        this.showSpinner = true;

        stationService.getStations().then(({data}) => {
            this.stations = data;
            this.showSpinner = false;
            stationService.generateNameCache(data);
        });

        this.isValidStation = function (stationId) {
            return this.stations.map((stationObject) => Number(stationObject.Id))
                    .filter((mappedId) => stationId === mappedId).length > 0;
        };

        function pad(num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        }

        this.formatDate = function (dateObj) {
            let year = dateObj.getYear() + 1900;
            let month = dateObj.getMonth() + 1;
            let day = dateObj.getDate();

            return pad(year, 4) + pad(month, 2) + pad(day, 2);
        }


        this.submit = function () {
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

            $http.get(this.constructApiString(this.origin, this.destination, this.myDate))
                .then(({data}) => {
                    resultsService.setResults(data);
                    $location.path('/routes-result');
                });
        };

        this.searchTimesHandler = function () {
            this.submit();
        };
    }]
})
;
