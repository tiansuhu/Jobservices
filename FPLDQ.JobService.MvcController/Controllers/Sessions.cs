using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FPLDQ.JobService.MvcController
{
    //==============================================================
    //  作者：tianxy
    //  时间：2019-8-30 14:57:22
    //  文件名：Session
    //  版本：V1.0.1  
    //  说明： web中对于Session的引用
    //  修改者：tianxy
    //  修改说明： 
    //==============================================================
    public class Sessions
    {
        /// <summary>
        /// 获得登陆用户的验证器
        /// </summary>
        /// <returns></returns>
        public static string GetUserValidator()
        {
            return "UserValidator";
        }

    }
}
