using System;

namespace YTS.Data.Models
{
    public class Item : Audit
    {
        public Guid ItemID { get; set; }

        public Guid OrganizationID { get; set; }

        public Guid UnitID { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Type { get; set; }

        public decimal SellingRate { get; set; }

        public string HsnSac { get; set; }

        public bool IsTaxable { get; set; }

        public Guid GST { get; set; }
    }
}