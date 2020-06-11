using System;

namespace YTS.Data.Models
{
    public class ClientSetting
    {
        public Guid ClientSettingID { get; set; }

        public Guid ClientID { get; set; }

        public string ConnectionString { get; set; }
    }
}
