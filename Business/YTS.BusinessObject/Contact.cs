using System;

namespace YTS.BusinessObject
{
    public class Contact
    {
        public Guid ContactID { get; set; }

        public Guid OrganizationID { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public bool IsDeleted { get; set; }
    }
}
