using System;

namespace YTS.Data.Models
{
    public class Organization : Audit
    {
        public Guid OrganizationID { get; set; }

        public Guid ClientID { get; set; }

        public string Name { get; set; }

        public string GSTIN { get; set; }

        public bool IsDefaultOrganization { get; set; }
    }
}
