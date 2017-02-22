'use strict';

angular.module('myApp.routeForm').component('routeForm', {
    templateUrl: 'components/route-form/route-form.template.html',
    controller: [function () {
        this.submit = function () {

            let originSelect = document.getElementById('origin');
            let selectedOrigin = originSelect.options[originSelect.selectedIndex].value;

            let destinationSelect = document.getElementById('destination');
            let selectedDestination = destinationSelect.options[destinationSelect.selectedIndex].value;

            if (selectedOrigin == 0) {
                alert("לא בחרת מוצא");
                return;
            }

            if (selectedDestination == 0) {
                alert("לא בחרת יעד");
                return;
            }

            if (selectedOrigin == selectedDestination) {
                alert("אנא בחר מוצא ויעד שונים");
                return;
            }

            // Submit form.
            $('#SendToServer').submit();
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
