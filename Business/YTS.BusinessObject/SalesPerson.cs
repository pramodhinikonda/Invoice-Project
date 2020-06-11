using System;

namespace YTS.BusinessObject
{
    public class SalesPerson
    {
        public Guid SalesPersonID { get; set; }

        public Guid OrganizationID { get; set; }

        public string Name { get; set; }     

        public string Mobile { get; set; }

        public bool IsDeleted { get; set; }
    }
}
