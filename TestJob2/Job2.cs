using System;
using FPLDQ.JobService.BaseJob;

namespace TestJob2
{
    public class Job2 : BaseJob
    {
        protected override void Execute()      
        {
            Console.WriteLine($"{DateTime.Now} :Job2 ");
        }
    }
}
