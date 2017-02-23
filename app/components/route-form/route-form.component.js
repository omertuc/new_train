'use strict';

angular.module('myApp.routeForm', ['ngMaterial', 'ngMessages']).component('routeForm', {
    templateUrl: 'components/route-form/route-form.template.html',
    controller: ['stationService', '$http', function (stationService, $http) {
        this.myDate = new Date();

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

        stationService.getStations().then(({data}) => this.stations = data);

        this.isValidStation = function (stationId) {
            return this.stations.map((stationObject) => Number(stationObject.Id))
                    .filter((mappedId) => stationId === mappedId).length > 0;
        };

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

            $http.get(`https://www.rail.co.il/apiinfo/api/Plan/GetRoutes?OId=${this.origin}&TId=${this.destination}&Date=${this.datePickerInput}&Hour=0000`).then
            (({data}) => console.log(data));
        };

        this.searchTimesHandler = function () {
            this.submit();
        };
    }]
})
;
