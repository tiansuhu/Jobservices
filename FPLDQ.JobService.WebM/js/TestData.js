var menuData = [
    {
        Code: "Home",
        DisplayName: "任务调度管理系统",
        HasChildMenu: true,
        GoMenu: "",
        ChildMenuData: [
            {
                Code: "Job",
                DisplayName: "任务调度管理",
                GoMenu:"",
                HasChildMenu: true,
                ChildMenuData: [{
                    Code: "JobInfo",
                    DisplayName: "作业信息",
                    GoMenu: "goMenu('app.JobInfo','')",
                    HasChildMenu: false,
                    ChildMenuData:[]

                },
                {
                    Code: "JobInfonew",
                    DisplayName: "作业信息2",
                    GoMenu: "goMenu('app.homepage','')",
                    HasChildMenu: false,
                    ChildMenuData: []
                },
                {
                    Code: "Login",
                    DisplayName: "登录页",
                    GoMenu: "goMenu('platform.login','')",
                    HasChildMenu: false,
                    ChildMenuData: []
                }
                ],
            }
        ]
    },
    {
        Code: "Demo",
        DisplayName: "Demo",
        HasChildMenu: true,
        GoMenu: "",
        ChildMenuData: [

        ]
    }

];