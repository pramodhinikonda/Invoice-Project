using System;
using System.Web.Http;
using YTS.Business;
using YTS.BusinessObject;

namespace YTS.WebAPI.Core.Controllers
{
    public class UnitController : BaseController
    {
        [HttpGet]
        public IHttpActionResult GetUnit(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null.");
            }

            using (UnitManager unitManager = new UnitManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(unitManager.GetUnit(name));
            }
        }

        [HttpGet]
        public IHttpActionResult GetUnits()
        {
            using (UnitManager unitManager = new UnitManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(unitManager.GetUnits());
            }
        }

        [HttpPost]
        public IHttpActionResult Save(Unit unit)
        {
            if (unit == null)
            {
                throw new ArgumentNullException($"{nameof(unit)} is null.");
            }

            using (UnitManager unitManager = new UnitManager(UserInfo.ClientID, UserInfo.OrganizationID, UserInfo.UserID))
            {
                return Ok(unitManager.Save(unit));
            }
        }

        [HttpDelete]
        public IHttpActionResult Delete(Guid unitID)
        {
            using (UnitManager unitManager = new UnitManager(UserInfo.ClientID, UserInfo.OrganizationID, UserInfo.UserID))
            {
                return Ok(unitManager.Delete(unitID));
            }
        }
    }
}
