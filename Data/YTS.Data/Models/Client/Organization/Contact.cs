using System;

namespace YTS.Data.Models
{
   public class Contact : Audit
    {
        public Guid ContactID { get; set; }

        public Guid OrganizationID { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }        
    }
}
