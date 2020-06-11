using System;
using System.Collections.Generic;
using YTS.Data.Models;

namespace YTS.Data
{
    public interface IOrganizationRepository : IRepository<Organization>
    {
        List<Organization> GetOrganizations(Guid[] organizationIDs);
    }
}
