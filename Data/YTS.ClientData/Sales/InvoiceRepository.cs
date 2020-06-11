using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.ClientData
{
    public class InvoiceRepository : Repository<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(IConnectionProvider provider)
               : base(provider)
        {
        }

        public InvoiceRepository(IUnitOfWork unitOfWork)
           : base(unitOfWork)
        {
        }

        public override IQueryable<Invoice> All()
        {
            throw new System.NotImplementedException();
        }

        public override int Count()
        {
            throw new System.NotImplementedException();
        }

        public override Invoice Create(Invoice t)
        {
            throw new System.NotImplementedException();
        }

        public override Invoice Delete(Invoice t)
        {
            throw new System.NotImplementedException();
        }

        public override Invoice Find(params object[] keys)
        {
            throw new System.NotImplementedException();
        }

        public List<Invoice> GetInvoices(Guid organizationID)
        {
            return UnitOfWork.Connection.Query<Invoice>(
                sql: "SELECT * FROM sales.Invoice WHERE OrganizationID = @OrganizationID AND IsDeleted = 0",
                param: new { OrganizationID = organizationID },
                transaction: UnitOfWork.Transaction).ToList();
        }

        public override Invoice Update(Invoice t)
        {
            throw new System.NotImplementedException();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
