using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.ClientData
{
    public class UnitRepository : Repository<Unit>, IUnitRepository
    {
        public UnitRepository(IConnectionProvider provider)
            : base(provider)
        {
        }

        public UnitRepository(IUnitOfWork unitOfWork)
           : base(unitOfWork)
        {
        }

        public override IQueryable<Unit> All()
        {
            throw new NotImplementedException();
        }

        public override int Count()
        {
            throw new NotImplementedException();
        }

        public override Unit Create(Unit unit)
        {
            UnitOfWork.Connection.ExecuteScalar<int>(
               sql: $"INSERT INTO production.Unit(UnitID, OrganizationID, Name, Type, ModifiedDate, ModifiedBy, IsDeleted) VALUES(@UnitID, @OrganizationID, @Name, @Type, @ModifiedDate, @ModifiedBy, @IsDeleted)",
               param: new { unit.UnitID, unit.OrganizationID, unit.Name, unit.Type, unit.ModifiedDate, unit.ModifiedBy, unit.IsDeleted },
               transaction: UnitOfWork.Transaction);

            return unit;
        }

        public override Unit Delete(Unit unit)
        {
            throw new NotImplementedException();
        }

        public override Unit Find(params object[] keys)
        {
            return UnitOfWork.Connection.QuerySingleOrDefault<Unit>(
                sql: "SELECT * FROM production.Unit WHERE UnitID = @UnitID",
                param: new { UnitID = keys[0] },
                transaction: UnitOfWork.Transaction);
        }

        public Unit GetUnit(string name)
        {
            return UnitOfWork.Connection.QueryFirstOrDefault<Unit>(
                sql: "SELECT * FROM production.Unit WHERE Name = @Name",
                param: new { Name = name },
                transaction: UnitOfWork.Transaction);
        }

        public List<Unit> GetUnits(Guid organizationID)
        {
            return UnitOfWork.Connection.Query<Unit>(
                sql: "SELECT * FROM production.Unit WHERE OrganizationID = @OrganizationID AND IsDeleted = 0",
                param: new { OrganizationID = organizationID },
                transaction: UnitOfWork.Transaction).ToList();
        }

        public override Unit Update(Unit unit)
        {
            UnitOfWork.Connection.Execute(
                sql: "UPDATE production.Unit SET OrganizationID = @OrganizationID, Name = @Name, Type = @Type, ModifiedDate = @ModifiedDate, ModifiedBy = @ModifiedBy, IsDeleted = @IsDeleted WHERE UnitID = @UnitID",
                param: new { unit.UnitID, unit.OrganizationID, unit.Name, unit.Type, unit.ModifiedDate, unit.ModifiedBy, unit.IsDeleted },
                transaction: UnitOfWork.Transaction);

            return unit;
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
