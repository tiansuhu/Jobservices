
// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart: ['vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline: ['vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot: ['vendor/jquery/charts/flot/jquery.flot.min.js',
                          'vendor/jquery/charts/flot/jquery.flot.resize.js',
                          'vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          'vendor/jquery/charts/flot/jquery.flot.spline.js',
                          'vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          'vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll: ['vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable: ['vendor/jquery/sortable/jquery.sortable.js'],
      nestable: ['vendor/jquery/nestable/jquery.nestable.js',
                          'vendor/jquery/nestable/nestable.css'],
      filestyle: ['vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider: ['vendor/jquery/slider/bootstrap-slider.js',
                          'vendor/jquery/slider/slider.css'],
      chosen: ['vendor/jquery/chosen/chosen.jquery.min.js',
                          'vendor/jquery/chosen/chosen.css'],
      TouchSpin: ['vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          'vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg: ['vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          'vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable: ['vendor/jquery/datatables/jquery.dataTables.min.js',
                          'vendor/jquery/datatables/dataTables.bootstrap.js',
                          'vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap: ['vendor/jquery/jvectormap/jquery-jvectormap.min.js',
                          'vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          'vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          'vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable: ['vendor/jquery/footable/footable.all.min.js',
                          'vendor/jquery/footable/footable.core.css'],
      wdatePicker: ['vendor/jquery/calendar/WdatePicker.js',
                          'vendor/jquery/calendar/skin/WdatePicker.css'],
      bootstrapTable: ['vendor/jquery/bootstrapTable/bootstrap-table.js',
                          'vendor/jquery/bootstrapTable/bootstrap-table.css'],
      angularFileUpLoad: ['vendor/modules/angular-file-upload/angular-file-upload.js'],

      LoadReport: ['vendor/jquery/calendar/WdatePicker.js',
                        'vendor/jquery/calendar/skin/WdatePicker.css',
                        'WFRes/_Content/themes/ligerUI/Aqua/css/ligerui-all.css',
                        'WFRes/_Content/themes/ligerUI/ligerui-icons.css',
                        'WFRes/_Content/themes/H3Default/H3-ReportTemplate.css',
                        'WFRes/_Scripts/jquery/jquery.lang.js',
                        'vendor/ligerUI/ligerui.all.js',
                        'WFRes/_Scripts/ReportDesigner/ReportViewManager.js'
      ],
      LoadReportFiters: [
                               
                                'css/H3Report/Reporting/ReportView.css',
                                'css/H3Report/jquery.gritter.css',
                                'js/H3Report/jquery.gritter.min.js',
                                'js/H3Report/H3.plugins.system.js',
                                'js/H3Report/bootstraptable/bootstrap-datetimepicker.js',
                                'js/H3Report/bootstraptable/jquery.nicescroll.min.js',
                                'js/H3Report/bootstraptable/bootstrap-datetimepicker.zh-CN.js',
                                'js/H3Report/bootstraptable/bootstrap-table.js',
                                'js/H3Report/bootstraptable/bootstrap-table-zh-CN.js',                                                         
                                //'js/H3Report/dataTables/dataTables.bootstrap.js',
                                'vendor/jquery/datatables/jquery.dataTables.min.js',
                                //'js/H3Report/Form/BaseControl.js',
                                //'js/H3Report/Form/ControlManager.js',
                                // 'js/H3Report/Form/SmartForm.js',
                                //'js/H3Report/Form/FormControls.js',
                                //'js/H3Report/Form/Controls/FormUser.js',
                                'js/H3Report/echart/echarts.js',
                                'js/H3Report/Reporting/Report/ReportBase.js',
                                'js/H3Report/Reporting/ReportViewManagerPc.js',
                                'js/H3Report/bootstrap-multiselect/bootstrap-multiselect.js',
                                'js/H3Report/H3Chart/ChartBase.js',
                                'js/H3Report/H3Chart/excanvas.min.js',
                                'js/H3Report/H3Chart/Chart.js',                             
                                'js/H3Report/html2canvas.js'
      ],
      LoadReportPage: [
      ],
      //流程状态图
      workflowdocument: ['WFRes/assets/stylesheets/themes.min.css',
                            'WFRes/_Content/designer/css/designer.css',
                            'WFRes/_Scripts/jquery/jquery.lang.js',
                            'WFRes/_Scripts/designer/Line.js',
                            'WFRes/_Scripts/designer/misc.js',
                            'WFRes/_Scripts/designer/Activity.js',
                            'WFRes/_Scripts/designer/Workflow.js',
                            'WFRes/_Scripts/designer/ActivityModel.js',
                            'WFRes/_Scripts/designer/ActivityDrag.js',
                            'WFRes/_Scripts/designer/WorkflowDocument.js',
                            'vendor/jquery/workflowdocument/loader.js'
      ],
      SheetWorkflow: ['WFRes/_Content/themes/ligerUI/Aqua/css/ligerui-all.css',
                        'WFRes/assets/stylesheets/ReportUser.css',
                         'WFRes/assets/stylesheets/SheetUserPortal.css',
                        'WFRes/_Scripts/jquery/jquery.lang.js',
                        'WFRes/_Scripts/ligerUI/ligerui.all.js',
                        'WFRes/_Scripts/MvcSheet/SheetControls.js',
                        'WFRes/_Scripts/MvcSheet/MvcSheetUI.js',
                        'WFRes/_Scripts/MvcSheet/Controls/SheetWorkflow.js'],
      SheetUser: [      'WFRes/_Content/themes/ligerUI/Aqua/css/ligerui-all.css',
                        'WFRes/assets/stylesheets/ReportUser.css',
                        'WFRes/assets/stylesheets/SheetUserPortal.css',
                        'WFRes/_Scripts/jquery/jquery.lang.js',
                        'WFRes/_Scripts/ligerUI/ligerui.all.js',
                        'WFRes/_Scripts/MvcSheet/SheetControls.js',
                        'WFRes/_Scripts/MvcSheet/MvcSheetUI.js',
                        'WFRes/_Scripts/MvcSheet/Controls/SheetUser.js'],
      SheetTreeView: [
           'WFRes/_Content/themes/ligerUI/Aqua/css/ligerui-all.css',
                        'WFRes/_Scripts/jquery/jquery.lang.js',
                        'WFRes/_Scripts/ligerUI/ligerui.all.js',
                        'WFRes/_Scripts/MvcSheet/SheetControls.js',
                        'WFRes/_Scripts/MvcSheet/MvcSheetUI.js',
                        'WFRes/_Scripts/TreeView/bootstrap/js/bootstrap-treeview.js?',
                        'WFRes/_Scripts/MvcSheet/Controls/SheetTreeView.js'
      ]
  })
  .constant('ControllerConfig', {
      Organization: {
          LoginIn: "Organization/LoginIn",
          LoginOut: "Organization/LoginOut",
          GetCurrentUser: "Organization/GetCurrentUser",//获取当前登录用户
          GetUserInfo: "PersonalInfo/GetUserInfo",//获取用户信息（传入用户ID）
      },
      Home: {
          GetJobInfo: "Home/GetJobInfo",//获取当前任务调度信息
          AddJobInfo: "Home/AddJobInfo",//获取当前任务调度信息
          RunJob: "Home/RunJob",
          UpdateJob: "Home/UpdateJob",
          Pause: "Home/Pause",
          DeleteJob: "Home/DeleteJob",
          Resume: "Home/Resume",
          Remove:"Home/Remove"

      }
  })
  .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
      $ocLazyLoadProvider.config({
          debug: true,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      'vendor/modules/ng-grid/ng-grid.min.js',
                      'vendor/modules/ng-grid/ng-grid.min.css',
                      'vendor/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      'vendor/modules/angular-ui-select/select.min.js',
                      'vendor/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name: 'angularFileUpload',
                  files: [
                    'vendor/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name: 'ui.calendar',
                  files: ['vendor/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      'vendor/modules/ngImgCrop/ng-img-crop.js',
                      'vendor/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      'vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      'vendor/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      'vendor/modules/angularjs-toaster/toaster.js',
                      'vendor/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      'vendor/modules/textAngular/textAngular-sanitize.min.js',
                      'vendor/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      'vendor/modules/angular-slider/angular-slider.min.js',
                      'vendor/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      'vendor/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      'vendor/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      'vendor/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      'vendor/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      'vendor/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      'vendor/modules/videogular/plugins/ima-ads.min.js'
                  ]
              }
          ]
      });
  }])
;