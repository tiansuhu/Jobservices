app.controller('LoginController', ['$rootScope', '$scope', '$translate', '$http', '$location', '$state', '$stateParams', '$timeout', '$interval', 'ControllerConfig',
function ($rootScope, $scope, $translate, $http, $location, $state, $stateParams, $timeout, $interval, Controller) {
    //进入页面触发
    $rootScope.$on('$viewContentLoaded', function () {
        $scope.Title = "登录";
    });
    $scope.loginIn = function () {
        $state.go("app.homepage", { TopAppCode: "home" });

        return;
        $scope.userCode = $("#txtUser").val();
        $scope.userPassword = $("#txtPassword").val();
        if ($scope.userCode == "" || $scope.userCode == undefined) {
            var defaults = {
                message: '用户代码不能为空',
                status: 'warning',
                timeout: 3000,
                group: null,
                pos: 'top-center'}

            $.notify(defaults);
            return;
        }
        if ($scope.userPassword == "" || $scope.userPassword == undefined) {
            var defaults = {
                message: '密码不能为空',
                status: 'warning',
                timeout: 3000,
                group: null,
                pos: 'top-center'
            }
            $.notify(defaults);
            return;
        }
        $http({
            url: Controller.Organization.LoginIn,
            method:"post",
            data: {
                userCode: this.userCode,
                password: this.userPassword,
                rendom: new Date().getTime()
            }
        })
        .success(function (result, header, config, status) {
           // $scope.$emit("LoginIn", result);//调用main.js 中的LoginIn事件
            // 设置主界面
            if (result.Result) {
                console.log(result);
                $state.go("app.homepage", { TopAppCode: "home" });
            }
            else {
                var defaults = {
                    message: result.Message,
                    status: 'error',
                    timeout: 3000,
                    group: null,
                    pos: 'top-center'
                }
                $.notify(defaults);
            }
        })
        .error(function (data, header, config, status) {
            var defaults = {
                message: '异常错误',
                status: 'error',
                timeout: 3000,
                group: null,
                pos: 'top-center'
            }

            $.notify(defaults);
        });
    }
}]);