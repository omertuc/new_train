'use strict';

angular.module('myApp.routeForm').component('routeForm', {
    templateUrl: 'components/route-form/route-form.template.html',
    controller: ['stationService', function (stationService) {
        stationService.getStations()
            .then(({data}) => this.stations = data);

        this.submit = function () {
            if (this.origin == 0) {
                alert("לא בחרת מוצא");
                return;
            }

            if (this.destination == 0) {
                alert("לא בחרת יעד");
                return;
            }

            if (this.origin == this.destination) {
                alert("אנא בחר מוצא ויעד שונים");
                return;
            }


            // TODO: Submit form somehow
        },

        this.nowClickHandler = function () {
            console.log('ring');
            $("#datepick").datepicker("setDate", new Date());
            this.submit();
        },

        $(document).ready(function () {
            let datePicker = $("#datepick");

            datePicker.datepicker({
                dateFormat: "yy-mm-dd"
            });

            datePicker.datepicker("setDate", new Date());
        });

        $(function () {
            $("#OtherTime")
                .button()
                .click(function (event) {
                    event.preventDefault();

                    $("#datediv").toggleClass("unhidden hidden");
                });
        });

        $(function () {
            $("#SearchTimes")
                .button()
                .click(function (event) {
                    event.preventDefault();

                    submit();
                });
        });
    }]
})
;
