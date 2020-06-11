using Microsoft.Owin.Hosting;
using System;

namespace YTS.Host.Window
{
    public class Service
    {
        IDisposable webServer;
        string baseAddress = System.Configuration.ConfigurationManager.AppSettings["APIBaseURL"];

        public Service() { }

        public void Start()
        {
            webServer = WebApp.Start<Startup>(url: baseAddress);
        }

        public void Stop()
        {
            webServer.Dispose();
        }
    }
}
