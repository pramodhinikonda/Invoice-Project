using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.ClientData
{
   public class VehicleRepository : Repository<Vehicle>, IVehicleRepository
    {
        public VehicleRepository(IConnectionProvider provider)
           : base(provider)
        {
        }

        public VehicleRepository(IUnitOfWork unitOfWork)
           : base(unitOfWork)
        {
        }

        public override IQueryable<Vehicle> All()
        {
            throw new NotImplementedException();
        }

        public override int Count()
        {
            throw new NotImplementedException();
        }

        public override Vehicle Create(Vehicle vehicle)
        {
            UnitOfWork.Connection.ExecuteScalar<int>(
               sql: $"INSERT INTO sales.Vehicle(VehicleID, OrganizationID, RegistrationNumber, Name, RPM, ModifiedDate, ModifiedBy, IsDeleted) VALUES(@VehicleID, @OrganizationID, @RegistrationNumber, @Name, @RPM, @ModifiedDate, @ModifiedBy, @IsDeleted)",
               param: new { vehicle.VehicleID, vehicle.OrganizationID, vehicle.RegistrationNumber, vehicle.Name, vehicle.RPM, vehicle.ModifiedDate, vehicle.ModifiedBy, vehicle.IsDeleted },
               transaction: UnitOfWork.Transaction);

            return vehicle;
        }

        public override Vehicle Delete(Vehicle vehicle)
        {
            throw new NotImplementedException();
        }

        public override Vehicle Find(params object[] keys)
        {
            return UnitOfWork.Connection.QuerySingleOrDefault<Vehicle>(
                sql: "SELECT * FROM sales.Vehicle WHERE VehicleID = @VehicleID",
                param: new { VehicleID = keys[0] },
                transaction: UnitOfWork.Transaction);
        }

        public Vehicle GetVehicle(string name)
        {
            return UnitOfWork.Connection.QueryFirstOrDefault<Vehicle>(
                sql: "SELECT * FROM sales.Vehicle WHERE Name = @Name",
                param: new { Name = name },
                transaction: UnitOfWork.Transaction);
        }

        public List<Vehicle> GetVehicles(Guid organizationID)
        {
            return UnitOfWork.Connection.Query<Vehicle>(
                sql: "SELECT * FROM sales.Vehicle WHERE OrganizationID = @OrganizationID",
                param: new { OrganizationID = organizationID },
                transaction: UnitOfWork.Transaction).ToList();
        }

        public override Vehicle Update(Vehicle vehicle)
        {
            UnitOfWork.Connection.Execute(
                sql: "UPDATE sales.Vehicle SET OrganizationID = @OrganizationID, RegistrationNumber = @RegistrationNumber, Name = @Name, RPM = @RPM, ModifiedDate = @ModifiedDate, ModifiedBy = @ModifiedBy, IsDeleted = @IsDeleted WHERE VehicleID = @VehicleID",
                param: new { vehicle.VehicleID, vehicle.OrganizationID, vehicle.RegistrationNumber, vehicle.Name, vehicle.RPM, vehicle.ModifiedDate, vehicle.ModifiedBy, vehicle.IsDeleted },
                transaction: UnitOfWork.Transaction);

            return vehicle;
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
