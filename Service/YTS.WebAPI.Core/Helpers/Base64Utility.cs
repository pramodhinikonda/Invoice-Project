using Newtonsoft.Json;
using System;
using System.Text;

namespace YTS.WebAPI.Core.Helpers
{
    public class Base64Utility
    {
        public static T Base64ToObject<T>(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                byte[] baseData = Convert.FromBase64String(value);
                string decodedBaseData = Encoding.UTF8.GetString(baseData);
                if (!string.IsNullOrEmpty(decodedBaseData))
                {
                    return JsonConvert.DeserializeObject<T>(decodedBaseData);
                }
            }
            return default(T);
        }
    }
}