using System;

namespace YTS.Data.Models
{
    public class GST : Audit
    {
        public Guid GSTID { get; set; }

        public Guid OrganizationID { get; set; }

        public string Name { get; set; }

        public int Value { get; set; }
    }
}
