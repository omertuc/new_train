'use strict';

angular.module('myApp.stationList').component('stationList', {
    templateUrl: 'components/station-list/station-list.template.html',
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', 'focus', function ($scope, $element, focus) {
        $scope.searchTerm;

        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };

        $scope.focusHeader = function() {
            focus('stationSearch');
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
}).directive('forceSelectFocus', function() {
    return {
        restrict: 'A',
        require: ['^^mdSelect', '^ngModel'],
        link: function(scope, element) {
            scope.$watch(function () {
                let foundElement = element;
                while (!foundElement.hasClass('md-select-menu-container')) {
                    foundElement = foundElement.parent();
                }
                return foundElement.hasClass('md-active');
            }, function (newVal) {
                if (newVal) {
                    let foundElement = element;
                    while (!foundElement.hasClass('md-select-menu-container')) {
                        foundElement = foundElement.parent();
                    }

                    foundElement[0].scrollTop = 0;

                    element.focus();
                }
            })
        }
    }
});
