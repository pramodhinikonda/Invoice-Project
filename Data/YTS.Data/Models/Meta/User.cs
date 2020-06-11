using System;

namespace YTS.Data.Models
{
    public class User : Audit
    {
        public Guid UserID { get; set; }

        public Guid ClientID { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }
    }
}