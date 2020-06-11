using System;
using System.Web.Http;
using YTS.Business;
using YTS.BusinessObject;

namespace YTS.WebAPI.Core.Controllers
{
    public class VehicleController : BaseController 
    {
        [HttpGet]
        public IHttpActionResult GetVehicle(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null.");
            }

            using (VehicleManager vehicleManager = new VehicleManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(vehicleManager.GetVehicle(name));
            }
        }

        [HttpGet]
        public IHttpActionResult GetVehicles()
        {
            using (VehicleManager vehicleManager = new VehicleManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(vehicleManager.GetVehicles());
            }
        }

        [HttpPost]
        public IHttpActionResult Save(Vehicle vehicle)
        {
            if (vehicle == null)
            {
                throw new ArgumentNullException($"{nameof(vehicle)} is null.");
            }

            using (VehicleManager vehicleManager = new VehicleManager(UserInfo.ClientID, UserInfo.UserID))
            {
                return Ok(vehicleManager.Save(vehicle));
            }
        }
    }
}
