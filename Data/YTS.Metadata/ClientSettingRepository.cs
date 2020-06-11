using Dapper;
using System;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.Metadata
{
    public class ClientSettingRepository : Repository<ClientSetting>, IClientSettingRepository
    {
        public ClientSettingRepository(IConnectionProvider provider)
            : base(provider)
        {
        }

        public ClientSettingRepository(IUnitOfWork uow)
            : base(uow)
        {
        }

        public override IQueryable<ClientSetting> All()
        {
            throw new System.NotImplementedException();
        }

        public override int Count()
        {
            throw new System.NotImplementedException();
        }

        public override ClientSetting Create(ClientSetting t)
        {
            throw new System.NotImplementedException();
        }

        public override ClientSetting Delete(ClientSetting t)
        {
            throw new System.NotImplementedException();
        }

        public override ClientSetting Find(params object[] keys)
        {
            throw new System.NotImplementedException();
        }

        public ClientSetting GetClientSetting(Guid clientID)
        {
            return UnitOfWork.Connection.QuerySingle<ClientSetting>(
                sql: "SELECT * FROM meta.ClientSetting WHERE ClientID = @ClientID",
                param: new { ClientID = clientID },
                transaction: UnitOfWork.Transaction);
        }

        public override ClientSetting Update(ClientSetting t)
        {
            throw new System.NotImplementedException();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
