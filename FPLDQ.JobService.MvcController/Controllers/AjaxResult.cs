using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FPLDQ.JobService.MvcController
{
    //==============================================================
    //  作者：tianxy
    //  时间：2019-11-25 18:05:59
    //  文件名：AjaxResult
    //  版本：V1.0.1  
    //  说明： 
    //  修改者：tianxy
    //  修改说明： 
    //==============================================================
   public class AjaxResult
    {
        /// <summary>
        /// 返回结果
        /// </summary>
        public bool Result { get; set; }

        /// <summary>
        /// 返回的数据
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// 返回的错误信息
        /// </summary>
        public string ErrorMsg { get; set; }
    }
}
