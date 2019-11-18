using FPLDQ.JobService.Service.Api;

namespace FPLDQ.JobService.Service.Host
{
    public class Program
    {
        public static void Main(string[] args)
        {
           JobServiceBuilder.BuilderProduce().Start();

            JobApiStartHelper.Start("wechat");



            //JobServiceBuilder.BuilderTest().Start(new JobInfo
            //{
            //    AssemblyPath = @"C:\Users\h3user\Downloads\Go.Job.QuartzNET3X-master\Go.Job.QuartzNET3X-master\TestJob1\bin\Debug\TestJob1.dll",
            //    ClassType = "TestJob1.Job1",
            //    Second = 1,
            //});

            //JobServiceBuilder.BuilderTest().Start();
        }
    }
}
