using Dapper;
using System;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.Metadata
{
    public class UserOrganizationRepository : Repository<UserOrganization>, IUserOrganizationRepository
    {
        public UserOrganizationRepository()
        {
        }

        public UserOrganizationRepository(IConnectionProvider provider)
               : base(provider)
        {
        }

        public UserOrganizationRepository(IUnitOfWork uow)
            : base(uow)
        {
        }

        public override IQueryable<UserOrganization> All()
        {
            throw new NotImplementedException();
        }

        public override int Count()
        {
            throw new NotImplementedException();
        }

        public override UserOrganization Create(UserOrganization t)
        {
            throw new NotImplementedException();
        }

        public override UserOrganization Delete(UserOrganization t)
        {
            throw new NotImplementedException();
        }

        public override UserOrganization Find(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public UserOrganization GetByUserID(Guid userID)
        {
            return UnitOfWork.Connection.QueryFirstOrDefault<UserOrganization>(
                sql: $"SELECT * FROM meta.UserOrganization WHERE UserID = @UserID",
                param: new { UserID = userID },
                transaction: UnitOfWork.Transaction);
        }

        public override UserOrganization Update(UserOrganization t)
        {
            throw new NotImplementedException();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
