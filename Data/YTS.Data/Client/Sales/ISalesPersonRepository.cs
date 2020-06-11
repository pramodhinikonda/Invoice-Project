using System;
using System.Collections.Generic;
using YTS.Data.Models;
namespace YTS.Data
{
  public interface ISalesPersonRepository : IRepository<SalesPerson>
    {
        SalesPerson GetSalesPerson(string name);

        List<SalesPerson> GetSalesPersons(Guid organizationID);
    }
}
