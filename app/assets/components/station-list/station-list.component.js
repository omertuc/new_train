'use strict';

import stationListTemplate from './station-list.template.html!ng-template';
import './station-list.style.css!';

angular.module('myApp.stationList', []).component('stationList', {
    templateUrl: stationListTemplate.templateUrl,
    controllerAs: '$ctrl',
    controller: ['$scope', '$element', function ($scope, $element) {
        $scope.searchTerm;

        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };

        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        $element.find('input').on('keydown', function(ev) {
            let allowedKeys = ['ArrowDown', 'ArrowUp'];

            if (!(allowedKeys.includes(ev.key)))
                ev.stopPropagation();
        });

        this.orderProp = 'Heb[0]';
    }],
    bindings: {
        stationList: '<',
        selectFormId: '@',
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
