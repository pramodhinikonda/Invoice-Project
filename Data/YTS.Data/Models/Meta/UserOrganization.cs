using System;

namespace YTS.Data.Models
{
    public class UserOrganization
    {
        public Guid UserMappingID { get; set; }

        public Guid UserID { get; set; }

        public string Organization { get; set; }
    }
}
