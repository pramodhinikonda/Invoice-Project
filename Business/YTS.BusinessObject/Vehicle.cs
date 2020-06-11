using System;

namespace YTS.BusinessObject
{
    public class Vehicle
    {
        public Guid VehicleID { get; set; }

        public Guid OrganizationID { get; set; }

        public string RegistrationNumber { get; set; }

        public string Name { get; set; }

        public decimal RPM { get; set; }

        public bool IsDeleted { get; set; }
    }
}
