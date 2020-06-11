using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.Metadata
{
    public class OrganizationRepository : Repository<Organization>, IOrganizationRepository
    {
        public OrganizationRepository()
            : base()
        {
        }

        public OrganizationRepository(IConnectionProvider provider)
           : base(provider)
        {
        }

        public OrganizationRepository(IUnitOfWork uow)
            : base(uow)
        {
        }

        public override IQueryable<Organization> All()
        {
            throw new NotImplementedException();
        }

        public override int Count()
        {
            throw new NotImplementedException();
        }

        public override Organization Create(Organization t)
        {
            throw new NotImplementedException();
        }

        public override Organization Delete(Organization t)
        {
            throw new NotImplementedException();
        }

        public override Organization Find(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public List<Organization> GetOrganizations(Guid[] organizationIDs)
        {
            return UnitOfWork.Connection.Query<Organization>(
                sql: $"SELECT * FROM meta.Organization WHERE OrganizationID IN @OrganizationIDs",
                param: new { OrganizationIDs = organizationIDs },
                transaction: UnitOfWork.Transaction).ToList();
        }

        public override Organization Update(Organization t)
        {
            throw new NotImplementedException();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
