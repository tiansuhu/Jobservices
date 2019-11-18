using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FPLDQ.JobService.Log
{
    public class LogHelper
    {
        static LogHelper()
        {
            FileInfo log4netFile = new FileInfo(string.Format("{0}\\log4net.config", AppDomain.CurrentDomain.BaseDirectory));
            log4net.Config.XmlConfigurator.Configure(log4netFile);
        }
        /// <summary>
        /// 记录调试信息
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        public static void Debug(LoggerType loggerType, string LogStr)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());
            if (log.IsDebugEnabled)
            {
                log.Debug(LogStr);
            }

        }
        /// <summary>
        /// 记录调试信息
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        /// <param name="ex">异常信息</param>
        public static void Debug(LoggerType loggerType, string LogStr, Exception ex)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());
            if (log.IsDebugEnabled)
            {
                log.Debug(LogStr, ex);
            }

        }
        /// <summary>
        /// 记录通知日志
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        public static void Info(LoggerType loggerType, string LogStr)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());
            if (log.IsInfoEnabled)
            {
                log.Info(LogStr);
            }
        }
        /// <summary>
        /// 记录通知日志
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        public static void Info(LoggerType loggerType, string LogStr, Exception ex)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());
            if (log.IsInfoEnabled)
            {
                log.Info(LogStr, ex);
            }
        }
        /// <summary>
        /// 记录警告信息
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        public static void Warn(LoggerType loggerType, string LogStr)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());
            if (log.IsWarnEnabled)
            {
                log.Warn(LogStr);
            }
        }
        /// <summary>
        /// 记录警告信息
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        /// <param name="Ex">异常类</param>
        public static void Warn(LoggerType loggerType, string LogStr, Exception ex)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());
            if (log.IsWarnEnabled)
            {
                log.Warn(LogStr, ex);
            }
        }
        /// <summary>
        /// 记录错误信息
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        public static void Error(LoggerType loggerType, string LogStr)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());
            if (log.IsErrorEnabled)
            {
                log.Error(LogStr);
            }
        }

        /// <summary>
        /// 记录错误信息
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        /// <param name="Ex">异常类</param>
        public static void Error(LoggerType loggerType, string LogStr, Exception Ex)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());
            if (log.IsErrorEnabled)
            {
                log.Error(LogStr, Ex);
            }
        }

        /// <summary>
        /// 记录致命信息
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        public static void Fatal(LoggerType loggerType, string LogStr)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());

            if (log.IsFatalEnabled)
            {
                log.Fatal(LogStr);
            }

        }
        /// <summary>
        /// 记录致命信息
        /// </summary>
        /// <param name="loggerType">日志记录分类枚举</param>
        /// <param name="LogStr">日志</param>
        /// <param name="Ex">异常类</param>
        public static void Fatal(LoggerType loggerType, string LogStr, Exception Ex)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(loggerType.ToString());
            if (log.IsFatalEnabled)
            {
                log.Fatal(LogStr, Ex);
            }
        }
    }
}


