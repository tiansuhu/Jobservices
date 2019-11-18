using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FPLDQ.JobService
{
    public enum LoggerType
    {
        /// <summary>
        /// 服务异常
        /// </summary>
        WindowsService,
        /// <summary>
        /// 数据库连接异常
        /// </summary>
        DataBaseConnectionError,
        /// <summary>
        /// WebService异常
        /// </summary>
        WebServiceError,
        /// <summary>
        /// 测试文件
        /// </summary>
        Info,
        web

    }
}
