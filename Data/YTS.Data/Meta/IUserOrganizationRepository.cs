using System;
using YTS.Data.Models;

namespace YTS.Data
{
    public interface IUserOrganizationRepository : IRepository<UserOrganization>
    {
        UserOrganization GetByUserID(Guid userID);
    }
}
