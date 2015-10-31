/**
 * Created by cyh on 2015/9/24.
 */
(function () {
    var app = angular.module('app', ['ngMaterial', 'ngRoute'], solution)
        .controller('ProgressCtrl', ProgressCtrl)
        .controller('SearchCtrl', SearchCtrl)
        .controller('CardCtrl', CardCtrl)
        .controller('FABCtrl', FABCtrl)
        .config(function ($mdThemingProvider, $interpolateProvider, $routeProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('green', {
                    'default': '600'
                })
                .accentPalette('orange');
            $interpolateProvider.startSymbol('{`');
            $interpolateProvider.endSymbol('`}');
            $routeProvider
                //.when('/login', {templateUrl: '/static/html/login_script.html'})
                .when('/', {templateUrl: '/html/empty'});
        });
    app.factory("LoginStatu", function ($http) {
        return {
            type: 0,
            name: "",
            host: "",
            changefuncs: [],
            changed: function () {
                for (var i = 0; i < this.changefuncs.length; i++) {
                    this.changefuncs[i]();
                }
            },
            getStatu: function () {
                $http.get('/ajax/getStatu').success(function (it) {
                    return function (data) {
                        if (data.code == 1) {
                            console.log("this: " + it.type);
                            it.type = data.data['type'];
                            it.name = data.data['name'];
                            console.log("ajax ok");
                            console.log(it.changefuncs);
                            it.changed();
                        }
                    }
                }(this));
            }

        }
    });
    function ProgressCtrl($scope){
        $scope.progressValue=0;
        $scope.progressShow='';
        $scope.loading=function(value){
            $scope.progressValue=value;
            if(value==100) $scope.progressShow='ng-hide';
        }
    }

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

    function CardCtrl($scope, LoginStatu, $http) {
        $scope.imagePath = '/static/img/286342.jpg';
        LoginStatu.changefuncs.push(function () {
            if (LoginStatu.type == 1) {
                $scope.isEdit = "";
            }
            else {
                $scope.isEdit = "ng-hide";
            }
        });
        console.log("card ok");
        $scope.loading(50);
    }

    function FABCtrl($scope, $mdDialog, LoginStatu,$http,$mdToast) {
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
        $scope.logout = function () {
            $http.post('/ajax/logout',{
                _xsrf: getCookie('_xsrf')
            }).success(function (data) {
                if (data.code == 1) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('登出完成')
                            .position('top right')
                            .hideDelay(3000)
                    );
                    LoginStatu.type = 0;
                    LoginStatu.name="";
                    LoginStatu.changed();
                }
            });

        };
        var UnLogin = [
            {
                label: "关于",
                ico_url: "/static/img/icons/ic_info_24px.svg",
                func: ''
            },
            {
                label: "登陆",
                ico_url: "/static/img/icons/ic_account_circle_24px.svg",
                func: $scope.showAdvanced
            },
            {
                label: "分享",
                ico_url: "/static/img/icons/ic_share_24px.svg",
                func: ''
            }
        ];
        var MyAccount = [
            {
                label: "登出",
                ico_url: "/static/img/icons/ic_exit_to_app_24px.svg",
                func: $scope.logout
            },
            {
                label: "我的订阅",
                ico_url: "/static/img/icons/ic_bookmark_24px.svg",
                func: ""
            },
            {
                label: "后台设置",
                ico_url: "/static/img/icons/ic_settings_24px.svg",
                func: ""
            },
            {
                label: "添加文章",
                ico_url: "/static/img/icons/ic_add_circle_black_24px.svg",
                func: ""
            }
        ];
        LoginStatu.changefuncs.push(function () {
            if (LoginStatu.type == 0) {
                $scope.btns = UnLogin;
            }
            else {
                $scope.btns = MyAccount;
            }
        });
        console.log("FAB ok");
        LoginStatu.getStatu();
        //$scope.loading(90);
    }

    function DialogController($scope, $mdDialog, $http, $mdToast, LoginStatu) {
        $scope.loading = 'ng-hide';
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            if (answer == "ok") {
                $scope.loading = '';
                $http.post('/ajax/login', {
                    user: $scope.user.username,
                    password: $scope.user.password,
                    _xsrf: getCookie('_xsrf')
                }).success(function (data) {
                    $scope.loading = 'ng-hide';
                    if (data.code == 1) {
                        $mdToast.show(
                            $mdToast.simple()
                                .content('登陆成功')
                                .position('top right')
                                .hideDelay(3000)
                        );
                        LoginStatu.type = 1;
                        LoginStatu.name=$scope.user.username;
                        LoginStatu.changed();
                    }
                    else {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('登陆')
                                .content(data.msg)
                                .ok('知道了')
                        );
                    }
                    $mdDialog.hide();
                }).error(function () {
                    $scope.loading = 'ng-hide';
                });
            }
            else {
                $mdDialog.cancel();
            }
        };

    }

    window.getCookie = function (name) {
        var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
        return r ? r[1] : undefined;
    }


})();