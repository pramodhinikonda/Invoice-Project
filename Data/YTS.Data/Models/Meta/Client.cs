using System;

namespace YTS.Data.Models
{
    public class Client
    {
        public Guid ClientID { get; set; }

        public Guid UserID { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }
    }
}
