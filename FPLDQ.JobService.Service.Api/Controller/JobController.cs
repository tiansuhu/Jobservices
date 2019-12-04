﻿using FPLDQ.JobService.Log;
using FPLDQ.JobService.Model;
using FPLDQ.JobService.Service.Logic;
using FPLDQ.JobService.Service.Middleware;
using System;
using System.Runtime.CompilerServices;
using System.Web.Http;

namespace FPLDQ.JobService.Service.Api
{
    /// <summary>
    /// job控制器
    /// </summary>
    [SchedulerFilter]
    public class JobController : ApiController
    {

        private static readonly ILogWriter LogWriter = (ILogWriter)MidContainer.GetService(typeof(ILogWriter));

        /// <summary>
        /// 启动
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        [HttpPost]
        public Result Run(JobInfo jobInfo)
        {
            LogWrite.CreateLog().WritLog("启动作业：" + $"id:{jobInfo.Id},{jobInfo.SchedName}.{jobInfo.JobName}");
            return Execute(() => SchedulerManager.Singleton.CreateJob(jobInfo));
        }

        /// <summary>
        /// 暂停
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        [HttpPost]
        public Result Pause(JobInfo jobInfo)
        {
            return Execute(() => SchedulerManager.Singleton.Pause(jobInfo));
        }

        /// <summary>
        /// 恢复
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        [HttpPost]
        public Result Resume(JobInfo jobInfo)
        {
            return Execute(() => SchedulerManager.Singleton.Resume(jobInfo));
        }

        /// <summary>
        /// 停止
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        [HttpPost]

        public Result Remove(JobInfo jobInfo)
        {
            return Execute(() => SchedulerManager.Singleton.Remove(jobInfo));
        }


        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        [HttpPost]
        public Result Update(JobInfo jobInfo)
        {
            return Execute(() => SchedulerManager.Singleton.Update(jobInfo));
        }

        /// <summary>
        /// 更换版本
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        [HttpPost]
        public Result Upgrade(JobInfo jobInfo)
        {
          return  Execute(() => SchedulerManager.Singleton.Upgrade(jobInfo));
        }

        [HttpGet]
        public string GetTest()
        {
            return "this is a test method";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="func"></param>
        /// <param name="method"></param>
        /// <returns></returns>
        private Result Execute(Func<bool> func,[CallerMemberName] string method = null)
        {
            var result = new Result {Code = 200};
            try
            {
               result.Code =  func.Invoke()?200:400;
            }
            catch (Exception ex)
            {
                LogWriter.WriteLog(ex, method);
                result.Msg = ex.Message;
            }
            return result;
        }
    }
}
