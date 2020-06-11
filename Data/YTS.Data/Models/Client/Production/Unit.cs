using System;

namespace YTS.Data.Models
{
    public class Unit : Audit
    {
        public Guid UnitID { get; set; }

        public Guid OrganizationID { get; set; }

        public string Name { get; set; }

        public int Type { get; set; }
    }
}
