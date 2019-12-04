using System;
using FPLDQ.JobService.BaseJob;
using FPLDQ.JobService.Log;

namespace TestJob2
{
    public class Job2 : BaseJob
    {
        protected override void Execute()      
        {
            LogWrite.CreateLog().DuggerLog("这个是测试TestJob2");
        }
    }
}
