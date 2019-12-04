using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FPLDQ.JobService.Web.Startup))]
namespace FPLDQ.JobService.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
