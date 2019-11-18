using FPLDQ.JobService.BaseJob;
using FPLDQ.JobService.Log;
using System;

namespace TestJob1
{
    

    public class Job1 : BaseJob
    {
        protected override void Execute()
        {
            LogWrite.CreateLog().WritLog("这个是测试TestJob1");
        }
    }
}
