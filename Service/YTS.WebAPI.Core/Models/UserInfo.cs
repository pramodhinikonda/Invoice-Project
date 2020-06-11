using System;

namespace YTS.WebAPI.Core
{
    public class UserInfo
    {
        public Guid ClientID { get; set; }

        public Guid UserID { get; set; }

        public Guid OrganizationID { get; set; }
    }
}