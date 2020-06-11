using System;

namespace YTS.Data.Models
{
    public class SalesPerson : Audit
    {
        public Guid SalesPersonID { get; set; }

        public Guid OrganizationID { get; set; }

        public string Name { get; set; }

        public string Mobile { get; set; }
    }
}
