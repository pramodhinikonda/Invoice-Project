using System;
using System.Collections.Generic;
using YTS.Data.Models;

namespace YTS.Data
{
    public interface IInvoiceRepository : IRepository<Invoice>
    {
        List<Invoice> GetInvoices(Guid organizationID);
    }
}
