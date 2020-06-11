using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.ClientData
{
  public class SalesPersonRepository : Repository<SalesPerson>, ISalesPersonRepository
    {
        public SalesPersonRepository(IConnectionProvider provider)
                  : base(provider)
        {
        }

        public SalesPersonRepository(IUnitOfWork unitOfWork)
           : base(unitOfWork)
        {
        }

        public override IQueryable<SalesPerson> All()
        {
            throw new NotImplementedException();
        }

        public override int Count()
        {
            throw new NotImplementedException();
        }

        public override SalesPerson Create(SalesPerson salesperson)
        {
            UnitOfWork.Connection.ExecuteScalar<int>(
               sql: $"INSERT INTO sales.SalesPerson(SalesPersonID, OrganizationID, Name, Mobile, ModifiedDate, ModifiedBy, IsDeleted) VALUES(@SalesPersonID, @OrganizationID, @Name, @Mobile, @ModifiedDate, @ModifiedBy, @IsDeleted)",
               param: new { salesperson.SalesPersonID, salesperson.OrganizationID, salesperson.Name, salesperson.Mobile, salesperson.ModifiedDate, salesperson.ModifiedBy, salesperson.IsDeleted },
               transaction: UnitOfWork.Transaction);

            return salesperson;
        }

        public override SalesPerson Delete(SalesPerson salesperson)
        {
            throw new NotImplementedException();
        }

        public override SalesPerson Find(params object[] keys)
        {
            return UnitOfWork.Connection.QuerySingleOrDefault<SalesPerson>(
                sql: "SELECT * FROM sales.SalesPerson WHERE SalesPersonID = @SalesPersonID",
                param: new { SalesPersonID = keys[0] },
                transaction: UnitOfWork.Transaction);
        }

        public SalesPerson GetSalesPerson(string name)
        {
            return UnitOfWork.Connection.QueryFirstOrDefault<SalesPerson>(
                sql: "SELECT * FROM sales.SalesPerson WHERE Name = @Name",
                param: new { Name = name },
                transaction: UnitOfWork.Transaction);
        }

        public List<SalesPerson> GetSalesPersons(Guid organizationID)
        {
            return UnitOfWork.Connection.Query<SalesPerson>(
                sql: "SELECT * FROM sales.SalesPerson WHERE OrganizationID = @OrganizationID",
                param: new { OrganizationID = organizationID },
                transaction: UnitOfWork.Transaction).ToList();
        }

        public override SalesPerson Update(SalesPerson salesperson)
        {
            UnitOfWork.Connection.Execute(
                sql: "UPDATE sales.SalesPerson SET OrganizationID = @OrganizationID, Name = @Name, Mobile = @Mobile, ModifiedDate = @ModifiedDate, ModifiedBy = @ModifiedBy, IsDeleted = @IsDeleted WHERE SalesPersonID = @SalesPersonID",
                param: new { salesperson.SalesPersonID, salesperson.OrganizationID, salesperson.Name, salesperson.Mobile, salesperson.ModifiedDate, salesperson.ModifiedBy, salesperson.IsDeleted },
                transaction: UnitOfWork.Transaction);

            return salesperson;
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
