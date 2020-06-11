using System;

namespace YTS.Data.Models
{
    public class Vehicle : Audit
    {
        public Guid VehicleID { get; set; }

        public Guid OrganizationID { get; set; }

        public string RegistrationNumber { get; set; }

        public string Name { get; set; }

        public decimal RPM { get; set; }
    }
}
