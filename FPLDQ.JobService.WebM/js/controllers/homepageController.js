app.controller('homepageController', ['$rootScope', '$scope', '$translate', '$http', '$location', '$state', '$stateParams', '$timeout', '$interval', 'ControllerConfig', '$modal',
    function ($rootScope, $scope, $translate, $http, $location, $state, $stateParams, $timeout, $interval, Controller, $modal) {

        //进入视图触发
        $scope.$on('$viewContentLoaded', function (event) {
            $scope.JobInfo = [];
            $scope.LoadJobInfo();
        });

        $scope.LoadJobInfo = function () {
            $.ajax({
                url: Controller.Home.GetJobInfo,
                data: {},
                type: "Post",
                async: false,
                success: function (result) {
                    if (result.Result) {
                        $scope.JobInfo = result.Data;
                    }
                }
            }
            );
        }

        $scope.AddJobInfo = function () {
            $scope.AddJobInfoModal();
        }
        $scope.EditJobInfo = function (job) {
            //TODO:编辑作业
            $scope.EditJobInfoModal(job);


        }
        $scope.DeleteJobInfo = function (id) {
            //TODO:删除作业
            $.ajax({
                url: Controller.Home.DeleteJob,
                data: { id: id },
                type: "Post",
                async: false,
                success: function (result) {
                    if (result.Result) {
                        $scope.LoadJobInfo();
                    }
                    else
                        alert("删除失败失败,原因：" + result.ErrorMsg)
                }
            }
            );
        }


        $scope.RunJob = function (job) {
            //TODO 启动
            $.ajax({
                url: Controller.Home.RunJob,
                data: { JobInfo: job },
                type: "Post",
                async: false,
                success: function (result) {
                    if (result.Result) {
                        $scope.LoadJobInfo();

                    }
                    else
                        alert("启动失败,原因：" + result.ErrorMsg)
                }
            }
            );
        }
        $scope.PauseJobInfo = function (job) {
            $.ajax({
                url: Controller.Home.Pause,
                data: { JobInfo: job },
                type: "Post",
                async: false,
                success: function (result) {
                    if (result.Result) {
                        $scope.LoadJobInfo();

                    }
                    else
                        alert("暂停失败,原因：" + result.ErrorMsg)
                }
            }
            );
        }
        $scope.ResumeJob = function (job) {
            $.ajax({
                url: Controller.Home.Resume,
                data: { JobInfo: job },
                type: "Post",
                async: false,
                success: function (result) {
                    if (result.Result) {
                        $scope.LoadJobInfo();

                    }
                    else
                        alert("恢复失败,原因：" + result.ErrorMsg)
                }
            }
            );
        }

        $scope.RemoveJob = function (job) {
            $.ajax({
                url: Controller.Home.Remove,
                data: { JobInfo: job },
                type: "Post",
                async: false,
                success: function (result) {
                    if (result.Result) {
                        $scope.LoadJobInfo();

                    }
                    else
                        alert("停止失败,原因：" + result.ErrorMsg)
                }
            }
            );
        }

        

        $scope.AddJobInfoModal = function () {
            var loadjobinfo = $scope.LoadJobInfo;
            var modalEditJobInfo = $modal.open({
                templateUrl: 'template/app/EditJobInfo.html?' + Math.random(),         // 指向上面创建的视图
                controller: function ($scope, $modalInstance) {
                    $scope.Title = "添加任务信息";
                    $scope.Button_OK = true;
                    $scope.Button_OK_Text = "添加";
                    $scope.ok = function () {

                        $.ajax({
                            url: Controller.Home.AddJobInfo,
                            data: { JobInfo: $scope.JobInfo },
                            type: "Post",
                            async: false,
                            success: function (result) {
                                if (result.Result) {
                                    loadjobinfo();
                                    $modalInstance.close();  // 点击确定按钮
                                   // $scope.JobInfo = result.Data;
                                }
                                else
                                    alert("添加失败,原因：" + result.ErrorMsg)
                            }
                        }
                        );

                        
                    };
                    $scope.cancel = function () {
                        $modalInstance.close();  // 点击确定按钮
                    }
                },
                size: "lg",
                keyboard: false,
                backdrop: "static",

            });
            // 弹窗点击确定的回调事件
            modalEditJobInfo.result.then(function (data) {
                console.log(data);


            });
        }
        
        $scope.EditJobInfoModal = function (job) {
            var loadinfo = $scope.LoadJobInfo;
            //TODO:弹窗编辑作业
            var modalEditJobInfo = $modal.open({
                templateUrl: 'template/app/EditJobInfo.html?' + Math.random(),         // 指向上面创建的视图
                controller: function ($scope, $modalInstance) {
                    $scope.Title = "编辑任务信息";
                    $scope.Button_OK = true;
                    $scope.Button_OK_Text = "更新";
                    $scope.JobInfo = job;
                    $scope.ok = function () {
                        $.ajax({
                            url: Controller.Home.UpdateJob,
                            data: { JobInfo: $scope.JobInfo },
                            type: "Post",
                            async: false,
                            success: function (result) {
                                if (result.Result) {
                                    loadinfo();//重新加载列表
                                    $modalInstance.close();  // 点击确定按钮
                                    // $scope.JobInfo = result.Data;
                                }
                                else
                                    alert("编辑失败,原因：" + result.ErrorMsg)
                            }
                        }
                        );
                        $modalInstance.close();  // 点击确定按钮
                    };
                    $scope.cancel = function () {
                        $modalInstance.close();  // 点击确定按钮
                    }
                },
                size: "lg",
                keyboard: false,
                backdrop: "static",

            });
            // 弹窗点击确定的回调事件
            modalEditJobInfo.result.then(function (data) {
                console.log(data);


            });
        }


    }]);