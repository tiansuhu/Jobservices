﻿using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using FPLDQ.JobService.Model;
using Newtonsoft.Json;

namespace FPLDQ.JobService.MvcController
{
    internal class JobLogic
    {
        /// <summary>
        /// 启动
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public Result Run(JobInfo jobInfo)
        {
            return Execute(() =>
            {
                string path = ApiAddressCache.GetApiAddress(jobInfo.SchedName) + "/api/job/run";
               
                return JsonConvert.DeserializeObject<Result>(PostJosn(path, jobInfo));
            });
        }


        /// <summary>
        /// 暂停
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public Result Pause(JobInfo jobInfo)
        {
            return Execute(() =>
            {
                string path = ApiAddressCache.GetApiAddress(jobInfo.SchedName) + "/api/job/pause";
              
                return JsonConvert.DeserializeObject<Result>(PostJosn(path, jobInfo));
            });
        }

        /// <summary>
        /// 恢复
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public Result Resume(JobInfo jobInfo)
        {
            return Execute(() =>
            {
                string path = ApiAddressCache.GetApiAddress(jobInfo.SchedName) + "/api/job/resume";
                return JsonConvert.DeserializeObject<Result>(PostJosn(path, jobInfo));
            });
        }



        /// <summary>
        /// 停止
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public Result Remove(JobInfo jobInfo)
        {
            return Execute(() =>
            {
                string path = ApiAddressCache.GetApiAddress(jobInfo.SchedName) + "/api/job/remove";
                return JsonConvert.DeserializeObject<Result>(PostJosn(path, jobInfo));
            });
        }




        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool Delete(int id)
        {
            bool res = false;
            try
            {
                if (id > 0)
                {
                    res = JobInfoDb.DeleteJobInfo(new JobInfo { IsDeleted = 1, Id = id }) > 0;
                }
            }
            catch (Exception ex)
            {
                //LogService.WriteLog(ex, "Delete 失败");
            }
            return res;
        }



        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public Result Update(JobInfo jobInfo)
        {
            return Execute(() =>
             {
                 string path = "http://localhost:25250//api/job/update";
                 //ApiAddressCache.GetApiAddress(jobInfo.SchedName) + "/api/job/update";
                 return JsonConvert.DeserializeObject<Result>(PostJosn(path, jobInfo));
             });
        }



        /// <summary>
        /// 更换版本
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public bool Upgrade(JobInfo jobInfo)
        {
            try
            {
                return JobInfoDb.UpdateJobInfo(jobInfo) > 0;
            }
            catch (Exception ex)
            {
               // LogService.WriteLog(ex, "Upgrade 失败");
            }
            return false;
        }


        /// <summary>
        /// 处理调度服务器返回的结果
        /// </summary>
        /// <param name="result"></param>
        /// <param name="func"></param>
        /// <returns></returns>
        private bool ProcessResult(Result result, Func<int> func = null)
        {
            if (result.Code == 200)
            {
                if (func == null || func() > 0)
                {
                    return true;
                }
            }
            throw new Exception(result.Msg);
        }
        

        /// <summary>
        /// 执行
        /// </summary>
        /// <param name="func"></param>
        /// <param name="method"></param>
        /// <returns></returns>
        public Result Execute(Func<Result> func, [CallerMemberName] string method = null)
        {
            Result result = new Result { Code = 400 };
            try
            {
                result = func.Invoke();
            }
            catch (Exception ex)
            {
                //LogService.WriteLog(ex, $"{method} 失败");
                result.Msg = ex.Message;
            }
            return result;
        }


        /// <summary>
        /// 请求调度器的api地址
        /// </summary>
        /// <param name="path"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        private static string PostJosn(string path, JobInfo value)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = client.PostAsJsonAsync<JobInfo>(path, value).Result;
                return response.Content.ReadAsStringAsync().Result;
            }
        }
    }
}