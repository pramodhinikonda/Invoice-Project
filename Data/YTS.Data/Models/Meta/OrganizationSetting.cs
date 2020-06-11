using System;

namespace YTS.Data.Models
{
    public class OrganizationSetting : Audit
    {
        public Guid OrganizationSettingID { get; set; }

        public Guid OrganizationID { get; set; }

        public string DateFormat { get; set; }
    }
}
