using System.Web.Http;
using YTS.Business;

namespace YTS.WebAPI.Core.Controllers
{
    public class UserController : BaseController
    {
        [HttpGet]
        public IHttpActionResult GetByEmail(string email)
        {
            using (UserManager userManager = new UserManager())
            {
                return Ok(userManager.GetUser(email));
            }
        }
    }
}
