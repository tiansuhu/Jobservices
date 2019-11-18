using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FPLDQ.JobService.Log
{
    //==============================================================
    //  作者：tianxy
    //  时间：2019-11-15 14:34:24
    //  文件名：LogWrite
    //  版本：V1.0.1  
    //  说明： 日志服务
    //  修改者：tianxy
    //  修改说明： 
    //==============================================================
    public class LogWrite
    {
        
        public static LogWrite CreateLog()
        {
            LogWrite _logw = new LogWrite();
            return _logw;
        }

        /// <summary>
        /// 记录一般日志
        /// </summary>
        /// <param name="log"></param>
        public void WritLog(string log)
        {
            WriteColorLine(log, ConsoleColor.Green);
            LogHelper.Info(LoggerType.Info, log);
        }

        /// <summary>
        /// 记录degger日志
        /// </summary>
        /// <param name="log"></param>
        public void DuggerLog(string log)
        {
            WriteColorLine(log, ConsoleColor.Red);
            LogHelper.Debug(LoggerType.Info, log);
        }


        static void WriteColorLine(string str, ConsoleColor color)
        {
            ConsoleColor currentForeColor = Console.ForegroundColor;
            Console.ForegroundColor = color;
            Console.WriteLine(str);
            Console.ForegroundColor = currentForeColor;
        }
    }
}
