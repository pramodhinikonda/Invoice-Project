using System;

namespace YTS.BusinessObject
{
    public class Organization
    {
        public Guid OrganizationID { get; set; }

        public Guid ClientID { get; set; }

        public string Name { get; set; }

        public bool IsDefaultOrganization { get; set; }
    }
}
