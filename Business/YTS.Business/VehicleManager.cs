using System;
using System.Collections.Generic;
using System.Linq;
using YTS.BusinessObject;
using YTS.ClientData;
using YTS.Data;
using YTS.Metadata;

namespace YTS.Business
{
   public class VehicleManager : IDisposable 
    {
        private Guid clientID;
        private Guid organizationID;
        private Guid userID;
        private IVehicleRepository vehicleRepository;
        private bool disposed = false;

        public VehicleManager(Guid clientID, Guid organizationID)
        {
            this.clientID = clientID;
            this.organizationID = organizationID;
            vehicleRepository = new VehicleRepository(new ClientConnectionProvider(clientID));
        }

        public VehicleManager(Guid clientID, Guid organizationID, Guid userID)
            : this(clientID, organizationID)
        {
            this.userID = userID;
        }

        public Vehicle GetVehicle(string name)
        {
            if (clientID == default(Guid))
            {
                throw new ArgumentException($"{nameof(clientID)} is invalid");
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null");
            }

            Data.Models.Vehicle vehicle = vehicleRepository.GetVehicle(name);
            if (vehicle == null)
            {
                return null;
            }

            return new Vehicle
            {                                
                OrganizationID = vehicle.OrganizationID,
                RegistrationNumber = vehicle.RegistrationNumber,
                Name = vehicle.Name,
                RPM = vehicle.RPM,
                VehicleID = vehicle.VehicleID
            };
        }

        public Vehicle Save(Vehicle vehicle)
        {
            if (vehicle == null)
            {
                throw new ArgumentNullException($"{nameof(vehicle)} is null.");
            }

            Data.Models.Vehicle v;
            if (vehicle.VehicleID != Guid.Empty)
            {
                v = vehicleRepository.Find(vehicle.VehicleID);
                v.IsDeleted = vehicle.IsDeleted;
                v.ModifiedBy = userID;
                v.ModifiedDate = DateTime.UtcNow;
                v.Name = vehicle.Name;
                v.OrganizationID = organizationID;
                v.RegistrationNumber  = vehicle.RegistrationNumber;
                v.RPM  = vehicle.RPM;
                v.VehicleID  = vehicle.VehicleID;
                vehicleRepository.Update(v);
            }
            else
            {
                v = vehicleRepository.Create(new Data.Models.Vehicle
                {
                    IsDeleted = vehicle.IsDeleted,
                    ModifiedBy = userID,
                    ModifiedDate = DateTime.UtcNow,
                    Name = vehicle.Name,
                    OrganizationID = organizationID,
                    RegistrationNumber = vehicle.RegistrationNumber,
                    RPM = vehicle.RPM,
                    VehicleID = Guid.NewGuid()
                });

                vehicle.VehicleID = v.VehicleID;
            }

            vehicleRepository.Save();
            return vehicle;
        }

        public List<Vehicle> GetVehicles()
        {
            List<Data.Models.Vehicle> vehicles = vehicleRepository.GetVehicles(organizationID);
            return vehicles.Select(t => new Vehicle
            {
                IsDeleted = t.IsDeleted,
                Name = t.Name,
                OrganizationID = t.OrganizationID,
                RegistrationNumber = t.RegistrationNumber,
                RPM = t.RPM,
                VehicleID = t.VehicleID
            }).ToList();
        }


        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    vehicleRepository.Dispose();
                }
            }

            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
