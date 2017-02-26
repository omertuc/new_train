'use strict';

angular.module('myApp.resultsService', [])
    .factory('resultsService', [function () {
        return {
            setResults: function (results) {
                this.results = results;
            },

            getResults: function () {
                if (!this.results) {
                    console.log("Error! No results yet!");
                    this.results = null;
                }

                return this.results;
            }
        };
    }]);