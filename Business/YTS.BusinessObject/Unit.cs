using System;

namespace YTS.BusinessObject
{
    public class Unit
    {
        public Guid UnitID { get; set; }

        public Guid OrganizationID { get; set; }

        public string Name { get; set; }

        public UnitType Type { get; set; }

        public bool IsDeleted { get; set; }
    }
}
