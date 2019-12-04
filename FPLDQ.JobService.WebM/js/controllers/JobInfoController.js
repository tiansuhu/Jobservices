app.controller('JobInfoController', ['$rootScope', '$scope', '$translate', '$http', '$location', '$state', '$stateParams', '$timeout', '$interval', 'ControllerConfig',
    function ($rootScope, $scope, $translate, $http, $location, $state, $stateParams, $timeout, $interval, Controller) {

        //进入视图触发
        $scope.$on('$viewContentLoaded', function (event) {
            $scope.homepage = "任务列表";
            $scope.JobInfolist = [];
            $scope.LoadJobInfo();
        });

        $scope.LoadJobInfo = function () { }


        

    }]);