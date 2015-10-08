/**
 * Created by cyh on 2015/9/24.
 */
(function () {
    angular.module('app', ['ngMaterial', 'ngRoute'])
        .controller('SearchCtrl', SearchCtrl)
        .controller('CardCtrl', CardCtrl)
        .controller('FABCtrl', FABCtrl)
        .config(function ($mdThemingProvider, $interpolateProvider, $routeProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('green',{
                    'default': '600'
                })
                .accentPalette('orange');
            $interpolateProvider.startSymbol('{`');
            $interpolateProvider.endSymbol('`}');
            $routeProvider
                //.when('/login', {templateUrl: '/static/html/login_script.html'})
                .when('/', {templateUrl: '/html/empty'});
        });
    function SearchCtrl($timeout, $q, $log) {
        var self = this;
        self.simulateQuery = false;
        self.isDisabled = false;
        // list of `state` value/display objects
        self.states = loadAll();
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch(query) {
            var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }
    }

    function CardCtrl($scope) {
        $scope.imagePath = '/static/img/286342.jpg';
    }

    function FABCtrl($scope, $mdDialog) {
        this.isOpen = false;
        this.selectedMode = 'md-scale';
        this.selectedDirection = 'up';

        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '/static/html/login.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    console.log('You said the information was "' + answer + '".');
                }, function () {
                    console.log('You cancelled the dialog.');
                });
        };
        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
            $scope.user={
                firstName:""
            }
        }
    }


})();