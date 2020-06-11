using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using YTS.Log;

namespace YTS.WebAPI.Core
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private static readonly ILogger log = LogManager.GetLogger(typeof(CustomExceptionFilterAttribute));

        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            log.Error(actionExecutedContext.Exception);

            if (actionExecutedContext.Exception is ArgumentException)
            {
                actionExecutedContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            else if (actionExecutedContext.Exception is ArgumentNullException)
            {
                actionExecutedContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            actionExecutedContext.Response.ReasonPhrase = actionExecutedContext.Exception.Message;
        }
    }
}