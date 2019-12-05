'use strict';
/**
 * 路由配置
 */
angular.module('app')
  .run(
    ['$rootScope','$location', '$compile', '$state', '$stateParams',
      function ($rootScope,$location, $compile, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
        
          $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
              //to be used for back button  
              ////won`t work when page is reloaded.
              $rootScope.previousState_name = fromState.name;
              $rootScope.previousState_params = fromParams;
              
          });
          $rootScope.back = function () {
              $state.go($rootScope.previousState_name, $rootScope.previousState_params);
          }
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
          // 默认页面
          $urlRouterProvider.otherwise('/platform/login');
          //$urlRouterProvider.otherwise('/app/home/homepage');
          
          $stateProvider
              // 平台页面基类
              .state('platform', {
                  url: '/platform',
                  abstract: true,
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              // 登录界面
              .state('platform.login', {
                  url: '/login',
                  controller: 'LoginController',
                  templateUrl: 'template/login.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'js/controllers/LoginController.js',
                                'js/directives/app-directive.js?v=201802231',
                            ]);
                        }]
                  }
              })
              // 主页面基类
              .state('app', {
                  abstract: true,
                  url: '/app/:TopAppCode',
                  templateUrl: 'template/app.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function ($ocLazyLoad) {
                              return $ocLazyLoad.load([
                                  'js/directives/app-directive.js?v=20190928',
                              ]);
                          }
                      ]
                  }
              })
              .state('app.homepage', {
              url: '/homepage',
              controller: 'homepageController',
              templateUrl: 'template/app/homepage.html',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                               'js/controllers/homepageController.js',
                               'js/controllers/EditJobInfoController.js',
                                'plugins/datatables/jquery.dataTables.min.css',
                                'plugins/datatables/tabletestData.js',
                                'plugins/datatables/jquery-3.3.1.js',
                                'plugins/datatables/jquery.dataTables.min.js',
                               
                             

                          ]);
                      }
                  ]
              }
              }).state('app.JobInfo', {
                  url: '/JobInfo',
                  controller: 'JobInfoController',
                  templateUrl: 'template/app/JobInfo.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function ($ocLazyLoad) {
                              return $ocLazyLoad.load([
                                  'js/controllers/JobInfoController.js'

                              ]);
                          }
                      ]
                  }
              })

      }
    ]
  );