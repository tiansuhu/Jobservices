using FPLDQ.JobService.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FPLDQ.JobService.MvcController
{
    public class HomeController : ControllerBase
    {
        public override string FunctionCode
        {
            get
            {
                throw new NotImplementedException();
            }
        }
        public void Index()
        {
            Response.Redirect("~/Index.html");//路由跳转到首页
        }

        /// <summary>
        /// 获取作业任务
        /// </summary>
        /// <returns></returns>
        public JsonResult GetJobInfo()
        {
           
            List<JobPager> joblist = new List<JobPager>();
            try
            {
               joblist = JobInfoDb.GetJobPager();
                joblist.ForEach(f =>
                {
                    string nowtime = System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                    f.NEXT_FIRE_TIME = f.NEXT_FIRE_TIME==null ? nowtime : new DateTime(Convert.ToInt64(f.NEXT_FIRE_TIME)).AddHours(8).ToString("yyyy-MM-dd HH:mm:ss");
                    f.PREV_FIRE_TIME = f.PREV_FIRE_TIME == null ? nowtime : new DateTime(Convert.ToInt64(f.PREV_FIRE_TIME)).AddHours(8).ToString("yyyy-MM-dd HH:mm:ss");
                    f.START_TIME = f.START_TIME == null ? nowtime : new DateTime(Convert.ToInt64(f.START_TIME)).AddHours(8).ToString("yyyy-MM-dd HH:mm:ss");
                });
                return Json(new AjaxResult
                {
                    Result = true,
                    Data = joblist,
                    ErrorMsg = null
                }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new AjaxResult
                {
                    Result = false,
                    ErrorMsg = ex.ToString()
                }, JsonRequestBehavior.AllowGet);
            }

        }

        /// <summary>
        /// 添加作业任务
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public JsonResult AddJobInfo(JobInfo jobInfo)
        {
            AjaxResult Res = new AjaxResult();
            try
            {
                jobInfo.JobGroup = jobInfo.SchedName;
                int res = JobInfoDb.AddJobInfo(jobInfo);
                if (res > 0)
                {
                    Res.Result = true;
                }
                else
                {
                    Res.Result = false;

                }

            }
            catch (Exception ex)
            {
                Res.Result = false;
                Res.ErrorMsg = ex.ToString();
            }
            return Json(Res, JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// 启动任务
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public JsonResult RunJob(JobInfo jobInfo)
        {
            if(jobInfo.StartTime < new DateTime(1970, 1, 1, 0, 0, 0))jobInfo.StartTime = System.DateTime.Now;
            if (jobInfo.CreateTime < new DateTime(1970, 1, 1, 0, 0, 0)) jobInfo.StartTime = System.DateTime.Now;

            AjaxResult Res = new AjaxResult();
            try
            {
                Result res1 = new JobLogic().Run(jobInfo);
                if (res1.Code == 200)
                {
                    Res.Result = true;
                }
                else
                {
                    Res.Result = false;
                    Res.ErrorMsg = res1.Msg;
                }
            }
            catch (Exception ex)
            {
                Res.Result = false;
                Res.ErrorMsg = ex.ToString();
            }

            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 暂停
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public JsonResult Pause(JobInfo jobInfo)
        {
            //Result result = new JobLogic().Pause(jobInfo);
            //return Json(result);
            try
            {
                Result result = new JobLogic().Pause(jobInfo);
                return Json(new AjaxResult
                {
                    Result = true,
                    Data = null,
                    ErrorMsg = null
                }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new AjaxResult
                {
                    Result = false,
                    ErrorMsg = ex.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 恢复作业
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public JsonResult Resume(JobInfo jobInfo)
        {
            //Result res = new JobLogic().Resume(jobInfo);
            //return Json(res);
            AjaxResult ajaxResult = new AjaxResult();
            try
            {
                Result res = new JobLogic().Resume(jobInfo);
                if (res.Code == 200)
                {
                    ajaxResult.Result = true;
                }
                else
                {
                    ajaxResult.Result = false;
                    ajaxResult.ErrorMsg = res.Msg;
                }
                

            }
            catch (Exception ex)
            {
                ajaxResult.Result = false;
                ajaxResult.ErrorMsg = ex.ToString();
            }
            return Json(ajaxResult, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult Update(int id)
        {
            //JobInfo jobInfo = JobInfoDb.GetJobInfo(id);
            //return Json(jobInfo, JsonRequestBehavior.AllowGet);
            try
            {
               
                return Json(new AjaxResult
                {
                    Result = true,
                    Data = null,
                    ErrorMsg = null
                }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new AjaxResult
                {
                    Result = false,
                    ErrorMsg = ex.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 更新作业信息
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public JsonResult UpdateJob(JobInfo jobInfo)
        {
            //Result res = new JobLogic().Update(jobInfo);
            //return Json(res);
            AjaxResult ajaxResult = new AjaxResult();
            try
            {
                bool res = new JobLogic().Upgrade(jobInfo);
                if (res)
                {
                    ajaxResult.Result = true;
                }
                else
                {
                    ajaxResult.Result = false;
                }
               

            }
            catch (Exception ex)
            {
                ajaxResult.Result = false;
                ajaxResult.ErrorMsg = ex.ToString();
            }
            return  Json(ajaxResult, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 停止作业
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public JsonResult Remove(JobInfo jobInfo)
        {
            AjaxResult ajaxResult = new AjaxResult();
            try
            {
                Result res = new JobLogic().Remove(jobInfo);
                if (res.Code == 200)
                {
                    ajaxResult.Result = true;
                }
                else
                {
                    ajaxResult.Result = false;
                    ajaxResult.ErrorMsg = res.Msg;
                }

            }
            catch (Exception ex)
            {
                ajaxResult.Result = false;
                ajaxResult.ErrorMsg = ex.ToString();
            }

            return Json(ajaxResult, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DeleteJob(int id)
        {
            AjaxResult R = new AjaxResult();
            try
            {
                if (new JobLogic().Delete(id))
                {

                    R.Result = true;

                }
                else
                    R.Result = false;

            }
            catch (Exception ex)
            {
                R.Result = false;
                R.ErrorMsg = ex.ToString();
            }

            return Json(R, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult Upgrade(int id)
        {
            //JobInfo jobInfo = JobInfoDb.GetJobInfo(id);
            //return Json(jobInfo, JsonRequestBehavior.AllowGet);
            try
            {

                return Json(new AjaxResult
                {
                    Result = true,
                    Data = null,
                    ErrorMsg = null
                }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new AjaxResult
                {
                    Result = false,
                    ErrorMsg = ex.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="jobInfo"></param>
        /// <returns></returns>
        public JsonResult UpgradeJob(JobInfo jobInfo)
        {
            //new JobLogic().Upgrade(jobInfo);
            //return RedirectToAction("Index", "Home");
            try
            {

                return Json(new AjaxResult
                {
                    Result = true,
                    Data = null,
                    ErrorMsg = null
                }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new AjaxResult
                {
                    Result = false,
                    ErrorMsg = ex.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
        }



        /// <summary>
        /// 获取任务信息
        /// </summary>
        public ActionResult GetJobInfoNew() {
            string draw = this.Request["draw"] + string.Empty;
            List<JobPager> joblist = new List<JobPager>();
            joblist.Add(new JobPager { Id = 1, JobName = "job1", SchedName = "sname1" });
            joblist.Add(new JobPager { Id = 2, JobName = "job2", SchedName = "sname2" });
            joblist.Add(new JobPager { Id = 3, JobName = "job3", SchedName = "sname3" });
            joblist.Add(new JobPager { Id = 4, JobName = "job4", SchedName = "sname4" });
            joblist.Add(new JobPager { Id = 5, JobName = "job5", SchedName = "sname5" });
            joblist.Add(new JobPager { Id = 6, JobName = "job6", SchedName = "sname6" });
            joblist.Add(new JobPager { Id = 7, JobName = "job6", SchedName = "sname6" });
            joblist.Add(new JobPager { Id =8, JobName = "job6",  SchedName = "sname6" });
            joblist.Add(new JobPager { Id = 9, JobName = "job6", SchedName = "sname6" });
            joblist.Add(new JobPager { Id = 10, JobName = "job6",SchedName = "sname6" });
            joblist.Add(new JobPager { Id = 6, JobName = "job6", SchedName = "sname6" });
            joblist.Add(new JobPager { Id = 6, JobName = "job6", SchedName = "sname6" });
            joblist.Add(new JobPager { Id = 6, JobName = "job6", SchedName = "sname6" });
            joblist.Add(new JobPager { Id = 6, JobName = "job6", SchedName = "sname6" });
            joblist.Add(new JobPager { Id = 6, JobName = "job6", SchedName = "sname6" });
            joblist.Add(new JobPager { Id = 6, JobName = "job6", SchedName = "sname6" });
            try
            {
                //joblist = JobInfoDb.GetJobPager("wechat");
                return Json(new AjaxResult
                {
                    Result = true,
                    Data = new {
                        draw= draw,
                        recordsTotal= joblist.Count,
                        recordsFiltered= joblist.Count,
                        data = joblist
                    },
                    ErrorMsg = null
                }, JsonRequestBehavior.AllowGet);

            }
            catch(Exception ex)
            {
                return Json(new AjaxResult
                {
                    Result = false,
                    ErrorMsg = ex.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
            
        }
    }
}