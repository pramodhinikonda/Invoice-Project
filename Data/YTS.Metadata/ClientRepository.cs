using Dapper;
using System;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.Metadata
{
    public class ClientRepository : Repository<Client>, IClientRepository
    {
        public ClientRepository(IConnectionProvider provider)
            : base(provider)
        {
        }

        public ClientRepository(IUnitOfWork uow)
            : base(uow)
        {
        }

        public override IQueryable<Client> All()
        {
            return UnitOfWork.Connection.Query<Client>($"SELECT * FROM meta.Client", transaction: UnitOfWork.Transaction).AsQueryable();
        }

        public override int Count()
        {
            throw new NotImplementedException();
        }

        public override Client Create(Client client)
        {
            throw new NotImplementedException();
        }

        public override Client Delete(Client client)
        {
            throw new NotImplementedException();
        }

        public override Client Find(params object[] keys)
        {
            if (keys == null || keys.Count() == 0)
            {
                throw new ArgumentNullException($"{nameof(keys)} are null.");
            }

            return UnitOfWork.Connection.QueryFirst<Client>($"SELECT * FROM meta.Client where ClientID = @ClientID",
                param: new { ClientID = keys[0] },
                transaction: UnitOfWork.Transaction);
        }

        public override Client Update(Client client)
        {
            throw new NotImplementedException();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
