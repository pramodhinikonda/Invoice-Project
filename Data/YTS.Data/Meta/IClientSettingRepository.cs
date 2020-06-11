using System;
using YTS.Data.Models;

namespace YTS.Data
{
    public interface IClientSettingRepository : IRepository<ClientSetting>
    {
        ClientSetting GetClientSetting(Guid clientID);
    }
}
