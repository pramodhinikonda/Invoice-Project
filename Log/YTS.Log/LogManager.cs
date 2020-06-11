using System;

namespace YTS.Log
{
    public static class LogManager
    {
        static LogManager()
        {
            log4net.Config.XmlConfigurator.Configure();
        }

        public static ILogger GetLogger(Type type)
        {
            return new Log4NetWrapper(type);
        }
    }
}
