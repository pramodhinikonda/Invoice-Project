using System;
using System.Collections.Generic;
using System.Linq;
using YTS.BusinessObject;
using YTS.Data;
using YTS.Metadata;

namespace YTS.Business
{
    public class OrganizationManager
    {
        public OrganizationManager()
        {
        }

        public List<Organization> GetOrganization(Guid userID)
        {
            if (userID == Guid.Empty)
            {
                throw new Exception($"{userID} cannot be empty.");
            }

            using (IUnitOfWork uow = new UnitOfWorkMetadata(new MetadataConnectionProvider()))
            using (IUserOrganizationRepository userOrganizationRepository = new UserOrganizationRepository(uow))
            using (IOrganizationRepository organizationRepository = new OrganizationRepository(uow))
            {
                Data.Models.UserOrganization userOrganization = userOrganizationRepository.GetByUserID(userID);
                if (userOrganization == null || string.IsNullOrEmpty(userOrganization.Organization))
                {
                    return new List<Organization>();
                }

                string[] orgs = userOrganization.Organization.Split(',');
                List<Data.Models.Organization> organizations = organizationRepository.GetOrganizations(orgs.Select(Guid.Parse).ToArray());
                return organizations.Select(t => new Organization
                {
                    ClientID = t.ClientID,
                    IsDefaultOrganization = t.IsDefaultOrganization,
                    Name = t.Name,
                    OrganizationID = t.OrganizationID
                }).ToList();
            }
        }
    }
}
