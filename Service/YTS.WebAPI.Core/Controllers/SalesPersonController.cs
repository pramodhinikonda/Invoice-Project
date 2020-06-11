using System;
using System.Web.Http;
using YTS.Business;
using YTS.BusinessObject;

namespace YTS.WebAPI.Core.Controllers
{
    public class SalesPersonController : BaseController
    {
        [HttpGet]
        public IHttpActionResult GetSalesPerson(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null.");
            }

            using (SalesPersonManager salespersonManager = new SalesPersonManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(salespersonManager.GetSalesPerson(name));
            }
        }

        [HttpGet]
        public IHttpActionResult GetSalesPersons()
        {
            using (SalesPersonManager salespersonManager = new SalesPersonManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(salespersonManager.GetSalesPersons());
            }
        }

        [HttpPost]
        public IHttpActionResult Save(SalesPerson salesperson)
        {
            if (salesperson == null)
            {
                throw new ArgumentNullException($"{nameof(salesperson)} is null.");
            }

            using (SalesPersonManager salespersonManager = new SalesPersonManager(UserInfo.ClientID, UserInfo.UserID))
            {
                return Ok(salespersonManager.Save(salesperson));
            }
        }
    }
}
