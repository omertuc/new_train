'use strict';

angular.module('myApp.routeForm', ['ngMaterial', 'ngMessages']).component('routeForm', {
    templateUrl: 'components/route-form/route-form.template.html',
    controller: ['stationService', '$http', function (stationService, $http) {
        this.myDate = new Date();

        this.originLabel = "תחנת מוצא";
        this.destinationLabel = "תחנת יעד";

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

            $http.get(
                `https://www.rail.co.il/apiinfo/api/Plan/GetRoutes?OId=${this.origin}&TId=${this.destination}&Date=${this.formatDate(this.myDate)}&Hour=0000`)
                .then(({data}) => console.log(data));
        };

        this.searchTimesHandler = function () {
            this.submit();
        };
    }]
})
;
