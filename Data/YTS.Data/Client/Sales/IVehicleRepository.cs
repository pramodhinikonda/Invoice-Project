using System;
using System.Collections.Generic;
using YTS.Data.Models;

namespace YTS.Data
{
   public interface IVehicleRepository : IRepository<Vehicle>
    {
        Vehicle GetVehicle(string RegistrationNumber);

        List<Vehicle> GetVehicles(Guid organizationID);
    }
}
