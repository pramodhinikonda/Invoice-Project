using YTS.Data.Models;
using System.Collections.Generic;
using System;

namespace YTS.Data
{
    public interface IItemRepository : IRepository<Item>
    {
        Item GetItem(string name);

        List<Item> GetItems(Guid organizationID);
    }
}
