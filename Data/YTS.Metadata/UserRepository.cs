using Dapper;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.Metadata
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IConnectionProvider provider)
            : base(provider)
        {
        }

        public UserRepository(IUnitOfWork uow)
            : base(uow)
        {
        }

        public override IQueryable<User> All()
        {
            throw new System.NotImplementedException();
        }

        public override int Count()
        {
            throw new System.NotImplementedException();
        }

        public override User Create(User t)
        {
            throw new System.NotImplementedException();
        }

        public override User Delete(User t)
        {
            throw new System.NotImplementedException();
        }

        public override User Find(params object[] keys)
        {
            throw new System.NotImplementedException();
        }

        public User GetUser(string email)
        {
            return UnitOfWork.Connection.QueryFirstOrDefault<User>(
                sql: "SELECT * FROM meta.Users WHERE Email = @Email",
                param: new { Email = email },
                transaction: UnitOfWork.Transaction);
        }

        public override User Update(User t)
        {
            throw new System.NotImplementedException();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
