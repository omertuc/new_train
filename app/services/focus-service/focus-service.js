angular.module('myApp.focusService', []).
    factory('focus', ['$timeout', '$window', function ($timeout, $window) {
    return function (id) {
        // timeout makes sure that it is invoked after any other event has been triggered.
        // e.g. click events that need to run before the focus or
        // inputs elements that are in a disabled state but are enabled when those events
        // are triggered.
        $timeout(function () {
            var element = $window.document.getElementById(id);

            if (element) {
                console.log(`focusing on ${id}`);
                element.focus();
            }
            else {
                console.log(`Element ${id} not found`);
            }
        });
    };
}]);