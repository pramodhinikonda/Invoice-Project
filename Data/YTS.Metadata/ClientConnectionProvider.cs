using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.Metadata
{
    public class ClientConnectionProvider : IConnectionProvider
    {
        private Guid clientID;

        public ClientConnectionProvider(Guid clientID)
        {
            this.clientID = clientID;
        }

        public IDbConnection GetConnection()
        {
            using (IUnitOfWork uow = new UnitOfWorkMetadata(new MetadataConnectionProvider()))
            using (IClientRepository clientRepository = new ClientRepository(uow))
            using (IClientSettingRepository clientSettingRepository = new ClientSettingRepository(uow))
            {
                ClientSetting clientSetting = clientSettingRepository.GetClientSetting(clientID);
                if (clientSetting != null)
                {
                    return new SqlConnection(clientSetting.ConnectionString);
                }

                throw new Exception($"Invalid client id {clientID}");
            }
        }
    }
}
