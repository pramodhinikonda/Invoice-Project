using System;
using System.Web.Http;
using YTS.Business;

namespace YTS.WebAPI.Core.Controllers
{
    public class OrganizationController : BaseController
    {
        [HttpGet]
        public IHttpActionResult GetOrganizations(Guid userID)
        {
            if (userID == Guid.Empty)
            {
                throw new Exception($"{nameof(userID)} cannot be empty.");
            }

            OrganizationManager organizationManager = new OrganizationManager();
            return Ok(organizationManager.GetOrganization(userID));
        }
    }
}
