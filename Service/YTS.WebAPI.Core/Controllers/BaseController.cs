using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using YTS.WebAPI.Core.Helpers;

namespace YTS.WebAPI.Core.Controllers
{
    [CustomExceptionFilter]
    public class BaseController : ApiController
    {
        private const string USER = "User";

        public UserInfo UserInfo
        {
            get
            {
                IEnumerable<string> keys = null;
                if (Request.Headers.TryGetValues(USER, out keys))
                {
                    string clientInfo = keys.First();
                    return Base64Utility.Base64ToObject<UserInfo>(clientInfo);
                }
                return new UserInfo();
            }
        }
    }
}
