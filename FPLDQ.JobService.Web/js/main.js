'use strict';

/* 
    Controllers 
*/

angular.module('app')
  .controller('AppCtrl', ['$rootScope', '$scope', '$translate', '$localStorage', '$window', '$interval',
      '$http', '$state', '$stateParams', '$location', '$document', '$modal', 'ControllerConfig', '$filter', '$compile', '$timeout', 'menuhandle',
 function ($rootScope, $scope, $translate, $localStorage, $window, $interval, $http, $state, $stateParams, $location, $document, $modal, ControllerConfig, $filter, $compile, $timeout, menuhandle) {
     var isIE = !!navigator.userAgent.match(/MSIE/i);
     isIE && angular.element($window.document.body).addClass('ie');
     $scope.password = "";
     $scope.ShowTrialTag = false;
     // config
     $scope.app = {
         name: "FPLDQ",
         version: '1.0.0',
         locked: false,
         logoSimple: "images/img/H1.png",//配置菜单页面图片
         logoFull: "images/img/logo.png",//配置菜单页面图片
         // 颜色定义
         color: {
             primary: '#7266ba',
             info: '#23b7e5',
             success: '#27c24c',
             warning: '#fad733',
             danger: '#f05050',
             light: '#e8eff0',
             dark: '#3a3f51',
             black: '#1c2b36'
         },
         // 页面显示定义
         settings: {
             themeID: 8,
             navbarHeaderColor: 'bg-info dker',
             navbarCollapseColor: 'bg-info dker',
             asideColor: 'bg-light dker b-r',
             headerFixed: true,
             asideFixed: true,
             asideFolded: false,
             asideDock: false,
             container: false,
             allowSetting: false,  // 是否可配置选项
             autoLogin: false      // 是否允许
         }
     }

     // 设置信息本地存储
     if (angular.isDefined($localStorage.settings)) {
         $scope.app.settings = $localStorage.settings;
     }
     else {
         $localStorage.settings = $scope.app.settings;
     }

     $scope.$watch('app.settings', function () {
         if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
             $scope.app.settings.headerFixed = true;
         }
         $localStorage.settings = $scope.app.settings;
     }, true);

     // 设置语言
     $scope.setLang = function (langKey, $event) {
         debugger
         // set the current lang
         $scope.selectLang = $scope.langs[langKey];
         // You can change the language during runtime
         $translate.use(langKey);
         $scope.lang.isopen = !$scope.lang.isopen;
         setItem(langKey);
         window.sessionStorage.removeItem("LanguageData");
     };

     // 获取是否是手机客户端访问
     $scope.isSmartDevice = function ($window) {
         var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
         return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
     }

     $scope.getUrlParam = function (name) {
         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if (r != null) return unescape(r[2]); return null;
     };

     
     

     //刷新
     $scope.refresh = function () {
         var Token = $scope.getUrlParam("Token");
         // 获取当前用户
         $http({
             url: ControllerConfig.Organization.GetCurrentUser,
             method: "post",
             params: {
                 random: new Date().getTime(),
                 Token: Token
             }
         })
         .success(function (result, header, config, status) {
             if (!result.Result) {
                 $state.go("platform.login");
             }
             else {
                 $scope.user = result.Data;
                 $scope.ShowMenu();
                 var rUrl = $scope.getUrlParam("RedirectUrl");
                 if (rUrl) {
                     window.location.href = rUrl;
                 }
                 else if (Token) {
                     var rUrl = window.location.href.replace(window.location.search, "")
                     var index = rUrl.indexOf("#/");
                     rUrl = rUrl.substring(0, index);
                     window.location.href = rUrl + "#/app/Workflow/MyUnfinishedWorkItem";
                 }
             }
         })
         .error(function (data, header, config, status) {
             $state.go("platform.login");
         });
     }

     // 如果用户为空，才重新获取用户
     if (!$scope.user) {
         if (window.sessionStorage.getItem("scopeUser") != null) {
             $scope.user = JSON.parse(window.sessionStorage.getItem("scopeUser"));
         }
         else {
             $scope.refresh();
         }
     }

     

     // 退出系统
     $scope.loginOut = function () {
         $http({
             url: ControllerConfig.Organization.LoginOut,
             params: {
                 rendom: new Date().getTime()
             }
         })
         .success(function (result, header, config, status) {
             $scope.user = null;
             window.sessionStorage.removeItem("scopeUser");
             $state.go("platform.login");
         })
         .error(function (data, header, config, status) {
             window.sessionStorage.removeItem("scopeUser");
             $state.go("platform.login");
         });
     }

     // 每次进入View时触发
     $scope.$on('$viewContentLoaded', function (event) {
         $.notify.closeAll();//关闭所有弹窗
         
     });

     // 登录事件，由LoginController触发
     $scope.$on("LoginIn", function (event, args) {
         if (args.Success) {
             
         }

     });

     $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

     });
     $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
         $scope.ShowMenu();
     });
     //子菜单第一级如果是外链跳转(有多级子菜单)，则会执行这个方法，加载左边栏子菜单
     $scope.GoHrefState = function (isGo, code, url, hasMenu) {
         if (!hasMenu) {
             $.notify({ message: $translate.instant("Apps.NoExistSubMenu"), status: "danger",timeout:1000 });
             return false;
         }
         if (isGo) {
             $state.go("app.GoHref", { TopAppCode: code, Url: url });
         }
     }
     //显示菜单
     $scope.ShowMenu = function () {
         if ($scope.user) {
             //重新定义菜单显示逻辑
             if ($scope.menuIndex) { }
             else {
                 $scope.menuIndex = menuhandle.getMenuIndex($scope.user.FunctionViewModels);
             }
             $scope.menuData = menuhandle.getAsideMenus($scope.user.FunctionViewModels, $scope.menuIndex);
         }
     }

     // Ajax全局认证 $(document)
     $document.ajaxError(function (e, status, responseText, statusText) {
         if (statusText == "Unauthorized") {// 未认证
             $scope.$state.go("platform.login");
         }
     });

     // 注册整个文档点击事件，关闭表单
     $document.on("click", function (event) {
         //流程表单不关闭
         if ($scope.$state.current.name == "app.EditBizObject") {
             return;
         }

         //非待办发起
         if ($scope.$state.current.name != "app.MyUnfinishedWorkItem"
             && $scope.$state.current.name != "app.MyWorkflow"
             && $scope.$state.current.name != "app.MyUnfinishedWorkItemByGroup"
             && $scope.$state.current.name != "app.MyUnfinishedWorkItemByBatch") {
             $scope.ClosePage();
             return;
         }

         //已经保存
         if ($scope.IsSave == true || $(event.target).parents("ul").hasClass("nav")) {
             $scope.ClosePage();
             return;
         }

         //点击收起左侧菜单时，不关闭表单
         if ($(event.target).hasClass("asideFolded")
             || $(event.target).hasClass("fa-dedent")
             || $(event.target).hasClass("fa-dedent-add")) {
             return;
         }

         if ($(event.target).parents("form").length == 1) {
             return;
         }


         if (!$(event.target).attr("target") || $(event.target).attr("target") != ".app-aside-right") {
             var targeturl = $(".app-aside-right").find("iframe").attr("src");
             if (targeturl && targeturl.indexOf("InstanceDetail") == -1) {
                 event.stopPropagation();
                 event.preventDefault();
                 // 弹出模态框
                 var modalInstance = $modal.open({
                     templateUrl: 'template/ProcessCenter/ConfirmModal.html',
                     size: "sm",
                     controller: function ($scope, $modalInstance) {
                         $scope.Title = $translate.instant("WarnOfNotMetCondition.Tips");
                         $scope.Message = $translate.instant("msgGlobalString.ConfirmLeave");
                         $scope.Button_OK = true;
                         $scope.Button_OK_Text = $translate.instant("QueryTableColumn.Button_OK");
                         $scope.Button_Cancel = true;
                         $scope.Button_Cancel_Text = $translate.instant("QueryTableColumn.Button_Cancel");
                         $scope.ok = function () {
                             $modalInstance.close();  // 点击确定按钮
                         };
                         $scope.cancel = function () {
                             $modalInstance.dismiss('cancel'); // 退出
                         }
                     }
                 });
                 //弹窗点击确定的回调事件
                 modalInstance.result.then(function () {
                     $scope.ClosePage();
                 });
                 return;
             }
         }
         $scope.ClosePage();
     });

     $scope.ClosePage = function () {
         $(".app-aside-right").find("iframe").attr("src", "");
         $(".app-aside-right").removeClass("show");
         $scope.IsSave = false;
     }

     $scope.modalDialogs = [];

     // 多语言设置
     $scope.lang = { isopen: false };
     $scope.langs = { zh_CN: '中文', en: 'English' };
     $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "中文";
     var setItem = function (langKey) {
         if (!langKey) {
             if ($scope.selectLang == "中文") {
                 langKey = "zh_CN";
             }
         }
         if (langKey == "zh_CN") {
             window.localStorage.setItem("H3.Language", "zh_cn");
         } else {
             window.localStorage.setItem("H3.Language", "en_us");
         }
     }
     setItem();
     // 获取当前是否移动端访问
     $scope.isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

     
     // 编辑密码
     $scope.showUserPasswordModal = function () {
         var modalInstance = $modal.open({
             templateUrl: 'template/ProcessCenter/UserPassword.html',         // 指向上面创建的视图
             controller: 'UserPasswordModalController', // 初始化模态范围             
         });
         // 弹窗点击确定的回调事件
         modalInstance.result.then(function () {
             // 弹出模态框
             var modalInstance = $modal.open({
                 templateUrl: 'template/ProcessCenter/ConfirmModal.html',
                 size: "sm",
                 backdrop: "static",
                 keyboard: false,
                 controller: function ($scope, $modalInstance) {
                     $scope.Title = $translate.instant("WarnOfNotMetCondition.Tips");
                     $scope.Message = $translate.instant("LoginLog.ResetPasswordSuccess");
                     $scope.Button_OK = true;
                     $scope.Button_OK_Text = $translate.instant("QueryTableColumn.Button_OK");
                     $scope.ok = function () {
                         $modalInstance.close();  // 点击确定按钮
                     };
                 }
             });
         });
     }
   
     //页面与iframe消息传递
     window.addEventListener('message', function (event) {
         var msg = event.data.toString();
         if (msg.indexOf("TotalCount") > -1) {
             $scope.GetItemCount();
         } else if (msg.indexOf("ClosePage") > -1) {
             $scope.ClosePage();
             $scope.GetItemCount();
             $state.go($state.$current.self.name, {}, { reload: true });
         } else if (msg.indexOf("IsSave") > -1) {
             $scope.IsSave = true;
         } else if (msg.indexOf("showUserInfoModal") > -1) {
             var id = msg.split(":")[1];
             $scope.showUserInfoModal(id);
         } else if (msg.indexOf("ParentReload") > -1) {
             $timeout(function () {
                 top.window.location.reload();
             }, 1000 * 2);
         }
     })

 }]);




