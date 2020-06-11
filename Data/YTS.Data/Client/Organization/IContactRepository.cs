using System;
using System.Collections.Generic;
using YTS.Data.Models;

namespace YTS.Data
{
   public interface IContactRepository : IRepository<Contact>
    {
        Contact GetContact(string name);

        List<Contact> GetContacts(Guid organizationID);
    }
}
