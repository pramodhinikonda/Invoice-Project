using Topshelf;

namespace YTS.Host.Window
{
    public class ServiceHost
    {
        public static void Host()
        {
            HostFactory.Run(x =>
            {
                x.Service<Service>(p =>
                {
                    p.ConstructUsing(name => new Service());
                    p.WhenStarted(tc => tc.Start());
                    p.WhenStopped(tc => tc.Stop());
                });
                x.RunAsLocalSystem();
                x.SetDescription("Yuvaa Invoice Core API's");
                x.SetDisplayName("YTS.Web.API");
                x.SetServiceName("YTS.Web.API");
            });
        }
    }
}
