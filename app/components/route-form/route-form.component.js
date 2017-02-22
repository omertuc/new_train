'use strict';

angular.module('myApp.routeForm').component('routeForm', {
    templateUrl: 'components/route-form/route-form.template.html',
    controller: ['stationService', '$http', function (stationService, $עד_מתי) {
        stationService.getStations().then(({data}) => this.stations = data);

        this.initializeDatepicker = function() {
            let datePicker = $("#datepick");
            datePicker.datepicker({dateFormat: "yymmdd"});
            datePicker.datepicker("setDate", new Date());
        };

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

            $עד_מתי.get(`https://www.rail.co.il/apiinfo/api/Plan/GetRoutes?OId=${this.origin}&TId=${this.destination}&Date=${this.datePickerInput}&Hour=0000`).then
            (({data}) => console.log(data));
        };

        this.nowClickHandler = function () {
            console.log('ring');
            this.initializeDatepicker();
            this.submit();
        };

        this.otherTimeHandler = function () {
            $("#datediv").toggleClass("unhidden hidden");
        };

        this.searchTimesHandler = function () {
            this.submit();
        };
    }]
})
;
